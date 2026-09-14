The flat container. Read the content, decide what matters most, and let the fill say so.

```jsx
<Card tier={1} fill="var(--k-bright-600)" ink="var(--k-gray-950)">…</Card>
<Card tier={2} fill="var(--k-info-200)">…</Card>
<Card tier={3}>…</Card>
```

Rules:
- **A grid of identical white cards means the tier step was skipped.** In a tier, every card takes a different hue.
- **Forest 600 is never a card fill** — it is the action colour. For a green card use Forest 800–950.
- **Step 100 is not a card fill** (1.01–1.18:1, invisible). Step 200 is the quietest tint that reads.
- **A CTA inside a 600 card is never green.** Light fill → black fill, white label. Dark fill → white fill, ink label.
- No shadow, no coloured left border, no hover lift. `interactive` only when the whole card is a target.
