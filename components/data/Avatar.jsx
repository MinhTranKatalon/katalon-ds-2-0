import React from 'react';

const SIZES = { sm: 28, md: 36, lg: 48 };

export function Avatar({ name = '', src, size = 'md', className = '', style }) {
  const px = typeof size === 'number' ? size : SIZES[size] || SIZES.md;
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <span
      className={className}
      role="img"
      aria-label={name || undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
        width: px, height: px, borderRadius: '50%', overflow: 'hidden',
        background: 'var(--k-action-100)', color: 'var(--k-action-800)',
        fontFamily: 'var(--k-font-body)', fontSize: Math.round(px * 0.38), fontWeight: 600,
        ...style,
      }}
    >
      {src ? <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
    </span>
  );
}
