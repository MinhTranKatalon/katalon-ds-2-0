import React from 'react';

export function Progress({ value = 0, max = 100, label, countLabel, tone = 'action', className = '', style }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = tone === 'fail' ? 'var(--k-fail-600)' : tone === 'warning' ? 'var(--k-warning-600)' : 'var(--k-action-600)';
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {(label || countLabel) ? (
        <span style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
          <span style={{ fontSize: 14, color: 'var(--k-text-secondary)' }}>{label}</span>
          <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: 13, color: 'var(--k-text-primary)', fontVariantNumeric: 'tabular-nums' }}>{countLabel}</span>
        </span>
      ) : null}
      <span role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}
        style={{ display: 'block', height: 8, borderRadius: 'var(--k-radius-pill)', background: 'var(--k-gray-200)', overflow: 'hidden' }}>
        <span style={{
          display: 'block', height: '100%', width: pct + '%', background: fill,
          borderRadius: 'var(--k-radius-pill)',
          transition: 'width var(--k-dur-base) var(--k-ease-out)',
        }} />
      </span>
    </div>
  );
}
