Groups the actions that apply to the thing below it.

```jsx
<Toolbar label="Run actions" dense>
  <IconButton label="Run"><Icon name="play" size={20} /></IconButton>
  <IconButton label="Refresh"><Icon name="arrows-rotate" size={20} /></IconButton>
  <ToolbarSeparator />
  <ToolbarSpacer />
  <Button variant="neutral" size="sm">Export</Button>
</Toolbar>
```

Rules:
- Flat: 1px border plus a surface step, never a shadow.
- Every icon-only control carries a `label`, and a `Tooltip` if the glyph is ambiguous.
- `dense` (40px) is the floor — never below 32px, and only on a product surface.
