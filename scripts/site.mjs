// Assembles _site/ for Cloudflare Pages: the living style guide at /, generated
// outputs under /dist/, and the guide + readme as plain files for agents.
// Run after build.mjs: `npm run site`. Pages build command: `npm run site`, output dir: `_site`.
import { cpSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const site = new URL('_site/', root);
rmSync(site, { recursive: true, force: true });
mkdirSync(site, { recursive: true });
cpSync(new URL('docs/', root), site, { recursive: true });
cpSync(new URL('dist/', root), new URL('dist/', site), { recursive: true });
for (const f of ['DESIGN.md', 'README.md', 'LICENSE']) copyFileSync(new URL(f, root), new URL(f, site));
copyFileSync(new URL('tokens/tokens.json', root), new URL('tokens.json', site));
console.log('assembled _site/');
