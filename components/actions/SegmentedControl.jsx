import React from 'react';

export function SegmentedControl({ options = [], value, onChange, label, size = 'md', className = '', style }) {
  const h = size === 'sm' ? 36 : 44;
  return (
    <div
      role="tablist"
      aria-label={label}
      className={className}
      style={{
        display: 'inline-flex', padding: 3, gap: 2,
        background: 'var(--k-gray-100)',
        border: '1px solid var(--k-border-subtle)',
        borderRadius: 'var(--k-radius-pill)',
        ...style,
      }}
    >
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange && onChange(o.value)}
            style={{
              height: h - 6, padding: '0 18px', border: 0, cursor: 'pointer',
              borderRadius: 'var(--k-radius-pill)',
              fontFamily: 'var(--k-font-body)', fontSize: 14, fontWeight: 600,
              background: on ? 'var(--k-gray-0)' : 'transparent',
              color: on ? 'var(--k-text-primary)' : 'var(--k-text-secondary)',
              transition: 'background-color var(--k-dur-fast) var(--k-ease-std)',
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
