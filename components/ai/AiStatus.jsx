import React from 'react';

/* The moving mark is the whole point: a static glyph here reads as frozen, not as thinking.
   The motion engine ships at the package root as thinking-mark.jsx. Load it on your page and
   pass it in as `mark`, or expose it as window.ThinkingMark. */
export function AiStatus({ mode = 'thinking', label, size = 28, tint = '#0F8461', mark, aiMarkSrc = 'assets/brand-svg/ai-katalon-color.svg', className = '', style }) {
  const Mark = mark || (typeof window !== 'undefined' ? window.ThinkingMark : null);
  React.useEffect(() => {
    if (!Mark && typeof console !== 'undefined') {
      console.warn(
        '[Katalon DS] AiStatus has no motion mark. Load thinking-mark.jsx and pass it as ' +
        '"mark", or set window.ThinkingMark. A static mark for a working agent is a defect.'
      );
    }
  }, [Mark]);
  return (
    <span role="status" aria-live="polite" className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--k-sp-3)', ...style }}>
      <span style={{ width: size, height: size, flex: 'none', display: 'inline-flex' }}>
        {Mark
          ? <Mark mode={mode} size={size} tint={tint} />
          : <img src={aiMarkSrc} alt="Katalon AI" width={size} height={size} />}
      </span>
      <span style={{ fontSize: 14, color: 'var(--k-text-secondary)' }}>{label}</span>
    </span>
  );
}
