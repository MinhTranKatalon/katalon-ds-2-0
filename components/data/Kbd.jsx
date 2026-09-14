import React from 'react';

export function Kbd({ className = '', style, children }) {
  return (
    <kbd className={className} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 24, height: 24, padding: '0 7px',
      fontFamily: 'var(--k-font-mono)', fontSize: 12, color: 'var(--k-text-secondary)',
      background: 'var(--k-gray-50)', border: '1px solid var(--k-border-default)',
      borderRadius: 'var(--k-radius-xs)', ...style,
    }}>{children}</kbd>
  );
}
