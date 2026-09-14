import React from 'react';
import { Icon } from '../icons/Icon.jsx';
import { IconButton } from '../actions/IconButton.jsx';

export function MessageActions({ onCopy, onRetry, onGood, onBad, className = '', style }) {
  const acts = [
    onCopy && ['Copy message', 'copy', onCopy],
    onRetry && ['Try again', 'arrows-rotate', onRetry],
    onGood && ['Good answer', 'thumbs-up', onGood],
    onBad && ['Bad answer', 'thumbs-down', onBad],
  ].filter(Boolean);
  return (
    <span className={className} style={{ display: 'flex', gap: 2, ...style }}>
      {acts.map(([label, icon, fn]) => (
        <IconButton key={label} label={label} size="sm" onClick={fn}>
          <Icon name={icon} size={16} />
        </IconButton>
      ))}
    </span>
  );
}
