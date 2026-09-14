A single choice from six or more options.

```jsx
<Field label="Browser"><Select options={browsers} value={b} onChange={setB} placeholder="Pick a browser" /></Field>
```

Rules:
- Native `select` on purpose — it inherits the platform's own list behaviour and keyboard handling.
- Two to five options → `RadioGroup` or `SegmentedControl`; the choices are worth showing.
- If the user needs to type to find the option, use `Typeahead`.
