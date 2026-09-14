Renders one glyph from the Katalon line-icon set — use it anywhere an icon is needed, and never hand-roll an inline SVG.

```jsx
<Icon name="circle-check" size={20} />
<IconButton label="Refresh"><Icon name="arrows-rotate" size={20} /></IconButton>
```

Rules:
- Colour is inherited `currentColor` — set `color` on the parent, never a `fill` or a gradient.
- Sizes are 16 / 20 / 24 / 32. 16 inline with 13–14px text, 20 in toolbars and buttons, 24 in nav, 32 in empty states.
- `label` is mandatory when the icon carries meaning on its own; otherwise it is `aria-hidden`.
- If a glyph is missing, add it to `ds/line-icons.js` upstream and regenerate — do not draw one inline.
