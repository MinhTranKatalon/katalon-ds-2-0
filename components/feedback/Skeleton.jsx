import React from 'react';

export function Skeleton({ width = '100%', height = 16, radius = 'var(--k-radius-sm)', lines = 1, className = '', style }) {
  const bar = (w, i) => (
    <span key={i} aria-hidden="true" style={{
      display: 'block', width: w, height,
      borderRadius: radius, background: 'var(--k-gray-200)',
    }} />
  );
  if (lines <= 1) {
    return <span role="status" aria-label="Loading" className={className} style={{ display: 'block', ...style }}>{bar(width, 0)}</span>;
  }
  return (
    <span role="status" aria-label="Loading" className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      {Array.from({ length: lines }, (_, i) => bar(i === lines - 1 ? '62%' : width, i))}
    </span>
  );
}
