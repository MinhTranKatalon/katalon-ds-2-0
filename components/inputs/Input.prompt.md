The default text input — 44px, 1px border, Forest-green focus ring plus a 3px accent halo.

```jsx
<Input placeholder="Search test cases" iconStart={<Icon name="magnifying-glass" size={18} />} />
```

Rules:
- Always inside a `Field` — the label is not optional.
- `sm` (36px) only on a dense product surface.
- `invalid` sets `aria-invalid`; the message lives in `Field`'s `error`.
- Placeholders show an example format, never the label.
