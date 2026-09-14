import React from 'react';

export function Typeahead({ options = [], value = '', onChange, onSelect, placeholder, emptyText = 'No matches', className = '', style }) {
  const [open, setOpen] = React.useState(false);
  const q = value.trim().toLowerCase();
  const hits = q ? options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, 8) : [];
  return (
    <span className={className} style={{ position: 'relative', display: 'block', ...style }}>
      <input
        className="kds-input" value={value} placeholder={placeholder}
        role="combobox" aria-expanded={open} aria-autocomplete="list"
        onChange={(e) => { onChange && onChange(e.target.value); setOpen(true); }}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        style={{ width: '100%' }}
      />
      {open && q ? (
        <ul role="listbox" style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 40,
          margin: 0, padding: 6, listStyle: 'none', maxHeight: 280, overflowY: 'auto',
          background: 'var(--k-gray-0)', border: '1px solid var(--k-border-default)',
          borderRadius: 'var(--k-radius-lg)',
        }}>
          {hits.length === 0 ? (
            <li style={{ padding: '12px', fontSize: 14, color: 'var(--k-text-tertiary)' }}>{emptyText}</li>
          ) : hits.map((o) => (
            <li key={o.value} role="option" aria-selected={false}
              onMouseDown={() => { onSelect && onSelect(o); setOpen(false); }}
              style={{ padding: '11px 12px', borderRadius: 'var(--k-radius-sm)', fontSize: 14, color: 'var(--k-text-body)', cursor: 'pointer' }}>
              {o.label}
              {o.meta ? <span style={{ marginLeft: 8, fontFamily: 'var(--k-font-mono)', fontSize: 12, color: 'var(--k-text-tertiary)' }}>{o.meta}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </span>
  );
}
