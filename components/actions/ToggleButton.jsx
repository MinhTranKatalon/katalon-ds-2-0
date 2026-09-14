import React from 'react';

export function ToggleButton({ pressed, onChange, iconStart, disabled, className = '', style, children, ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={!!pressed}
      disabled={disabled}
      onClick={() => onChange && onChange(!pressed)}
      className={['kds-btn', 'kds-btn--neutral', className].filter(Boolean).join(' ')}
      style={{
        background: pressed ? 'var(--k-action-100)' : undefined,
        borderColor: pressed ? 'var(--k-action-300)' : undefined,
        color: pressed ? 'var(--k-action-700)' : undefined,
        ...style,
      }}
      {...rest}
    >
      {iconStart}
      {children}
    </button>
  );
}
