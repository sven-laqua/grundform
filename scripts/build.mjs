// Generates dist/ from tokens/tokens.json. No dependencies: `node scripts/build.mjs`
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const t = JSON.parse(readFileSync(new URL('../tokens/tokens.json', import.meta.url)));
mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
const out = (f, s) => writeFileSync(new URL('../dist/' + f, import.meta.url), s);
const vars = (obj, prefix = '') => Object.entries(obj).map(([k, v]) => `  --${prefix}${k}: ${v.$value};`).join('\n');

// ---- CSS custom properties (light default, dark via prefers-color-scheme or data-theme) ----
const misc = [
  `  --font: ${t.font.family.$value.map(f => f.includes(' ') ? `'${f}'` : f).join(', ')};`,
  ...Object.entries(t.space).map(([k, v]) => `  --s${k}: ${v.$value}px;`),
  ...Object.entries(t.radius).map(([k, v]) => `  --r-${k}: ${v.$value}px;`),
  ...Object.entries(t.stroke).map(([k, v]) => `  --stroke-${k}: ${v.$value}px;`),
  ...Object.entries(t.size).map(([k, v]) => `  --size-${k}: ${v.$value}px;`),
  ...['display','title','heading','body','label','caption'].map(r =>
    `  --${r}-size: ${t.font[r].size.$value}px; --${r}-weight: ${t.font[r].weight.$value}; --${r}-lh: ${t.font[r].lineHeight.$value}; --${r}-tracking: ${t.font[r].tracking.$value};`)
].join('\n');
const css = `/* Grundform tokens — generated from tokens/tokens.json. Do not edit by hand. */
:root {
${vars(t.color.core, 'core-')}
${vars(t.color.light)}
${misc}
}
:root[data-theme="dark"], .theme-dark {
${vars(t.color.dark)}
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${vars(t.color.dark)}
  }
}
.theme-light {
${vars(t.color.light)}
}
`;
out('tokens.css', css);

// ---- Tailwind preset (v3/v4 compatible shape) ----
const tw = `// Grundform Tailwind preset — generated. Usage (Tailwind v3): presets: [require('grundform/preset')]
module.exports = {
  theme: {
    extend: {
      colors: {
        ${Object.keys(t.color.light).map(k => `'${k}': 'var(--${k})'`).join(',\n        ')},
        ${Object.entries(t.color.core).map(([k, v]) => `'core-${k}': '${v.$value}'`).join(',\n        ')}
      },
      fontFamily: { sans: ${JSON.stringify(t.font.family.$value)} },
      fontSize: {
        ${['display','title','heading','body','label','caption'].map(r =>
          `${r}: ['${t.font[r].size.$value}px', { lineHeight: '${t.font[r].lineHeight.$value}', letterSpacing: '${t.font[r].tracking.$value}', fontWeight: '${t.font[r].weight.$value}' }]`).join(',\n        ')}
      },
      spacing: { ${Object.entries(t.space).map(([k, v]) => `'${k}': '${v.$value}px'`).join(', ')} },
      borderRadius: { none: '0', input: '4px', full: '999px', DEFAULT: '0' },
      borderWidth: { rule: '2px', hairline: '1px' },
      boxShadow: { none: 'none', DEFAULT: 'none' }
    }
  }
};
`;
out('grundform.preset.cjs', tw);

// ---- Tailwind v4 theme (CSS-first config): @import "grundform/tokens.css"; @import "grundform/theme.css"; ----
const roles = ['display','title','heading','body','label','caption'];
const tw4 = `/* Grundform Tailwind v4 theme — generated. Import after tokens.css. Do not edit by hand. */
@theme inline {
  --color-*: initial;
${Object.keys(t.color.light).map(k => `  --color-${k}: var(--${k});`).join('\n')}
${Object.entries(t.color.core).map(([k, v]) => `  --color-core-${k}: ${v.$value};`).join('\n')}
  --font-sans: var(--font);
${Object.entries(t.space).map(([k, v]) => `  --spacing-${k}: ${v.$value}px;`).join('\n')}
  --radius-*: initial;
  --radius-none: 0px;
  --radius-input: ${t.radius.input.$value}px;
  --radius-full: ${t.radius.full.$value}px;
  --shadow-*: initial;
  --shadow-none: none;
${roles.map(r => `  --text-${r}: ${t.font[r].size.$value}px;\n  --text-${r}--line-height: ${t.font[r].lineHeight.$value};\n  --text-${r}--letter-spacing: ${t.font[r].tracking.$value};\n  --text-${r}--font-weight: ${t.font[r].weight.$value};`).join('\n')}
}
`;
out('theme.css', tw4);

// ---- ECharts themes ----
const echarts = (mode) => {
  const c = t.color[mode];
  const v = (k) => c[k].$value;
  return {
    color: t.color.viz.categorical.$value,
    backgroundColor: 'transparent',
    textStyle: { fontFamily: t.font.family.$value.join(', '), color: v('ink') },
    title: { textStyle: { color: v('ink'), fontWeight: 600 }, subtextStyle: { color: v('ink-2') } },
    legend: { textStyle: { color: v('ink-2') }, itemWidth: 12, itemHeight: 12 },
    tooltip: { backgroundColor: v('surface'), borderColor: v('rule'), borderWidth: 2, textStyle: { color: v('ink') } },
    categoryAxis: { axisLine: { lineStyle: { color: v('rule'), width: 2 } }, axisTick: { show: false }, axisLabel: { color: v('ink-2') }, splitLine: { show: false } },
    valueAxis: { axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: v('ink-2') }, splitLine: { lineStyle: { color: v('hairline'), width: 1 } } },
    line: { lineStyle: { width: 3 }, symbol: 'circle', symbolSize: 8, smooth: false },
    bar: { barMaxWidth: 40, itemStyle: { borderRadius: 0 } },
    pie: { itemStyle: { borderColor: v('bg'), borderWidth: 2 } },
    visualMap: { color: [...t.color.viz['sequential-red'].$value].reverse() }
  };
};
out('echarts-theme.light.json', JSON.stringify(echarts('light'), null, 2));
out('echarts-theme.dark.json', JSON.stringify(echarts('dark'), null, 2));

// ---- Flat JSON for anything else (RN, Flutter, Swift/Kotlin codegen) ----
const flat = {};
const walk = (o, p = []) => { for (const [k, v] of Object.entries(o)) { if (k.startsWith('$')) continue; if (v && '$value' in v) flat[[...p, k].join('.')] = v.$value; else if (typeof v === 'object') walk(v, [...p, k]); } };
walk(t);
out('tokens.flat.json', JSON.stringify(flat, null, 2));
console.log('built dist/');
