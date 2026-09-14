# Icons — eight mandatory rules

Source: `ds/line-icons.js`. Catalog: Foundations / Icons.

Eight rules, and none of them is a preference. An icon that breaks one is not a variant —
it is a different icon set, and two sets in one product is what makes an interface feel
unowned. Nobody edits these per screen, per squad or per deck.

**01 · Line only — never a fill.** A UI icon is an outline. A solid shape is a **Product
glyph** and nothing else, so a filled glyph in a toolbar reads as a product, not an action.

**02 · 24px grid, stroke 1.4, unchanged.** Drawn on the 24 grid and rendered at
**16 · 20 · 24 · 32** — the only sizes a UI icon ships at. The stroke stays **1.4** at
every one of them: no thickening, no faux bold. The one exception is a glyph set inline in
running text (a callout, a sentence, a caption), optically matched to that text and never
below **12px**.

**03 · Round caps, round joins.** Every terminal is a rounded cap and every corner is a
radius. No butt caps, no miter joins, no hard vertex anywhere in the set.

**04 · Strokes never touch.** Where shapes overlap, the one underneath is notched open by
**one stroke width (1.4u)**, and the gap is equal on both sides. The notch is **cut into
the outline** — never a shape filled with the background colour, which breaks the moment
the glyph is exported or dropped on another ground.

**05 · One colour, inherited.** The glyph takes `currentColor` from the row or button it
sits in. Any brand hue is allowed at **≥ 3:1**. No gradients, no two-tone glyphs, no
per-state recolouring inside the icon.

**06 · A background is a circle.** When a UI icon needs a ground it is a **circle** —
neutral grey or a pastel of any brand hue. The rounded square is reserved for Product
glyphs.

**07 · Only glyphs from the set.** No icon font, no emoji, no Unicode symbol as a glyph,
nothing drawn inline for one screen. If a glyph is missing, add it to the DS set and
regenerate — that is the only way the set grows.

**08 · Never the only signal.** Every icon-only control carries an `aria-label`, and every
status icon carries its word. An icon alone never conveys meaning, and colour alone never
conveys state.

## The quick test

**Round + line + inherited colour = UI icon.** **Rounded square + fill + product colour =
product glyph.** Shape, weight and colour together say which kind it is — never mix them.


## What is set in type, not drawn

Five marks are typographic. Pulling a glyph from the icon set for one of them is an error —
a book glyph is not a quotation mark.

| Mark | Where | Setting |
|---|---|---|
| `"` `U+201C` | a pull quote's opening mark | display face, weight 600, accent ink |
| `×` | close on a chip, tab or dialog | inherits the control's type |
| `▲` `▼` | number steppers | mono, small |
| `/` | breadcrumb separator | body face, tertiary ink |
| `…` | pagination gap | body face, tertiary ink, `aria-hidden` |
