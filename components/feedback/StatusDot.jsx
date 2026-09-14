import React from 'react';

const DOT = {
  pass: 'var(--k-pass-600)', fail: 'var(--k-fail-600)', warning: 'var(--k-warning-600)',
  pending: 'var(--k-slate-600)', neutral: 'var(--k-gray-400)', running: 'var(--k-action-600)',
};

export function StatusDot({ tone = 'neutral', label, size = 8, className = '', style }) {
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...style }}>
      <span aria-hidden="true" style={{
        width: size, height: size, borderRadius: '50%', flex: 'none',
        background: DOT[tone] || DOT.neutral,
      }} />
      <span style={{ fontSize: 13.5, color: 'var(--k-text-body)' }}>{label}</span>
    </span>
  );
}
