import React from 'react';

export function TagInput({ tags = [], onAdd, onRemove, placeholder = 'Add a tag', className = '', style }) {
  const [draft, setDraft] = React.useState('');
  const commit = () => { const t = draft.trim(); if (t) { onAdd && onAdd(t); setDraft(''); } };
  return (
    <div className={className} style={{
      display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
      minHeight: 44, padding: '7px 10px',
      background: 'var(--k-gray-0)', border: '1px solid var(--k-gray-300)',
      borderRadius: 'var(--k-btn-radius)', ...style,
    }}>
      {tags.map((t) => (
        <span key={t} className="kds-chip" style={{ padding: '4px 8px 4px 12px' }}>
          {t}
          <button type="button" aria-label={'Remove ' + t} onClick={() => onRemove && onRemove(t)}
            style={{ border: 0, background: 'transparent', cursor: 'pointer', color: 'var(--k-text-secondary)', fontSize: 14, lineHeight: 1, padding: '0 2px' }}>×</button>
        </span>
      ))}
      <input
        value={draft} placeholder={tags.length ? '' : placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); commit(); }
          if (e.key === 'Backspace' && !draft && tags.length) onRemove && onRemove(tags[tags.length - 1]);
        }}
        onBlur={commit}
        style={{ flex: 1, minWidth: 120, height: 28, border: 0, outline: 'none', fontFamily: 'var(--k-font-body)', fontSize: 14, background: 'transparent', color: 'var(--k-text-body)' }}
      />
    </div>
  );
}
