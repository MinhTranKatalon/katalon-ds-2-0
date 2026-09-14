import React from 'react';

export function Switch({ checked, onChange, label, hint, disabled, className = '', style }) {
  return (
    <label className={className} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 'var(--k-sp-4)', minHeight: 44, cursor: disabled ? 'not-allowed' : 'pointer', ...style,
    }}>
      <span>
        <span style={{ fontSize: 15, color: disabled ? 'var(--k-text-disabled)' : 'var(--k-text-body)' }}>{label}</span>
        {hint ? <span style={{ display: 'block', fontSize: 13, color: 'var(--k-text-tertiary)', marginTop: 2 }}>{hint}</span> : null}
      </span>
      <button
        type="button" role="switch" aria-checked={!!checked} aria-label={label} disabled={disabled}
        onClick={() => onChange && onChange(!checked)}
        style={{
          flex: 'none', width: 46, height: 26, padding: 3, border: 0, cursor: 'inherit',
          borderRadius: 'var(--k-radius-pill)',
          background: checked ? 'var(--k-primary)' : 'var(--k-gray-300)',
          transition: 'background-color var(--k-dur-fast) var(--k-ease-std)',
        }}
      >
        <span style={{
          display: 'block', width: 20, height: 20, borderRadius: '50%', background: '#fff',
          transform: checked ? 'translateX(20px)' : 'translateX(0)',
          transition: 'transform var(--k-dur-fast) var(--k-ease-std)',
        }} />
      </button>
    </label>
  );
}
