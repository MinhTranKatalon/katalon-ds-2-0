import React from 'react';
import { Avatar } from '../data/Avatar.jsx';

export function ChatMessage({ role = 'assistant', name, authorSrc, aiMarkSrc = 'assets/brand-svg/ai-katalon-color.svg', children, footer, className = '', style }) {
  const isUser = role === 'user';
  return (
    <div className={className} style={{
      display: 'flex', gap: 'var(--k-sp-3)', alignItems: 'flex-start',
      flexDirection: isUser ? 'row-reverse' : 'row', ...style,
    }}>
      <span style={{ flex: 'none', marginTop: 2 }}>
        {isUser
          ? <Avatar name={name || 'You'} src={authorSrc} size="sm" />
          : <img src={aiMarkSrc} alt="Katalon AI" width={28} height={28} style={{ display: 'block' }} />}
      </span>
      <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 6, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        <span className="kds-eyebrow">{isUser ? (name || 'You') : 'Katalon AI'}</span>
        <div style={{
          padding: 'var(--k-sp-4)',
          background: isUser ? 'var(--k-action-50)' : 'var(--k-gray-0)',
          border: '1px solid ' + (isUser ? 'var(--k-action-200)' : 'var(--k-border-default)'),
          borderRadius: 'var(--k-radius-xl)',
          fontSize: 15, lineHeight: 'var(--k-lh-body-md)', color: 'var(--k-text-body)',
        }}>{children}</div>
        {footer ? <span style={{ marginTop: 2 }}>{footer}</span> : null}
      </div>
    </div>
  );
}
