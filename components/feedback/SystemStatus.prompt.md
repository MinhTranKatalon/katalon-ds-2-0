Owns the page when the page cannot do its job.

```jsx
<SystemStatus kind="maintenance"
  body="Test execution resumes at 03:00 UTC. Scheduled runs will queue until then."
  detail="ref 7f21c" action={<Button variant="neutral">Open status page</Button>} />
```

Rules:
- State the consequence and the time, not an apology. No exclamation marks, no emoji.
- Always give a next step — a status page, a retry, a way back.
- `detail` carries the id support will ask for, in mono.
