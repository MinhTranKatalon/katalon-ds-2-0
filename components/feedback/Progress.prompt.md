Shows how far a known-length job has got.

```jsx
<Progress label="Running suite" value={112} max={179} countLabel="112 of 179" />
```

Rules:
- **Always pass `countLabel`.** Numbers are evidence and they go inline.
- `role="progressbar"` with the aria value trio.
- Unknown length → `Spinner`, or `AiStatus` when an agent is working.
