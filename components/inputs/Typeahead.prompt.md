Finds one item in a list too long for a `Select` — a test case, an object, a person.

```jsx
<Typeahead options={cases} value={q} onChange={setQ} onSelect={pick} placeholder="Find a test case" emptyText="No test case matches that name" />
```

Rules:
- `role="combobox"` on the input, `role="listbox"`/`option` on the list — keyboard first.
- The empty state names what would match, never "No results".
- `meta` carries the disambiguator (a path, an id) in mono.
