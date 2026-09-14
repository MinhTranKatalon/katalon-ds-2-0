# Page layout — one canvas, boxes on it

Catalog: Guidelines / How to divide sections.

**One neutral canvas for the whole page. Sections are separated by rounded-corner boxes
placed on that canvas — never by stacked edge-to-edge colour bands.**

The canvas shows around and between the boxes, so every coloured block reads as a
deliberate accent instead of a stripe. A page sliced into full-bleed bands has no canvas
left: each band competes with the next, and nothing reads as foreground.

## Do

- One ground for the page — `--k-bg-page` by default (see `colour.md`).
- Each section that needs its own colour is a **box**: rounded corners, inset from the
  page gutter, canvas visible on all sides.
- `--k-bg-forest` `#06392b` is the **fill of a box** — a code panel, a feature box —
  always with rounded corners. It is not a canvas.
- `--k-bg-subtle` may serve as a second ground for one alternating section, but at most
  one or two grounds exist on a page.

## Don't

- Slice the page into stacked full-width colour bands.
- Give a section a full-bleed coloured background to "separate" it — separation is the
  canvas showing through, plus space.
- Stack two coloured bands adjacent with no canvas between them.
- Use a brand hue as a page ground (see `colour.md`).

## The one exception

**Only the footer may bleed edge to edge** — it closes the page rather than dividing it.
