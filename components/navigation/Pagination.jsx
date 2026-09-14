import React from 'react';

export function Pagination({ page = 1, pageCount = 1, onPage, total, pageSize, className = '', style }) {
  const go = (p) => { if (p >= 1 && p <= pageCount && p !== page && onPage) onPage(p); };
  const pages = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== '…') pages.push('…');
  }
  const from = total != null && pageSize ? (page - 1) * pageSize + 1 : null;
  const to = total != null && pageSize ? Math.min(page * pageSize, total) : null;
  return (
    <nav aria-label="Pagination" className={className}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--k-sp-4)', flexWrap: 'wrap', ...style }}>
      {from != null ? (
        <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: 13, color: 'var(--k-text-tertiary)' }}>
          {from}–{to} of {total}
        </span>
      ) : <span />}
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button type="button" className="kds-btn kds-btn--icon kds-btn--sm" aria-label="Previous page"
          disabled={page <= 1} onClick={() => go(page - 1)} style={{ width: 36 }}>‹</button>
        {pages.map((p, i) => p === '…' ? (
          <span key={'g' + i} aria-hidden="true" style={{ padding: '0 6px', color: 'var(--k-text-tertiary)' }}>…</span>
        ) : (
          <button key={p} type="button" aria-current={p === page ? 'page' : undefined} onClick={() => go(p)}
            style={{
              minWidth: 36, height: 36, border: 0, cursor: 'pointer',
              borderRadius: 'var(--k-radius-sm)',
              fontFamily: 'var(--k-font-mono)', fontSize: 13,
              background: p === page ? 'var(--k-action-100)' : 'transparent',
              color: p === page ? 'var(--k-action-700)' : 'var(--k-text-secondary)',
              fontWeight: p === page ? 600 : 400,
            }}>{p}</button>
        ))}
        <button type="button" className="kds-btn kds-btn--icon kds-btn--sm" aria-label="Next page"
          disabled={page >= pageCount} onClick={() => go(page + 1)} style={{ width: 36 }}>›</button>
      </span>
    </nav>
  );
}
