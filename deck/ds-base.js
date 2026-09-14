// Loads Katalon DS 2.0 into the deck.
//
// The deck is routinely COPIED out of the package into a working folder. When that
// happens `../styles.css` no longer exists, every token disappears, and the deck
// silently renders in the browser's default serif with broken logos. So:
//
//   1. the webfonts load from Google directly — type never falls back to serif,
//      wherever the file sits;
//   2. styles.css is probed at several plausible locations instead of one.
//
// If your copy lives somewhere none of these reach, add its path to CANDIDATES —
// that is the only line to edit.
(() => {
  const CANDIDATES = ['../styles.css', './styles.css', '../../styles.css'];

  const add = (href, attrs) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    if (attrs) Object.assign(l, attrs);
    document.head.appendChild(l);
    return l;
  };

  // Inter Tight 300 is load-bearing: the sub-brand subname is weight 300 and
  // silently renders 400 without it.
  add('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  let i = 0;
  const tryNext = () => {
    if (i >= CANDIDATES.length) {
      console.error(
        '[Katalon DS] styles.css not found next to this deck. Copy the WHOLE deck/ ' +
        'folder — the .dc.html alone has no tokens, logos or pathway assets. ' +
        'Tried: ' + CANDIDATES.join(', ')
      );
      return;
    }
    const l = add(CANDIDATES[i++]);
    l.onerror = () => { l.remove(); tryNext(); };
  };
  tryNext();
})();
