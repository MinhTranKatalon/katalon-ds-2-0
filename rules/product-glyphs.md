# Product glyphs — six mandatory rules

Catalog: Foundations / Product glyphs.

Seven products, each a **filled glyph in a rounded square**, in two ground variants.

**01 · The catalog page is the only correct version.** The seven glyphs shown there, in
these two ground variants, are the whole set. A glyph that is not on that page is not a
Katalon product glyph — redraw, recolour, re-crop or trace nothing; take the version from
there.

**02 · Two grounds, one pair each.** Light ground takes the pastel plate + deep glyph.
Dark ground takes the deep plate + bright glyph. There is no third variant, no mono
version and no outline version.

**03 · Never invert, never filter.** The dark version is a **measured** colour pair, not
the light one flipped. No `filter: invert`, no `opacity`, no `mix-blend-mode`, no
`hue-rotate` — those break the hue and the contrast at once.

**04 · The pair is fixed per product.** Each product owns exactly one hue pair on each
ground. Never swap a product onto another product's colour, and never tint one by eye to
match a layout.

**05 · Products only — never a UI icon.** Filled glyph in a rounded square = a Katalon
product. Line glyph on a circle = a UI action. Using a product glyph as a functional icon
(or the reverse) removes the one signal that tells them apart.

**06 · Geometry is not adjustable.** Rounded square, radius **0.28×** the edge, glyph
centred at **0.6×** the plate. Don't stretch, rotate, crop, round further, or add a border
or shadow.

## The measured pairs

| Product | Light plate / glyph | Dark plate / glyph | Glyph-on-plate (dark) |
|---|---|---|---|
| Test Management | `#edeefb` / `#7a7aef` | `#313160` / `#dedefb` | 9.17:1 |
| Test Execution Cloud | `#fdf3e1` / `#bd862a` | `#4c3611` / `#efe1ca` | 8.84:1 |
| Studio Enterprise | `#e3f6ee` / `#12a877` | `#074330` / `#c4e9dd` | 8.65:1 |
| Runtime Engine | `#ebecf7` / `#5b5fb0` | `#40437b` / `#dedfef` | 6.90:1 |
| Production Insights | `#fce8f3` / `#d6388a` | `#561637` / `#f5cde2` | 9.40:1 |
| Private SaaS | `#e9f5f7` / `#1f8a98` | `#0c373d` / `#c7e2e5` | 9.47:1 |
| Premier Support | `#fcecf0` / `#c0476a` | `#86324a` / `#f2dae1` | 6.19:1 |

Dark pairs were derived against the `#0c1411` ground: the plate separates from the ground
and the glyph clears the plate by ≥ 4.5:1.
