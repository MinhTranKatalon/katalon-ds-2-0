# Katalon Design System 2.0

The token + rule system for Katalon **product UI** and **marketing surfaces**. One
Forest-green action colour, flat elevation, Inter / Inter Tight / JetBrains Mono,
eight 11-step ramps, and a measured-contrast contract.

> **Read `rules/RULE-AUTHORITY.md` first.** It governs every other file here: rules are
> applied, never amended or invented, and an unclear rule is a question, not a judgement
> call. An agent that skips it will drift the system by the third screen.

**Sources.** Built from the Katalon brand system as documented in `catalog.dc.html` (the
living catalog, 77 pages) and the token contract in `ds/katalon-ds.css`. Repo:
`github.com/MinhTranKatalon/Design-System-Katalon-2.0` — see `github.md` for the sync record.
This is **not** the Katalon Studio (Eclipse/SWT desktop) system; that one is separate.

---

## Index

| Path | What it is |
|---|---|
| `SKILL.md` | Agent-skill entry point. Point a skill at this file. |
| `UPLOAD-GUIDE.md` | Step-by-step: GitHub upload → skill in Claude Code → skill in claude.ai (Vietnamese). |
| `styles.css` | **CSS entry.** `@import` lines only, in the one correct order. |
| `ds/katalon-ds.css` | **The token contract.** 235 `--k-*` definitions + the `.kds-*` classes. |
| `ds/line-icons.js` | The line-icon glyph set (24 grid, stroke 1.4). |
| `tokens/fonts.css` | Webfont load. Inter Tight **300** included on purpose. |
| `components/` | **59 React components in 9 groups**, each with a `.d.ts` contract and a `.prompt.md`. |
| `guidelines/*.card.html` | 20 foundation specimen cards (Colors · Type · Spacing · Brand · Voice). |
| `catalog.dc.html` | The living catalog — 77 pages: foundations, 53 component sections, patterns, guidelines, resources. |
| `deck/` | **The deck system** — the 39-slide gallery deck, the 1920×1080 export build, `DECK-RULES.md`, and its locked assets. |
| `rules/` | The nine binding rule domains, one file per domain. |
| `knowledge/` | Brand + UX deep dives (`DESIGN.md`, `UIUX-KNOWLEDGE.md`, `COLOR-RULES.md`). |
| `assets/logos/` | Katalon logos — horizontal, stacked, mark, lockups, light/dark. |
| `assets/brand-svg/` | Integration brand marks + the two-tone Katalon AI mark. |
| `assets/imagery/` | Photography specimens used by the catalog's Imagery page. |
| `thinking-mark.jsx` | The AI motion mark — 17 modes. `components/ai/AiStatus` wraps it. |
| `_ds/…/` | The marketing token file the catalog loads first. Kept so the catalog renders offline. **Not the contract** — see token precedence. |

## How to consume

```html
<link rel="stylesheet" href="styles.css">
<div class="kds-scope">…</div>              <!-- white page -->
<div class="kds-scope kds-scope--canvas">…</div>  <!-- light-green product canvas -->
```

Then style with `var(--k-*)` or the `.kds-*` classes. Never hard-code a hex.

## Token precedence — the one trap

Two stylesheets define about **70 of the same `--k-*` names** with different values.
`ds/katalon-ds.css` loads last and its values are the DS 2.0 contract:

- Neutral greys are **green-tinted** here; plain greys in the marketing file.
- `--k-text-link` and `--k-focus-ring` are **Forest Green** here, legacy blue `#5959EB` there.
- Every `--k-shadow-*` is **none** here — the system is flat; the other file still ships real shadows.

Never move `ds/katalon-ds.css` above the other import; a page that loads only the
marketing bundle is **not** on DS 2.0; and don't "fix" a difference by editing the
marketing file — the differences are intentional overrides.

---

## VISUAL FOUNDATIONS

**Colour.** Eight ramps × 11 steps, primary step **600**. Action `#0f8461` (hover 700,
active 800, tint 50) is the one primary — CTA, link, focus ring and Pass/Success all share
it. Bright `#19d89f`, Info/Lilac `#5959eb` and Pink `#bf3dc2` are marketing decoration,
never a CTA. Warning `#fed730` — **yellow text steps to 800/900**. Fail `#d14343`. Slate
`#43509b` for Pending and charts. Neutral is **green-tinted**, never pure grey. Data-viz in
order `--k-seq-1..6`.

**Green ink vs green fill.** Text takes **700** on every ground; fills take **600**.
`action-600` measures 4.67:1 on white but 4.14–4.42:1 on the tinted grounds — under the
floor. 700 clears all of them.

**Card tiers are not optional.** Whenever a section holds two or more cards, assign a tier:
tier 1 is one **pure 600 per card, a different hue on every card**; tier 2 is a step-200
tint, one hue per card; tier 3 is neutral. **Forest 600 is never a card fill. Step 100 is
never a card fill. A CTA inside a 600 card is never green.** Full table: `rules/colour.md`.

**Layout.** One neutral ground per page; a section that needs colour is a **rounded box
inset from the gutter**, canvas showing around it. Never stack full-bleed colour bands —
only the footer may bleed. `rules/layout.md`.

**Type.** Inter Tight display/headings · Inter body/UI · JetBrains Mono code, figures,
timestamps, token names. Marketing may go large; **product UI stays tight** (body 14–15px).
Minimum 12px anywhere. Sentence case throughout; the **mono eyebrow** is the only uppercase.

**Shape, space, elevation.** Radius `6 / 8 / 10 / 12 / 16 / 999` — input 8 · button 10 ·
banner 12 · card 16 · popup 20 · pill. Spacing 4px base, `--k-sp-1..10`, laid out with
flex/grid + `gap`, never margin chains. **Flat system — no shadows.** Depth is a 1px border
plus a tinted surface; every `--k-shadow-*` resolves to `none`.

**Backgrounds.** No gradients on fills, no patterns, no textures. Four flat tints
(`bg-page` → `bg-muted`) plus `bg-canvas` for product. The only gradients in the system are
two *animations*.

**Motion.** Hover/toggle 150ms · card/menu 200ms · modal/drawer 320ms
(`--k-dur-fast/base/slow`, `--k-ease-std/out/in`). No bounce, no overshoot, no parallax.
Always honours `prefers-reduced-motion`.

**Interaction states.** Hover is a **tint**, not a colour change. Press steps one further
(800). Focus is 2px `--k-focus-ring` at 2px offset, always visible. Selected is accent tint
**plus** accent ink **plus** `aria-current`/`aria-selected`. Hit target ≥ **44px** web; a
dense product toolbar may go to 32px, never below.

**Transparency.** Three places only: the accent/status soft tints, the dialog scrim
`rgba(15,20,25,.4)`, and nothing else. **No blur, no frosted glass. No translucent text.**

## CONTENT FUNDAMENTALS

The reader is a tester, mid-debug, looking for the one line that explains a failure. Be
clear, specific and action-first: say what happened, then what to do.

- **Sentence case** everywhere. Product entities keep their capitals (Test Case, Test Suite,
  Object Repository, Katalon TestOps, StudioAssist); generic verbs stay lowercase.
- Address the reader as **you**. Never "we". Product status is stated objectively with no
  subject: "3 of 49 test cases failed", not "We couldn't run your tests".
- **Buttons and menu items start with a verb** and name the object: "Run test case",
  "Rerun failed", "Apply and close". Avoid "OK"; never "Learn more" as a link's only label.
- **Errors name the thing and the fix.** Avoid "Oops! Something went wrong 😕". Use
  "Element not found: btn_Checkout. The locator changed — open the Object Repository to fix it."
- **Destructive confirms state the consequence and the count.** "Delete “Login flow”? This
  removes the test case and its 12 steps. This can't be undone."
- **Empty states teach in one sentence with one action.** "No test cases yet. Record a flow
  or write one by hand. Both end up in Test Cases."
- **Numbers are evidence and go inline.** "112 of 179", "3 self-healed", "FAILED in 00:10".
- **No emoji, ever.** No hype, no apology, no exclamation marks.

## ICONOGRAPHY

One **line** set, drawn on a 24 grid at **stroke 1.4**, round caps and joins, no fills, one
inherited `currentColor`, rendered at **16 / 20 / 24 / 32**. The glyphs ship as data in
`ds/line-icons.js` and as an ES module in `components/icons/icon-glyphs.js`; use the `Icon`
component and nothing else.

- **The quick test:** round + line + inherited colour = **UI icon**. Rounded square + fill +
  product colour = **product glyph**. Never mix them.
- Strokes never touch: the one underneath is notched open by one stroke width (1.4u), cut
  into the outline — never a shape filled with the background.
- A background, when needed, is a **circle** — neutral or a pastel of any brand hue.
- **Only glyphs from the set.** No icon font, no emoji, no Unicode glyph standing in for a
  word, nothing drawn inline for one screen. If a glyph is missing, add it to
  `ds/line-icons.js` and regenerate.
- **Never the only signal** — `aria-label` on every icon-only control, the word beside every
  status icon.
- Brand marks stay full colour on transparent and are never recoloured or filtered; swap the
  file for the dark variant. The **Katalon AI mark** is a locked asset — never redrawn,
  recoloured or rotated.
- Eight numbered rules: `rules/icons.md`. Product glyphs: `rules/product-glyphs.md`.

---

## Components

**59 components in 9 groups.** Each has `<Name>.jsx`, a `<Name>.d.ts` props contract and a
`<Name>.prompt.md` ("what & when", a usage example, its rules). One `@dsCard` specimen per
directory.

- **`components/icons/`** — `Icon` (+ `ICONS`, `ICON_NAMES` from `icon-glyphs.js`)
- **`components/actions/`** — `Button` · `IconButton` · `ToggleButton` · `ButtonGroup` ·
  `SegmentedControl` · `Toolbar` (+ `ToolbarSeparator`, `ToolbarSpacer`)
- **`components/inputs/`** — `Field` · `Input` · `TextArea` · `NumberInput` · `Checkbox` ·
  `RadioGroup` · `Switch` · `Select` · `DropdownMenu` · `Typeahead` · `TagInput` · `Slider` ·
  `DateTimeField` · `FileUpload`
- **`components/navigation/`** — `Tabs` · `Breadcrumbs` · `Pagination` · `Accordion`
- **`components/data/`** — `Badge` · `Chip` · `Avatar` · `Card` · `Table` · `List` ·
  `TreeList` · `MetadataList` · `Stat` · `Timestamp` · `Divider` · `Kbd` · `Tooltip`
- **`components/feedback/`** — `Alert` · `Toast` · `Progress` · `Spinner` · `StatusDot` ·
  `Skeleton` · `EmptyState` · `SystemStatus`
- **`components/overlays/`** — `Modal` · `Popover` · `CommandPalette` · `Drawer`
- **`components/ai/`** — `AiStatus` · `ChatMessage` · `SystemMessage` · `ToolCall` ·
  `Composer` · `SuggestedPrompts` · `MessageActions` · `Citation` (+ `CitationSources`)
- **`components/brand/`** — `SubLockup`

### Intentional additions

The catalog documents 53 component sections. Everything above maps to one of them, with
three wrappers added for practical reasons:

- **`Icon`** — the catalog documents the icon *spec* and ships glyphs as data, not as a
  component. Without a wrapper, every call site hand-rolls an SVG, which rule 7 of
  `rules/icons.md` forbids.
- **`Field`** — the label + hint + error shell. The catalog shows this markup inline in every
  form example; naming it stops the error message from being dropped.
- **`SubLockup`** — `rules/sub-brand.md` requires the `.k-sub-lockup` class and forbids
  hand-building the span. A component is the only way to make that rule enforceable.

Sub-parts exported so they can be composed directly: `ToolbarSeparator`, `ToolbarSpacer`,
`CitationSources`.

## Decks

Every Katalon presentation is built from **one deck template** — `deck/KatalonDeck.dc.html`:
39 slides authored at 1920×1080 from **six layout kinds**, light and dark from one file. Its
pathway placements and foot rule are **locked per slide**; only `theme`, `footerNote` and
`showSlideNumbers` are tweakable. Export (PPTX / PDF / Google Slides) runs from
`deck/KatalonDeck Export.dc.html`. The full contract and pre-ship checklist are in
`deck/DECK-RULES.md`.

**Copy the whole `deck/` folder**, not just the `.dc.html` — every asset, the DS loader and
the DC runtime resolve relative to the deck file.

## What this system is not

Not the Katalon **Studio** (Eclipse/SWT desktop) system — that one has tighter radii, 24px
control heights, and no 44px touch targets. If you are designing inside Studio, use
`Studio DS 2.0` instead.
