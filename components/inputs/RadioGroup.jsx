import React from 'react';

export function RadioGroup({ name, options = [], value, onChange, label, className = '', style }) {
  return (
    <div role="radiogroup" aria-label={label} className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--k-sp-1)', ...style }}>
      {options.map((o) => (
        <label key={o.value} style={{
          display: 'flex', gap: 'var(--k-sp-3)', alignItems: 'flex-start',
          minHeight: 44, padding: '10px 0', cursor: 'pointer',
        }}>
          <input
            type="radio" name={name} value={o.value} checked={o.value === value}
            onChange={() => onChange && onChange(o.value)}
            style={{ width: 20, height: 20, marginTop: 1, accentColor: 'var(--k-primary)', flex: 'none' }}
          />
          <span>
            <span style={{ fontSize: 15, color: 'var(--k-text-body)' }}>{o.label}</span>
            {o.hint ? <span style={{ display: 'block', fontSize: 13, color: 'var(--k-text-tertiary)', marginTop: 2 }}>{o.hint}</span> : null}
          </span>
        </label>
      ))}
    </div>
  );
}
