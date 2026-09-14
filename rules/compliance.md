# Compliance — 19 machine-checked rules

Catalog: Guidelines / Compliance & linter. These are the rules a linter can check; they do
not replace the rest of this repository.

| # | Rule | Check |
|---|---|---|
| 1 | Colour only through tokens | No hard-coded hex/rgb; every colour references a `--k-*` variable. |
| 2 | Primary = Forest green | `#0F8461` / `--k-action-600`. Never the legacy blue `#5959EB` for product UI. |
| 3 | Correct font family | Inter, Inter Tight (headings), JetBrains Mono (code/figures) only. |
| 4 | Minimum font size | Never below 12px. Body defaults to 14–16px. |
| 5 | Hit target | ≥ 44px on web and mobile; a dense product toolbar may go to 32px, never below. |
| 6 | Radius on the scale | `6 / 8 / 10 / 12 / 16 / 999px` (`--k-radius-*`). No stray values. |
| 7 | Images have alt | Every content `<img>` has `alt`; decorative images use `alt=""`. |
| 8 | One H1 per page | Exactly one `<h1>`; heading hierarchy unbroken. |
| 9 | No dark patterns | No fake countdowns, "only X left", "hurry". |
| 10 | Flat system — no shadows | No decorative `box-shadow`; layer with borders and backgrounds. |
| 11 | Icon stroke = 1.4 | Line glyphs at stroke-width 1.4 on the 24 grid, at every size. No 1.6, no 2, no faux bold. |
| 12 | Icon size on the scale | 16 / 20 / 24 / 32px. A 17px or 40px icon is off the scale. |
| 13 | No translucent text | Text colour is a measured opaque ink. No `rgba()` alpha, no `opacity` on a text layer. |
| 14 | Green ink = `action-700` | Green **text** (links, text-CTAs, accent ink) uses `--k-action-700`. 600 is the **fill** step — as ink it fails on every tinted ground (4.14–4.38:1). |
| 15 | Card sections are tiered | A section with 2+ cards assigns a tier per card; no two cards in one tier share a fill. |
| 16 | No green CTA on a coloured card | Inside a 600 or 800–950 card fill, no button uses `--k-action-600` as its fill. |
| 17 | No full-bleed colour bands | No section other than the footer has a coloured background at 100% viewport width. |
| 18 | Working agents animate | Any agent-at-work surface mounts `ThinkingMark`; no static glyph stands in for it. |
| 19 | Lockups use the class | Every Katalon sub-brand lockup is `.k-sub-lockup` with a single `--k-sub-h`; no hand-built span. |

## Scope

Every rule above is implemented in the catalog's linter (Guidelines / Compliance & linter).
The linter reads **static source**, so that is its limit: real-world contrast, layout and
context still need a manual pass against Accessibility and the Do / Don't pages.

Two checks are deliberately **heuristic** and report a warning rather than an error — card
tiers and working-agent motion can only be inferred from source, never proven by it. A
warning there means "look at this", not "this is wrong".
