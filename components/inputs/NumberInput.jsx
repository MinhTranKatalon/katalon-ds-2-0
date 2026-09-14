import React from 'react';

export function NumberInput({ value, onChange, min, max, step = 1, unit, invalid, className = '', style, ...rest }) {
  const bump = (d) => {
    const next = Number(value || 0) + d * step;
    if (min != null && next < min) return;
    if (max != null && next > max) return;
    onChange && onChange(next);
  };
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'stretch', ...style }}>
      <input
        type="number"
        className="kds-input"
        value={value}
        min={min} max={max} step={step}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange && onChange(e.target.value === '' ? '' : Number(e.target.value))}
        style={{
          width: 104, borderTopRightRadius: 0, borderBottomRightRadius: 0,
          fontFamily: 'var(--k-font-mono)',
          borderColor: invalid ? 'var(--k-fail-600)' : undefined,
        }}
        {...rest}
      />
      <span style={{
        display: 'flex', flexDirection: 'column',
        border: '1px solid var(--k-gray-300)', borderLeft: 0,
        borderTopRightRadius: 'var(--k-btn-radius)', borderBottomRightRadius: 'var(--k-btn-radius)',
        overflow: 'hidden',
      }}>
        {[['Increase', 1, '▲'], ['Decrease', -1, '▼']].map(([name, d, glyph]) => (
          <button key={name} type="button" aria-label={name} onClick={() => bump(d)}
            style={{
              flex: 1, width: 30, border: 0, cursor: 'pointer', lineHeight: 1,
              background: 'var(--k-gray-50)', color: 'var(--k-text-secondary)', fontSize: 8,
            }}>{glyph}</button>
        ))}
      </span>
      {unit ? (
        <span style={{ alignSelf: 'center', marginLeft: 10, fontFamily: 'var(--k-font-mono)', fontSize: 13, color: 'var(--k-text-tertiary)' }}>{unit}</span>
      ) : null}
    </span>
  );
}
