#!/usr/bin/env node
// Capture every Carbon React story that exists in both the V11 and V12 Storybooks:
// screenshots, computed styles of every `cds--` element, and a pixel diff.
//
//   node capture.mjs                 # incremental: skips stories already captured against the same builds
//   node capture.mjs --force         # recapture everything
//   node capture.mjs --only button   # only story ids containing "button"
//   node capture.mjs --limit 20 --concurrency 4
//
// Output (all under data/):
//   meta.json          build fingerprints for each Storybook + run settings
//   manifest.json      story matching: matched pairs, V11-only, V12-only (story and component level)
//   docs.json          V12 Changelog + Feature Flags docs pages, parsed
//   tokens.json        --cds-* custom properties that differ between the two iframe-*.css bundles
//   captures.json      one summary row per matched story (pixel diff, element counts, errors)
//   stories/<id>.json  full per-story capture: computed styles for both versions + pixel diff
//   shots/{v11,v12,diff}/<id>.png

import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SOURCES = {
  v11: 'https://react.carbondesignsystem.com',
  v12: 'https://v12-react.carbondesignsystem.com',
};
const DATA = path.resolve(import.meta.dirname, 'data');
const VIEWPORT = { width: 1280, height: 800 };
const RENDER_TIMEOUT = 20000;
const SETTLE_MS = 400;

const args = parseArgs(process.argv.slice(2));

// Computed-style properties recorded for every cds-- element.
const PROPS = [
  'display',
  'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'row-gap', 'column-gap',
  'background-color', 'background-image', 'color',
  'border-top-width', 'border-top-style', 'border-top-color',
  'border-right-width', 'border-right-style', 'border-right-color',
  'border-bottom-width', 'border-bottom-style', 'border-bottom-color',
  'border-left-width', 'border-left-style', 'border-left-color',
  'box-shadow',
  'font-size', 'font-weight', 'line-height', 'letter-spacing',
  'outline-width', 'outline-style', 'outline-color', 'outline-offset',
];

const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important; animation-delay: 0s !important; animation-iteration-count: 1 !important;
    transition: none !important; caret-color: transparent !important; scroll-behavior: auto !important;
  }`;

await main();

async function main() {
  await fs.mkdir(path.join(DATA, 'stories'), { recursive: true });
  for (const v of ['v11', 'v12', 'diff']) await fs.mkdir(path.join(DATA, 'shots', v), { recursive: true });

  log('Fetching story manifests…');
  const [idx11, idx12] = await Promise.all([fetchJson(`${SOURCES.v11}/index.json`), fetchJson(`${SOURCES.v12}/index.json`)]);
  const manifest = buildManifest(idx11.entries, idx12.entries);
  await writeJson('manifest.json', manifest);
  log(`${manifest.matched.length} matched stories, ${manifest.onlyV11.stories.length} V11-only, ${manifest.onlyV12.stories.length} V12-only`);

  const browser = await chromium.launch();
  try {
    const builds = await fingerprintBuilds(browser, idx11, idx12);
    const prevMeta = await readJson('meta.json');
    await writeJson('meta.json', {
      capturedAt: new Date().toISOString(),
      viewport: VIEWPORT,
      sources: SOURCES,
      builds,
      props: PROPS,
    });

    await captureDocs(browser);
    const meta = await readJson('meta.json');
    await diffTokens(builds);

    let todo = manifest.matched;
    if (args.only) todo = todo.filter((m) => m.v12.includes(args.only) || m.v11.includes(args.only));
    if (args.limit) todo = todo.slice(0, args.limit);

    // Incremental: a story is fresh if it was captured against the same two builds.
    // Changing what gets recorded (PROPS, collectStyles) also invalidates earlier captures.
    const schema = sha(PROPS.join() + collectStyles.toString()).slice(0, 8);
    const buildKey = `${builds.v11.fingerprint}:${builds.v12.fingerprint}:${schema}`;
    if (!args.force) {
      const before = todo.length;
      const fresh = [];
      for (const m of todo) {
        const prev = await readJson(path.join('stories', `${m.v12}.json`));
        if (prev?.buildKey === buildKey && !prev.error) fresh.push(m.v12);
      }
      todo = todo.filter((m) => !fresh.includes(m.v12));
      if (fresh.length) log(`Skipping ${fresh.length}/${before} stories already captured against these builds (use --force to redo)`);
    }
    if (prevMeta?.buildKey && prevMeta.buildKey !== buildKey) {
      log('A Storybook build (or the capture schema) changed since the last run; stories will be recaptured.');
    }

    await writeJson('meta.json', { ...meta, buildKey });
    log(`Capturing ${todo.length} stories with concurrency ${args.concurrency}…`);
    let done = 0;
    await pool(todo, args.concurrency, browser, async (ctx, m) => {
      const result = await capturePair(ctx, m, buildKey);
      await writeJson(path.join('stories', `${m.v12}.json`), result);
      done++;
      const pct = result.pixel ? `${(result.pixel.ratio * 100).toFixed(2)}% px` : 'ERR';
      log(`[${done}/${todo.length}] ${m.v12}  ${pct}${result.error ? '  ' + result.error : ''}`);
    });
  } finally {
    await browser.close();
  }

  await writeSummary(manifest);
  log('Done. Run `node diff.mjs` to build the changelog.');
}

// ---------------------------------------------------------------------------
// Manifest matching

function buildManifest(e11, e12) {
  const stories = (e) => Object.values(e).filter((x) => x.type === 'story');
  const s11 = stories(e11), s12 = stories(e12);
  const ids12 = new Set(s12.map((s) => s.id));
  const ids11 = new Set(s11.map((s) => s.id));

  const matched = [];
  const used12 = new Set();
  for (const s of s11) {
    if (ids12.has(s.id)) {
      matched.push(pair(s, e12[s.id], 'exact'));
      used12.add(s.id);
    }
  }
  // Stories that lived under "<Component>/Feature Flag" in V11 and graduated into the
  // component itself in V12 (e.g. components-dropdown-feature-flag--floating-styles →
  // components-dropdown--floating-styles). Match them so the diff covers them too.
  for (const s of s11) {
    if (ids12.has(s.id)) continue;
    const graduated = s.id.replace(/-feature-flags?--/, '--');
    if (graduated !== s.id && ids12.has(graduated) && !ids11.has(graduated) && !used12.has(graduated)) {
      matched.push(pair(s, e12[graduated], 'flag-graduated'));
      used12.add(graduated);
    }
  }
  const matched11 = new Set(matched.map((m) => m.v11));

  const onlyStories = (list, taken) => list.filter((s) => !taken.has(s.id)).map((s) => ({ id: s.id, title: s.title, name: s.name }));
  const onlyV11 = onlyStories(s11, matched11);
  const onlyV12 = onlyStories(s12, used12);

  // Component-level presence (by title, case-insensitive; Storybook titles aren't consistently cased).
  const titles = (e) => new Map(Object.values(e).map((x) => [x.title.toLowerCase(), x.title]));
  const t11 = titles(e11), t12 = titles(e12);
  const onlyTitles = (a, b) => [...a.keys()].filter((k) => !b.has(k)).map((k) => a.get(k)).sort();

  return {
    generatedAt: new Date().toISOString(),
    counts: { v11Stories: s11.length, v12Stories: s12.length, matched: matched.length },
    matched: matched.sort((a, b) => a.v12.localeCompare(b.v12)),
    onlyV11: { titles: onlyTitles(t11, t12), stories: onlyV11 },
    onlyV12: { titles: onlyTitles(t12, t11), stories: onlyV12 },
  };

  function pair(a, b, match) {
    return { v11: a.id, v12: b.id, title: b.title, name: b.name, component: componentOf(b.title), match };
  }
}

function componentOf(title) {
  // "Components/Notifications/Inline" → "Notifications"; "components/TreeView/Feature Flag" → "TreeView"
  const parts = title.split('/');
  return (parts.length > 1 ? parts[1] : parts[0]).trim();
}

// ---------------------------------------------------------------------------
// Build fingerprints: index.json hash + the hashed iframe-*.css asset name.

async function fingerprintBuilds(browser, idx11, idx12) {
  const out = {};
  const page = await browser.newPage();
  for (const [v, idx] of [['v11', idx11], ['v12', idx12]]) {
    await page.goto(`${SOURCES[v]}/iframe.html`, { waitUntil: 'domcontentloaded' });
    const css = await page.evaluate(() =>
      [...document.querySelectorAll('link[rel=stylesheet]')].map((l) => l.href).find((h) => /\/assets\/iframe-[^/]+\.css$/.test(h)));
    const indexHash = sha(JSON.stringify(idx)).slice(0, 12);
    out[v] = { url: SOURCES[v], iframeCss: css ?? null, indexHash, fingerprint: sha(`${indexHash}|${css}`).slice(0, 12) };
  }
  await page.close();
  return out;
}

// ---------------------------------------------------------------------------
// Tokens: diff --cds-* custom properties declared in each iframe-*.css bundle.

async function diffTokens(builds) {
  const extract = (css) => {
    const map = {};
    // Only declarations inside plain :root / theme-class blocks, keyed by selector + property.
    for (const block of css.matchAll(/([^{}]+)\{([^{}]*--cds-[^{}]*)\}/g)) {
      const sel = block[1].trim().replace(/\s+/g, ' ');
      if (sel.length > 120) continue;
      for (const d of block[2].matchAll(/(--cds-[\w-]+)\s*:\s*([^;]+)/g)) {
        (map[d[1]] ??= {})[sel] = d[2].trim();
      }
    }
    return map;
  };
  const texts = {};
  for (const v of ['v11', 'v12']) {
    if (!builds[v].iframeCss) { log(`No iframe-*.css found for ${v}; skipping token diff`); return; }
    texts[v] = await (await fetch(builds[v].iframeCss)).text();
  }
  const t11 = extract(texts.v11), t12 = extract(texts.v12);
  const rootValue = (m) => m[':root'] ?? m[':root,.cds--white'] ?? m['.cds--white'] ?? Object.values(m)[0];
  const added = [], removed = [], changed = [];
  for (const k of Object.keys(t12).sort()) {
    if (!t11[k]) added.push({ token: k, v12: rootValue(t12[k]) });
    else if (rootValue(t11[k]) !== rootValue(t12[k])) changed.push({ token: k, v11: rootValue(t11[k]), v12: rootValue(t12[k]) });
  }
  for (const k of Object.keys(t11).sort()) if (!t12[k]) removed.push({ token: k, v11: rootValue(t11[k]) });
  await writeJson('tokens.json', {
    source: { v11: builds.v11.iframeCss, v12: builds.v12.iframeCss },
    bytes: { v11: texts.v11.length, v12: texts.v12.length },
    added, removed, changed,
  });
  log(`Tokens: +${added.length} −${removed.length} ~${changed.length}`);
}

// ---------------------------------------------------------------------------
// V12 docs pages used as changelog sources.

async function captureDocs(browser) {
  const page = await browser.newPage();
  const open = async (id) => {
    await page.goto(`${SOURCES.v12}/iframe.html?id=${id}&viewMode=docs`, { waitUntil: 'load' });
    await page.waitForSelector('#storybook-docs .sbdocs-content, #storybook-docs h1', { timeout: RENDER_TIMEOUT });
    await page.waitForTimeout(500);
  };

  let changelog = [];
  try {
    await open('getting-started-changelog--changelog');
    const text = await page.locator('#storybook-docs').innerText();
    const dateRe = /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/;
    let cur = null;
    for (const line of text.split('\n').map((l) => l.trim()).filter(Boolean)) {
      if (dateRe.test(line)) { cur = { date: line, text: [] }; changelog.push(cur); }
      else if (cur) cur.text.push(line);
    }
    changelog = changelog.map((c) => ({ date: c.date, text: c.text.join('\n') }));
  } catch (e) { log(`Changelog docs page failed: ${e.message}`); }

  let flags = [];
  try {
    await open('getting-started-feature-flags--overview');
    flags = await page.evaluate(() => {
      const table = [...document.querySelectorAll('#storybook-docs table')]
        .find((t) => /flag/i.test(t.querySelector('th')?.textContent ?? ''));
      if (!table) return [];
      let section = 'current';
      const rows = [];
      for (const tr of table.querySelectorAll('tbody tr')) {
        const cells = [...tr.querySelectorAll('td')].map((td) => td.textContent.trim());
        if (/^deprecated flags$/i.test(cells[0])) { section = 'deprecated'; continue; }
        if (!cells[0]) continue;
        rows.push({ flag: cells[0], description: cells[1] ?? '', availability: (cells[2] ?? '').split(/,\s*/).filter(Boolean), codemod: cells[3] || null, section });
      }
      return rows;
    });
  } catch (e) { log(`Feature Flags docs page failed: ${e.message}`); }

  await page.close();
  await writeJson('docs.json', {
    source: SOURCES.v12,
    changelog: { id: 'getting-started-changelog--changelog', entries: changelog },
    featureFlags: { id: 'getting-started-feature-flags--overview', flags },
  });
  log(`Docs: ${changelog.length} changelog entries, ${flags.length} feature flags`);
}

// ---------------------------------------------------------------------------
// Per-story capture

async function capturePair(ctx, m, buildKey) {
  const result = { id: m.v12, v11Id: m.v11, title: m.title, name: m.name, component: m.component, match: m.match, buildKey, capturedAt: new Date().toISOString() };
  const prepared = {};
  for (const v of ['v11', 'v12']) {
    try {
      prepared[v] = await prepare(ctx[v], `${SOURCES[v]}/iframe.html?id=${v === 'v11' ? m.v11 : m.v12}&viewMode=story`);
    } catch (e) {
      result[v] = { error: e.message.split('\n')[0] };
      result.error = `${v}: ${result[v].error}`;
    }
  }
  // Both versions are cropped to the same rectangle (union of their content bounds) so the
  // screenshots line up pixel for pixel and a moved/grown element shows up as a diff.
  if (!Object.keys(prepared).length) return result;
  const clip = unionClip(Object.values(prepared).map((p) => p.bounds));
  const shots = {};
  for (const v of Object.keys(prepared)) {
    const { styles, warnings } = prepared[v];
    try {
      shots[v] = await ctx[v].screenshot({ clip, fullPage: true, animations: 'disabled', caret: 'hide' });
      await fs.writeFile(path.join(DATA, 'shots', v, `${m.v12}.png`), shots[v]);
    } catch (e) {
      warnings.push(`screenshot failed: ${e.message.split('\n')[0]}`);
    }
    result[v] = { clip, elementCount: styles.length, warnings, elements: styles };
  }
  if (shots.v11 && shots.v12) result.pixel = await pixelDiff(shots.v11, shots.v12, path.join(DATA, 'shots', 'diff', `${m.v12}.png`));
  return result;
}

function unionClip(boundsList) {
  const pad = 16;
  const b = boundsList.reduce((u, x) => ({
    minX: Math.min(u.minX, x.minX), minY: Math.min(u.minY, x.minY),
    maxX: Math.max(u.maxX, x.maxX), maxY: Math.max(u.maxY, x.maxY),
    docW: Math.min(u.docW, x.docW), docH: Math.min(u.docH, x.docH),
  }));
  const x = Math.max(0, Math.floor(b.minX - pad)), y = Math.max(0, Math.floor(b.minY - pad));
  return {
    x, y,
    width: Math.max(1, Math.min(b.docW, Math.ceil(b.maxX + pad)) - x),
    height: Math.max(1, Math.min(b.docH, Math.ceil(b.maxY + pad)) - y),
  };
}

async function prepare(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: RENDER_TIMEOUT * 2 });
  await page.addStyleTag({ content: FREEZE_CSS });
  // Storybook's preview signals readiness by filling #storybook-root (or showing an error panel).
  await page.waitForFunction(() => {
    const root = document.querySelector('#storybook-root');
    return document.body.classList.contains('sb-show-errordisplay') || (root && root.childElementCount > 0);
  }, null, { timeout: RENDER_TIMEOUT });
  if (await page.evaluate(() => document.body.classList.contains('sb-show-errordisplay'))) {
    const msg = await page.locator('#error-message').innerText().catch(() => 'story failed to render');
    throw new Error(`Storybook error: ${msg.trim().slice(0, 200)}`);
  }
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; })));
    document.getAnimations?.().forEach((a) => { try { a.finish(); } catch { a.cancel(); } });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  });
  await page.waitForTimeout(SETTLE_MS);
  // Park the pointer and drop focus so hover/focus state doesn't leak between runs.
  await page.mouse.move(0, 0);

  return page.evaluate(collectStyles, PROPS);
}

// Runs in the page. Keeps the keying logic in one place so both versions line up.
function collectStyles(PROPS) {
  const warnings = [];
  const cdsClasses = (el) => [...el.classList].filter((c) => c.startsWith('cds--')).sort();
  const segment = (el) => {
    const cls = cdsClasses(el);
    return el.tagName.toLowerCase() + (cls.length ? '.' + cls.join('.') : '');
  };
  // DOM path: each ancestor as tag + cds classes, with an index among same-signature siblings.
  const pathOf = (el) => {
    const parts = [];
    for (let n = el; n && n !== document.body && n.nodeType === 1; n = n.parentElement) {
      if (n.id === 'storybook-root') { parts.push('#root'); break; }
      const sig = segment(n);
      let i = 0;
      for (let s = n.previousElementSibling; s; s = s.previousElementSibling) if (segment(s) === sig) i++;
      parts.push(i ? `${sig}:${i}` : sig);
    }
    return parts.reverse().join(' > ');
  };

  const els = [...document.querySelectorAll('[class*="cds--"]')].filter((el) => cdsClasses(el).length);
  const out = [];
  const seen = new Map();
  for (const el of els) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const visible = cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0;
    const classes = cdsClasses(el);
    let key = `${classes.join('.')} @ ${pathOf(el)}`;
    const dup = seen.get(key) ?? 0;
    seen.set(key, dup + 1);
    if (dup) key += ` #${dup}`;
    const style = {};
    for (const p of PROPS) style[p] = cs.getPropertyValue(p);
    style.width = +r.width.toFixed(2) + 'px';
    style.height = +r.height.toFixed(2) + 'px';
    out.push({ key, tag: el.tagName.toLowerCase(), classes, visible, text: (el.textContent || '').trim().slice(0, 60), style });
    // Generated boxes carry a lot of Carbon's drawing (focus rings, dividers, carets, gradient borders).
    for (const pseudo of ['::before', '::after']) {
      const ps = getComputedStyle(el, pseudo);
      if (ps.content === 'none' || ps.display === 'none') continue;
      const pstyle = {};
      for (const p of PROPS) pstyle[p] = ps.getPropertyValue(p);
      pstyle.width = ps.width;
      pstyle.height = ps.height;
      out.push({ key: key + pseudo, tag: el.tagName.toLowerCase() + pseudo, classes, pseudo, visible, text: '', style: pstyle });
    }
  }

  // Content bounds: union of everything that actually paints (text, replaced elements, and boxes
  // with a background, border or shadow), so full-width layout wrappers don't pad the crop.
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const grow = (r) => {
    if (r.width < 1 || r.height < 1) return;
    minX = Math.min(minX, r.left + scrollX); minY = Math.min(minY, r.top + scrollY);
    maxX = Math.max(maxX, r.right + scrollX); maxY = Math.max(maxY, r.bottom + scrollY);
  };
  const REPLACED = new Set(['IMG', 'SVG', 'svg', 'CANVAS', 'VIDEO', 'INPUT', 'TEXTAREA', 'SELECT', 'IFRAME', 'HR']);
  const paints = (el, cs) =>
    REPLACED.has(el.tagName) ||
    (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') ||
    cs.backgroundImage !== 'none' || cs.boxShadow !== 'none' ||
    ['Top', 'Right', 'Bottom', 'Left'].some((s) => parseFloat(cs[`border${s}Width`]) > 0 && cs[`border${s}Style`] !== 'none');
  const clipped = (el) => el.closest('.cds--visually-hidden, .cds--assistive-text, [aria-hidden="true"][hidden]');
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.nodeType === 3) {
      if (!n.textContent.trim() || !n.parentElement || clipped(n.parentElement)) continue;
      const pcs = getComputedStyle(n.parentElement);
      if (pcs.visibility === 'hidden' || pcs.opacity === '0') continue;
      range.selectNodeContents(n);
      for (const r of range.getClientRects()) grow(r);
    } else {
      if (n.tagName === 'SCRIPT' || n.tagName === 'STYLE' || clipped(n)) continue;
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
      if (n === document.body || n.id === 'storybook-root' || n.id === 'root') continue;
      if (paints(n, cs)) grow(n.getBoundingClientRect());
    }
  }
  if (!isFinite(minX)) {
    warnings.push('no painted content; using viewport');
    minX = 0; minY = 0; maxX = innerWidth; maxY = innerHeight;
  }
  if (!out.length) warnings.push('no cds-- elements found');
  const bounds = {
    minX, minY, maxX, maxY,
    docW: Math.max(document.documentElement.scrollWidth, innerWidth),
    docH: Math.max(document.documentElement.scrollHeight, innerHeight),
  };
  return { styles: out, bounds, warnings };
}

async function pixelDiff(buf11, buf12, outPath) {
  const a = PNG.sync.read(buf11), b = PNG.sync.read(buf12);
  const width = Math.max(a.width, b.width), height = Math.max(a.height, b.height);
  const A = padTo(a, width, height), B = padTo(b, width, height);
  const out = new PNG({ width, height });
  const diffPixels = pixelmatch(A.data, B.data, out.data, width, height, { threshold: 0.1, includeAA: false });
  await fs.writeFile(outPath, PNG.sync.write(out));
  return {
    diffPixels,
    totalPixels: width * height,
    ratio: +(diffPixels / (width * height)).toFixed(5),
    size: { v11: [a.width, a.height], v12: [b.width, b.height] },
    sizeChanged: a.width !== b.width || a.height !== b.height,
  };
}

function padTo(png, w, h) {
  if (png.width === w && png.height === h) return png;
  const out = new PNG({ width: w, height: h });
  out.data.fill(255); // pad with opaque white
  PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0);
  return out;
}

// ---------------------------------------------------------------------------
// Summary index across all stories on disk (including ones skipped this run).

async function writeSummary(manifest) {
  const rows = [];
  for (const m of manifest.matched) {
    const s = await readJson(path.join('stories', `${m.v12}.json`));
    if (!s) continue;
    rows.push({
      id: s.id, v11Id: s.v11Id, title: s.title, name: s.name, component: s.component, match: s.match,
      capturedAt: s.capturedAt, error: s.error ?? null,
      elements: { v11: s.v11?.elementCount ?? null, v12: s.v12?.elementCount ?? null },
      pixel: s.pixel ?? null,
      shots: { v11: `shots/v11/${s.id}.png`, v12: `shots/v12/${s.id}.png`, diff: `shots/diff/${s.id}.png` },
    });
  }
  await writeJson('captures.json', { generatedAt: new Date().toISOString(), count: rows.length, stories: rows });
  const errs = rows.filter((r) => r.error).length;
  log(`captures.json: ${rows.length} stories (${errs} with errors)`);
}

// ---------------------------------------------------------------------------
// Helpers

async function pool(items, n, browser, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    const opts = { viewport: VIEWPORT, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light', locale: 'en-US', timezoneId: 'UTC' };
    const c11 = await browser.newContext(opts), c12 = await browser.newContext(opts);
    const ctx = { v11: await c11.newPage(), v12: await c12.newPage() };
    try {
      while (queue.length) await fn(ctx, queue.shift());
    } finally {
      await c11.close(); await c12.close();
    }
  }));
}

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.json();
}
async function readJson(rel) {
  const p = path.join(DATA, rel);
  if (!existsSync(p)) return null;
  try { return JSON.parse(await fs.readFile(p, 'utf8')); } catch { return null; }
}
async function writeJson(rel, obj) {
  await fs.writeFile(path.join(DATA, rel), JSON.stringify(obj, null, 1) + '\n');
}
function sha(s) { return createHash('sha256').update(s).digest('hex'); }
function log(...a) { console.log(`[capture] ${a.join(' ')}`); }

function parseArgs(argv) {
  const o = { force: false, only: null, limit: 0, concurrency: 4 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') o.force = true;
    else if (a === '--only') o.only = argv[++i];
    else if (a === '--limit') o.limit = +argv[++i];
    else if (a === '--concurrency') o.concurrency = Math.max(1, +argv[++i]);
    else { console.error(`Unknown argument: ${a}`); process.exit(1); }
  }
  return o;
}
