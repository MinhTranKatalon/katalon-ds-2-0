import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const TONE = {
  info:    { bg: 'var(--k-info-50)',    bd: 'var(--k-info-200)',    ink: 'var(--k-info-800)',    icon: 'circle-info' },
  success: { bg: 'var(--k-action-50)',  bd: 'var(--k-action-200)',  ink: 'var(--k-action-800)',  icon: 'circle-check' },
  warning: { bg: 'var(--k-warning-50)', bd: 'var(--k-warning-300)', ink: 'var(--k-warning-900)', icon: 'triangle-exclamation' },
  fail:    { bg: 'var(--k-fail-50)',    bd: 'var(--k-fail-200)',    ink: 'var(--k-fail-800)',    icon: 'circle-exclamation' },
};

export function Toast({ tone = 'success', message, action, onDismiss, className = '', style }) {
  const t = TONE[tone] || TONE.success;
  return (
    <div role="status" aria-live="polite" className={className} style={{
      display: 'flex', alignItems: 'center', gap: 'var(--k-sp-3)',
      minWidth: 300, maxWidth: 520, padding: '14px 16px',
      background: 'var(--k-gray-900)', color: 'var(--k-gray-0)',
      borderRadius: 'var(--k-radius-lg)', ...style,
    }}>
      <span style={{ flex: 'none', color: t.bd }}><Icon name={t.icon} size={20} /></span>
      <span style={{ flex: 1, fontSize: 14, lineHeight: 1.4 }}>{message}</span>
      {action}
      {onDismiss ? (
        <button type="button" aria-label="Dismiss" onClick={onDismiss}
          style={{ flex: 'none', border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--k-gray-400)', fontSize: 16, lineHeight: 1 }}>×</button>
      ) : null}
    </div>
  );
}
