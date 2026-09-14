import React from 'react';

export function TextArea({ invalid, rows = 4, className = '', style, ...rest }) {
  return (
    <textarea
      rows={rows}
      className={['kds-input', className].filter(Boolean).join(' ')}
      aria-invalid={invalid || undefined}
      style={{
        width: '100%', height: 'auto', padding: '12px 14px',
        lineHeight: 'var(--k-lh-body-md)', resize: 'vertical',
        borderColor: invalid ? 'var(--k-fail-600)' : undefined,
        ...style,
      }}
      {...rest}
    />
  );
}
