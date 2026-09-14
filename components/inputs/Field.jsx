import React from 'react';

let n = 0;
const uid = () => 'kf' + (++n);

/* The label + hint + error shell. Named so the error message never gets dropped. */
export function Field({ label, hint, error, required, htmlFor, className = '', style, children }) {
  const id = htmlFor || uid();
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--k-sp-2)', ...style }}>
      {label ? (
        <label htmlFor={id} style={{ fontSize: 14, fontWeight: 600, color: 'var(--k-text-primary)' }}>
          {label}
          {required ? <span aria-hidden="true" style={{ color: 'var(--k-fail-600)' }}> *</span> : null}
        </label>
      ) : null}
      {typeof children === 'function' ? children({ id, invalid: !!error }) : children}
      {error ? (
        <span role="alert" style={{ display: 'flex', gap: 6, fontSize: 13, color: 'var(--k-fail-700)' }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 13, color: 'var(--k-text-tertiary)' }}>{hint}</span>
      ) : null}
    </div>
  );
}
