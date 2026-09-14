Where the user asks. Grows with the text, sends on Enter.

```jsx
<Composer value={q} onChange={setQ} onSubmit={ask} busy={busy}
  hint="Katalon AI can read this project's runs and objects." />
```

Rules:
- Enter sends, Shift+Enter breaks — no Send-button-only composer.
- Send is disabled while empty and while `busy`; the working state is shown by `AiStatus`, not by the button.
- The hint says what the assistant can see. No hype, no exclamation marks.
