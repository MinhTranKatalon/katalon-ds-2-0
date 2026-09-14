A bounded number — retries, timeout, parallel workers.

```jsx
<Field label="Timeout"><NumberInput value={t} onChange={setT} min={1} max={600} unit="seconds" /></Field>
```

Rules:
- Figures are mono — they are evidence and must align in a column.
- `▲`/`▼` are the only typographic marks allowed as steppers; each carries an `aria-label`.
- Always set `min`/`max` when the range is real, and put the unit in `unit`, not in the label.
