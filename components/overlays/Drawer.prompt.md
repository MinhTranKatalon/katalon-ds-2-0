Detail or a long form, while the list behind stays in place.

```jsx
<Drawer open={open} onClose={close} title="Run 8f2a91"
  footer={<Button variant="primary">Rerun failed</Button>}>
  <MetadataList columns={2} items={facts} />
</Drawer>
```

Rules:
- Use a drawer when context behind it matters; a `Modal` when the decision must be isolated.
- Header, scrolling body, sticky footer — the actions never scroll away.
- Escape and scrim click both close it.
