import React from 'react';

export function Divider({ vertical, label, strong, className = '', style }) {
  const line = strong ? 'var(--k-border-default)' : 'var(--k-border-subtle)';
  if (vertical) {
    return <span role="separator" aria-orientation="vertical" className={className}
      style={{ width: 1, alignSelf: 'stretch', background: line, ...style }} />;
  }
  if (label) {
    return (
      <span role="separator" className={className} style={{ display: 'flex', alignItems: 'center', gap: 'var(--k-sp-3)', ...style }}>
        <span style={{ flex: 1, height: 1, background: line }} />
        <span className="kds-eyebrow">{label}</span>
        <span style={{ flex: 1, height: 1, background: line }} />
      </span>
    );
  }
  return <hr className={className} style={{ height: 1, border: 0, margin: 0, background: line, ...style }} />;
}
