When something happened — a run, a comment, a deploy.

```jsx
<Timestamp value={run.startedAt} relative="4 minutes ago" />
```

Rules:
- Always a `<time dateTime>` — the relative phrase is the display, the ISO value is the truth.
- Mono with tabular figures so a column of timestamps aligns.
- Relative under a day, absolute beyond it.
