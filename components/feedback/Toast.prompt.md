Confirms an action the user just took, then leaves.

```jsx
<Toast message="12 test cases moved to Quarantine" action={<Button variant="ghost" size="sm">Undo</Button>} />
```

Rules:
- Past tense, with the count: "12 test cases moved", not "Moved successfully!".
- `aria-live="polite"` so it is announced without stealing focus.
- Never for an error the user must act on — that is an `Alert`.
- One action maximum, and it is usually Undo.
