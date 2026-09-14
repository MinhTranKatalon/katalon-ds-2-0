import React from 'react';
import { Icon } from '../icons/Icon.jsx';

/* Native select — it maps 1:1 to the platform control and needs no JS menu.
   The chevron is the DS chevron-down glyph laid over it, never a hand-drawn path
   in a data URI (rules/icons.md rule 7). */
export function Select({ options = [], value, onChange, placeholder, invalid, size = 'md', className = '', style, ...rest }) {
  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <select
        className={['kds-input', className].filter(Boolean).join(' ')}
        value={value ?? ''}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange && onChange(e.target.value)}
        style={{
          width: '100%', height: size === 'sm' ? 36 : 44,
          paddingRight: 38, appearance: 'none',
          borderColor: invalid ? 'var(--k-fail-600)' : undefined,
          ...style,
        }}
        {...rest}
      >
        {placeholder ? <option value="" disabled>{placeholder}</option> : null}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span aria-hidden="true" style={{
        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
        color: 'var(--k-text-tertiary)', pointerEvents: 'none',
      }}>
        <Icon name="chevron-down" size={18} />
      </span>
    </span>
  );
}
