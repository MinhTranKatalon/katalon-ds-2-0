# TOKENS — the 235 `--k-*` names, with their values

Generated from `ds/katalon-ds.css`, which is the contract. **This file exists because
"never a literal" is only possible if you know the names.** `SKILL.md` gives the design
values; this gives the token that carries each one. When the two disagree, the CSS wins and
`SKILL.md` is the bug (law 07).

Every value below is what the stylesheet actually resolves to today. Tokens written as
`var(--k-…)` are aliases — use the alias, not its target, so a re-point reaches your code.

## Radius — a ramp of six, plus one sanctioned role token

Two layers, and keeping them apart is the whole discipline:

**The ramp** — `--k-radius-*`, six steps and a pill: **2 · 4 · 8 · 12 · 16 · 20 · 999**.
This is a clean progression and **nothing is ever inserted into it**.

**The role layer** — `--k-btn-radius: 10px`. A named token with its own swatch on the
Foundations / Radius page, scoped to **"buttons & primary inputs"**. It is deliberately
**not** a ramp step: 10 sits between `md` 8 and `lg` 12 and would break the ramp's even
spacing if it were one.

So `border-radius: 10px` written as a literal is a breach, and `var(--k-btn-radius)` is
correct. The value is sanctioned; only the literal is not.

**There is no 6px radius in this system** — `SKILL.md` said so for a long time and it was
never true.

### The role each step owns

From Foundations / Radius, which is the source:

| Token | Value | Owns |
|---|---|---|
| `--k-radius-xs` | 2px | hairline detail |
| `--k-radius-sm` | 4px | small inner detail |
| `--k-radius-md` | 8px | text fill — inline field |
| **`--k-btn-radius`** | **10px** | **button · primary input** |
| `--k-radius-lg` | 12px | banner — notice strip |
| `--k-radius-xl` | 16px | card — content card |
| `--k-radius-2xl` | 20px | popup — modal, dialog, popover |
| `--k-radius-pill` | 999px | badge, toggle, avatar |

`.kds-btn` and `.kds-input` both resolve to `--k-btn-radius`, exactly as the page says.
That is **correct and intentional** — a field and the button beside it are the same height
(44px) and must carry the same corner. Do not "fix" `.kds-input` to `--k-radius-md`.

### What keeping 10 does cost

Three limits, all live-withable, recorded so nobody rediscovers them as bugs:

1. **The ramp is no longer uniform once you read the role layer next to it** (…8, 10, 12…).
   Harmless as long as 10 stays out of `--k-radius-*`. If you ever generate radii
   algorithmically or mirror the scale into Figma variables, generate from the **ramp only**
   and add the button role on top.
2. **Button 10 and banner 12 are 2px apart**, so a button inside a banner has nearly its
   container's corner. Corner hierarchy cannot signal nesting there — use fill and border
   instead. (A card at 16 still reads clearly looser.)
3. **`--k-radius-md` 8px currently has no component using it** for its stated "text fill"
   role — only `.kds-nav-item`. The role is reserved, not yet built. Reserving it is fine;
   just don't conclude from the silence that inputs belong at 8.

### The raw ramp

| Token | Value |
|---|---|
| `--k-radius-xs` | `2px` |
| `--k-radius-sm` | `4px` |
| `--k-radius-md` | `8px` |
| `--k-radius-lg` | `12px` |
| `--k-radius-xl` | `16px` |
| `--k-radius-2xl` | `20px` |
| `--k-radius-pill` | `999px` |
| `--k-btn-radius` | `10px` — role layer, not a ramp step |

## Spacing — 4px base

| Token | Value |
|---|---|
| `--k-sp-1` | `4px` |
| `--k-sp-2` | `8px` |
| `--k-sp-3` | `12px` |
| `--k-sp-4` | `16px` |
| `--k-sp-5` | `24px` |
| `--k-sp-6` | `32px` |
| `--k-sp-7` | `48px` |
| `--k-sp-8` | `64px` |
| `--k-sp-9` | `80px` |
| `--k-sp-10` | `120px` |

## Motion

`--k-ease-in-out` resolves to the same curve as `--k-ease-std`. Prefer `--k-ease-std`.

| Token | Value |
|---|---|
| `--k-ease-std` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--k-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--k-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--k-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--k-dur-fast` | `150ms` |
| `--k-dur-base` | `200ms` |
| `--k-dur-slow` | `320ms` |

## Elevation — flat

Every shadow token resolves to `none`. The system is flat: depth is a 1px border plus a tinted surface. Do not reintroduce a shadow.

| Token | Value |
|---|---|
| `--k-shadow-xs` | `none` |
| `--k-shadow-sm` | `none` |
| `--k-shadow-md` | `none` |
| `--k-shadow-lg` | `none` |
| `--k-shadow-xl` | `none` |
| `--k-shadow-action` | `none` |

## Ink

| Token | Value |
|---|---|
| `--k-text-primary` | `#0c1411` |
| `--k-text-body` | `#1f2925` |
| `--k-text-secondary` | `#3c4642` |
| `--k-text-tertiary` | `#5b6661` |
| `--k-text-disabled` | `#aab4af` |
| `--k-text-invert` | `#ffffff` |
| `--k-text-link` | `var(--k-action-700)` |
| `--k-text-link-hover` | `var(--k-action-800)` |

## Backgrounds

| Token | Value |
|---|---|
| `--k-bg-page` | `var(--k-gray-0)` |
| `--k-bg-subtle` | `var(--k-gray-50)` |
| `--k-bg-muted` | `var(--k-gray-100)` |
| `--k-bg-canvas` | `#eaf6ef` |
| `--k-bg-highlight` | `var(--k-highlight)` |
| `--k-bg-action` | `var(--k-action-600)` |
| `--k-bg-forest` | `#06392b` |
| `--k-bg-dark` | `#0c1411` |

## Borders & focus

| Token | Value |
|---|---|
| `--k-border-subtle` | `#eef2f0` |
| `--k-border-default` | `#e1e7e4` |
| `--k-border-strong` | `#1f2925` |
| `--k-border-action` | `var(--k-action-600)` |
| `--k-focus-ring` | `var(--k-action-600)` |

## Data visualisation — use in order

| Token | Value |
|---|---|
| `--k-seq-1` | `var(--k-slate-600)` |
| `--k-seq-2` | `var(--k-action-600)` |
| `--k-seq-3` | `var(--k-warning-600)` |
| `--k-seq-4` | `var(--k-pink-600)` |
| `--k-seq-5` | `var(--k-info-600)` |
| `--k-seq-6` | `var(--k-slate-400)` |

## Type

| Token | Value |
|---|---|
| `--k-font-display` | `"Inter Tight", "Inter", -apple-system, system-ui, sans-serif` |
| `--k-font-body` | `"Inter", -apple-system, system-ui, sans-serif` |
| `--k-font-mono` | `"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace` |
| `--k-fs-display` | `clamp(48px, 6vw, 88px)` |
| `--k-lh-display` | `1.04` |
| `--k-fs-h1` | `clamp(36px, 4.4vw, 56px)` |
| `--k-lh-h1` | `1.08` |
| `--k-fs-h2` | `clamp(30px, 3.4vw, 44px)` |
| `--k-lh-h2` | `1.12` |
| `--k-fs-h3` | `clamp(24px, 2.4vw, 34px)` |
| `--k-lh-h3` | `1.18` |
| `--k-fs-h4` | `clamp(20px, 1.8vw, 26px)` |
| `--k-lh-h4` | `1.28` |
| `--k-fs-h5` | `20px` |
| `--k-lh-h5` | `1.35` |
| `--k-fs-h6` | `17px` |
| `--k-lh-h6` | `1.4` |
| `--k-fs-body-lg` | `20px` |
| `--k-lh-body-lg` | `1.6` |
| `--k-fs-body-md` | `18px` |
| `--k-lh-body-md` | `1.6` |
| `--k-fs-body-sm` | `16px` |
| `--k-lh-body-sm` | `1.5` |
| `--k-fs-caption` | `14px` |
| `--k-lh-caption` | `1.4` |
| `--k-fs-micro` | `12px` |
| `--k-lh-micro` | `1.4` |
| `--k-fs-eyebrow` | `13px` |
| `--k-tracking-eyebrow` | `0.12em` |

## Sub-brand lockup — set `--k-sub-h` only

Every other value is a ratio of `--k-sub-h`. Setting any of them by hand is what drifts the subname off the wordmark baseline (`rules/sub-brand.md`).

| Token | Value |
|---|---|
| `--k-sub-h` | `46px` |
| `--k-sub-size-ratio` | `0.70` |
| `--k-sub-gap-ratio` | `0.48` |
| `--k-sub-baseline-ratio` | `0.065` |
| `--k-sub-weight` | `300` |
| `--k-sub-tracking` | `0` |
| `--k-sub-color-product` | `var(--k-action-600)` |
| `--k-sub-color-resource` | `var(--k-text-primary)` |
| `--k-sub-color-product-dark` | `var(--k-bright-400)` |
| `--k-sub-color-resource-dark` | `var(--k-gray-0)` |

## Ramp — action

| Token | Value |
|---|---|
| `--k-action-50` | `#f0faf5` |
| `--k-action-100` | `#ecf4f2` |
| `--k-action-200` | `#cfe6df` |
| `--k-action-300` | `#9fcec0` |
| `--k-action-400` | `#6fb5a0` |
| `--k-action-500` | `#3f9d81` |
| `--k-action-600` | `#0f8461` |
| `--k-action-700` | `#0c6a4e` |
| `--k-action-800` | `#094f3a` |
| `--k-action-900` | `#063527` |
| `--k-action-950` | `#032118` |

## Ramp — bright

| Token | Value |
|---|---|
| `--k-bright-50` | `#f7fefb` |
| `--k-bright-100` | `#eefcf8` |
| `--k-bright-200` | `#d1f7ec` |
| `--k-bright-300` | `#a3efd9` |
| `--k-bright-400` | `#75e8c5` |
| `--k-bright-500` | `#47e0b2` |
| `--k-bright-600` | `#19d89f` |
| `--k-bright-700` | `#14ad7f` |
| `--k-bright-800` | `#0f825f` |
| `--k-bright-900` | `#0a5640` |
| `--k-bright-950` | `#062f24` |

## Ramp — info

| Token | Value |
|---|---|
| `--k-info-50` | `#fcfcff` |
| `--k-info-100` | `#f9f9fe` |
| `--k-info-200` | `#f3f1ff` |
| `--k-info-300` | `#e8e5ff` |
| `--k-info-400` | `#aeaff5` |
| `--k-info-500` | `#7a7aef` |
| `--k-info-600` | `#5959eb` |
| `--k-info-700` | `#412ed5` |
| `--k-info-800` | `#3526a8` |
| `--k-info-900` | `#291d7a` |
| `--k-info-950` | `#181046` |

## Ramp — warning

| Token | Value |
|---|---|
| `--k-warning-50` | `#fffef8` |
| `--k-warning-100` | `#fffcef` |
| `--k-warning-200` | `#fff9db` |
| `--k-warning-300` | `#fff0b0` |
| `--k-warning-400` | `#ffeda2` |
| `--k-warning-500` | `#ffe46d` |
| `--k-warning-600` | `#fed730` |
| `--k-warning-700` | `#e0bd2a` |
| `--k-warning-800` | `#b8991f` |
| `--k-warning-900` | `#8a7218` |
| `--k-warning-950` | `#524409` |

## Ramp — fail

| Token | Value |
|---|---|
| `--k-fail-50` | `#fef4f4` |
| `--k-fail-100` | `#fde7e7` |
| `--k-fail-200` | `#fbcfcf` |
| `--k-fail-300` | `#f5a3a3` |
| `--k-fail-400` | `#e57272` |
| `--k-fail-500` | `#dc5555` |
| `--k-fail-600` | `#d14343` |
| `--k-fail-700` | `#a73636` |
| `--k-fail-800` | `#7d2828` |
| `--k-fail-900` | `#5c1e1e` |
| `--k-fail-950` | `#340f0f` |

## Ramp — slate

| Token | Value |
|---|---|
| `--k-slate-50` | `#f7f8fc` |
| `--k-slate-100` | `#eff1fa` |
| `--k-slate-200` | `#e4e7f5` |
| `--k-slate-300` | `#c2c7e4` |
| `--k-slate-400` | `#99a1d1` |
| `--k-slate-500` | `#636eac` |
| `--k-slate-600` | `#43509b` |
| `--k-slate-700` | `#2d377d` |
| `--k-slate-800` | `#232c63` |
| `--k-slate-900` | `#1a2149` |
| `--k-slate-950` | `#0f142e` |

## Ramp — pink

| Token | Value |
|---|---|
| `--k-pink-50` | `#fefbfe` |
| `--k-pink-100` | `#fcf7fd` |
| `--k-pink-200` | `#f8ecf9` |
| `--k-pink-300` | `#eac8ea` |
| `--k-pink-400` | `#d98bda` |
| `--k-pink-500` | `#c95acb` |
| `--k-pink-600` | `#bf3dc2` |
| `--k-pink-700` | `#aa36ac` |
| `--k-pink-800` | `#8c2d8e` |
| `--k-pink-900` | `#732574` |
| `--k-pink-950` | `#4a184b` |

## Ramp — gray

| Token | Value |
|---|---|
| `--k-gray-0` | `#ffffff` |
| `--k-gray-50` | `#f6f8f7` |
| `--k-gray-100` | `#eef2f0` |
| `--k-gray-200` | `#e1e7e4` |
| `--k-gray-300` | `#cdd6d2` |
| `--k-gray-400` | `#aab4af` |
| `--k-gray-500` | `#7f8b86` |
| `--k-gray-600` | `#5b6661` |
| `--k-gray-700` | `#3c4642` |
| `--k-gray-800` | `#1f2925` |
| `--k-gray-900` | `#0c1411` |
| `--k-gray-950` | `#060a08` |

## Everything else

| Token | Value |
|---|---|
| `--k-brand-green-dot` | `#19d89f` |
| `--k-brand-black` | `#000000` |
| `--k-brand-white` | `#ffffff` |
| `--k-primary` | `var(--k-action-600)` |
| `--k-primary-hover` | `var(--k-action-700)` |
| `--k-primary-active` | `var(--k-action-800)` |
| `--k-highlight` | `var(--k-warning-600)` |
| `--k-pass-50` | `var(--k-action-50)` |
| `--k-pass-100` | `var(--k-action-100)` |
| `--k-pass-200` | `var(--k-action-200)` |
| `--k-pass-500` | `var(--k-action-600)` |
| `--k-pass-600` | `var(--k-action-600)` |
| `--k-pass-700` | `var(--k-action-700)` |
| `--k-success-100` | `var(--k-action-100)` |
| `--k-success-500` | `var(--k-action-600)` |
| `--k-error-100` | `var(--k-fail-100)` |
| `--k-error-500` | `var(--k-fail-600)` |
| `--k-pending-500` | `var(--k-slate-600)` |
| `--k-ls-display` | `-0.03em` |
| `--k-container-max` | `1200px` |
| `--k-content-max` | `880px` |
| `--k-container-gutter` | `24px` |
| `--k-btn-radius` | `10px` |
| `--k-btn-weight` | `500` |
| `--k-btn-h-sm` | `36px` |
| `--k-btn-px-sm` | `16px` |
| `--k-btn-fs-sm` | `14px` |
| `--k-btn-h-md` | `44px` |
| `--k-btn-px-md` | `22px` |
| `--k-btn-fs-md` | `15px` |
| `--k-btn-h-lg` | `52px` |
| `--k-btn-px-lg` | `28px` |
| `--k-btn-fs-lg` | `16px` |
| `--k-code-ink` | `#dfe6e3` |
| `--k-pathway-thickness` | `26.2%` |
| `--k-pathway-sweep` | `90deg` |

---

**Two alias redundancies, on purpose:** `--k-pass-500` and `--k-pass-600` both resolve to
`--k-action-600` (the ramp has no separate pass-500) — write `--k-pass-600`.
`--k-ease-in-out` duplicates `--k-ease-std` — write `--k-ease-std`. Neither is a bug; both
exist so older markup keeps resolving.

Total: **235 tokens**. `--k-dither-*` does not exist — the dither system was removed;
a reference to one anywhere is a bug.

## Product glyph pairs — 14 tokens

Seven products, one measured **plate + glyph** pair each. Light on `:root`; `.k-dark`
re-binds the same 14 names, so a product glyph is theme-correct with no branch at the
call site. The dark pair is **not** an inversion of the light one — each was measured
against the `#0c1411` dark ground so the glyph clears its plate by ≥4.5:1. Never
re-tint by eye, never cross themes with a CSS filter.

| Name | Light | `.k-dark` | Product |
|---|---|---|---|
| `--k-prod-studio-bg` / `-fg` | `#e3f6ee` / `#12a877` | `#074330` / `#c4e9dd` | Studio |
| `--k-prod-cloud-bg` / `-fg` | `#fdf3e1` / `#bd862a` | `#4c3611` / `#efe1ca` | TestCloud |
| `--k-prod-local-bg` / `-fg` | `#ebecf7` / `#5b5fb0` | `#40437b` / `#dedfef` | Local runner |
| `--k-prod-insights-bg` / `-fg` | `#fce8f3` / `#d6388a` | `#561637` / `#f5cde2` | Insights |
| `--k-prod-testmgmt-bg` / `-fg` | `#edeefb` / `#7a7aef` | `#313160` / `#dedefb` | Test management |
| `--k-prod-saas-bg` / `-fg` | `#e9f5f7` / `#1f8a98` | `#0c373d` / `#c7e2e5` | SaaS platform |
| `--k-prod-support-bg` / `-fg` | `#fcecf0` / `#c0476a` | `#86324a` / `#f2dae1` | Support |

Product-glyph colour is **only** for product glyphs — pricing cards, product pickers,
product nav. It is never a status, never a CTA, and never a functional-icon colour.
