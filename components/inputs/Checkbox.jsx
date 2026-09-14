import React from 'react';

export function Checkbox({ checked, indeterminate, onChange, label, hint, disabled, className = '', style }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  return (
    <label className={className} style={{
      display: 'flex', gap: 'var(--k-sp-3)', alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer', minHeight: 44, padding: '10px 0', ...style,
    }}>
      <input
        ref={ref} type="checkbox" checked={!!checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        style={{ width: 20, height: 20, marginTop: 1, accentColor: 'var(--k-primary)', flex: 'none' }}
      />
      <span>
        <span style={{ fontSize: 15, color: disabled ? 'var(--k-text-disabled)' : 'var(--k-text-body)' }}>{label}</span>
        {hint ? <span style={{ display: 'block', fontSize: 13, color: 'var(--k-text-tertiary)', marginTop: 2 }}>{hint}</span> : null}
      </span>
    </label>
  );
}
