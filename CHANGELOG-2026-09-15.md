# Update — 2026-09-15 · token audit

Full audit of all `--k-*` tokens against the live catalog. Colour, type, spacing, pathway
geometry and the eight ramps came back clean; radius did not, and the product-glyph
palette turned out never to have been tokenised at all.

## 1 · Radius — the system now obeys its own ramp

The ramp is **2 · 4 · 8 · 12 · 16 · 20 · 999**. `10px` is **one named exception**,
`--k-btn-radius`, for buttons and primary inputs. **There is no 6px step.**

- `ds/katalon-ds.css` was breaking its own rule in three places — `border-radius: 3px`
  on `:focus-visible` and `.kds-highlight`, and `6px` on the tooltip. All three now
  reference `--k-radius-xs` / `--k-radius-sm`. The tooltip also matches `Tooltip.jsx`
  again (CSS said 6px, the component said 4px).
- `catalog.dc.html` — **144 off-ramp literals** (1 · 3 · 5 · 6 · 7 · 9 · 13 · 14 · 18px)
  snapped to the ramp. The single `7px` inside `_lintSample` stays: it is the
  counter-example the linter is supposed to catch.
- **The built-in DS linter was teaching the wrong scale.** Its allow-list was
  `[0,6,8,10,12,16]` — it accepted 6px, and flagged 2px, 4px and 20px (real ramp steps)
  as errors. Now `[0,2,4,8,12,16,20,999]` plus 10 as the named button exception, with the
  rule card and warning text rewritten to match.
- **Decks** — both builds: `14px` ×21 → 16, `12px` ×12 → 16, per DECK-RULES §10
  (card = 16). Deck radii are now 4 · 8 · 16 · 999 only.
- `guidelines/radius-scale.card.html` — dead `.sw{border-radius:6px}` rule removed; the
  specimen subtitle now states the whole ramp instead of the old role list.
- `SKILL.md` §5 rewritten: the ramp, the 10px exception, and "no 6px" stated explicitly.

## 2 · Product glyph pairs are tokens now — 14 new names

The seven product plate+glyph pairs were hard-coded hexes inside the catalog's
`prodSquare()`. They are real tokens:

`--k-prod-{studio,cloud,local,insights,testmgmt,saas,support}-{bg,fg}`

Light on `:root`; **`.k-dark` re-binds the same 14 names**, so a product glyph is
theme-correct with no branch at the call site. The dark pair is *not* an inversion — each
was measured against the `#0c1411` dark ground so the glyph clears its plate by ≥4.5:1.
`prodSquare()` now contains no hex at all; it only picks the scope class.

**Token count: 221 → 235.** Updated in `SKILL.md`, `README.md` and the new `TOKENS.md`.

## 3 · `TOKENS.md` — new file

All 235 names with their real values, generated from `ds/katalon-ds.css`: the lookup table,
the `--k-btn-radius` exception documented as a named role with its guardrails, the two
intentional aliases (`--k-pass-500`/`-600` → `--k-action-600`; `--k-ease-in-out` →
`--k-ease-std`), and the product-glyph pair table.

## 4 · Stale references fixed in `SKILL.md`

- `234 --k-*` → **235**
- the foot rule was still described as "6px, `band-pixel.svg`" → **a solid 7-segment
  `deck/assets/pathway/foot-rule.svg`**, matching what actually ships

## Audited clean — no change needed

- 221/221 pre-existing names matched between CSS and docs; no duplicate or conflicting
  definition anywhere.
- All 8 ramps × 11 steps strictly monotonic in luminance.
- Every documented ink/fill pair passes AA: `text-invert` on `action-600` 4.67 · on
  `fail-600` 4.57 · ink on `warning-600` 13.33 · ink on `bright-600` 10.11.
- No `var(--k-*)` anywhere references an undefined token.
