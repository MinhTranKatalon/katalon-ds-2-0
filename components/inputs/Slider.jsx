import React from 'react';

export function Slider({ value = 0, min = 0, max = 100, step = 1, onChange, label, unit, showValue = true, className = '', style }) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {(label || showValue) ? (
        <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--k-text-primary)' }}>{label}</span>
          {showValue ? (
            <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: 13, color: 'var(--k-text-secondary)' }}>
              {value}{unit ? ' ' + unit : ''}
            </span>
          ) : null}
        </span>
      ) : null}
      <input
        type="range" value={value} min={min} max={max} step={step}
        aria-label={label}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        style={{ width: '100%', height: 24, accentColor: 'var(--k-primary)' }}
      />
    </div>
  );
}
