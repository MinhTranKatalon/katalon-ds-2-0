import React from 'react';
import { Icon } from '../icons/Icon.jsx';

export function EmptyState({ icon, title, body, action, className = '', style }) {
  return (
    <div className={className} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--k-sp-3)',
      padding: 'var(--k-sp-7) var(--k-sp-5)', textAlign: 'center', ...style,
    }}>
      <span style={{ color: 'var(--k-text-tertiary)' }}>
        {icon || <Icon name="folder-open" size={32} />}
      </span>
      <span style={{ fontFamily: 'var(--k-font-display)', fontSize: 20, fontWeight: 600, color: 'var(--k-text-primary)' }}>{title}</span>
      {body ? (
        <p style={{ maxWidth: 420, fontSize: 14.5, lineHeight: 'var(--k-lh-body-md)', color: 'var(--k-text-secondary)' }}>{body}</p>
      ) : null}
      {action ? <span style={{ marginTop: 'var(--k-sp-2)' }}>{action}</span> : null}
    </div>
  );
}
