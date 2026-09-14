import React from 'react';
import { Icon } from '../icons/Icon.jsx';

export function SystemMessage({ icon = 'circle-info', className = '', style, children }) {
  return (
    <div role="note" className={className} style={{
      display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center',
      padding: '10px 14px', fontSize: 13, color: 'var(--k-text-tertiary)', ...style,
    }}>
      <Icon name={icon} size={16} />
      <span>{children}</span>
    </div>
  );
}
