Rows of comparable records — runs, cases, accounts.

```jsx
<Table caption="Runs, last 30 days" columns={[
  { key: 'name', header: 'Test case' },
  { key: 'status', header: 'Result', render: (r) => <Badge tone={r.tone} dot>{r.status}</Badge> },
  { key: 'dur', header: 'Duration', align: 'right', mono: true },
]} rows={runs} />
```

Rules:
- Every numeric column is `mono` and right-aligned — figures must align to be comparable.
- Status cells are a `Badge` with its word, never a bare coloured dot.
- Header cells carry `scope="col"`. Flat: borders and a tinted header, never a shadow.
- `dense` for a product surface; keep rows ≥ 44px on web.
