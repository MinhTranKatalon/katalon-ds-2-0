import React from 'react';

export function Timestamp({ value, relative, className = '', style }) {
  const iso = value instanceof Date ? value.toISOString() : String(value);
  return (
    <time dateTime={iso} className={className} style={{
      fontFamily: 'var(--k-font-mono)', fontSize: 12.5, color: 'var(--k-text-tertiary)',
      fontVariantNumeric: 'tabular-nums', ...style,
    }}>
      {relative || iso.replace('T', ' ').replace(/\.\d+Z?$/, '')}
    </time>
  );
}
