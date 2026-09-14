import React from 'react';
import { Icon } from '../icons/Icon.jsx';

export function Composer({ value = '', onChange, onSubmit, placeholder = 'Ask Katalon AI', busy, hint, actions, className = '', style }) {
  const send = () => { if (!busy && value.trim() && onSubmit) onSubmit(value); };
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 'var(--k-sp-3)',
        padding: 'var(--k-sp-3)', background: 'var(--k-gray-0)',
        border: '1px solid var(--k-gray-300)', borderRadius: 'var(--k-radius-xl)',
      }}>
        <textarea
          value={value} placeholder={placeholder} rows={1}
          onChange={(e) => onChange && onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          style={{
            flex: 1, minHeight: 40, maxHeight: 180, padding: '9px 6px',
            border: 0, outline: 'none', resize: 'none', background: 'transparent',
            fontFamily: 'var(--k-font-body)', fontSize: 15, lineHeight: 1.5, color: 'var(--k-text-body)',
          }}
        />
        {actions}
        <button type="button" aria-label="Send" disabled={busy || !value.trim()} onClick={send}
          className="kds-btn kds-btn--primary" style={{ width: 44, padding: 0, flex: 'none' }}>
          <Icon name="arrow-up" size={20} />
        </button>
      </div>
      {hint ? (
        <span style={{ fontSize: 12.5, color: 'var(--k-text-tertiary)' }}>{hint}</span>
      ) : null}
    </div>
  );
}
