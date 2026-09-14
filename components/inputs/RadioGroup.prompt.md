One of a few options, all visible at once, with a hint per option where it earns it.

```jsx
<RadioGroup name="env" label="Environment" value={env} onChange={setEnv}
  options={[{ value: 'staging', label: 'Staging' }, { value: 'prod', label: 'Production', hint: 'Runs against live data.' }]} />
```

Rules:
- Two to five options. Six or more → `Select`.
- Always preselect a sane default; an empty radio group is a decision passed to the user for no reason.
- 44px rows, and the label is part of the hit target.
