The first thing a user sees in a feature they have not used yet.

```jsx
<EmptyState icon={<Icon name="file-lines" size={32} />}
  title="No test cases yet"
  body="Record a flow or write one by hand. Both end up in Test Cases."
  action={<Button variant="primary">Record a flow</Button>} />
```

Rules:
- One sentence that teaches, one action that starts. Not a paragraph, not three buttons.
- A 32px line icon, not an illustration.
- An empty-feeling section is a layout problem, not a content gap — don't pad it.
