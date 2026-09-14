import React from 'react';

export function Input({ invalid, iconStart, size = 'md', className = '', style, ...rest }) {
  const field = (
    <input
      className={['kds-input', className].filter(Boolean).join(' ')}
      aria-invalid={invalid || undefined}
      style={{
        width: '100%',
        height: size === 'sm' ? 36 : 44,
        paddingLeft: iconStart ? 42 : undefined,
        borderColor: invalid ? 'var(--k-fail-600)' : undefined,
        ...style,
      }}
      {...rest}
    />
  );
  if (!iconStart) return field;
  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--k-text-tertiary)', pointerEvents: 'none' }}>
        {iconStart}
      </span>
      {field}
    </span>
  );
}
