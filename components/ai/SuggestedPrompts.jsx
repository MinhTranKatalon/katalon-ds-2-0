import React from 'react';

export function SuggestedPrompts({ prompts = [], onPick, label = 'Suggested prompts', className = '', style }) {
  return (
    <div role="group" aria-label={label} className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--k-sp-2)', ...style }}>
      {prompts.map((p, i) => (
        <button key={i} type="button" onClick={() => onPick && onPick(p)}
          style={{
            minHeight: 44, padding: '0 16px', cursor: 'pointer', textAlign: 'left',
            background: 'var(--k-gray-0)', border: '1px solid var(--k-border-default)',
            borderRadius: 'var(--k-radius-pill)',
            fontFamily: 'var(--k-font-body)', fontSize: 14, color: 'var(--k-text-body)',
            transition: 'border-color var(--k-dur-fast) var(--k-ease-std), background-color var(--k-dur-fast) var(--k-ease-std)',
          }}>{p}</button>
      ))}
    </div>
  );
}
