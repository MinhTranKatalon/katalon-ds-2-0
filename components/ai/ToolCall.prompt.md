Makes the assistant's work auditable — what it ran, and what came back.

```jsx
<ToolCall name="query_runs" state="done" summary="49 rows" detail={raw} />
```

Rules:
- Collapsed by default; the raw output is available, not imposed.
- State carries its word (`Running` / `Done` / `Failed`) beside the ink.
- Tool name verbatim in mono — never prettified.
