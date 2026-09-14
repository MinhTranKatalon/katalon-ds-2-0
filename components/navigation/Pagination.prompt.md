Moves through a long list, and states where you are.

```jsx
<Pagination page={p} pageCount={30} total={179} pageSize={6} onPage={setP} />
```

Rules:
- Always pass `total` and `pageSize` — "1–6 of 179" is the point; bare arrows are not.
- The current page carries `aria-current="page"` plus the accent tint.
- `…` is the typographic gap mark, and it is `aria-hidden`.
