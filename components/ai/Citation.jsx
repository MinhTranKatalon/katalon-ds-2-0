import React from 'react';
import { Icon } from '../icons/Icon.jsx';

export function Citation({ index, label, href, className = '', style }) {
  return (
    <a href={href} className={className} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 8px', borderRadius: 'var(--k-radius-pill)',
      background: 'var(--k-action-50)', border: '1px solid var(--k-action-200)',
      fontFamily: 'var(--k-font-mono)', fontSize: 11.5, color: 'var(--k-action-800)',
      textDecoration: 'none', verticalAlign: 'baseline', ...style,
    }}>
      {index != null ? <span>{index}</span> : null}
      <span style={{ fontFamily: 'var(--k-font-body)', fontSize: 12.5 }}>{label}</span>
    </a>
  );
}

export function CitationSources({ sources = [], label = 'Sources', className = '', style }) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      <span className="kds-eyebrow">{label}</span>
      <ol style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: 0, padding: 0, listStyle: 'none' }}>
        {sources.map((s, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5 }}>
            <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: 11.5, color: 'var(--k-text-tertiary)' }}>{i + 1}</span>
            <a href={s.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {s.label}
              <Icon name="arrow-up-right-from-square" size={14} />
            </a>
            {s.meta ? <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: 11.5, color: 'var(--k-text-tertiary)' }}>{s.meta}</span> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
