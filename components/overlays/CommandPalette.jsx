import React from 'react';
import { Icon } from '../icons/Icon.jsx';

export function CommandPalette({ open, onClose, commands = [], placeholder = 'Search commands', className = '', style }) {
  const [q, setQ] = React.useState('');
  React.useEffect(() => {
    if (!open) return;
    setQ('');
    const esc = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open, onClose]);
  if (!open) return null;
  const needle = q.trim().toLowerCase();
  const hits = needle ? commands.filter((c) => c.label.toLowerCase().includes(needle)) : commands;
  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', justifyContent: 'center', paddingTop: '12vh', background: 'rgba(15,20,25,.4)' }}>
      <div role="dialog" aria-modal="true" aria-label="Command palette" className={className} style={{
        width: 'min(620px, calc(100% - 32px))', maxHeight: '62vh', display: 'flex', flexDirection: 'column',
        background: 'var(--k-gray-0)', border: '1px solid var(--k-border-default)',
        borderRadius: 'var(--k-radius-2xl)', overflow: 'hidden', ...style,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderBottom: '1px solid var(--k-border-subtle)' }}>
          <span style={{ color: 'var(--k-text-tertiary)' }}><Icon name="magnifying-glass" size={18} /></span>
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder}
            style={{ flex: 1, height: 56, border: 0, outline: 'none', background: 'transparent', fontFamily: 'var(--k-font-body)', fontSize: 16, color: 'var(--k-text-primary)' }} />
        </div>
        <ul role="listbox" style={{ margin: 0, padding: 8, listStyle: 'none', overflowY: 'auto' }}>
          {hits.length === 0 ? (
            <li style={{ padding: 16, fontSize: 14, color: 'var(--k-text-tertiary)' }}>No command matches “{q}”</li>
          ) : hits.map((c) => (
            <li key={c.id} role="option" aria-selected={false}
              onMouseDown={() => { onClose && onClose(); c.onRun && c.onRun(); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 44, padding: '0 12px', borderRadius: 'var(--k-radius-sm)', cursor: 'pointer', fontSize: 14.5, color: 'var(--k-text-body)' }}>
              {c.icon}
              <span style={{ flex: 1 }}>{c.label}</span>
              {c.group ? <span className="kds-eyebrow">{c.group}</span> : null}
              {c.shortcut ? <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: 12, color: 'var(--k-text-tertiary)' }}>{c.shortcut}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
