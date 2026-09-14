An icon-only button for toolbars, table rows and card corners.

```jsx
<IconButton label="Refresh run"><Icon name="arrows-rotate" size={20} /></IconButton>
```

Rules:
- `label` is required and describes the action, not the glyph: "Refresh run", not "Refresh icon".
- Pair it with a `Tooltip` whenever the glyph alone is ambiguous.
- Hover is a neutral tint; selected is the accent tint plus `aria-pressed`.
- Never the only way to reach a destructive action.
