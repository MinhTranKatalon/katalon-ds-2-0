Collects several short free-text values — tags on a test case, recipients, labels.

```jsx
<Field label="Tags"><TagInput tags={tags} onAdd={add} onRemove={remove} /></Field>
```

Rules:
- Enter and comma both commit; Backspace on an empty field removes the last tag.
- Every remove button carries "Remove <tag>" as its accessible name.
- The `×` is typographic, not an icon — one of the four literal marks the system allows.
