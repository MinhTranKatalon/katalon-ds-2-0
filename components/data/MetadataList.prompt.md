The facts about one object — a run's id, trigger, duration, environment.

```jsx
<MetadataList columns={3} items={[
  { label: 'Run id', value: 'run_8f2a91', mono: true },
  { label: 'Triggered by', value: 'CI · main' },
  { label: 'Duration', value: '00:10:42', mono: true },
]} />
```

Rules:
- Labels are the mono eyebrow — the only uppercase text in the system.
- Every id, path, duration and timestamp is `mono`.
- Use `dl`/`dt`/`dd`; it is a description list, not a table.
