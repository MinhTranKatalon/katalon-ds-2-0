Actions on a row or object that don't earn a visible button.

```jsx
<DropdownMenu align="end" trigger={<IconButton label="More actions"><Icon name="ellipsis" size={20} /></IconButton>}
  items={[{ label: 'Duplicate', onSelect: dup }, { separator: true }, { label: 'Delete', danger: true, onSelect: del }]} />
```

Rules:
- Items start with a verb. `danger` items go last, after a separator.
- Escape and outside click both close it.
- Never the only route to a primary action — a menu hides what a toolbar shows.
