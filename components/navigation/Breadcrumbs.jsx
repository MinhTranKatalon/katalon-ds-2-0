import React from 'react';

export function Breadcrumbs({ items = [], className = '', style }) {
  return (
    <nav aria-label="Breadcrumb" className={className} style={style}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {last || !it.href ? (
                <span aria-current={last ? 'page' : undefined}
                  style={{ fontSize: 14, color: last ? 'var(--k-text-primary)' : 'var(--k-text-secondary)', fontWeight: last ? 600 : 400 }}>
                  {it.label}
                </span>
              ) : (
                <a href={it.href} style={{ fontSize: 14 }}>{it.label}</a>
              )}
              {last ? null : <span aria-hidden="true" style={{ color: 'var(--k-text-tertiary)', fontSize: 14 }}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
