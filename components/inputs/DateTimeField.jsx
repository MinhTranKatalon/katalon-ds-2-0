import React from 'react';

export function DateTimeField({ type = 'date', value, onChange, invalid, className = '', style, ...rest }) {
  return (
    <input
      type={type}
      className={['kds-input', className].filter(Boolean).join(' ')}
      value={value ?? ''}
      aria-invalid={invalid || undefined}
      onChange={(e) => onChange && onChange(e.target.value)}
      style={{
        width: '100%', fontFamily: 'var(--k-font-mono)', fontSize: 13.5,
        borderColor: invalid ? 'var(--k-fail-600)' : undefined,
        ...style,
      }}
      {...rest}
    />
  );
}
