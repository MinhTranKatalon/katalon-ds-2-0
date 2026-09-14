An indeterminate wait shorter than a few seconds.

```jsx
<Spinner label="Loading runs" />
```

Rules:
- `label` says what is loading, never bare "Loading".
- Over a second or two, prefer `Skeleton` — it shows the shape of what is coming.
- For an agent at work use `AiStatus`, never a spinner.
