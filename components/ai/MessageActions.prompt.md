Lets the user copy, retry or rate an answer.

```jsx
<MessageActions onCopy={copy} onRetry={retry} onGood={up} onBad={down} />
```

Rules:
- Only render the actions that do something — an inert thumb is noise.
- Every button carries an `aria-label`; the glyph is never the only signal.
- Feedback is optional; copy and retry are the two that earn their place.
