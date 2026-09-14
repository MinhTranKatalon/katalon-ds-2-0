import React from 'react';

const DOT = {
  pass: 'var(--k-pass-600)', fail: 'var(--k-fail-600)', flaky: 'var(--k-warning-700)',
  warning: 'var(--k-warning-700)', pending: 'var(--k-slate-600)', info: 'var(--k-info-600)',
  neutral: 'var(--k-gray-500)', action: 'var(--k-action-600)',
};

export function Badge({ tone = 'neutral', dot, icon, className = '', style, children }) {
  return (
    <span className={['kds-badge', 'kds-badge--' + tone, className].filter(Boolean).join(' ')} style={style}>
      {dot ? <span className="kds-badge__dot" aria-hidden="true" style={{ background: DOT[tone] }} /> : null}
      {icon}
      {children}
    </span>
  );
}
