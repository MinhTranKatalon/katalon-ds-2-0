# Sub-brand lockup — the token contract

Catalog: Resources / Sub-brand.

Every Katalon sub-brand is the **untouched logo + a subname**. All of its geometry is a
ratio of **one** input, `--k-sub-h` (the logo's rendered height), so a lockup at 28px and
one at 46px are the same drawing at two scales.

## Tokens — the only numbers there are

| Token | Value | What it does |
|---|---|---|
| `--k-sub-h` | per instance (46 / 30 / 28px) | The one input: the logo's rendered height. |
| `--k-sub-size-ratio` | `0.70` | Subname font-size ÷ logo height — puts its caps at the wordmark's cap height. |
| `--k-sub-gap-ratio` | `0.48` | Logo → subname gap ÷ logo height (≈ one cap height). |
| `--k-sub-baseline-ratio` | `0.065` | Baseline nudge so the subname sits on the wordmark baseline. |
| `--k-sub-weight` | `300` | Inter Tight Light. Loaded explicitly — a missing 300 renders as 400, silently. |
| `--k-sub-tracking` | `0` | Never tracked, never condensed. |
| `--k-sub-color-product` | `--k-action-600` | Every product shares Forest Green — per category, never per item. |
| `--k-sub-color-resource` | `--k-text-primary` | Resources and programs take neutral black. |
| `--k-sub-color-*-dark` | `--k-bright-400` / `--k-gray-0` | The reverse pair on a dark ground. |

## Markup

```html
<span class="k-sub-lockup" style="--k-sub-h:30px;">
  <img class="k-sub-logo" src="assets/logos/primary-lockup.svg" alt="Katalon">
  <span class="k-sub-name k-sub-name--product">Studio</span>
</span>
```

Set `--k-sub-h` and nothing else.

**Never hand-build a lockup.** Writing your own `<span>` with your own `gap`,
`font-size` and alignment is the single most common way this lockup goes wrong, and the
result is always the same defect: the subname drifts off the wordmark's baseline. Two
specific traps:

- `align-items: center` looks plausible and is wrong. The lockup is
  **`align-items: flex-end`** plus the `--k-sub-baseline-ratio` nudge — the subname sits
  on the **wordmark's** baseline, not on the mark's vertical centre.
- Inter Tight **300** must be loaded. If the page's font request omits 300, the browser
  renders 400 and the lockup silently looks heavier than the specimen.

If `ds/katalon-ds.css` is not loaded on the surface you are building, copy the
`.k-sub-lockup` / `.k-sub-logo` / `.k-sub-name` rules verbatim. Do not re-derive them.

## Rules

1. **The Katalon logo is immutable** — the official horizontal logo intact, never edited,
   never split from its mark, full clear space kept.
2. **Only the subname changes** — a new sub-brand fills in the subname. Never the font,
   size, spacing or position.
3. **Colour is per category, not per sub-brand** — products green, resources black.
