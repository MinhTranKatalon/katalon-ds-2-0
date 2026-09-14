import React from 'react';
import { ICONS } from './icon-glyphs.js';

/* One inherited currentColor, stroke 1.4 at every size, glyphs from the set only. */
export function Icon({ name, size = 20, label, style, ...rest }) {
  const glyph = ICONS[name];
  if (!glyph) {
    if (typeof console !== 'undefined') console.warn('[Katalon DS] no glyph named "' + name + '"');
    return null;
  }
  return (
    <svg
      viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ flex: 'none', display: 'block', ...style }}
      {...rest}
    >
      {label ? <title>{label}</title> : null}
      <g dangerouslySetInnerHTML={{ __html: glyph.join('') }} />
    </svg>
  );
}
