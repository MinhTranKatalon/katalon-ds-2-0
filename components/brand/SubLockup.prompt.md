The only correct way to put a product name beside the Katalon logo.

```jsx
<SubLockup name="Studio" height={30} />
<SubLockup name="Academy" kind="resource" height={24} />
<SubLockup name="TestOps" height={30} dark />
```

Rules:
- **Set `height` and nothing else.** Size, gap, baseline nudge, weight, tracking and colour are all ratios of `--k-sub-h`.
- It is `align-items: flex-end` plus a baseline nudge, never `center`.
- Inter Tight **300** must be loaded or the subname silently renders 400.
- Never hand-build the span, and never re-type "Katalon" as text beside the mark.
- Full contract: `rules/sub-brand.md` — eight rules.
