A labelled on/off control that stays in place — filters, view modes, "only failures".

```jsx
<ToggleButton pressed={onlyFailed} onChange={setOnlyFailed}>Only failures</ToggleButton>
```

Rules:
- Use for a state the user flips repeatedly. For a setting that is saved, use `Switch`.
- `aria-pressed` is always set — the tint is the second signal, never the only one.
- Never colour-only: the label says what is on.
