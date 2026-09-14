---
name: katalon-ds-2-0
description: >-
  Katalon Design System 2.0 — the binding brand system for every Katalon
  surface. Use it whenever the task is a Katalon screen, flow, component,
  landing page, pricing page, email, graphic, design review, or a slide deck of
  any kind (all-hands, QBR, product or board review, kickoff, readout,
  post-mortem, "put this into Katalon slides"), and whenever someone asks for
  "our design system", "our brand", "our tokens" or "our deck template".
  Supplies the Forest-green action colour #0f8461, eight 11-step ramps with a
  measured-contrast contract, flat elevation, Inter / Inter Tight / JetBrains
  Mono, the full --k-* token set, 59 built components in 9 groups, the 39-slide
  1920x1080 deck template, and binding rules for colour, icons, product glyphs,
  pathway, sub-brand lockups, the AI mark, layout and compliance. Rules are
  applied, never invented: if one is unclear or missing, ask.
---

# Katalon Design System 2.0 — build skill

You are designing for **Katalon**. Everything you produce must read as one system:
Forest-green primary, flat surfaces, Inter type, measured contrast, accessible by default.

## 0 · The standing instruction — read before anything else

> **An agent does not change the rules, and does not invent what is missing.
> If a rule is unclear or absent — ask.**

Read `rules/RULE-AUTHORITY.md` in full before your first edit. Its seven laws sit above
every other rule in this system. The ones agents break most often:

- **Law 02** — if this system does not state a value, that is not permission to pick one.
- **Law 03** — a missing or unclear rule is a **question**, not a judgement call. A guess
  that happens to look fine is still a breach.
- **Law 05** — colour, contrast and geometry are **measured**. When you change one, state
  the measured ratio. "It looks right" is not evidence.
- **Law 06** — **silence is not permission.** No shadow, gradient, emoji, countdown or new
  font just because nothing forbids it explicitly.
- **Law 07** — the catalog is the source, not your memory of it. A live Katalon surface
  that contradicts it is the bug.

Four areas are marked **Ask first** in the authority table — Typography rules, Spacing &
radius rules, Logo rules, Imagery & data viz rules. They are documented but carry no
binding rule block. Do not fill those gaps yourself.

## 1 · Before you build

1. `ds/katalon-ds.css` — the token contract. 234 `--k-*` definitions + `.kds-*` classes.
2. `rules/` — the binding rules per domain: `colour`, `icons`, `product-glyphs`,
   `pathway`, `sub-brand`, `ai-mark`, `layout`, `compliance`.
3. `components/` — **59 built components** in 9 groups; read the `.prompt.md` beside the one
   you need before you write any markup.
4. `catalog.dc.html` — the living catalog: 77 pages, every component with a "what / when"
   note, a live demo and a snippet. Open it; don't reconstruct it from memory.
5. `guidelines/*.card.html` — 20 foundation specimens (colour ramps, card tiers, type scale,
   space, radius, elevation, motion, states, brand, voice, accessibility).
6. `knowledge/` — `COLOR-RULES.md` (binding contrast contract), `DESIGN.md` (brand),
   `UIUX-KNOWLEDGE.md` (general UX; §11 pre-ship checklist, §12 pricing pages).
7. Confirm the **surface** (§2) before picking a palette.

## 2 · Which surface — decide first

| Surface | Primary action | Canvas |
|---|---|---|
| **Product UI** (app, chat, dashboards) | Forest `--k-action-600` `#0f8461` | `--k-bg-canvas` `#eaf6ef`, white cards |
| **Marketing / web / pricing** | same Forest green for CTAs | white / `--k-bg-subtle` |

Marketing may use Bright green, Lilac and Pink as **decorative accents** — never as a CTA,
never in product UI. **Never mix the two looks on one surface.** If the surface is
ambiguous, ask (law 03).

Not designing for the web? Katalon **Studio** (the Eclipse/SWT desktop IDE) has its own
system — tighter radii, 24–32px control heights, no 44px targets. Use that one there.

## 3 · Setup

```html
<link rel="stylesheet" href="styles.css">
<div class="kds-scope">…</div>
<div class="kds-scope kds-scope--canvas">…</div>   <!-- product canvas -->
```

`styles.css` imports in the **one correct order**. `ds/katalon-ds.css` must load **last**:
about 70 `--k-*` names exist in both it and the marketing token file, and its values are
the contract (green-tinted greys, Forest-green links and focus ring, `shadow: none`).
Reorder the imports and links silently turn blue and shadows come back. A page that loads
only the marketing bundle is **not** on DS 2.0.

Then style with `var(--k-*)` or `.kds-*`. **Never a literal hex** — including in a style
attribute (rule 1 of the linter).

## 4 · Colour

Eight ramps × 11 steps, primary step **600**. Action `#0f8461` (hover 700, active 800,
tint 50) is the one primary — CTA, link, focus ring and Pass/Success all share it.
Bright `#19d89f` accent only. Info/Lilac `#5959eb`. Warning `#fed730` — **yellow text
steps to 800/900**. Fail `#d14343`. Slate `#43509b` for Pending and charts. Pink
`#bf3dc2` campaigns only. Neutral is **green-tinted**, never pure grey. Data-viz in order
`--k-seq-1..6`.

**Green ink vs green fill.** Text takes **`--k-action-700`** `#0c6a4e` on every
ground; fills take **600**. `action-600` measures 4.67:1 on pure white but
4.14–4.42:1 on the tinted grounds (`bg-subtle`, `bg-muted`, `bg-canvas`) —
under the floor, product canvas included. 700 clears all of them (6.59 white ·
6.23 subtle · 5.94 canvas · 5.83 muted), so ink is one value everywhere.
`--k-text-link` / `--k-text-link-hover` resolve to 700/800 — use the semantic
tokens and it is automatic.

**Contrast is a contract, not a preference** (`rules/colour.md`): text ≥ 4.5:1 · headline
scale ≥ 3:1 · button fill or outline ≥ 3:1 against its block · button label ≥ 4.5:1 on its
fill. **Derive** ink by measuring it against the fill — never by eye, never from a
remembered table. **No translucent text** (no `rgba()` alpha, no `opacity` on a text
layer). Colour is never the only signal.

### Every section of cards is tiered — this is not optional

**Whenever a section holds two or more cards, assign a tier to each one before you write
any markup.** Read the user's content, decide what actually matters most, and let the fill
say so. A section of identical white cards throws away the one job colour does here.

| Tier | Fill | Ink |
|---|---|---|
| **1 · top importance** | one **pure 600 per card**, **a different hue on every card** — Bright, Yellow, Lilac, Slate, Neutral, Red, Pink | **derived**: ink on Bright (10.11:1) and Yellow (13.33:1); white on Lilac 5.18, Slate 7.34, Neutral 5.97, Red 4.57, Pink 4.50 |
| **1 · a single hero card** | Forest **800–950**, or any brand 600 | white on Forest 800–950 (9.58–17.01:1) |
| **2 · supporting** | a **tint at step 200**, again **one hue per card** | `--k-text-primary`, 13.3–16.8:1 |
| **3 · the rest** | `bg-page` / `bg-subtle` / `bg-muted` | `--k-text-primary` |

Four things that go wrong every time if you do not read them:

- **Forest 600 is never a card fill.** It is the action colour. For a green card use 800–950.
- **A CTA inside a 600 card is never green** — an `action-600` fill measures 1.02–2.53:1
  against six of the seven and vanishes. Light fill → **black fill, white label**; dark fill
  → **white fill, ink label**. Both 18.69:1.
- **Step 100 is not a card fill** (1.01–1.18:1 — invisible). Step 200 is the quietest tint
  that still reads.
- **The icon circle is not always white.** Step **400 of the card's own hue** separates best
  (1.11–2.14:1); white reads neutral (1.06–1.41:1). **On Yellow, drop the circle** — nothing
  clears 1.11:1; put the icon straight on the tint.

Full table and the nine numbered rules: `rules/colour.md` → "Card colour carries importance".

### Sections are boxes on one canvas

One neutral ground for the whole page; a section that needs colour is a **rounded-corner box
inset from the gutter**, canvas showing around it. **Never stack full-bleed colour bands** —
only the footer may bleed edge to edge. `rules/layout.md` carries the five rules.

### A working agent shows a moving mark

Any surface depicting Katalon AI mid-task uses **`ThinkingMark`** from `thinking-mark.jsx`,
in the mode that names the actual work — `analyzing` for reading a log, `executing` for
running a suite, `working` for a tool call. **A static avatar there is a bug, not a
simplification**: it reads as frozen, not as thinking. Never a spinner, three dots or a line
icon in its place. Sixteen modes, listed in `rules/ai-mark.md`.

```html
<x-import component="ThinkingMark" from="./thinking-mark.jsx"
          mode="analyzing" size="28" tint="#0F8461" hint-size="28px,28px"></x-import>
```

### Sub-brand lockups are never hand-built

Use the class and set **one** value:

```html
<span class="k-sub-lockup" style="--k-sub-h:30px;">
  <img class="k-sub-logo" src="assets/logos/primary-lockup.svg" alt="Katalon">
  <span class="k-sub-name k-sub-name--product">Studio</span>
</span>
```

Writing your own span with your own `gap` and `font-size` always produces the same defect:
the subname drifts off the wordmark baseline. It is `align-items:flex-end` plus a baseline
nudge, never `center`. Inter Tight **300** must be loaded or it silently renders 400.
`rules/sub-brand.md` carries the eight rules.

## 5 · Type, shape, space, motion

- **Inter Tight** display/headings · **Inter** body/UI · **JetBrains Mono** code, figures,
  timestamps, token names. Inter Tight **300** must be loaded — the sub-brand subname is
  weight 300 and silently falls back to 400 otherwise.
- Marketing may go large and expressive; **product UI stays tight** — body 14–15px,
  headings h4/h5. Never 88px hero type in an app panel. Minimum 12px anywhere.
- Sentence case throughout; the **mono eyebrow** (11–13px, `.12em`, uppercase) is the only
  uppercase text.
- **Flat system — no shadows.** Depth is a 1px border plus a tinted surface. Shadow tokens
  resolve to `none`; don't reintroduce them.
- Radius `6 / 8 / 10 / 12 / 16 / 999` (`--k-radius-*`): input 8 · button 10 · banner 12 ·
  card 16 · popup 20 · pill. No stray values.
- Spacing 4px base, `--k-sp-1..10`. Lay out with flex/grid + `gap`, never margin chains.
- Motion: hover/toggle 150ms · card/menu 200ms · modal/drawer 320ms
  (`--k-dur-fast/base/slow`, `--k-ease-std/out/in`). Always honour
  `prefers-reduced-motion`.
- Hit target **≥ 44px** web and mobile; a dense product toolbar may go to **32px**, never
  below.

## 6 · Icons — eight rules, no exceptions

Full text in `rules/icons.md`. The short form:

**Line only, never a fill** · **24 grid, stroke 1.4, at every size** (render at
**16 / 20 / 24 / 32**; inline-in-text glyphs optically matched, never under 12px) · **round
caps and joins** · **strokes never touch** — the one underneath is notched open by **one
stroke width (1.4u)**, equal on both sides, the notch **cut into the outline**, never a
shape filled with the background · **one inherited `currentColor`** at ≥ 3:1, no gradients
or two-tone glyphs · **a background is a circle** (neutral or a pastel of any brand hue) ·
**only glyphs from the set** — no icon font, no emoji, no Unicode glyph, nothing drawn
inline for one screen · **never the only signal** — `aria-label` on every icon-only
control, its word beside every status icon.

**The quick test:** round + line + inherited colour = **UI icon**. Rounded square + fill +
product colour = **product glyph**. Never mix them.

## 7 · Product glyphs, pathway, sub-brand, AI mark

- **Product glyphs** (`rules/product-glyphs.md`) — seven products, a measured light pair
  and a measured dark pair each. The catalog page is the **only** correct version. Never
  invert or filter to make a dark version. Never used as a UI icon.
- **Pathway graphics** (`rules/pathway.md`) — a **solid quarter arc in a light tint**, and a
  decorative element, **not content**. Its home is the end-of-page banner above the footer,
  or a card genuinely short on content — and **only when the user asks.** **Light tints
  only: step 200 on a neutral ground, white at 14% on a dark one, never a 600.** No dither,
  no dot, no gradient, and **no motion of any kind** — motion was removed from the system.
  Never attach it unrequested, never let it out-contrast the content, never in product UI.
- **Sub-brand lockups** (`rules/sub-brand.md`) — set `--k-sub-h` and nothing else; size,
  gap, baseline, weight, tracking and colour are all ratios of it.
- **Katalon AI mark** — `assets/brand-svg/ai-katalon-color.svg` on light,
  `ai-katalon-white.svg` on green, dark or image grounds. A locked brand asset: never
  redrawn, recoloured or rotated. Swap the file; never apply a CSS filter. The catalog's
  Katalon AI page owns its 16 motion states — every state pairs motion with a text label
  and degrades to a static mark under `prefers-reduced-motion`.

## 8 · Components — reuse, don't reinvent

**`components/` holds 59 built React components in 9 groups** — Icons · Actions · Inputs ·
Navigation · Data display · Feedback · Overlays · AI & chat · Brand. Each one has a
`<Name>.d.ts` props contract and a `<Name>.prompt.md` carrying its "what & when", a usage
example and its rules. **Read the `.prompt.md` and compose the component.** Restyling raw
HTML to look like one, or inventing a variant, is a law 02 breach.

`catalog.dc.html` documents 53 component *sections* — the same inventory, plus every state
(hover / active / focus / disabled / loading / empty) and a snippet. The catalog is the
reference; `components/` is what you build with. Three wrappers exist that the catalog does
not name — `Icon`, `Field`, `SubLockup` — each listed under "Intentional additions" in
`README.md` with its reason. There are no others: if a component you want is not in
`components/`, that is an **ask** (law 03), not a thing to author.

## 9 · Slide decks — always from the template

**If the user asks for a deck, a presentation, slides, an all-hands, a QBR, a readout, a
board or product review, a kickoff, or "put this into Katalon slides" — you do not design a
deck. You open `deck/DECK-RULES.md` and build from the template it describes.** Building slides
from scratch when this template exists is a law 02 breach: every layout decision it would
require has already been made here.

`deck/` holds the whole deck system:

| File | What it is |
|---|---|
| `deck/DECK-RULES.md` | The deck contract — 10 hard rules, theme table, the locked pathway table, the content rules, and a pre-ship checklist. Read it in full. |
| `deck/KatalonDeck.dc.html` | The gallery deck: **39 slides from six layout kinds**. The working file — copy it, delete what the meeting doesn't need, replace copy in place. |
| `deck/KatalonDeck Export.dc.html` | The 1920×1080 `deck-stage` build. **PPTX / PDF / Google Slides export runs from this file**, never the gallery. |
| `deck/assets/` | The one pathway artwork, the 6px foot rule, logo variants, avatar placeholders. |

What is **not** yours to decide in a deck: the 1920×1080 canvas · the six layout kinds · the
per-slide pathway values (colour, size, corner, offset, rotation, opacity are locked in a
table — never moved, recoloured, resized, added or removed) · the foot rule (6px,
`band-pixel.svg`, unmodified, content slides only) · grounds (neutral ramp only; **Forest
Green 600 is never a background**, section openers are the only brand grounds) · 24px minimum
text · flat elevation. Only `theme`, `footerNote` and `showSlideNumbers` are tweakable.

A seventh layout kind is a change to the template, not a decision made inside one deck — so
it is an **ask**, per law 03.

## 10 · Before you deliver

Run the 19 machine-checked rules in `rules/compliance.md`, then the
`UIUX-KNOWLEDGE §11` pre-ship checklist. WCAG 2.2 AA is non-negotiable: contrast,
visible focus (`--k-focus-ring`), `aria-label` on icon-only controls, never meaning by
colour alone.

Then answer these five out loud — each one is a defect that ships silently otherwise:

1. Does **every card section** carry tiers, with **a different hue on every card** in a
   tier? A grid of identical cards means the tier step was skipped.
2. Is every **CTA inside a coloured card** black-on-light or white-on-dark — never green?
3. Is every **section a box on one canvas**, with no full-bleed colour band except the
   footer?
4. Does every **agent-at-work** surface use `ThinkingMark` in a mode that names the real
   work — not a static glyph?
5. Is every **lockup** `.k-sub-lockup` with a single `--k-sub-h`, not a hand-built span?

**Reject list:** gradient-soup backgrounds · emoji as UI · left-border-accent rounded
cards · drop shadows · hexes outside the ramps · translucent text · icon stroke 1.6 or 2 ·
off-scale icon sizes · **a card grid in one colour** · **a green CTA on a coloured card** ·
**full-bleed colour bands** · **a static glyph for a working agent** · **a hand-built
lockup** · mixing product green with marketing lilac on one surface · fake urgency,
countdowns, hidden cancel.

Deliver Katalon work that a Katalon designer would recognise as theirs on sight — and when
the system doesn't answer a question, **ask instead of deciding.**
