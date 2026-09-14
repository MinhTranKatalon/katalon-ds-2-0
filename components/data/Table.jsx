import React from 'react';

export function Table({ columns = [], rows = [], caption, zebra, dense, className = '', style }) {
  const pad = dense ? '10px 14px' : '14px 18px';
  return (
    <div className={className} style={{
      border: '1px solid var(--k-border-default)', borderRadius: 'var(--k-radius-lg)',
      overflow: 'hidden', background: 'var(--k-gray-0)', ...style,
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--k-font-body)' }}>
        {caption ? <caption style={{ captionSide: 'top', textAlign: 'left', padding: pad, fontSize: 13, color: 'var(--k-text-tertiary)' }}>{caption}</caption> : null}
        <thead>
          <tr style={{ background: 'var(--k-bg-subtle)' }}>
            {columns.map((c) => (
              <th key={c.key} scope="col" style={{
                padding: pad, textAlign: c.align || 'left',
                fontSize: 13, fontWeight: 600, color: 'var(--k-text-secondary)',
                borderBottom: '1px solid var(--k-border-default)', whiteSpace: 'nowrap',
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id ?? i} style={{ background: zebra && i % 2 ? 'var(--k-bg-subtle)' : undefined }}>
              {columns.map((c) => (
                <td key={c.key} style={{
                  padding: pad, textAlign: c.align || 'left',
                  fontSize: 14, color: 'var(--k-text-body)',
                  fontFamily: c.mono ? 'var(--k-font-mono)' : undefined,
                  fontVariantNumeric: c.mono ? 'tabular-nums' : undefined,
                  borderTop: i ? '1px solid var(--k-border-subtle)' : 0,
                }}>{c.render ? c.render(r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
