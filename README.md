# Carbon V12 before & after: data pipeline

Captures every Carbon React story that exists in both the V11 and V12 Storybooks and turns the differences into a per-component changelog.

```bash
npm install && npx playwright install chromium
npm run capture     # screenshots + computed styles + pixel diff → data/
npm run diff        # data/ → data/changelog.json + data/CHANGELOG.md
npm run serve       # site at http://localhost:4321
```

The site (`index.html`) is static and reads `data/changelog.json`, `data/meta.json` and the screenshots in `data/shots/`.

## Scheduled refresh

`.github/workflows/refresh.yml` runs every other Thursday at 23:30 UTC (7:30pm EDT, 6:30pm EST). It recaptures both Storybooks, rebuilds the changelog, commits the refreshed `data/*.json` and `data/CHANGELOG.md`, and deploys the site to GitHub Pages. It also runs on any push to `main` that changes `index.html`, `capture.mjs` or `diff.mjs`, so site changes go live on push. Start a run by hand from the repo's Actions tab with **Run workflow**.

Screenshots (`data/shots/`) and raw styles (`data/stories/`) aren't committed. The workflow keeps them in the Actions cache between runs, so stories whose Storybook builds haven't changed are skipped. On a fresh clone, run `npm run capture` before `npm run diff` or `npm run serve`.

`capture.mjs` is incremental. It fingerprints each Storybook build (the `index.json` hash plus the hashed `iframe-*.css` name) and skips stories already captured against the same pair of builds. Use `--force` to redo everything, `--only <substring>` to limit by story id, and `--concurrency N` (default 4).

## What gets captured

- **Matching:** stories are paired by id. V11 `…-feature-flag--x` stories that graduated to `…--x` in V12 (for example, the floating-styles stories) are paired too and marked `flag-graduated`.
- **Screenshots:** 1280×800 viewport, DPR 1, reduced motion, animations and transitions frozen, fonts and images loaded. Both versions are cropped to the same rectangle (the union of their painted content), so the pixel diff lines up.
- **Styles:** every element with a `cds--` class, including portals outside `#storybook-root`, is keyed by `sorted cds classes @ DOM path`.
- **Pixel diff:** pixelmatch, threshold 0.1, anti-aliasing ignored. The diff image goes to `data/shots/diff/`.
- **Docs:** the V12 *Getting Started/Changelog* and *Feature Flags* pages are parsed into `data/docs.json`.
- **Tokens:** `--cds-*` custom properties that differ between the two `iframe-*.css` bundles.

## How the diff aligns elements

Elements are paired by exact key first. Whatever is left is paired by tag, depth, and class overlap along the ancestor path, so a node still lines up when V12 adds a wrapper or modifier class (for example, `cds--autoalign` on tooltips). Per-side properties are folded into shorthands, and colors are normalized to hex. Size changes under 1px, and size changes on elements that paint nothing, are dropped.

## Direct vs inherited changes

Each change is labeled by where it lives. A change is **direct** when it lands on the component's own elements. It's **inherited** when it lands on another component nested inside, such as a Button in a Modal footer. A component whose only changes are inherited gets the status `inherited` ("Inherits changes" on the site) instead of `changed`.

Ownership of each `cds--` class is learned from the stories:
1. A class whose name matches a component belongs to it (`cds--text-input` → TextInput).
2. Otherwise it belongs to the component whose own stories most often start with that class, as a share of its stories. Umbrella groups (Fluid Components, Form, FormGroup) can't claim a class.

`OWNER_OVERRIDES` in `diff.mjs` fixes the few families this gets wrong. A change stays inherited unless the source component's own stories contradict it (the same property ending at a different value), which means the component is overriding it.

