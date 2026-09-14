import React from 'react';

export function DropdownMenu({ trigger, items = [], align = 'start', className = '', style }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', away); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <span ref={ref} className={className} style={{ position: 'relative', display: 'inline-flex', ...style }}>
      <span onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>{trigger}</span>
      {open ? (
        <div role="menu" style={{
          position: 'absolute', top: 'calc(100% + 6px)', [align === 'end' ? 'right' : 'left']: 0,
          zIndex: 40, minWidth: 220, padding: 6,
          background: 'var(--k-gray-0)', border: '1px solid var(--k-border-default)',
          borderRadius: 'var(--k-radius-lg)',
        }}>
          {items.map((it, i) => it.separator ? (
            <span key={i} style={{ display: 'block', height: 1, margin: '6px 8px', background: 'var(--k-border-subtle)' }} />
          ) : (
            <button key={i} type="button" role="menuitem" disabled={it.disabled}
              onClick={() => { setOpen(false); it.onSelect && it.onSelect(); }}
              className="kds-menu-item"
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                minHeight: 40, padding: '0 12px', border: 0, cursor: 'pointer', textAlign: 'left',
                background: 'transparent', borderRadius: 'var(--k-radius-sm)',
                fontFamily: 'var(--k-font-body)', fontSize: 14,
                color: it.danger ? 'var(--k-fail-700)' : it.disabled ? 'var(--k-text-disabled)' : 'var(--k-text-body)',
              }}>
              {it.icon}{it.label}
            </button>
          ))}
        </div>
      ) : null}
    </span>
  );
}
