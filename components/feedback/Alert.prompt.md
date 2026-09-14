States a condition that persists until something changes — a quota, a broken integration, a failed run.

```jsx
<Alert tone="fail" title="Element not found: btn_Checkout"
  action={<Button variant="neutral" size="sm">Open Object Repository</Button>}>
  The locator changed in the last deploy.
</Alert>
```

Rules:
- Name the thing and the fix. Never "Something went wrong".
- `fail` carries `role="alert"`; the others are `role="status"`.
- The icon is a line glyph plus the tint plus the words — three signals.
- Transient confirmation is a `Toast`, not an alert.
