# Katalon colour contract — measured, not judged

**Status: hard rule. WCAG 2.2 Level AA is a floor, not a goal. A pairing that does not
measure is not shipped — there is no aesthetic exemption.**

Applies to every Katalon marketing surface (landing, pricing, campaign, email, deck,
banner, card). Product-UI additions live in `DESIGN.md`; where the two disagree on a
ratio, the higher number wins.

---

## 0 · The three checks

Run all three on every coloured block. They are independent — passing one says nothing
about the others, and conflating them is the single most common failure.

| Check | Pair | Minimum | WCAG |
|---|---|---|---|
| **Text** | text colour vs block fill | **4.5:1** | 1.4.3 |
| **Component boundary** | button fill (or its outline) vs block fill | **3:1** | 1.4.11 |
| **Button label** | label vs button fill | **4.5:1** | 1.4.3 |

Large text (≥24px, or ≥19px bold) may use 3:1 — but only where it is genuinely display
type. Body copy, labels, captions and meta text never take the large-text allowance.

**Formula.** WCAG relative luminance, sRGB, no shortcuts:

```
c   = channel / 255
lin = c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ^ 2.4
L   = 0.2126·R + 0.7152·G + 0.0722·B
ratio = (L_lighter + 0.05) / (L_darker + 0.05)
```

## 1 · Text colour is derived, never chosen

For any block fill, compute the ratio against ink `#0c1411` and against white `#ffffff`.
**Whichever is higher is the text colour.** This is not a judgement call and it is not a
per-hue table someone maintains by hand — hand-set tables are what let a green button
land on a green block.

Two mid-steps that look alike invert:

| Fill | Ink | White | Text |
|---|---|---|---|
| `info-500` `#7a7aef` | **5.21** | 3.59 ✗ | ink |
| `slate-500` `#636eac` | 3.88 ✗ | **4.82** | white |

Never assume a step number implies a text colour.

## 2 · No translucent text, ever

`rgba(255,255,255,.82)` measures lower than white. On a fill that only just cleared at
full strength (`fail-600` = 4.57) the faded variant fails. **Support copy is solid;
hierarchy comes from size and weight.** The same applies to ink at reduced opacity.

## 3 · The button follows the block

Three fills, and the block picks which one — never taste.

| Block | Fill | Label | Why |
|---|---|---|---|
| Neutral canvas, any pastel (100–300) | `action-600` | white | green separates by 3.8–4.4 |
| Saturated **light** hue (`warning-600`, `bright-600`) | **ink `#0c1411`** | white | green reaches only 3.3 / 2.5 there |
| Saturated **dark** hue, deep or dark page | white | ink | white separates by 5.5–13.0 |

- Green's threshold is **3.5:1, not 3.0** — a fill that clears the floor by a
  third of a point is legal and still reads weak. Brand yellow is exactly that
  case (3.33), so yellow takes the ink button.
- **The ink button is the answer on brand yellow and bright green** — fill 13.3:1
  and 10.1:1, label 18.7:1. Do not use white-with-an-ink-outline there: the
  outline is legal by 1.4.11 but the fill still vanishes at 1.40, and two inks
  (outline + label) on one pill is a weaker mark than one solid ink.
- **White fill is illegal on a light hue** without an outline, and unnecessary
  once ink is available.
- **White fill is illegal on a light hue.** White on `warning-600` measures 1.40:1 — the
  label is legible, the button has no shape. If a white fill is required there it must
  carry an **ink outline** (13.33:1), which satisfies 1.4.11 by boundary instead of fill.
- A ghost button's border follows its own label: ink label → ink border.

## 4 · Yellow

- Yellow **text** steps to `warning-800` minimum on white — `600` fails.
- **Yellow on yellow does not work at any step.** `warning-900` `#8a7218` on
  `warning-300` measures 4.10 — still short. Use `gray-700` (8.5:1).

## 5 · Steps that are barred as block fills

| Fill | Why |
|---|---|
| `pink-600` `#bf3dc2` | white = **4.50**, exactly the boundary; rounding decides pass/fail. Use `pink-700` (5.48). |
| `fail-600` `#d14343` | white = 4.57, passes but with no margin. Prefer `fail-700` for any block carrying more than a heading. |
| `action-500` / `action-600` as a *block* | green is the action colour; a green block cancels the green button. Green blocks use `100`, `200` or `800`. |

## 6 · Verified fills — all clear AA

Text colour derived per §1; ratio is that colour against the fill.

| Fill | Text | Ratio | Separation vs white page |
|---|---|---|---|
| `action-100` `#ecf4f2` | ink | 16.72 | 1.118 |
| `action-200` `#cfe6df` | ink | 14.27 | 1.309 |
| `action-600` `#0f8461` | white | 4.67 | 4.673 |
| `bright-200` `#d1f7ec` | ink | 16.22 | 1.152 |
| `bright-600` `#19d89f` | ink | 10.11 | 1.848 |
| `info-200` `#f3f1ff` | ink | 16.76 | 1.115 |
| `info-600` `#5959eb` | white | 5.18 | 5.181 |
| `pink-200` `#f8ecf9` | ink | 16.34 | 1.144 |
| `pink-700` `#aa36ac` | white | 5.48 | 5.479 |
| `warning-300` `#fff0b0` | ink | 16.32 | 1.145 |
| `slate-200` `#e4e7f5` | ink | 15.17 | 1.232 |
| `slate-600` `#43509b` | white | 7.34 | 7.344 |
| `fail-200` `#fbcfcf` | ink | 13.28 | 1.407 |

Support text on any pastel above: `gray-700` clears 4.5 on all of them (6.95–8.77).
`gray-600` clears on most but drops to 4.24 on `fail-200` — check before using it.

`bright-600` is the trap: **light** (so ink text) yet it swallows green (green vs
`bright-600` = 2.53), so its button goes ink, not green. Lightness and
green-separation are separate questions.

## 7 · Never meaning by colour alone

Every status carries its word. Every coloured glyph carries its label. A red border is
the second signal, never the only one.

## 8 · Icons and product marks

Since functional icons may now take any brand hue, hue no longer distinguishes them from
product marks. Two other signals carry it, and both are mandatory:

- **UI icon** — line glyph, stroke **1.4** on a 24 grid, rounded caps, in a **circle**.
  Any brand hue, chosen for the surface. Never a fill. Icons come from
  `assets/icons/svg/` (186 files) — never hand-drawn, never an icon font.
- **Product mark** — solid glyph in a **rounded square** on its pastel tile, 96 master,
  `rx 27`. A locked inventory of 7; never redrawn, recoloured or tinted, and never placed
  on a saturated or dark fill — every locked tile measures only 1.10–1.20 against
  white, so a neutral or pastel ground is what lets the tiles read at all.

Icon stroke against its background still needs **3:1** (1.4.11) when the icon carries
meaning on its own. `warning-800` stroke on white measures 2.76 — step to `900`.

## 9 · Checklist

- [ ] Every text/fill pair measured ≥4.5:1 (≥3:1 only for true display type).
- [ ] Every button fill or outline ≥3:1 against its block; every label ≥4.5:1 on its fill.
- [ ] No translucent text anywhere.
- [ ] No white fill on a light hue without an ink outline.
- [ ] No yellow text on yellow at any step.
- [ ] No `pink-600` block; no green block at `500`/`600`.
- [ ] Page canvas neutral; 2–3 coloured blocks per page; no two same-hue blocks touching.
- [ ] Card fill separates from page fill by ≥1.10.
- [ ] Icons: line, 1.4, in a circle, from the icon set. Products: solid, rounded square,
      untouched, on neutral.
- [ ] Every status has its word; no meaning by colour alone.
