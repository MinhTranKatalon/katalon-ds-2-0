# Deck upgrade — 2026-09-18

Diffed against the `Katalon Design System 2.0` package currently in use. **The token
contract did not move**: 235 `--k-*` names on both sides, no name added or removed, no
value changed. Everything below is the deck template and its two rule files.

## 1 · Light/dark — every fixed fill now carries fixed ink

The whole class of "not fully dark" bug has one cause: **a ground that cannot change between
themes paired with ink that does.** `--k-text-primary` resolves to `#ffffff` under
`[data-theme="dark"]`, so any fill the dark layer does not rebind rendered white-on-light.

| Slide | Fixed ground | Was | Now |
|---|---|---|---|
| 03 Part divider 01 | `warning-600` yellow (never rebound) | `--k-text-primary` → white, **1.40:1** | ground pinned `#fed730`, ink `#1f2925` 10.68 / `#3c4642` 6.98 |
| 00 How to use | five hard-coded pastel cards | headings/body **1.10–1.51** in dark | ink tokens scoped per card — light values kept exactly, so light theme is unchanged |
| 16 Q&A | `#24245e` | `--k-bright-400` (not rebound today, but unguarded) | pinned `#47e0b2` 8.44 |
| 16b Thank you | `gray-900` `#1f2925` (never rebound) | `rgba(255,255,255,.78)` | `#ced0cf` 9.66 |

## 1b · Light theme — the accent ink was a 600 doing a 700's job

The deck defined `--deck-accent-ink: #0f8461` (action-600) and used it as **ink in 57
places**. That is verbatim the case the colour contract warns about: action-600 is 4.67 on
white but drops below the floor on every tinted ground this deck actually uses —
**4.42** on `#f7f9f8`, **4.38** on `#f0faf5`, **4.14** on `#eef2f0`, **3.73** on
`#e1e7e4`. Ten light-theme text nodes on slides 07, 14 and 00 were failing.

Light `--deck-accent-ink` is now **`#0b6449`** — worst case 5.71 across all five grounds.
The dark definition (`#19d89f`) is untouched.

**One site had to be pinned first.** The token was not purely an ink role: a single use was
the *fill* of a colour swatch specimen showing the 600 step. It is now a literal
`#0f8461`, because a specimen must display the value printed beside it. Darkening the token
without splitting that site would have made the swatch lie.

Same rule applied to the five pastel cards on 00 How to use (accent `#0b6449`, worst 4.99;
tertiary `#5b6661` → `#4d5753`, 4.16 → 5.22) and to one yellow label on 18 Type system, which needed a **third** value rather than a
different step:

| Attempt | Light, on `#e1e7e4` | Dark, on `#0c1411` |
|---|---|---|
| `--k-warning-900` (original) | **3.72** ✗ | 13.33 ✓ |
| literal `#6e5b13` | 5.29 ✓ | **2.82** ✗ |
| **`--deck-warn-ink`** | 5.29 ✓ | 13.33 ✓ |

The label sits on a **theme-following** ground (`gray-200` → `#e1e7e4` light, `#0c1411`
dark), so freezing its ink to a literal broke the theme it used to pass. Stated as the
mirror of the fixed-fill rule: **a theme-following ground needs theme-following ink.** It
takes a role token — `--deck-warn-ink`, `#6e5b13` light and `#fed730` dark — the same
shape as `--deck-rule`.

Stepping yellow to 900 is not automatically enough either; it depends on the ground.

## 2 · No translucent text anywhere

Each `rgba()` ink composited over its **real** ground and replaced with the solid
equivalent — the dark-layer tokens against the lightest dark ground (`#16231e`) so one hex
clears 4.5:1 on all three:

`--k-text-body` `.88` → `#e3e5e4` (12.83–14.77) · `--k-text-secondary` `.76` → `#c7cac9`
(9.84–11.32) · `--k-text-tertiary` `.60` → `#a2a7a5` (6.66–7.66) · `--k-gray-400` `.52` →
`#8f9593` (5.33–6.13) · `--k-gray-300` `.22` → `#495350` (rule role).

The award card's **scoped override** had the same defect inside it: `rgba(12,20,17,.80)` →
`#3c3b17` (8.18 on yellow) and `.64` → `#635a1c` (4.98). Its `.12`/`.18` values stay —
those are hairlines, not text.

## 3 · Two new deck role tokens

`--deck-rule` — a named role for hairlines drawn on a card

— `#e1e7e4` light, `rgba(255,255,255,.20)` dark. **19 chart gridlines, axis rules and the
unfilled bar track were `--k-gray-200`** — a *ground* token the dark layer rebinds to
`#0c1411`, darker than the `#16231e` card they draw on, so all of them vanished in dark
theme. `--k-border-strong` is not the alternative: it is `#1f2925` in light and reads as
near-black ink. The role needed its own name.

`--deck-warn-ink` — yellow label ink on a theme-following ground, `#6e5b13` light and
`#fed730` dark (see 1b).

**Both exist for the same reason:** no token in the contract resolves correctly in both
themes for that role, because the dark layer rebinds ground tokens along a different axis
from border and status tokens. Before reusing a token in a new role, resolve it in **both**
themes against the surface it will actually sit on — if neither theme's value works, the
role needs its own name.

## 4 · Pathway is tweakable — five groups, one per slide

02 Agenda · 00b Speaker · 00f Leaders (3) · 00g Leaders (4) · 15 Quote, each with colour,
opacity, size and corner. Not one shared control: they sit on different grounds, in
different corners, tuned to different clearances. **00f and 00g shared a single
`pwLeaders`** until now, so changing one silently changed the other — split into
`pwLeaders3` / `pwLeaders4`.

Size is bounded both ways. The arc is a quarter annulus centred on the slide corner, band
between `0.73 × size` and `size`, so a **larger** size moves the band *away* from the
corner: on 02 Agenda, 600 grazed "Strictly confidential" by 2px, 760 would cut the
roman-numeral column by 16px, 710 clears the footer by 82px and the numerals by 34px.

## 5 · Pathways can no longer be destroyed by clicking them

All 13 decoration spans carry `data-uneditable`. The arc is painted entirely by a data-URI
`background-image`; the canvas editor reads that as "Background: None" and wipes it on the
first touch, which is why selecting a pathway made it disappear.

## 6 · Smaller fixes

- **Footer 18px → 24px.** DECK-RULES rule 9 sets a 24px floor "footers and captions
  included"; the footer had been below it on 31 slides. Raising it introduced no new
  overflow on any slide, so the rule stands as written and the code now matches.
- **00b Speaker** — text column vertically centred against the avatar (grid
  `align-items:center` + column `justify-content:center`), and an empty `<div>` that
  existed only to hold a 36px gap removed, which had been skewing the optical centre.
- **19 Award** — the "AWARD NAME" pill was `gray-100` + `--k-brand-white`: white text on a
  light pill. Ground and ink pinned, `#000000` on `#eef2f0` = 18.59.

## Audited clean — no change needed

235/235 tokens matched, no value drift. Ramps monotonic. No `var(--k-*)` unresolved
(0 of 61 referenced). 39/39 slides. No console errors.
