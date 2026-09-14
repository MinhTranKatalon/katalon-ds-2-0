# Colour — measured, never judged

Source of truth: `ds/katalon-ds.css` + `knowledge/COLOR-RULES.md`.
Catalog: Foundations / Colors.

## The palette

**Eight ramps × 11 steps** (50 → 950). The primary step is **600**.

| Ramp | 600 | Role |
|---|---|---|
| Action (Forest) | `#0f8461` | The one primary: every CTA, link, focus ring, and Pass/Success. Hover `700`, active `800`, tint `50`. **Step 600 is never a card, section or page fill** — for boxes the ramp fills only at 50–300 and 800–950. |
| Bright | `#19d89f` | Brand accent, "aha", confirmations. **Never a CTA.** |
| Info (Lilac) | `#5959eb` | Info banners, Beta badges. **Never the product action colour.** |
| Warning | `#fed730` | Highlight fills. **Yellow text must step to `800`/`900`.** |
| Fail | `#d14343` | Error, destructive. |
| Slate | `#43509b` | Pending status, charts, editorial. |
| Pink | `#bf3dc2` | Marketing campaigns only. Avoid in product. |
| Neutral | green-tinted | Text, surfaces, borders. **Never a pure-grey ramp.** |

Data-viz series in order: `--k-seq-1` … `--k-seq-6`.

## The binding rules

**WCAG 2.2 AA is a floor, not a target.**

1. Every text/fill pair measures **≥ 4.5:1** (≥ 3:1 only at headline scale).
2. Every button fill or outline measures **≥ 3:1** against the block behind it.
3. Every button label measures **≥ 4.5:1** on its own fill.
4. **Derive** text colour by measuring ink against the fill — never pick it by eye, and
   never from a hand-kept per-hue table. When you change a colour, **state the ratio**.
5. **No translucent text.** Text colour is a measured opaque ink: no `rgba()` alpha, no
   `opacity` on a text layer.
6. No white fill on a light hue without an ink outline. No yellow text on yellow.
7. **Colour is never the only signal.** Every status carries its word; every coloured glyph
   sits beside a label.

## The page ground is always a neutral tint

Owned by `rules/layout.md` ("One canvas for the whole page"). Repeated here only as the
colour list of what may and may not be a ground.

**The main background of a page is always off the Neutral ramp. Never another brand hue.**

| Token | Value | Use |
|---|---|---|
| `--k-bg-page` | `gray-0` #ffffff | **The default.** |
| `--k-bg-subtle` | `gray-50` #f6f8f7 | An alternating section, to break rhythm. |
| `--k-bg-muted` | `gray-100` #eef2f0 | A recessed area: code block, table head, secondary panel. |

**One or two grounds per page.** More than that and the page loses its rhythm, and nothing
is left to stand out.

Not page grounds, and never promoted to one:

- `--k-bg-canvas` #eaf6ef — the **product app** canvas only.
- `--k-bg-forest` #06392b / `--k-bg-dark` #0c1411 — a deliberate dark section or theme,
  chosen per section, not as the page's ground.
- **`action-600` is never a card or ground fill** — not a page, not a section, not a card.
  It is the button, CTA and focus fill, and a green ground leaves those nothing to be
  brighter than. See "Card colour carries importance" for what fills a card instead.
- Any pastel of Bright, Info, Warning, Fail, Slate or Pink — those tint *blocks*
  (banners, cards, badges), never the page.

The reason is structural, not aesthetic: the action colour only reads as "the one thing to
click" against a neutral ground. Tint the ground with a brand hue and every CTA on the
page loses a step of contrast.

## Card colour carries importance

**A card's background states how important its content is.** A page that uses all three
tiers lets a reader rank the content at a glance, before reading a word. This is the one
place colour does semantic work rather than decoration.

Read the user's content first and decide what actually matters most. The tier follows the
**content**, never the desire for a colourful grid.

### Tier 1 — the most important content

A section usually holds **more than one card**, so tier 1 comes in two shapes:

| Shape | Fill | Ink |
|---|---|---|
| **One card alone** | Forest **800–950**, or any brand **600** | derived — white on Forest 800–950 (9.58–17.01:1), per the table below on a 600 |
| **Several cards together** | a **pure 600** — one per card, **every card a different hue** | derived per hue, below |

**Forest 600 is never a card or ground fill.** It is the action colour — CTA, link, focus ring, Pass
— and a Forest 600 card competes with every button on the page for the same meaning. The
Forest ramp fills only at its ends: 50–300 and 800–950. Every *other* ramp's 600 is
available as a tier-1 fill.

**The ink is measured, never chosen.** Two of the seven are light fills and take ink; five
are dark and take white:

| Fill | Hex | Ink | Measured |
|---|---|---|---|
| Bright Green 600 | `#19d89f` | **ink** | 10.11:1 |
| Yellow Buzz 600 | `#fed730` | **ink** | 13.33:1 |
| Luminous Lilac 600 | `#5959eb` | **white** | 5.18:1 |
| Blue Slate 600 | `#43509b` | **white** | 7.34:1 |
| Neutral 600 | `#5b6661` | **white** | 5.97:1 |
| Signal Red 600 | `#d14343` | **white** | 4.57:1 |
| Steel Pink 600 | `#bf3dc2` | **white** | 4.50:1 |

**A CTA on a 600 card is never green.** An `action-600` fill measures **1.02–2.53:1**
against six of the seven — it fails the 3:1 floor and disappears into the card. On a light
fill the CTA is a **black fill with a white label**; on a dark fill a **white fill with an
ink label**. Both measure 18.69:1. (Yellow is the sole hue where green technically passes,
at 3.33:1 — do not take it: one exception would make the pattern unreadable across a row.)

### Tier 2 — supporting content

A **tint** of any brand ramp at step **200** (300 when a section needs more separation),
one hue per card — the same one-colour-per-card discipline as tier 1, a step quieter. Ink is
`--k-text-primary` (13.3–16.8:1 on every tint).

**Step 100 is not a tier-2 fill.** Measured against the page it is 1.01–1.18:1 — on
`bg-subtle` as little as 1.01:1. The card becomes invisible and the tier signal it was
carrying disappears. Step 200 is the quietest tint that still reads as a tint.

Steps **50–100 keep their own job**: callouts, inline notes and badges — small elements
that carry a border and sit directly on the page. What they cannot be is a **card or
section fill**, where the same 1.01–1.18:1 leaves a large box with nothing to read.

**The border is the Card component's, not a colour decision.** A card is a fill plus a 1px
border (see the Cards rule) — a tinted card keeps that border and tints it to the hue's
**300**. Colour does not get to add or drop it: a tint at 200 measures 1.01–1.32:1 against
the ground, so the border is what gives every card its edge, coloured or not.

**The icon ground is a circle in any brand tint** — white is one option, not the rule.
What is not optional is measuring it against the card it sits on, because a circle you
cannot see is not a ground.

Measured against a 200-tint card, best to worst:

| Circle | Separation from the card | Icon ink on the circle |
|---|---|---|
| the hue's **400** | **1.11–2.14:1** — the most reliable | 6.21–15.92:1 |
| the hue's **300** | 1.08–1.40:1 | 9.48–16.32:1 |
| **white** `gray-0` | 1.06–1.41:1 | 18.69:1 |
| the hue's **50/100** | 1.03–1.30:1 — usually too close | 15.8–18.5:1 |

So: **step 400 of the card's own hue** is the default, white when you want the circle to
read as neutral. Every option carries the icon well past 3:1 — the circle-to-card edge is
the only thing at risk.

**On Yellow, drop the circle.** No ground reaches even 1.11:1 against `warning-200`, white
included (1.06:1). The icon sits directly on the tint at 18.17:1. Never outline a circle to
rescue it — an outline admits the fill failed.

### Tier 3 — everything else

`--k-bg-page` / `--k-bg-subtle` / `--k-bg-muted`, ink `--k-text-primary` (≥16.5:1).

### Rules

1. **Every ramp's 600 is a tier-1 fill except Forest** — Bright, Yellow, Lilac, Slate,
   Neutral, Red and Pink are available for top-importance cards. Forest 600 is the one exception, because it is the action colour;
   for a green card use Forest 800–950.
2. **Within a tier, every card is a different hue.** Two cards sharing a fill read as one
   group, which is the opposite of what the colour is doing there.
3. **The tier comes from the content.** Never colour a card to fill a
   gap, balance a grid or add variety. If nothing in a section outranks the rest, the whole
   section is tier 3 — a valid answer.
4. **Which ink each 600 takes** — per the table above. Never white on Bright or Yellow: it
   measures 1.40–1.85:1.
5. **A CTA on a 600 card is never green** — black-on-light, white-on-dark.
6. **Step 100 is not a card or section fill.** It measures 1.01–1.18:1 against the page —
   on `bg-subtle` as little as 1.01:1, so the box goes invisible and the tier signal it
   was carrying disappears. Step 200 is the quietest tint that still reads as a tint.
   Steps 50–100 remain correct for callouts, notes and badges.
7. **The icon ground is measured, not assumed white.** The circle may be any brand tint:
   step 400 of the card's own hue separates best (1.11–2.14:1), white reads neutral
   (1.06–1.41:1), steps 50–100 are usually too close (1.03–1.30:1). On Yellow nothing
   clears 1.11:1 — drop the circle and put the icon on the tint at 18.17:1.
8. **A semantic hue keeps its meaning.** Signal Red says failure and Yellow says caution
   wherever they appear — do not spend them on neutral content for the sake of a different
   colour. Steel Pink stays marketing-only; never in product UI.
9. **Tiers never invert.** A tier-3 card is never louder than a tier-1 card above it. If a
   neutral card dominates, the problem is its size or position, not its colour.

The tiers are **cards on the canvas**, which is why this does not contradict the page-ground
rule above: the page stays neutral, and the colour sits in the boxes on it.

## Green ink is always `action-700`

Ink and fill are different jobs and take different steps.

| Use | Token | Why |
|---|---|---|
| **Green text** — links, text-CTAs, accent ink | `--k-action-700` `#0c6a4e` | Clears 4.5:1 on **every** ground |
| **Green fill** — buttons, chips, accent blocks | `--k-action-600` `#0f8461` | A fill is judged at 3:1, which it passes |

`action-600` measures **4.67:1** on pure white but only **4.42:1** on
`--k-bg-subtle`, **4.14:1** on `--k-bg-muted` and **4.21:1** on
`--k-bg-canvas` — under the floor on all three, including the product canvas.
`action-700` measures **6.59:1** on white, **6.23** on subtle, **5.94** on
canvas, **5.83** on muted.

So ink takes **one** value on every surface — marketing, product and deck alike
— rather than a per-ground exception nobody remembers at 5pm. Hover steps to
`--k-action-800`.

`--k-text-link` and `--k-text-link-hover` already resolve to 700/800; use the
semantic tokens and this is automatic.

**A button written as a link** (`<a class="kds-btn kds-btn--primary">`) keeps the
button's own white ink — `ds/katalon-ds.css` carries the specificity reset that
makes that hold.

## Surfaces

Product UI canvas `--k-bg-canvas` `#eaf6ef` with white cards; marketing on white /
`--k-bg-subtle`. Deep ground `--k-bg-forest`; mono ink on it is `--k-code-ink`.

Never mix the product palette and the marketing accents on one surface. If the surface is
ambiguous, **ask** (law 03).


## Card borders on a light ground — measured, not chosen

A card border's job is to hold the card off the page. On a **white projector screen** a pale
hue border does not do that, and two hues can never do it at any step:

| Hue | Strongest border vs white |
|---|---|
| action | 600 → 4.67:1 |
| info | 600 → 5.18:1 |
| pink | 600 → 4.50:1 |
| slate | 600 → 7.34:1 |
| **bright** | 600 → **1.85:1** — fails at every step |
| **warning** | 600 → **1.40:1** — fails at every step |

So **a card in a hue grid takes a neutral border**, `--k-gray-500` (3.54:1 on white,
3.3–3.5:1 on the -50 fills). One edge colour for all six hues. The hue lives in the fill and
in the 4px top accent line, never in the 1px edge.

Corollary: **yellow and bright are fill-and-accent hues only.** They may fill a card, tint a
tile or draw a 4px line; they may never be asked to carry a 1px boundary or a text colour.
