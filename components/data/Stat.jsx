import React from 'react';

const TREND = {
  up: { glyph: '▲', ink: 'var(--k-pass-700)' },
  down: { glyph: '▼', ink: 'var(--k-fail-700)' },
  flat: { glyph: '–', ink: 'var(--k-text-tertiary)' },
};

export function Stat({ value, label, hint, trend, trendLabel, size = 'md', className = '', style }) {
  const fs = size === 'lg' ? 56 : size === 'sm' ? 30 : 40;
  const t = trend ? TREND[trend] : null;
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, ...style }}>
      <span style={{
        fontFamily: 'var(--k-font-display)', fontSize: fs, lineHeight: 1.05,
        letterSpacing: '-0.02em', fontWeight: 600, color: 'var(--k-text-primary)',
        fontVariantNumeric: 'tabular-nums',
      }}>{value}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--k-text-secondary)' }}>{label}</span>
      {(t || hint) ? (
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 6, fontFamily: 'var(--k-font-mono)', fontSize: 12.5, color: 'var(--k-text-tertiary)' }}>
          {t ? <span style={{ color: t.ink }}>{t.glyph} {trendLabel}</span> : null}
          {hint ? <span>{hint}</span> : null}
        </span>
      ) : null}
    </div>
  );
}
