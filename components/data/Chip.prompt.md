Shows a filter that is currently applied, and lets the user drop it.

```jsx
<Chip onRemove={() => clear('browser')}>Browser: Chrome</Chip>
```

Rules:
- The chip states the field and the value: "Browser: Chrome", not "Chrome".
- A row of chips is the visible record of the active query — never hide applied filters in a panel.
- `selected` is for a toggleable chip set; applied-filter chips are always "on".
