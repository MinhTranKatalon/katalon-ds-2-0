# Katalon Template Deck 2.0 — deck rules

*(Part of the `katalon-ds-2-0` skill, not a skill of its own — a skill package carries exactly one SKILL.md. The entry point is `../SKILL.md`; this file is the deck contract it routes to.)*

Build Katalon-branded slide decks from the `KatalonDeck` template: 39 slides authored at
1920×1080 from **six layout kinds**, on Katalon DS 2.0 tokens, with a light and a dark theme,
a locked solid-arc pathway system and a locked colour foot rule.

This deck skill is **part of Katalon Design System 2.0** and inherits its rules. Read
`../rules/RULE-AUTHORITY.md` first: rules are applied, never amended or invented, and an
unclear rule is a question. Where this file and a `../rules/*.md` file disagree, the rule
file wins and this file is the bug.

Use this skill for any Katalon deck: all-hands, QBR, product or board review, kickoff,
readout, post-mortem — or whenever someone asks to "put this into Katalon slides".

---

## 0 · CONTRACT — hard rules, never overridden

1. **Canvas.** Every slide is a `<section class="slide">` authored at 1920×1080. The gallery
   file renders at `zoom:.75`; the export file is the 1920 standard. Never change the authored
   numbers.
2. **Theme is a prop, not a fork.** `theme: "light" | "dark"` on the root DC. One deck file
   serves both. Never duplicate the deck to make a dark version.
3. **Pathway is FIXED, SOLID and STATIC.** Colour, size, corner, offset, rotation and
   opacity are locked per slide in `pw()`. There is no pathway tweak. Do not move,
   recolour, resize or rotate a pathway, and do not add one to a slide that has none.
   It is a **solid quarter arc in a light tint** — no dither, no dot, no gradient.
   **It never animates**, on any slide, even on request: a deck exports to PPTX and PDF,
   where an entrance either vanishes or bakes into the wrong frame. Motion was removed from
   the pathway system entirely (`rules/pathway.md` rule 06).
4. **The foot rule is FIXED.** `assets/pathway/foot-rule.svg`, 6px, full bleed along the
   bottom edge, on content slides only — never on cover, section openers, quote, Q&A or
   thank-you. Seven solid segments, in order: action-300 · bright-300 · info-400 ·
   pink-500 · warning-600 · slate-600 · pink-500. It is **solid** — the dithered blends
   between segments were removed with the rest of the dither system. Use the file as it
   is: never recoloured, never resized, never reordered, and no text ever sits on it.
5. **Never use Forest Green 600 (`#0f8461` / `--k-action-600`) as a background** — not a page
   ground, not a box, not a section fill. It is an ink and accent colour only.
6. **Grounds are neutral.** Page grounds, card fills and box fills come from the green-tinted
   neutral ramp: `--k-gray-0` (white), `--k-gray-100`, `--k-gray-200`. Brand tint steps
   (50/100/200/300) are NOT background colours.
   *Only exception:* section-opener slides may use a brand 600 step as their ground.
7. **Icons follow `../rules/icons.md` without exception** — the DS line set, 24 grid,
   **stroke 1.4**, round caps and joins, neutral colour (`--k-text-secondary` /
   `--k-text-tertiary`), glyphs from the set only. No icon font, no solid-filled icons, no
   icon in a coloured tile, no emoji, no unicode glyph standing in for a word.
8. **Type.** Display/headings Inter Tight 600 (`--k-font-display`), body Inter
   (`--k-font-body`), numbers, labels and eyebrows JetBrains Mono (`--k-font-mono`). Sentence
   case everywhere; the mono eyebrow is the only uppercase.
9. **Minimum text size 24px** at 1920×1080 — footers and captions included.
10. **Flat elevation.** No drop shadows. Depth = 1px border + tinted surface. Radius: card 16,
    button 10, pill 999. No gradients on fills. No new hexes outside the DS ramps.

---

## 1 · Files

```
SKILL.md                     this file
KatalonDeck.dc.html          gallery deck — 39 slides stacked, the working file
KatalonDeck Export.dc.html   deck-stage build at 1920×1080 — PPTX / PDF / Google Slides
deck-stage.js                slide stage used by the export build
ds-base.js · support.js      design-system loader and DC runtime
assets/pathway/
  arc-solid-01.svg           the single pathway artwork — solid arc, tinted at runtime
assets/imagery/              avatar placeholders — size and position reference only
assets/logos/                katalon-horizontal-rgb.svg · -white-green.svg
```

Workflow:

0. **Copy the WHOLE `deck/` folder** to the working location — then rename the `.dc.html`
   inside it. Copying the `.dc.html` on its own is the single most common way a Katalon deck
   ships broken: `support.js`, `ds-base.js`, `deck-stage.js`, `assets/logos/`,
   `assets/pathway/` and `../styles.css` are all resolved **relative to the deck file**. Lose
   them and the deck renders in the browser's default serif, with no tokens, broken logo
   images, no pathway, and raw `{{ footerNote }}` text on every slide — the DC runtime never
   started. If the deck must sit somewhere the relative `../styles.css` cannot reach, add
   that path to `CANDIDATES` in `ds-base.js`; do not inline your own styles instead.
1. Rename the copied `KatalonDeck.dc.html` to the new deck name.
2. Delete the slides the meeting does not need; keep slide order = agenda order.
3. **A slide is three things, not one.** When you delete or add a slide, move all three
   together or the gallery goes out of sync:
   - the `<section>` itself;
   - its `<div class="cap">` header, where that slide has one (the gallery captions some
     slides, not all — a caption left behind renders as a label with nothing under it);
   - the count in the deck's own intro block, which states the layout total twice, once as
     a numeral and once spelled out.
   `pw*` entries in `renderVals()` are a fourth: a removed slide's pathway entry becomes
   dead code.
4. Replace copy in place. Layout, spacing, colour and pathway stay as they are.
5. Set `theme` (and `footerNote` / `showSlideNumbers`) in Tweaks. Nothing else is tweakable.
6. Run the checklist in §5 before handing over.
7. **Ship nothing that belongs to the design system.** No "Back to design system" chip, no
   catalog navigation, no specimen labels, no linter badge. Those live in the catalog. A
   delivered deck contains slides and nothing else.

---

## 2 · Theme contract

| | light | dark |
|---|---|---|
| page ground | `--k-gray-0/100/200` | `#0c1411`, card `#16231e` |
| ink | `--k-text-primary/body/secondary/tertiary` | white at 100/88/76/60% |
| borders | `--k-border-subtle/default` | white at 10/15% |
| accent ink | `--deck-accent-ink` `#0f8461` | `#19d89f` |
| strong accent ink | `--deck-accent-ink-strong` `#0b6449` | `#19d89f` |
| brand tints (50/100) | DS tint steps, on cards only | alpha of the same hue |
| logo | `katalon-horizontal-rgb.svg` | `katalon-horizontal-white-green.svg` |

- Both logo variants ship in the markup with `data-logo="light" / "dark"`; the theme rule
  swaps them. Never bind a logo `src` to a template hole.
- Ink on a solid brand fill is a fixed literal — `#0c1411` on light fills, `#ffffff` on dark
  ones — never a theme token.
- Accent **ink** uses the `--deck-accent-ink*` role tokens, never a brand step, because the
  same step number serves as a fill elsewhere.

---

## 3 · Locked decoration

**Pathway** — one asset, tinted through a data-URI (CSS `mask-image` does not render in this
environment; do not reintroduce it). These values are LOCKED — they are the current shipped
version of the deck and must not be edited, per-deck or per-slide:

| slide | colour | size | corner | offset | rotate | opacity | native |
|---|---|---|---|---|---|---|---|
| 1 Cover · **cover treatment** | arc `#fed730` @ .47 · dot `#19d89f` @ .45 | arc R 647 · band 175 · dot 176 | bottom-right | right 96 · bottom 0 | 0° | — | — |
| 2 Agenda | `#9fcec0` action-300 | 600 | bottom-left | 0 | 90° | 1 | bottom-left |
| 3 Divider 01 · Warning ground | `#0c1411` | 700 | bottom-right | 0 | 90° | .10 | bottom-left |
| 3 Divider 02 · Slate ground | `#ffffff` | 700 | bottom-right | 0 | 90° | .14 | bottom-left |
| 3 Divider 03 · Info ground | `#ffffff` | 700 | bottom-right | 0 | 90° | .14 | bottom-left |
| 3 Divider 04 · Pink ground | `#ffffff` | 700 | bottom-right | 0 | 90° | .14 | bottom-left |
| 4 Speaker · 1 person | `#cfe6df` action-200 | 740 | bottom-left | 0 | 90° | 1 | bottom-left |
| 7 Leader slides | `#e4e7f5` slate-200 | 540 | top-right | 0 | 90° | 1 | bottom-left |
| 32 Quote | `#cfe6df` action-200 | 720 | top-left | −30 | 90° | 1 | bottom-left |
| 33 Q&A | `#ffffff` | 780 | bottom-right | −40 | 90° | .14 | bottom-left |
| 34 Thank you | `#ffffff` | 680 | bottom-right | 0 | 0° | .14 | bottom-left |
| 40 Opening statement | `#ffffff` | 480 | top-right | 0 | 0° | .14 | bottom-left |

**The cover is the one exception.** It carries the cover treatment — a brand 600 at reduced
opacity plus the tangent dot, on a **white** ground. Values and geometry are locked in
`rules/pathway.md` → "The cover treatment". It is cover-only; no other slide takes a 600 or a dot.

**Everywhere else, colour follows the ground, not the slide's mood** — light tint on a neutral ground, white
at .14 on a dark ground, ink at .10 on the Warning ground. The measured window is
1.15–1.40:1. Full contract: `rules/pathway.md`.

`native` is the corner the artwork is drawn for; `pw()` derives the mirror from
`corner` vs `native`. Changing either flips the curve — leave both alone. Slides not in this
table carry no pathway, and none may be added.

Pathway sits behind content; content wrappers carry `position:relative; z-index:1`.


---

## 3b · The card recipe — locked

Every card in a card grid is built from one four-part recipe. It is not a per-slide choice.

| Part | Value |
|---|---|
| Fill | `--k-<hue>-50` — the palest step. Ink on it measures 17.5–18.5:1. |
| Top line | `border-top: 4px solid var(--k-<hue>-600)` — the saturated accent, 4px, top edge only. |
| Border | `1px solid var(--k-gray-500)` — **neutral, never the hue**. See below. |
| Tile | `--k-<hue>-200` circle, glyph in `--k-text-primary` (≥16:1). |

**The hue rotation is** `action → info → warning → pink → slate → bright`, assigned by card
position. **One hue per card** inside a grid; a seventh card wraps the rotation.

**Yellow is a legal card hue at step 50 and only at step 50.** At 200 a warning tile on a
warning card measures 1.32:1 and disappears — that is why warning is barred from the 200
tier, not because yellow is banned.

**The border is neutral on purpose, and this is the rule people break.** A pale hue border
vanishes against a white projector screen: warning tops out at **1.4:1** and bright at
**1.85:1** against white — at *every* step in the ramp, so no amount of darkening fixes
them. `--k-gray-500` measures **3.54:1** on white and 3.3–3.5:1 on the -50 fills, so one
neutral edge holds for all six hues. The hue identity comes from the fill and the 4px top
line; the border's only job is to keep the card off the screen.

Cards that are **not** in a hue grid (a single card on a slide, a table shell) keep the flat
default: `--k-gray-0` fill, `1px solid var(--k-border-default)`, no top line.

## 3c · The footer

`.foot` carries the logo, the note and the slide number, pinned by `margin-top: auto` so it
reserves its own band. Never `position: absolute` — that stops it reserving space and the
content prints over it.

- The note defaults to **"Strictly confidential"**. That default lives in **two** places and
  both must agree: the `footerNote` fallback in the logic class, and the `default` in
  `data-props` — which is HTML-entity encoded, so a plain find-and-replace misses it while
  the Tweaks panel keeps seeding the old value.
- Footer type is **18px**; the logo is **26px**. They are set independently on purpose — the
  mark has to stay legible from the back of the room, the note does not.
- **This is a deliberate exception to the 24px slide-type floor.** The floor governs content
  the audience reads; the footer is chrome — a standing mark, not a line anyone reads from
  the back of the room. Nothing else on a slide goes below 24px.

## 3d · Typographic marks are not icons

Five marks are set in type, never drawn as a glyph from the icon set:

| Mark | Where |
|---|---|
| `"` `U+201C` | the quote slide's opening mark — display face, 150px, accent ink |
| `×` | close affordance on a chip or tab |
| `▲` `▼` | number steppers |
| `/` | breadcrumb separator |
| `…` | pagination gap |

Reaching into the icon set for one of these is the error — a book glyph is not a quotation
mark, and a chevron is not a stepper.

## 4 · Content the user supplies

- **Images.** All photography and portraits come from the user. The files in
  `assets/imagery/` are placeholders that exist **only to fix the size, shape and position** of
  an avatar in each layout — circular, `object-fit:cover`, sized per slide (78px in lists,
  500px on the quote slide, full-column on the speaker slide). Keep them in the skill as the
  size/position reference and swap only the `src` when the user uploads. Never change an
  avatar's dimensions, radius or position to fit an uploaded image — crop the image instead.
- **Speaker notes.** The deck ships without notes. Use the layout variant that carries no
  notes block unless the user supplies notes, then use the variant that does.
- **Charts.** The four dashboard slides are hand-built HTML/CSS. If the user brings data, the
  chart may be redrawn — but only with the eight defined colour roles: series 1/2/3, pass,
  at-risk, fail, target, grid. Max three data series per chart; a fourth means two charts.
- **Preset selection.** When the user pushes their own content in, match it to layouts:
  numbers → dashboard/stat slides; a list of owners → speaker/leader slides; a narrative
  section break → section opener; a customer voice → quote; a plan → roadmap/timeline.
  Never invent slides the content does not support.

---

## 5 · Pre-ship checklist

**Structure**

- [ ] Slide count matches the agenda; no orphan placeholder slides left in.
- [ ] Every slide has `data-label` and `data-screen-label`.
- [ ] Slide order = agenda order; section openers precede their content.

**Colour**

- [ ] Every page ground is neutral (`--k-gray-0/100/200`).
- [ ] Every card in a hue grid follows §3b: -50 fill · 4px -600 top line · 1px gray-500 border · -200 tile.
- [ ] No two cards in one grid share a hue.
- [ ] No card border takes a hue — it never survives a projector.
- [ ] Forest Green 600 appears as ink or accent only — never as a background.
- [ ] Brand tint steps are not used as backgrounds; section openers are the only brand grounds.
- [ ] No raw hex outside the DS ramps.
- [ ] Chart colours limited to the eight roles; max three series per chart.

**Locked decoration**

- [ ] Pathway values match the table in §3 exactly.
- [ ] No pathway added to or removed from a slide.
- [ ] Foot rule present on content slides at 6px, absent on the expressive ones.
- [ ] `foot-rule.svg` unmodified.

**Theme**

- [ ] Deck reads correctly at `theme: "light"` and `theme: "dark"`.
- [ ] Both logo variants present on every slide that shows a logo.
- [ ] Text on solid brand fills uses fixed ink, not theme tokens.
- [ ] Body text ≥ 4.5:1 against its own background in both themes.

**Type & icons**

- [ ] No text below 24px.
- [ ] Sentence case everywhere except the mono eyebrow.
- [ ] Icons are line style, rounded, neutral in colour.

**Technical**

- [ ] No console errors; no broken image references.
- [ ] No unresolved `var(--*)` tokens; no duplicate element ids.
- [ ] Nothing overflows its slide box.
- [ ] Only `theme`, `footerNote` and `showSlideNumbers` are exposed as tweaks.
- [ ] All referenced assets exist inside the skill folder — no cross-project paths.

**Export**

- [ ] `KatalonDeck Export.dc.html` mirrors the gallery deck's content at 1920×1080.
- [ ] PPTX: diagrams that would not survive shape conversion carry `data-om-raster`.
- [ ] PDF export runs from the deck-stage build, not the gallery file.

---

## 6 · Known constraints

- CSS `mask-image` and CSS-masked SVGs do not render — tint through data-URI backgrounds.
- SVGs used as `<img>` or background need `preserveAspectRatio="none"` when stretched.
- c2pa metadata on uploaded SVGs blocks canvas rasterisation — strip `<metadata>` and
  `xmlns:c2pa` before processing.
- There is no charting library in the deck; charts are markup.
