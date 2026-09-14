import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const KIND = {
  maintenance: { icon: 'screwdriver-wrench', title: 'Scheduled maintenance' },
  outage:      { icon: 'triangle-exclamation', title: 'Service disruption' },
  notFound:    { icon: 'magnifying-glass', title: 'Page not found' },
  error:       { icon: 'circle-exclamation', title: 'Something failed on our side' },
};

export function SystemStatus({ kind = 'error', title, body, detail, action, className = '', style }) {
  const k = KIND[kind] || KIND.error;
  return (
    <div className={className} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--k-sp-3)',
      padding: 'var(--k-sp-8) var(--k-sp-5)', textAlign: 'center', ...style,
    }}>
      <span style={{ color: 'var(--k-text-tertiary)' }}><Icon name={k.icon} size={32} /></span>
      <h2 style={{ margin: 0, fontFamily: 'var(--k-font-display)', fontSize: 26, fontWeight: 600, color: 'var(--k-text-primary)' }}>
        {title || k.title}
      </h2>
      {body ? <p style={{ maxWidth: 520, fontSize: 15, lineHeight: 'var(--k-lh-body-md)', color: 'var(--k-text-secondary)' }}>{body}</p> : null}
      {action ? <span style={{ marginTop: 'var(--k-sp-2)' }}>{action}</span> : null}
      {detail ? (
        <code style={{ marginTop: 'var(--k-sp-4)', fontFamily: 'var(--k-font-mono)', fontSize: 12, color: 'var(--k-text-tertiary)' }}>{detail}</code>
      ) : null}
    </div>
  );
}
