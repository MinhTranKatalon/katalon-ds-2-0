import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const TONE = {
  info:    { bg: 'var(--k-info-50)',    bd: 'var(--k-info-200)',    ink: 'var(--k-info-800)',    icon: 'circle-info' },
  success: { bg: 'var(--k-action-50)',  bd: 'var(--k-action-200)',  ink: 'var(--k-action-800)',  icon: 'circle-check' },
  warning: { bg: 'var(--k-warning-50)', bd: 'var(--k-warning-300)', ink: 'var(--k-warning-900)', icon: 'triangle-exclamation' },
  fail:    { bg: 'var(--k-fail-50)',    bd: 'var(--k-fail-200)',    ink: 'var(--k-fail-800)',    icon: 'circle-exclamation' },
};

export function Alert({ tone = 'info', title, action, onDismiss, className = '', style, children }) {
  const t = TONE[tone] || TONE.info;
  return (
    <div role={tone === 'fail' ? 'alert' : 'status'} className={className} style={{
      display: 'flex', gap: 'var(--k-sp-3)', alignItems: 'flex-start',
      padding: 'var(--k-sp-4)', background: t.bg,
      border: '1px solid ' + t.bd, borderRadius: 'var(--k-radius-lg)', ...style,
    }}>
      <span style={{ color: t.ink, flex: 'none', marginTop: 1 }}><Icon name={t.icon} size={20} /></span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {title ? <span style={{ fontSize: 15, fontWeight: 600, color: t.ink }}>{title}</span> : null}
        {children ? <span style={{ fontSize: 14, lineHeight: 'var(--k-lh-body-md)', color: 'var(--k-text-body)' }}>{children}</span> : null}
        {action ? <span style={{ marginTop: 4 }}>{action}</span> : null}
      </div>
      {onDismiss ? (
        <button type="button" aria-label="Dismiss" onClick={onDismiss}
          style={{ flex: 'none', border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--k-text-tertiary)', fontSize: 16, lineHeight: 1 }}>×</button>
      ) : null}
    </div>
  );
}
