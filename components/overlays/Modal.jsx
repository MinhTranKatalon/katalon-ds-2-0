import React from 'react';

export function Modal({ open, onClose, title, description, footer, size = 'md', className = '', style, children }) {
  React.useEffect(() => {
    if (!open) return;
    const esc = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open, onClose]);
  if (!open) return null;
  const w = size === 'sm' ? 440 : size === 'lg' ? 780 : 580;
  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--k-sp-5)',
        background: 'rgba(15,20,25,.4)',
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={title} className={className} style={{
        width: '100%', maxWidth: w, maxHeight: '86vh', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 'var(--k-sp-4)',
        padding: 'var(--k-sp-6)', background: 'var(--k-gray-0)',
        border: '1px solid var(--k-border-default)', borderRadius: 'var(--k-radius-2xl)',
        ...style,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--k-sp-4)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--k-font-display)', fontSize: 22, fontWeight: 600, color: 'var(--k-text-primary)' }}>{title}</h2>
            {description ? (
              <p style={{ margin: '8px 0 0', fontSize: 14.5, lineHeight: 'var(--k-lh-body-md)', color: 'var(--k-text-secondary)' }}>{description}</p>
            ) : null}
          </div>
          <button type="button" aria-label="Close" onClick={onClose}
            style={{ flex: 'none', width: 36, height: 36, border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--k-text-tertiary)', fontSize: 18, lineHeight: 1 }}>×</button>
        </div>
        {children}
        {footer ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--k-sp-3)', marginTop: 'var(--k-sp-2)' }}>{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
