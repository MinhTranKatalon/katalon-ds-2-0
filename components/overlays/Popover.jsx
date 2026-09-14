import React from 'react';

export function Popover({ trigger, title, align = 'start', width = 300, className = '', style, children }) {
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
      <span onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="dialog">{trigger}</span>
      {open ? (
        <div role="dialog" aria-label={title} style={{
          position: 'absolute', top: 'calc(100% + 8px)', [align === 'end' ? 'right' : 'left']: 0,
          zIndex: 50, width, padding: 'var(--k-sp-4)',
          display: 'flex', flexDirection: 'column', gap: 'var(--k-sp-2)',
          background: 'var(--k-gray-0)', border: '1px solid var(--k-border-default)',
          borderRadius: 'var(--k-radius-xl)',
        }}>
          {title ? <span style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--k-text-primary)' }}>{title}</span> : null}
          <span style={{ fontSize: 14, lineHeight: 'var(--k-lh-body-md)', color: 'var(--k-text-secondary)' }}>{children}</span>
        </div>
      ) : null}
    </span>
  );
}
