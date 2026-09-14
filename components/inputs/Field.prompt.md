Wraps any input with its label, hint and error. Use it every time — an unlabelled input is a defect.

```jsx
<Field label="Project name" hint="Shown in run reports." error={err}>
  {({ id, invalid }) => <Input id={id} invalid={invalid} value={v} onChange={set} />}
</Field>
```

Rules:
- The error is a text sibling with `role="alert"`; colour is never the only signal.
- Hint text is persistent help, not a placeholder. Placeholders are examples, never labels.
- Errors name the thing and the fix: "Element not found: btn_Checkout. The locator changed — open the Object Repository."
