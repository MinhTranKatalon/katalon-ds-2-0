A real hierarchy — test suites, an object repository, a folder tree.

```jsx
<TreeList label="Test explorer" defaultOpen={['checkout']} nodes={tree} />
```

Rules:
- 16px indent per level, exactly. Rows 36px in a product panel.
- `role="tree"` / `treeitem` / `group` with `aria-expanded` on every parent.
- Only for genuine nesting; a flat list of records is a `List`.
