# Grundform

Bauhaus-derived design tokens and guide for mobile apps, with light and dark themes.

**Site:** https://grundform.pages.dev — the living style guide, with `dist/` and `DESIGN.md` served alongside.

- **Guide:** `DESIGN.md` — the rules. Point Claude Code / any agent at this file (or reference it from your app's `CLAUDE.md`).
- **Source of truth:** `tokens/tokens.json` — W3C Design Tokens (DTCG) format.
- **Generated outputs:** `dist/` — run `node scripts/build.mjs` after editing tokens. No dependencies.
  - `tokens.css` — CSS custom properties; light by default, dark via `prefers-color-scheme` or `<html data-theme="dark">`; `.theme-light` / `.theme-dark` to scope a subtree.
  - `theme.css` — Tailwind v4 `@theme` block (import after `tokens.css`).
  - `grundform.preset.cjs` — Tailwind v3 preset.
  - `echarts-theme.light.json`, `echarts-theme.dark.json` — register with `echarts.registerTheme('grundform', theme)`.
  - `tokens.flat.json` — flat key/value map for React Native, Flutter, or Swift/Kotlin codegen.
- **Living style guide:** `docs/index.html` — single-file page with theme switch and component mock-ups. Live at https://grundform.pages.dev (see Hosting).

## Use in an app

Pin to a git tag. The Pages site is the *latest* view for browsing, not a production dependency.

**Single-file HTML / PWA — vendor it.** Copy `dist/tokens.css` into the app (inline or alongside) and note the tag in a comment. Do not `<link>` cross-origin: a service worker only caches same-origin files, so a linked stylesheet would leave the app unstyled offline.
```html
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>/* grundform v0.1.0 — dist/tokens.css, vendored */ ... </style>
```
Then `background: var(--surface); border: var(--stroke-rule) solid var(--rule); color: var(--ink);`

**Vite + Tailwind v4 — install from the tag.**
```bash
npm install github:sven-laqua/grundform#v0.1.0
```
```css
@import "tailwindcss";
@import "grundform/tokens.css";
@import "grundform/theme.css";
```
→ `bg-surface text-ink border-rule border-2 rounded-none text-body`. The guide is then at `node_modules/grundform/DESIGN.md` — point your app's `CLAUDE.md` at it.

**Tailwind v3:** `presets: [require('grundform/preset')]`.

**ECharts:** `echarts.registerTheme('grundform', (await import('grundform/echarts-theme.light.json')).default)`.

**Agents:** `DESIGN.md` is the contract. A global Claude Code skill (`~/.claude/skills/grundform/`) points at it for every project.

## Hosting

Cloudflare Pages, git-integrated: build command `npm run site`, output directory `_site`. Serves the style guide at `/`, generated files under `/dist/`, and `DESIGN.md` as a plain URL.

`docs/index.html` loads `../dist/tokens.css`, so it also renders straight from a checkout; the assembler rewrites that to `dist/` for the site. Don't point GitHub Pages at `docs/` — `dist/` isn't beside it there.

## Editing
Change `tokens/tokens.json`, run `node scripts/build.mjs`, commit both. Never hand-edit `dist/`. If you change a colour, update the theme-role table in `DESIGN.md` — the guide is the contract, the tokens are the implementation.
