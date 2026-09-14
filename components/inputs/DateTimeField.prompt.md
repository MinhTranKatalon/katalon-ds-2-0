A date or time — a schedule, a report window, a retention cutoff.

```jsx
<Field label="Run from"><DateTimeField type="datetime-local" value={from} onChange={setFrom} /></Field>
```

Rules:
- Native input on purpose: it brings the OS picker, the locale format and the keyboard handling for free.
- Values render in mono — dates and times are figures.
- Set `min`/`max` whenever the range is real (no schedules in the past).
