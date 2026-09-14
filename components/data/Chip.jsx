import React from 'react';

export function Chip({ onRemove, selected, icon, className = '', style, children, ...rest }) {
  return (
    <span
      className={['kds-chip', className].filter(Boolean).join(' ')}
      style={{
        background: selected ? 'var(--k-action-100)' : undefined,
        borderColor: selected ? 'var(--k-action-300)' : undefined,
        color: selected ? 'var(--k-action-700)' : undefined,
        paddingRight: onRemove ? 8 : undefined,
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
      {onRemove ? (
        <button type="button" aria-label={'Remove filter'} onClick={onRemove}
          style={{ border: 0, background: 'transparent', cursor: 'pointer', color: 'inherit', fontSize: 14, lineHeight: 1, padding: '0 2px' }}>×</button>
      ) : null}
    </span>
  );
}
