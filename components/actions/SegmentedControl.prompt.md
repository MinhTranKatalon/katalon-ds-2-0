Switches between two to four views of the same content — light / dark, week / month, list / grid.

```jsx
<SegmentedControl
  label="Theme"
  options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
  value={theme} onChange={setTheme}
/>
```

Rules:
- Two to four options with short labels. Five or more → `Select`.
- The selected segment is a white surface plus primary ink plus `aria-selected`.
- It filters or reframes the current view; it never navigates. Use `Tabs` for that.
