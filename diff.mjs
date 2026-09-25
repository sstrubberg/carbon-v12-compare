#!/usr/bin/env node
// Turn the raw captures in data/ into a per-component changelog.
//
//   node diff.mjs
//
// Reads  data/manifest.json, data/stories/*.json, data/docs.json, data/tokens.json
// Writes data/changelog.json  (structured, for the site)
//        data/CHANGELOG.md    (human-readable)

import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DATA = path.resolve(import.meta.dirname, 'data');
const SIZE_TOLERANCE = 1; // px; smaller width/height moves are sub-pixel layout noise
const PIXEL_CHANGED = 0.001; // a story counts as visually changed above 0.1% differing pixels

const manifest = await readJson('manifest.json');
if (!manifest) fail('data/manifest.json not found. Run `node capture.mjs` first.');
const docs = (await readJson('docs.json')) ?? { changelog: { entries: [] }, featureFlags: { flags: [] } };
const tokens = await readJson('tokens.json');

const components = new Map(); // name → accumulator
const comp = (name, section) => {
  if (!components.has(name)) {
    components.set(name, {
      name, section, status: null,
      stories: [], storiesAdded: [], storiesRemoved: [], storiesMoved: [],
      style: new Map(), structure: new Map(), flags: [], notes: [],
    });
  }
  return components.get(name);
};

// ---------------------------------------------------------------------------
// 0. Who owns each class. A change is "direct" when it lands on an element that belongs to the
// component being compared, and "inherited" when it belongs to another component nested inside
// (e.g. a Button in a Modal footer). Ownership is learned from the stories: the outermost
// cds-- element of a component's own stories is that component's (Button's stories are built
// around cds--btn, so cds--btn → Button). OWNER_OVERRIDES covers families the vote gets wrong.

const OWNER_OVERRIDES = {
  btn: 'Button',
  'actionable-notification': 'Notifications', 'inline-notification': 'Notifications', 'toast-notification': 'Notifications',
  label: 'FormLabel', 'form-requirement': 'FormLabel', 'list-box': 'Dropdown', 'icon-tooltip': 'IconButton',
};
// Layout and utility classes that don't say which component an element belongs to.
const GENERIC = new Set(['layout', 'form-item', 'css-grid', 'grid', 'row', 'col', 'visually-hidden', 'assistive-text',
  'skeleton', 'autoalign', 'layer', 'layer-one', 'layer-two', 'layer-three', 'layer-four', 'subgrid', 'stack', 'fieldset', 'form']);

function familiesOf(classes) {
  const out = [];
  for (const cls of classes) {
    if (!cls.startsWith('cds--') || /^cds--[a-z0-9-]*?[a-z0-9]--/.test(cls)) continue; // skip modifiers
    const fam = cls.slice(5).split('__')[0].replace(/-(wrapper|container|content|trigger)$/, '');
    if (!GENERIC.has(fam) && !out.includes(fam)) out.push(fam);
  }
  return out;
}

const votes = new Map(); // family → Map(component → stories where it's the outermost cds element)
for (const m of manifest.matched) {
  const s = await readJson(path.join('stories', `${m.v12}.json`));
  if (!s?.v12?.elements) continue;
  const roots = new Set();
  for (const el of s.v12.elements) {
    if (el.pseudo || !familiesOf(el.classes).length) continue;
    const ancestors = parse(el).segs.slice(0, -1);
    if (ancestors.some((seg) => familiesOf([...seg.cls]).length)) continue;
    familiesOf(el.classes).forEach((f) => roots.add(f));
  }
  for (const f of roots) {
    if (!votes.has(f)) votes.set(f, new Map());
    votes.get(f).set(m.component, (votes.get(f).get(m.component) ?? 0) + 1);
  }
}
// Owner of each family, in priority order:
//   1. a component whose name is the family (cds--text-input → TextInput, cds--combo-box → ComboBox)
//   2. OWNER_OVERRIDES
//   3. the component whose own stories most often (as a share of its stories) start with it.
//      Umbrella groups that only assemble other components can't win the vote.
const squash = (x) => x.toLowerCase().replace(/^preview_+/, '').replace(/[^a-z]/g, '');
const UMBRELLAS = new Set(['Fluid Components', 'Form', 'FormGroup']);
const storyCount = new Map();
for (const m of manifest.matched) storyCount.set(m.component, (storyCount.get(m.component) ?? 0) + 1);
const byName = new Map();
for (const m of manifest.matched) if (!m.component.startsWith('preview')) byName.set(squash(m.component), m.component);
const OWNER = new Map();
for (const fam of votes.keys()) if (byName.has(squash(fam))) OWNER.set(fam, byName.get(squash(fam)));
for (const [fam, comp] of Object.entries(OWNER_OVERRIDES)) OWNER.set(fam, comp);
const ownerByName = (fam) => byName.get(squash(fam));
for (const [fam, byComp] of votes) {
  if (OWNER.has(fam)) continue;
  const ranked = [...byComp].filter(([c]) => !UMBRELLAS.has(c))
    .map(([c, n]) => [c, n / storyCount.get(c)])
    .sort((a, b) => b[1] - a[1]);
  if (ranked.length) OWNER.set(fam, ranked[0][0]);
}

// Owners of an element: its own classes' owners, or failing that the nearest ancestor's.
function ownersOf(el) {
  const own = familiesOf(el.classes).map((f) => OWNER.get(f) ?? ownerByName(f)).filter(Boolean);
  if (own.length) return [...new Set(own)];
  const segs = parse(el).segs.slice(0, -1).reverse();
  for (const seg of segs) {
    const o = familiesOf([...seg.cls]).map((f) => OWNER.get(f) ?? ownerByName(f)).filter(Boolean);
    if (o.length) return [...new Set(o)];
  }
  return []; // unknown: treated as the component's own
}

// ---------------------------------------------------------------------------
// 1. Per-story element diff

let storyFiles = 0;
for (const m of manifest.matched) {
  const s = await readJson(path.join('stories', `${m.v12}.json`));
  const c = comp(m.component, sectionOf(m.title));
  if (m.match === 'flag-graduated') c.storiesMoved.push({ v11: m.v11, v12: m.v12, name: m.name });
  if (!s) { c.stories.push({ id: m.v12, name: m.name, captured: false }); continue; }
  storyFiles++;
  // clip = where the story's content sits in the 1280×800 capture; the site uses it to center live stories.
  const row = { id: s.id, v11Id: s.v11Id, name: s.name, title: s.title, captured: true, error: s.error ?? null, pixel: s.pixel ?? null, clip: s.v12?.clip ?? s.v11?.clip ?? null, changes: 0 };
  c.stories.push(row);
  if (s.error || !s.v11?.elements || !s.v12?.elements) continue;

  const { pairs, added, removed } = align(s.v11.elements, s.v12.elements);
  for (const [a, b] of pairs) {
    if (!a.visible && !b.visible) continue;
    const painted = paints(a.style) || paints(b.style);
    for (const d of compareStyles(a.style, b.style)) {
      // A size change on a box that draws nothing (layout wrappers, auto-align popover shells)
      // isn't visible on its own; whatever it affects shows up on the painted elements inside.
      if ((d.prop === 'width' || d.prop === 'height') && !painted) continue;
      row.changes++;
      const label = block(b.classes) + (b.pseudo ?? '');
      const owners = ownersOf(b);
      addTo(c.style, `${label}|${d.prop}|${d.from}|${d.to}`, () => ({ element: label, prop: d.prop, from: d.from, to: d.to, variants: new Set(), stories: new Set(), count: 0, direct: false, sources: new Set() }), (e) => {
        if (!owners.length || owners.includes(m.component)) e.direct = true;
        else owners.forEach((o) => e.sources.add(o));
        e.variants.add(b.classes.join(' '));
        e.stories.add(s.id);
        e.count++;
      });
    }
  }
  for (const [kind, list] of [['added', added], ['removed', removed]]) {
    for (const el of list) {
      // Screen-reader-only text is invisible by design; its DOM moves aren't a visual change.
      if (!el.visible || el.classes.some((x) => x === 'cds--visually-hidden' || x === 'cds--assistive-text')) continue;
      row.changes++;
      const cls = el.classes.join(' ');
      const owners = ownersOf(el);
      addTo(c.structure, `${kind}|${cls}`, () => ({ kind, element: cls, stories: new Set(), count: 0, direct: false, sources: new Set() }), (e) => {
        if (!owners.length || owners.includes(m.component)) e.direct = true;
        else owners.forEach((o) => e.sources.add(o));
        e.stories.add(s.id); e.count++;
      });
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Story- and component-level presence

for (const st of manifest.onlyV12.stories) comp(componentOf(st.title), sectionOf(st.title)).storiesAdded.push(st);
for (const st of manifest.onlyV11.stories) comp(componentOf(st.title), sectionOf(st.title)).storiesRemoved.push(st);

const lower = (list) => new Set(list.map((t) => componentOf(t).toLowerCase()));
const matchedComps = new Set(manifest.matched.map((m) => m.component.toLowerCase()));
const newComps = lower(manifest.onlyV12.titles);
const goneComps = lower(manifest.onlyV11.titles);

// ---------------------------------------------------------------------------
// 3. Docs: feature flags and dated changelog notes, attached to the components they name

const names = [...components.keys()];
const mentions = (text) => names.filter((n) => n.length > 3 && new RegExp(`\\b${escapeRe(n)}\\b`, 'i').test(text));
for (const f of docs.featureFlags.flags) {
  const slug = f.flag.replace(/^enable-(v\d+-)?/, '').replace(/-/g, '').toLowerCase();
  const hits = new Set([...names.filter((n) => slug.includes(n.toLowerCase().replace(/\s/g, ''))), ...mentions(f.description)]);
  // Components whose V11 "Feature Flag" stories carried this behavior (e.g. floating styles).
  if (/floating/.test(f.flag)) for (const m of manifest.matched) if (/float/.test(m.v11)) hits.add(m.component);
  for (const n of hits) components.get(n).flags.push(f);
}
for (const e of docs.changelog.entries) {
  for (const n of mentions(e.text)) components.get(n).notes.push({ date: e.date, text: e.text.split('\n')[0] });
}

// ---------------------------------------------------------------------------
// 4. Assemble output

// A change counts as inherited unless the source component's own stories contradict it: the
// same property on the same kind of element ending at a different value there. Toggletip's popover
// ends at 4px while Popover's own ends at 8px, so Toggletip is overriding it (direct). Tabs' tooltip
// ends at 4px and Tooltip's own stories never show that element, so it stays inherited.
// End values only: the starting value can differ just because of the background layer
// (a Modal's inputs start white, a page's start gray) while the change itself is the same.
const seen = new Map(); // component → Map(family|prop → Set(end values))
const note = (comp, fam, prop, to) => {
  if (!seen.has(comp)) seen.set(comp, new Map());
  const m = seen.get(comp), k = `${fam}|${prop}`;
  if (!m.has(k)) m.set(k, new Set());
  m.get(k).add(to);
};
for (const c of components.values()) {
  for (const e of c.style.values()) if (e.direct) for (const f of familiesOf(e.element.split('.'))) note(c.name, f, e.prop, e.to);
  for (const e of c.structure.values()) if (e.direct) for (const f of familiesOf(e.element.split(' '))) note(c.name, f, e.kind, '');
}
for (const c of components.values()) {
  const settle = (e, fams, prop, to) => {
    if (e.direct) return;
    const matching = [], silent = [];
    for (const src of e.sources) {
      const ends = fams.map((f) => seen.get(src)?.get(`${f}|${prop}`)).filter(Boolean);
      if (!ends.length) silent.push(src);
      else if (ends.some((set) => set.has(to))) matching.push(src);
    }
    if (matching.length) e.sources = new Set(matching);
    else if (silent.length) e.sources = new Set(silent);
    else e.direct = true;
  };
  for (const e of c.style.values()) settle(e, familiesOf(e.element.split('.')), e.prop, e.to);
  for (const e of c.structure.values()) settle(e, familiesOf(e.element.split(' ')), e.kind, '');
}

const out = [];
for (const c of components.values()) {
  const key = c.name.toLowerCase();
  const pixels = c.stories.filter((s) => s.pixel).map((s) => s.pixel.ratio);
  const changes = [];

  for (const e of c.style.values()) {
    changes.push({
      type: e.prop === 'width' || e.prop === 'height' ? 'Layout' : 'Visual',
      element: `.${e.element}`,
      variants: [...e.variants].sort(),
      prop: e.prop, from: e.from, to: e.to,
      note: annotate(e.prop, e.from, e.to),
      stories: [...e.stories].sort(),
      elements: e.count,
      ...origin(e),
    });
  }
  for (const e of c.structure.values()) {
    changes.push({
      type: 'Structure',
      element: `.${e.element.split(' ').join('.')}`,
      prop: e.kind === 'added' ? 'element added' : 'element removed',
      from: e.kind === 'added' ? '—' : 'present', to: e.kind === 'added' ? 'present' : '—',
      stories: [...e.stories].sort(), elements: e.count,
      ...origin(e),
    });
  }
  // Pixels moved but no recorded property explains it (e.g. margin/position shifts): say so
  // rather than letting the component read as unchanged.
  for (const st of c.stories) {
    if (st.pixel && st.pixel.ratio > PIXEL_CHANGED && st.changes === 0) {
      changes.push({ type: 'Visual', prop: 'unexplained pixel change', element: null, from: '—', to: `${(st.pixel.ratio * 100).toFixed(1)}% of pixels`,
        note: 'no recorded style property differs; likely position or content', stories: [st.id] });
    }
  }
  for (const st of c.storiesAdded) changes.push({ type: 'Story', prop: 'story added', element: null, from: '—', to: st.name, stories: [st.id] });
  for (const st of c.storiesRemoved) changes.push({ type: 'Story', prop: 'story removed', element: null, from: st.name, to: '—', stories: [st.id] });
  for (const st of c.storiesMoved) changes.push({ type: 'Story', prop: 'story graduated from Feature Flag', element: null, from: st.v11, to: st.v12, stories: [st.v12] });
  for (const f of c.flags) changes.push({ type: 'Flag', prop: f.flag, element: null, from: f.section === 'deprecated' ? 'deprecated' : 'off in V11', to: /^enable-v12-/.test(f.flag) ? 'on by default in V12' : 'opt-in', note: f.description, stories: [] });

  const rank = { Visual: 0, Layout: 1, Structure: 2, Story: 3, Flag: 4 };
  changes.sort((a, b) => rank[a.type] - rank[b.type] || (b.stories.length - a.stories.length) || a.prop.localeCompare(b.prop));
  for (const ch of changes) ch.text = describe(c.name, ch);

  const status =
    newComps.has(key) && !matchedComps.has(key) ? 'new' :
    goneComps.has(key) && !matchedComps.has(key) ? 'removed' :
    !c.stories.some((s) => s.captured) ? 'not-captured' :
    changes.some((ch) => (ch.type === 'Visual' || ch.type === 'Structure') && !ch.inherited) ? 'changed' :
    changes.some((ch) => ch.inherited) ? 'inherited' :
    pixels.some((r) => r > PIXEL_CHANGED) ? 'changed' :
    'unchanged';
  const inheritsFrom = [...new Set(changes.filter((ch) => ch.inherited).flatMap((ch) => ch.sources))].sort();

  out.push({
    id: slugify(c.name), name: c.name, section: c.section, status, inheritsFrom,
    pixel: pixels.length ? {
      max: Math.max(...pixels), mean: +(pixels.reduce((a, b) => a + b, 0) / pixels.length).toFixed(5),
      storiesChanged: pixels.filter((r) => r > PIXEL_CHANGED).length, storiesCompared: pixels.length,
    } : null,
    stories: c.stories.sort((a, b) => (b.pixel?.ratio ?? 0) - (a.pixel?.ratio ?? 0)),
    notes: c.notes,
    changes,
  });
}
out.sort((a, b) => a.section.localeCompare(b.section) || a.name.localeCompare(b.name));

const counts = out.reduce((m, c) => ((m[c.status] = (m[c.status] ?? 0) + 1), m), {});
await writeJson('changelog.json', {
  generatedAt: new Date().toISOString(),
  counts: { components: out.length, ...counts, storiesCompared: storyFiles, changes: out.reduce((n, c) => n + c.changes.length, 0) },
  tokens: tokens ? { added: tokens.added, removed: tokens.removed, changed: tokens.changed } : null,
  releaseNotes: docs.changelog.entries,
  featureFlags: docs.featureFlags.flags,
  components: out,
});
await fs.writeFile(path.join(DATA, 'CHANGELOG.md'), markdown(out, counts));
console.log(`[diff] ${out.length} components (${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(', ')}) from ${storyFiles} captured stories`);
console.log('[diff] Wrote data/changelog.json and data/CHANGELOG.md');

// ---------------------------------------------------------------------------
// Element alignment. Pass 1: identical key (cds classes + DOM path). Pass 2: for what's left,
// pair elements with the same tag and depth whose own classes and ancestor classes overlap most,
// so a node still lines up when V12 adds a modifier or wrapper class (e.g. cds--autoalign).

function align(e11, e12) {
  const pairs = [];
  const left = new Map(e11.map((e) => [e.key, e]));
  const right = [];
  for (const b of e12) {
    const a = left.get(b.key);
    if (a) { pairs.push([a, b]); left.delete(b.key); } else right.push(b);
  }
  const A = [...left.values()].map(parse), B = right.map(parse);
  const candidates = [];
  for (const b of B) {
    for (const a of A) {
      if (a.tag !== b.tag || a.segs.length !== b.segs.length) continue;
      const self = jaccard(a.self, b.self);
      if (self < 0.5 && !(a.block && a.block === b.block)) continue;
      let anc = 0;
      for (let i = 0; i < a.segs.length - 1; i++) anc += jaccard(a.segs[i].cls, b.segs[i].cls) * (a.segs[i].tag === b.segs[i].tag) - (a.segs[i].idx !== b.segs[i].idx) * 0.5;
      const idx = a.segs.at(-1).idx === b.segs.at(-1).idx ? 0.5 : 0;
      candidates.push({ a, b, score: self * 2 + anc / Math.max(1, a.segs.length - 1) + idx });
    }
  }
  candidates.sort((x, y) => y.score - x.score);
  const usedA = new Set(), usedB = new Set();
  for (const { a, b } of candidates) {
    if (usedA.has(a) || usedB.has(b)) continue;
    usedA.add(a); usedB.add(b);
    pairs.push([a.el, b.el]);
  }
  return {
    pairs,
    added: B.filter((b) => !usedB.has(b)).map((b) => b.el),
    removed: A.filter((a) => !usedA.has(a)).map((a) => a.el),
  };
}

function parse(el) {
  const path = el.key.slice(el.key.indexOf(' @ ') + 3).replace(/::(before|after)$/, '').replace(/ #\d+$/, '');
  const segs = path.split(' > ').map((seg) => {
    const [body, idx = '0'] = seg.split(':');
    const [tag, ...cls] = body.split('.');
    return { tag, cls: new Set(cls), idx: +idx };
  });
  const self = new Set(el.classes);
  return { el, tag: el.tag, segs, self, block: block(el.classes) + (el.pseudo ?? '') };
}

function jaccard(a, b) {
  if (!a.size && !b.size) return 1;
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return n / (a.size + b.size - n);
}

// Compare two computed-style maps, folding per-side properties into shorthands where possible.
function compareStyles(a, b) {
  const diffs = [];
  const sides = ['top', 'right', 'bottom', 'left'];
  const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
  const seen = new Set();
  const group = (name, props) => {
    props.forEach((p) => seen.add(p));
    const va = props.map((p) => norm(a[p])), vb = props.map((p) => norm(b[p]));
    if (va.join() === vb.join()) return;
    diffs.push({ prop: name, from: shorthand(va), to: shorthand(vb) });
  };
  group('border-radius', corners.map((c) => `border-${c}-radius`));
  group('padding', sides.map((s) => `padding-${s}`));
  group('margin', sides.map((s) => `margin-${s}`));
  group('gap', ['row-gap', 'column-gap']);

  const border = (st, s) => st[`border-${s}-style`] === 'none' || parseFloat(st[`border-${s}-width`]) === 0
    ? 'none' : `${st[`border-${s}-width`]} ${st[`border-${s}-style`]} ${norm(st[`border-${s}-color`])}`;
  const ba = sides.map((s) => border(a, s)), bb = sides.map((s) => border(b, s));
  sides.forEach((s) => ['width', 'style', 'color'].forEach((k) => seen.add(`border-${s}-${k}`)));
  if (ba.join() !== bb.join()) {
    const changed = sides.filter((_, i) => ba[i] !== bb[i]);
    if (changed.length === 4 && new Set(ba).size === 1 && new Set(bb).size === 1) diffs.push({ prop: 'border', from: ba[0], to: bb[0] });
    else {
      // Group sides that changed the same way: "border-top/right/left none → 1px solid transparent"
      const groups = new Map();
      for (const s of changed) {
        const i = sides.indexOf(s), k = `${ba[i]}|${bb[i]}`;
        if (!groups.has(k)) groups.set(k, { sides: [], from: ba[i], to: bb[i] });
        groups.get(k).sides.push(s);
      }
      for (const g of groups.values()) diffs.push({ prop: `border-${g.sides.join('/')}`, from: g.from, to: g.to });
    }
  }

  const outline = (st) => st['outline-style'] === 'none' || parseFloat(st['outline-width']) === 0
    ? 'none' : `${st['outline-width']} ${st['outline-style']} ${norm(st['outline-color'])}`;
  ['outline-width', 'outline-style', 'outline-color'].forEach((p) => seen.add(p));
  if (outline(a) !== outline(b)) diffs.push({ prop: 'outline', from: outline(a), to: outline(b) });

  for (const p of ['width', 'height']) {
    seen.add(p);
    if (Math.abs(parseFloat(a[p]) - parseFloat(b[p])) >= SIZE_TOLERANCE) diffs.push({ prop: p, from: a[p], to: b[p] });
  }
  for (const p of Object.keys(b)) {
    if (seen.has(p)) continue;
    if (norm(a[p]) !== norm(b[p])) diffs.push({ prop: p, from: norm(a[p]) || '—', to: norm(b[p]) || '—' });
  }
  return diffs;
}

// A change is inherited only if no occurrence of it landed on the component's own elements.
function origin(e) {
  return e.direct ? { inherited: false } : { inherited: true, sources: [...e.sources].sort() };
}

function paints(st) {
  const bg = norm(st['background-color']);
  return (bg && bg !== 'transparent') || (st['background-image'] ?? 'none') !== 'none' || st['box-shadow'] !== 'none' ||
    ['top', 'right', 'bottom', 'left'].some((x) => parseFloat(st[`border-${x}-width`]) > 0 && st[`border-${x}-style`] !== 'none');
}

// "0px 0px 0px 0px" → "0px"; "4px 8px 4px 8px" → "4px 8px"
function shorthand([t, r, b, l]) {
  if (t === r && r === b && b === l) return t;
  if (t === b && r === l) return `${t} ${r}`;
  if (r === l) return `${t} ${r} ${b}`;
  return `${t} ${r} ${b} ${l}`;
}

function norm(v) {
  if (v == null) return '';
  return String(v).replace(/rgba?\(([^)]+)\)/g, (_, inner) => {
    const [r, g, b, a = '1'] = inner.split(/[,\s/]+/).filter(Boolean).map(Number);
    const hex = '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('');
    return +a === 1 ? hex : +a === 0 ? 'transparent' : `${hex} / ${Math.round(a * 100)}%`;
  });
}

function annotate(prop, from, to) {
  if (prop === 'border-radius') {
    const px = parseFloat(to);
    if (px >= 9999) return 'pill';
    if (parseFloat(from) >= 9999) return 'no longer pill';
  }
  if (prop === 'background-image' && /gradient/.test(to) && !/gradient/.test(from)) return 'now drawn with gradients';
  if (prop === 'width' || prop === 'height') {
    const d = parseFloat(to) - parseFloat(from);
    return `${d > 0 ? '+' : ''}${+d.toFixed(2)}px`;
  }
  return null;
}

function describe(name, ch) {
  const where = ch.element ? ` ${ch.element}` : '';
  const note = ch.note && ch.type !== 'Flag' ? ` (${ch.note})` : '';
  if (ch.type === 'Story') return `${name} · ${ch.prop}: ${ch.to !== '—' ? ch.to : ch.from}`;
  if (ch.type === 'Flag') return `${name} · feature flag ${ch.prop}: ${ch.from} → ${ch.to}`;
  if (ch.prop === 'unexplained pixel change') return `${name} · ${ch.to} differ in "${ch.stories[0].split('--')[1]}" with no style change recorded (likely position or content)`;
  const via = ch.inherited ? ` (inherited from ${ch.sources.join(', ')})` : '';
  if (ch.type === 'Structure') return `${name} ·${where} ${ch.prop}${via}`;
  return `${name} ·${where} · ${ch.prop} ${ch.from} → ${ch.to}${note}${via}`;
}

function markdown(list, counts) {
  const L = [];
  L.push('# Carbon React V11 → V12 changelog', '');
  L.push(`Generated ${new Date().toISOString()} from the live V11 and V12 Storybooks. Values are computed styles.`, '');
  L.push(`Components: ${Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(' · ')}`, '');
  if (tokens) {
    L.push('## Tokens', '');
    for (const t of tokens.added) L.push(`- added \`${t.token}\`: ${t.v12}`);
    for (const t of tokens.changed) L.push(`- changed \`${t.token}\`: ${t.v11} → ${t.v12}`);
    for (const t of tokens.removed) L.push(`- removed \`${t.token}\` (was ${t.v11})`);
    L.push('');
  }
  if (docs.changelog.entries.length) {
    L.push('## Release notes (V12 Storybook: Getting Started/Changelog)', '');
    for (const e of docs.changelog.entries) L.push(`- **${e.date}**: ${e.text.split('\n')[0]}`);
    L.push('');
  }
  for (const status of ['changed', 'inherited', 'new', 'removed', 'unchanged', 'not-captured']) {
    const group = list.filter((c) => c.status === status);
    if (!group.length) continue;
    L.push(`## ${status[0].toUpperCase() + status.slice(1)} (${group.length})`, '');
    for (const c of group) {
      const px = c.pixel ? ` · max ${(c.pixel.max * 100).toFixed(1)}% pixels, ${c.pixel.storiesChanged}/${c.pixel.storiesCompared} stories differ` : '';
      L.push(`### ${c.name}`, '', `_${c.section}${px}_`, '');
      for (const n of c.notes) L.push(`> ${n.date}: ${n.text}`, '');
      for (const ch of c.changes) {
        const scope = ch.stories.length > 1 ? ` _(${ch.stories.length} stories)_` : '';
        L.push(`- **${ch.type}** ${ch.text}${scope}`);
      }
      L.push('');
    }
  }
  return L.join('\n');
}

// ---------------------------------------------------------------------------

function block(classes) {
  // Collapse modifier classes onto their block: [cds--btn, cds--btn--primary] → "cds--btn"
  const blocks = classes.filter((c) => !/^cds--[a-z0-9-]*?[a-z0-9]--/.test(c));
  return (blocks.length ? blocks : classes).join('.');
}
function componentOf(title) {
  const parts = title.split('/');
  return (parts.length > 1 ? parts[1] : parts[0]).trim();
}
function sectionOf(title) {
  const s = title.split('/')[0].trim();
  return s[0].toUpperCase() + s.slice(1);
}
function addTo(map, key, make, update) {
  if (!map.has(key)) map.set(key, make());
  update(map.get(key));
}
function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
async function readJson(rel) {
  const p = path.join(DATA, rel);
  if (!existsSync(p)) return null;
  return JSON.parse(await fs.readFile(p, 'utf8'));
}
async function writeJson(rel, obj) { await fs.writeFile(path.join(DATA, rel), JSON.stringify(obj, null, 1) + '\n'); }
function fail(msg) { console.error(`[diff] ${msg}`); process.exit(1); }
