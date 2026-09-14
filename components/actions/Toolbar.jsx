import React from 'react';

export function Toolbar({ label, dense, className = '', style, children }) {
  return (
    <div
      role="toolbar"
      aria-label={label}
      className={className}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--k-sp-2)',
        minHeight: dense ? 40 : 52,
        padding: dense ? '0 var(--k-sp-2)' : '0 var(--k-sp-3)',
        background: 'var(--k-gray-0)',
        border: '1px solid var(--k-border-subtle)',
        borderRadius: 'var(--k-radius-lg)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function ToolbarSeparator() {
  return <span aria-hidden="true" style={{ width: 1, alignSelf: 'stretch', margin: '8px 4px', background: 'var(--k-border-subtle)' }} />;
}

export function ToolbarSpacer() {
  return <span aria-hidden="true" style={{ flex: 1 }} />;
}
