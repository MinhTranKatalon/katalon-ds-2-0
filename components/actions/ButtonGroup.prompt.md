Two or more buttons that belong together — a primary plus its escapes.

```jsx
<ButtonGroup label="Run actions">
  <Button variant="primary">Run test suite</Button>
  <Button variant="neutral">Schedule</Button>
</ButtonGroup>
```

Rules:
- One `primary` in the group, maximum.
- Primary first on web; on a dialog footer the confirm goes last.
- Spacing comes from `gap` — flex/grid + gap survives edits, per-button margins don't.
