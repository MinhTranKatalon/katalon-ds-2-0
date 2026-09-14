import React from 'react';

const TIER = {
  1: { fill: null, ink: null },
  2: { fill: null, ink: 'var(--k-text-primary)' },
  3: { fill: 'var(--k-bg-page)', ink: 'var(--k-text-primary)' },
};

export function Card({ tier = 3, fill, ink, interactive, header, footer, className = '', style, children }) {
  const t = TIER[tier] || TIER[3];
  return (
    <div
      className={['kds-card', interactive ? 'kds-card--interactive' : '', className].filter(Boolean).join(' ')}
      style={{
        display: 'flex', flexDirection: 'column', gap: 'var(--k-sp-3)',
        background: fill || t.fill || undefined,
        color: ink || t.ink || undefined,
        ...style,
      }}
    >
      {header ? (
        <div style={{ paddingBottom: 'var(--k-sp-3)', borderBottom: '1px solid var(--k-border-subtle)' }}>{header}</div>
      ) : null}
      {children}
      {footer ? (
        <div style={{ marginTop: 'auto', paddingTop: 'var(--k-sp-3)', borderTop: '1px solid var(--k-border-subtle)' }}>{footer}</div>
      ) : null}
    </div>
  );
}
