import React from 'react';

export function Spinner({ size = 20, label = 'Loading', className = '', style }) {
  return (
    <span role="status" aria-label={label} className={['kds-spin', className].filter(Boolean).join(' ')}
      style={{ display: 'inline-flex', color: 'var(--k-action-600)', ...style }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
        strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
        <path d="M21 12a9 9 0 1 1-6.2-8.6" />
      </svg>
    </span>
  );
}
