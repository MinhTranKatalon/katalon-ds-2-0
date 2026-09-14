import React from 'react';

export function FileUpload({ accept, multiple, onFiles, hint = 'Drop a file here, or browse', className = '', style }) {
  const [over, setOver] = React.useState(false);
  const input = React.useRef(null);
  const take = (files) => { if (files && files.length && onFiles) onFiles(Array.from(files)); };
  return (
    <div
      className={className}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); take(e.dataTransfer.files); }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--k-sp-3)',
        padding: 'var(--k-sp-6)', textAlign: 'center',
        border: '1.5px dashed ' + (over ? 'var(--k-action-600)' : 'var(--k-border-strong)'),
        borderRadius: 'var(--k-radius-xl)',
        background: over ? 'var(--k-action-50)' : 'var(--k-bg-subtle)',
        transition: 'background-color var(--k-dur-fast) var(--k-ease-std), border-color var(--k-dur-fast) var(--k-ease-std)',
        ...style,
      }}
    >
      <span style={{ fontSize: 14, color: 'var(--k-text-secondary)' }}>{hint}</span>
      <button type="button" className="kds-btn kds-btn--neutral kds-btn--sm" onClick={() => input.current && input.current.click()}>
        Browse files
      </button>
      <input ref={input} type="file" accept={accept} multiple={multiple}
        onChange={(e) => take(e.target.files)} style={{ display: 'none' }} />
    </div>
  );
}
