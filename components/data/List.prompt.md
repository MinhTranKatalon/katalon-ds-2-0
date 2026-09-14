Records with one or two lines each — recent runs, attached files, team members.

```jsx
<List items={[{ title: 'Login flow', meta: 'Checkout · 12 steps', trailing: <Badge tone="pass" dot>Passed</Badge> }]} />
```

Rules:
- Rows are ≥ 56px on web. Hairline separators, no card per row.
- `trailing` holds the status or the action, never both.
- Three or more comparable fields per row means it is a `Table`.
