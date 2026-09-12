// Grundform Tailwind preset — generated. Usage (Tailwind v3): presets: [require('grundform/preset')]
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg': 'var(--bg)',
        'surface': 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        'ink': 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'rule': 'var(--rule)',
        'hairline': 'var(--hairline)',
        'primary': 'var(--primary)',
        'on-primary': 'var(--on-primary)',
        'accent': 'var(--accent)',
        'on-accent': 'var(--on-accent)',
        'warn': 'var(--warn)',
        'on-warn': 'var(--on-warn)',
        'success': 'var(--success)',
        'on-success': 'var(--on-success)',
        'danger': 'var(--danger)',
        'on-danger': 'var(--on-danger)',
        'focus': 'var(--focus)',
        'core-red': '#D8262C',
        'core-red-deep': '#8E1421',
        'core-blue': '#1E5AA8',
        'core-blue-deep': '#123C74',
        'core-yellow': '#F2B20A',
        'core-yellow-deep': '#B77F00',
        'core-black': '#000000',
        'core-paper': '#F3EFE7',
        'core-orange': '#F04E23',
        'core-cyan': '#1FB6E0',
        'core-green': '#2E7D4F'
      },
      fontFamily: { sans: ["Jost","Futura","Century Gothic","Avenir","Helvetica Neue","sans-serif"] },
      fontSize: {
        display: ['40px', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        title: ['28px', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        heading: ['22px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        body: ['17px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        label: ['15px', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '500' }],
        caption: ['13px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }]
      },
      spacing: { '1': '4px', '2': '8px', '3': '12px', '4': '16px', '5': '24px', '6': '32px', '7': '48px', '8': '64px' },
      borderRadius: { none: '0', input: '4px', full: '999px', DEFAULT: '0' },
      borderWidth: { rule: '2px', hairline: '1px' },
      boxShadow: { none: 'none', DEFAULT: 'none' }
    }
  }
};
