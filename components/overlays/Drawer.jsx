import React from 'react';

export function Drawer({ open, onClose, title, side = 'right', width = 480, footer, className = '', style, children }) {
  React.useEffect(() => {
    if (!open) return;
    const esc = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', justifyContent: side === 'left' ? 'flex-start' : 'flex-end', background: 'rgba(15,20,25,.4)' }}>
      <aside role="dialog" aria-modal="true" aria-label={title} className={className} style={{
        width: 'min(' + width + 'px, 100%)', height: '100%', display: 'flex', flexDirection: 'column',
        background: 'var(--k-gray-0)',
        borderLeft: side === 'right' ? '1px solid var(--k-border-default)' : 0,
        borderRight: side === 'left' ? '1px solid var(--k-border-default)' : 0,
        ...style,
      }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--k-sp-3)', padding: 'var(--k-sp-5)', borderBottom: '1px solid var(--k-border-subtle)' }}>
          <h2 style={{ flex: 1, margin: 0, fontFamily: 'var(--k-font-display)', fontSize: 20, fontWeight: 600, color: 'var(--k-text-primary)' }}>{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose}
            style={{ width: 36, height: 36, border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--k-text-tertiary)', fontSize: 18, lineHeight: 1 }}>×</button>
        </header>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 'var(--k-sp-5)' }}>{children}</div>
        {footer ? (
          <footer style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--k-sp-3)', padding: 'var(--k-sp-5)', borderTop: '1px solid var(--k-border-subtle)' }}>{footer}</footer>
        ) : null}
      </aside>
    </div>
  );
}
