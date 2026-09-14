import React from 'react';
import { Icon } from '../icons/Icon.jsx';

const STATE = {
  running: { ink: 'var(--k-action-700)', word: 'Running' },
  done:    { ink: 'var(--k-pass-700)',   word: 'Done' },
  failed:  { ink: 'var(--k-fail-700)',   word: 'Failed' },
};

export function ToolCall({ name, state = 'done', summary, detail, defaultOpen, className = '', style }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  const s = STATE[state] || STATE.done;
  return (
    <div className={className} style={{
      border: '1px solid var(--k-border-default)', borderRadius: 'var(--k-radius-lg)',
      background: 'var(--k-bg-subtle)', overflow: 'hidden', ...style,
    }}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10, width: '100%',
          minHeight: 44, padding: '0 14px', border: 0, background: 'transparent',
          cursor: detail ? 'pointer' : 'default', textAlign: 'left',
        }}>
        <span style={{ color: 'var(--k-text-tertiary)', flex: 'none' }}><Icon name="terminal" size={16} /></span>
        <code style={{ fontFamily: 'var(--k-font-mono)', fontSize: 12.5, color: 'var(--k-text-primary)' }}>{name}</code>
        <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: 11.5, color: s.ink }}>{s.word}</span>
        {summary ? <span style={{ flex: 1, fontSize: 13, color: 'var(--k-text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{summary}</span> : <span style={{ flex: 1 }} />}
        {detail ? <span aria-hidden="true" style={{ flex: 'none', fontSize: 9, color: 'var(--k-text-tertiary)', transform: open ? 'none' : 'rotate(-90deg)' }}>▼</span> : null}
      </button>
      {open && detail ? <pre className="kds-code" style={{ margin: 0, borderRadius: 0 }}>{detail}</pre> : null}
    </div>
  );
}
