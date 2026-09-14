The quietest status treatment — inline in a row or a header, where a badge would shout.

```jsx
<StatusDot tone="running" label="Running" />
```

Rules:
- **The label is required.** A bare dot breaks "never meaning by colour alone".
- Use it inline in dense rows; use `Badge` where the status is the point of the cell.
- Where a blink is meaningful (recording, live run), it is a hard 1-step blink, never a fade.
