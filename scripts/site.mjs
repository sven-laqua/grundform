// Assembles _site/ for Cloudflare Pages: the living style guide at /, generated
// outputs under /dist/, and the guide + readme as plain files for agents.
// Run after build.mjs: `npm run site`. Pages build command: `npm run site`, output dir: `_site`.
import { cpSync, mkdirSync, rmSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const site = new URL('_site/', root);
rmSync(site, { recursive: true, force: true });
mkdirSync(site, { recursive: true });
cpSync(new URL('docs/', root), site, { recursive: true });
// docs/index.html references ../dist/ so it renders straight from a repo checkout;
// on the site the guide sits at / with dist/ beside it, so rewrite the prefix.
const guide = new URL('index.html', site);
writeFileSync(guide, readFileSync(guide, 'utf8').replaceAll('"../dist/', '"dist/'));
cpSync(new URL('dist/', root), new URL('dist/', site), { recursive: true });
for (const f of ['DESIGN.md', 'README.md', 'LICENSE']) copyFileSync(new URL(f, root), new URL(f, site));
copyFileSync(new URL('tokens/tokens.json', root), new URL('tokens.json', site));
console.log('assembled _site/');
