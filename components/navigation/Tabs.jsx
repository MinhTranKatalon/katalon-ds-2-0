import React from 'react';

export function Tabs({ tabs = [], value, onChange, label, className = '', style }) {
  return (
    <div role="tablist" aria-label={label} className={className}
      style={{ display: 'flex', gap: 'var(--k-sp-5)', borderBottom: '1px solid var(--k-border-subtle)', ...style }}>
      {tabs.map((t) => {
        const on = t.value === value;
        return (
          <button key={t.value} type="button" role="tab" aria-selected={on}
            onClick={() => onChange && onChange(t.value)}
            className="kds-tab"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              minHeight: 44, padding: '0 2px', border: 0, background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--k-font-body)', fontSize: 15, fontWeight: on ? 600 : 500,
              color: on ? 'var(--k-text-primary)' : 'var(--k-text-secondary)',
              boxShadow: on ? 'inset 0 -2px 0 0 var(--k-action-600)' : 'none',
            }}>
            {t.label}
            {t.count != null ? (
              <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: 12, color: 'var(--k-text-tertiary)' }}>{t.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
