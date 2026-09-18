# Pathway graphics — six mandatory rules

Catalog: Foundations / Pathway graphics.

Pathway is a **solid quarter-arc (90°)**, flat-filled, in a **light tint**. It is a
supporting mark — a soft shape behind the content, never a feature of it.

There is no dither, no pixel grid, no dot, and no motion. Those were removed from the
system: the dither made the mark read as texture and pulled the eye, the dot read as a
broken-off piece of the arc, and the entrances did not survive a PPTX or PDF export.

System default: 90° sweep · band **26.2%** of the radius · flat fill · static.

## The rules

**01 · A supporting element, not content.** Pathway decorates and carries Katalon's brand
heritage. It is not spread across a design — repetition is noise, and the most eye-catching
thing on screen must be the content.

**02 · Its default home is the end-of-page banner.** Use it on the banner at the bottom of
a page, just above the footer — especially a call-to-action banner with a CTA. That is
where pathway closes a page instead of a blank area. **It is anchored to a corner and stays
clear of the text.** The copy and the CTA keep a band of ground to themselves; the arc never
runs under them. If it reaches into the text, make the arc **smaller** — not paler.

**03 · Called out only on request.** When a banner or card is genuinely short on content,
pathway may be called in to fill the emptiness — **only when the user asks.** Never attach
it to a surface that has not been approved.

**04 · Never more prominent than the content.** Pathway's contrast stays **below** the text
and CTA over it. If the eye catches the pathway first, step the tint down until it doesn't.
The measured window is **1.15–1.60:1** against its own ground. Below that it is invisible;
above it, it competes.

**05 · Light tints only — never a 600** (one exception: the cover treatment below).** The pathway takes **step 200** of one brand hue on
a neutral ground, or **white at 14%** on a dark ground, or **ink at 10%** on a light brand
ground. A 600 step is an action and fill colour; using it here makes a decorative mark look
like a component. Steps 400 and above are out of range for the same reason.

**06 · Solid, flat, static.** One flat fill. No dither, no dot outside the cover treatment, no gradient, no outline, no
shadow, and **no motion of any kind** — not on a slide, not on a web surface, not on
request. A pathway that moves is a redesign of the mark, which is an ask, not a decision.

## The colour contract

Measured against the ground it sits on. Pick by ground, not by taste.

| Ground | Pathway | Measured |
|---|---|---|
| `--k-gray-0` white | `--k-action-200` `#cfe6df` | 1.31:1 |
| | `--k-slate-200` `#e4e7f5` | 1.23:1 |
| `--k-gray-100` `#eef2f0` | `--k-action-300` `#9fcec0` | 1.54:1 |
| | `--k-action-200` `#cfe6df` | 1.16:1 — legal, but the 300 reads better on this ground |
| | `--k-slate-200` `#e4e7f5` | 1.09:1 — **too faint, not allowed** |
| `--k-gray-200` `#e1e7e4` | `--k-action-200` | 1.04:1 — **too faint, not allowed** |
| Dark ground (Forest 800–950, Slate 600–800, Gray 900, Info 600, Pink 600) | `#ffffff` at opacity **0.14** | soft shape |
| Light brand ground (Warning 600) | `#0c1411` at opacity **0.10** | soft shape |

Two consequences worth stating, because both get missed:

- **On `--k-gray-200` there is no legal pathway.** Nothing in range reads against it. Move
  the section to white or `gray-100`, or drop the pathway.
- **White at full opacity on a dark ground is not a pathway**, it is a graphic element. The
  0.14 is what keeps it a backdrop.

## The cover treatment — the one place a 600 is allowed

A **white cover slide** carries a larger, warmer version of the mark: a brand **600 step at
reduced opacity**, plus the dot. It is the only exception to rule 05, and it exists because a
cover has no content in that corner to compete with.

| Part | Value | Measured over white |
|---|---|---|
| Arc | `--k-warning-600` `#fed730` at opacity **.47** | renders 255,236,157 |
| Dot | `--k-bright-600` `#19d89f` at opacity **.45** | renders 152,238,212 |
| Arc geometry | outer radius **647**, band **175** (27.0%), centre (1824, 1080) — right inset 96, bottom flush | on the 1920×1080 canvas |
| Dot geometry | diameter **176** — equal to the band thickness — centre (1830, 346), tangent to the arc's outer edge | |

Four things this treatment does **not** license:

- It is **cover only.** On any other surface rule 05 stands: step 200, white at .14, or ink at .10.
- The **dot appears only here**, and it always takes a different hue from the arc. Same hue and
  it reads as a broken-off piece of the arc.
- The dot's diameter **is** the band thickness, and it sits tangent to the arc's outer edge —
  one dial moves both, so they can never drift apart.
- Still no dither, no gradient, no outline, **no motion**.

The ground has to be white. On a dark cover the same two colours blend to olive and the
treatment fails — use the dark-ground rule instead, or make the cover white.

## Geometry tokens

Defined in `ds/katalon-ds.css`. Read them, never restate them as numbers at a call site.

| Token | Default | What it is |
|---|---|---|
| `--k-pathway-sweep` | `90deg` | A quarter arc. **Never another angle.** |
| `--k-pathway-thickness` | `26.2%` | Band thickness as a share of the outer radius |

That is the whole dial set. The dither tokens (`--k-pathway-density`, `--k-pathway-grid`,
`--k-pathway-solid-foot`) and every motion token (`--k-pathway-dur`, `-stagger`, `-bands`,
`-dur-rise`, `-dur-grow`, `-rise-dist`, `-grow-scale`, `-slide`, `-ease`, `-ease-sweep`)
were **removed**. If you find one still referenced anywhere, that reference is the bug.

## The artwork

One file: `deck/assets/pathway/arc-solid-01.svg` — a solid quarter arc on a 519×524 box,
drawn for the **bottom-right** corner, carrying a single flat fill that is replaced at
runtime. Mirroring and rotation derive every other corner from it.

A web surface may draw the same arc inline from the two tokens above instead of loading the
file. Either way the silhouette is identical, because it is 90° and 26.2% and nothing else.

## Never

Product UI (app, dashboard, chat) · over body text · a 600 or darker step · any motion ·
dither or pixel texture · a dot · scaled so small it reads as confetti · repeated as a
background pattern · recoloured outside brand hues · black, outlined, or shadowed.

## Brand-hue light tints — measured 2026-09-18

The deck's pathway tweaks offer **one light tint per brand hue**, so a deck can be themed to
a hue without ever putting a 600 behind content (rule 05 stands). Measured against the two
neutral grounds the light-tint pathways actually sit on. A pathway must read as a quiet
field: below ~1.08 it disappears, above ~1.9 it competes with the text on top of it.

| Tint | Value | vs `gray-100` | vs white |
|---|---|---|---|
| `action-300` **default** | `#9fcec0` | 1.54 | 1.74 |
| `action-200` | `#cfe6df` | 1.16 | 1.31 |
| `bright-300` | `#a3efd9` | 1.17 | 1.32 |
| `info-300` | `#e8e5ff` | 1.09 | 1.23 |
| `pink-300` | `#eac8ea` | 1.33 | 1.51 |
| `slate-300` | `#c2c7e4` | 1.48 | 1.67 |

**Why the step differs per hue.** The 200 step is only usable on the green hues. For
bright, info and pink the 200 lands at **1.01–1.02 on `gray-100`** — invisible — so those
hues enter at 300. Do not normalise this table to one step; the ramps are not equally light
at the same index.

**Two hues are deliberately absent.**

- **Warning** has no legal light tint here: `warning-200` is 1.07 and `warning-300` is 1.01
  against `gray-100` — both vanish. Warning's only pathway role is the white-ground cover
  arc, where it runs at .47 opacity.
- **Fail** measures fine (`fail-200` 1.25, `fail-300` 1.75) but is a **status hue**. A red
  field behind ordinary content reads as an error state, and the pathway is never a status.
  Excluded on meaning, not on contrast.

Adding a swatch means measuring it into this table first.

## Editing a pathway

**Never on the canvas — always through Tweaks.** The arc is painted entirely by a data-URI
`background-image` built in `pw()`. The visual editor cannot read a data-URI, shows
"Background: None", and writing any background from that panel resets `background-image` —
the arc disappears. Every pathway span therefore carries `data-uneditable`. Do not remove it.
