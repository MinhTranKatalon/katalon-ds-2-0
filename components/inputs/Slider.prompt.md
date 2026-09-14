A coarse value where the exact number matters less than the direction — thresholds, parallelism.

```jsx
<Slider label="Flaky threshold" value={n} onChange={setN} min={0} max={20} unit="%" />
```

Rules:
- Always show the value in mono. A bar without a number is decoration.
- If the exact number matters, use `NumberInput` instead.
- Bounds must be meaningful; don't invent a 0–100 range for a 1–8 setting.
