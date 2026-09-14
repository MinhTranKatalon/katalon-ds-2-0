Multi-line free text — a description, a note, a failure comment.

```jsx
<Field label="Why was this quarantined?" hint="One sentence is enough.">
  {({ id }) => <TextArea id={id} rows={4} />}
</Field>
```

Rules:
- Resizes vertically only; never fix its height when the content can grow.
- If the text is code, use the mono surface instead.
