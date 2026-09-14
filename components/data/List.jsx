import React from 'react';

export function List({ items = [], divided = true, className = '', style }) {
  return (
    <ul className={className} style={{ margin: 0, padding: 0, listStyle: 'none', ...style }}>
      {items.map((it, i) => (
        <li key={it.id ?? i} className="kds-row" style={{
          display: 'flex', alignItems: 'center', gap: 'var(--k-sp-3)',
          minHeight: 56, padding: '12px 0',
          borderTop: divided && i ? '1px solid var(--k-border-subtle)' : 0,
        }}>
          {it.leading}
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: 'var(--k-text-primary)' }}>{it.title}</span>
            {it.meta ? <span style={{ display: 'block', marginTop: 2, fontSize: 13, color: 'var(--k-text-tertiary)' }}>{it.meta}</span> : null}
          </span>
          {it.trailing}
        </li>
      ))}
    </ul>
  );
}
