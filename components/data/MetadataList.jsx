import React from 'react';

export function MetadataList({ items = [], columns = 1, className = '', style }) {
  return (
    <dl className={className} style={{
      display: 'grid', gridTemplateColumns: 'repeat(' + columns + ', minmax(0, 1fr))',
      gap: 'var(--k-sp-4) var(--k-sp-6)', margin: 0, ...style,
    }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <dt style={{
            fontFamily: 'var(--k-font-mono)', fontSize: 11.5, letterSpacing: '.08em',
            textTransform: 'uppercase', color: 'var(--k-text-tertiary)',
          }}>{it.label}</dt>
          <dd style={{
            margin: 0, fontSize: 14.5, color: 'var(--k-text-body)',
            fontFamily: it.mono ? 'var(--k-font-mono)' : undefined,
            overflowWrap: 'anywhere',
          }}>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
