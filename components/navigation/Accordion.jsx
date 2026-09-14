import React from 'react';

export function Accordion({ items = [], defaultOpen = [], allowMultiple = true, className = '', style }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = (id) => setOpen((o) =>
    o.includes(id) ? o.filter((x) => x !== id) : allowMultiple ? [...o, id] : [id]);
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {items.map((it) => {
        const on = open.includes(it.id);
        return (
          <div key={it.id} style={{ borderTop: '1px solid var(--k-border-subtle)' }}>
            <button type="button" aria-expanded={on} onClick={() => toggle(it.id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                width: '100%', minHeight: 56, padding: '14px 0', border: 0, background: 'transparent',
                cursor: 'pointer', textAlign: 'left',
                fontFamily: 'var(--k-font-body)', fontSize: 16, fontWeight: 600, color: 'var(--k-text-primary)',
              }}>
              {it.title}
              <span aria-hidden="true" style={{
                flex: 'none', color: 'var(--k-text-tertiary)', fontSize: 13,
                transform: on ? 'rotate(180deg)' : 'none',
                transition: 'transform var(--k-dur-base) var(--k-ease-out)',
              }}>▼</span>
            </button>
            {on ? (
              <div style={{ paddingBottom: 'var(--k-sp-5)', fontSize: 15, lineHeight: 'var(--k-lh-body-md)', color: 'var(--k-text-secondary)' }}>
                {it.body}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
