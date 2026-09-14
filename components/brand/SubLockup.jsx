import React from 'react';

/* Sub-brand lockups are never hand-built. Geometry is derived from ONE value: --k-sub-h.
   Writing your own span with your own gap and font-size always produces the same defect —
   the subname drifts off the wordmark baseline. */
export function SubLockup({ name, kind = 'product', height = 30, dark, logoSrc, className = '', style }) {
  const src = logoSrc || (dark
    ? 'assets/logos/katalon-horizontal-white-green.svg'
    : 'assets/logos/katalon-horizontal-rgb.svg');
  const nameClass = [
    'k-sub-name',
    'k-sub-name--' + kind,
    dark ? 'k-sub-name--' + kind + '-dark' : '',
  ].filter(Boolean).join(' ');
  return (
    <span className={['k-sub-lockup', className].filter(Boolean).join(' ')}
      style={{ '--k-sub-h': height + 'px', ...style }}>
      <img className="k-sub-logo" src={src} alt="Katalon" />
      <span className={nameClass}>{name}</span>
    </span>
  );
}
