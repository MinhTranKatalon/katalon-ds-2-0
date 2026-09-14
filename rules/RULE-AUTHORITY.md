# Rule authority — non-negotiable

**This file governs every other file in this repository.**

> **An agent does not change the rules, and does not invent what is missing.
> If a rule is unclear or absent — ask.**

This holds for every turn, every surface and every hurry. It is not overridden by a
deadline, by a layout that would look better, by a value recalled from another Katalon
page, or by an agent's own taste. The only thing that changes a rule is the owner asking
for the change in words — and then the rule file is edited **first**, before any design is.

## The seven laws

**01 · An agent never changes a rule.** Every rule here is fixed. You may apply a rule,
never amend, soften, reinterpret or "improve" it.

**02 · Never invent a rule that is not written here.** If this system does not state a
value, that is not an invitation to pick one. No new hue, weight, stroke, radius,
duration, spacing step or component variant because it seemed reasonable in the moment.

**03 · When it is unclear, ask — do not decide.** Not understanding a rule, or not finding
one, is a question. A guess that happens to look fine is still a breach: it puts a value
into a design that nothing here can justify.

**04 · One rule, one home.** A rule lives in exactly one place. Do not restate it
elsewhere — a copy drifts the moment the original changes. Reference it, and change the
value at its one source.

**05 · Colour, contrast and geometry are measured, never judged.** Where a rule states a
number (a ratio, a stroke, a gap, a step), that number is derived and must be **quoted**
when it changes. "It looks right" is not evidence and never overrides a measurement.

**06 · Silence is not permission.** A rule this system does not mention has not been
granted. Adding a shadow, a gradient, an emoji, a countdown or a new font because nothing
forbids it explicitly is still outside the system.

**07 · The catalog is the source, not the memory of it.** Build from what the catalog says
today — not an earlier version, a screenshot, a recollection, or a live Katalon surface
that may itself be out of date. If a live surface contradicts the catalog, **the catalog
wins and the surface is the bug.**

## Where each rule lives

| Area | Rule home | State |
|---|---|---|
| Colour | `rules/colour.md` · catalog → Foundations / Colors | Explicit |
| Icons | `rules/icons.md` · Foundations / Icons — 8 rules | Explicit |
| Product glyphs | `rules/product-glyphs.md` · Foundations / Product glyphs — 6 rules | Explicit |
| Pathway graphics | `rules/pathway.md` · Foundations / Pathway graphics — 6 rules | Explicit |
| Katalon AI mark | `rules/ai-mark.md` · Foundations / Katalon AI — locked asset + 16 motion states | Explicit |
| Page layout | `rules/layout.md` · Guidelines / How to divide sections | Explicit |
| Sub-brand lockup | `rules/sub-brand.md` · Resources / Sub-brand — `--k-sub-*` contract | Explicit |
| Accessibility | catalog → Guidelines / Accessibility — WCAG 2.2 AA | Explicit |
| Compliance | `rules/compliance.md` — 19 machine-checked rules | Explicit |
| Typography | Foundations / Typography — scale documented, **no rule block** | Ask first |
| Spacing & radius | Foundations / Spacing, Radius — scales documented, **no rule block** | Ask first |
| Logo | Foundations / Logo, Resources / Brand assets — clear space & minimum size | Ask first |
| Imagery & data viz | Foundations / Imagery, Data visualization — guidance, **no rule block** | Ask first |

Rows marked **Ask first** are documented but carry no binding rule block yet. Law 03
applies there: ask, don't fill the gap.

## How to amend a rule

Owner states the change in words → the rule file (and the catalog page that owns it) is
edited, with the new value and, where the rule is a measurement, the measured figure →
only then do designs follow. Never the reverse order: **a design is never the place a rule
gets decided.**
