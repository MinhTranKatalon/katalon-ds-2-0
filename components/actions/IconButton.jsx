import React from 'react';

const SIZE = { sm: 'kds-btn--sm', md: '', lg: 'kds-btn--lg' };

export function IconButton({ label, size = 'md', selected, disabled, className = '', style, children, ...rest }) {
  return (
    <button
      type="button"
      className={['kds-btn', 'kds-btn--icon', SIZE[size] || '', className].filter(Boolean).join(' ')}
      aria-label={label}
      aria-pressed={selected}
      disabled={disabled}
      style={{
        width: size === 'sm' ? 'var(--k-btn-h-sm)' : size === 'lg' ? 'var(--k-btn-h-lg)' : 'var(--k-btn-h-md)',
        background: selected ? 'var(--k-action-100)' : undefined,
        color: selected ? 'var(--k-action-700)' : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
