Sibling views of the same object — Overview / Runs / Settings on one test suite.

```jsx
<Tabs label="Suite views" value={tab} onChange={setTab}
  tabs={[{ value: 'runs', label: 'Runs', count: 179 }, { value: 'settings', label: 'Settings' }]} />
```

Rules:
- The active tab is a 2px accent underline plus 600 weight plus `aria-selected` — three signals.
- Counts go inline in mono. They are evidence.
- Tabs navigate between views; a filter over one view is a `SegmentedControl`.
