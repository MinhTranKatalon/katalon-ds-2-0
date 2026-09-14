import React from 'react';

export function Tooltip({ label, placement = 'top', className = '', style, children }) {
  const [on, setOn] = React.useState(false);
  const pos = placement === 'bottom'
    ? { top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }
    : { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' };
  return (
    <span
      className={['kds-tip-wrap', className].filter(Boolean).join(' ')}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)} onBlur={() => setOn(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
    >
      {children}
      {on ? (
        <span role="tooltip" className="kds-tip" style={{
          position: 'absolute', zIndex: 60, whiteSpace: 'nowrap',
          padding: '7px 10px', borderRadius: 'var(--k-radius-sm)',
          background: 'var(--k-gray-900)', color: 'var(--k-gray-0)',
          fontFamily: 'var(--k-font-body)', fontSize: 12.5, lineHeight: 1.3,
          pointerEvents: 'none', ...pos,
        }}>{label}</span>
      ) : null}
    </span>
  );
}
