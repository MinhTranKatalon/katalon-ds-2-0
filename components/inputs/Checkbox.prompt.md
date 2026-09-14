One independent yes/no, or a row selector in a table.

```jsx
<Checkbox checked={v} onChange={setV} label="Rerun failed cases" hint="Only cases that failed in the last run." />
```

Rules:
- 44px row height — the whole label is the hit target.
- `indeterminate` for a parent whose children are partly selected; never fake it with a styled glyph.
- Independent options are checkboxes; one-of-many is a `RadioGroup`.
