import React from 'react';

export function ButtonGroup({ label, gap = 'var(--k-sp-3)', className = '', style, children }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap, flexWrap: 'wrap', ...style }}
    >
      {children}
    </div>
  );
}
