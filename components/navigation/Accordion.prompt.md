Hides long prose behind its question — an FAQ, or a rarely-touched settings group.

```jsx
<Accordion defaultOpen={['pricing']} items={[{ id: 'pricing', title: 'How is a run counted?', body: <p>…</p> }]} />
```

Rules:
- Headers carry `aria-expanded` — the chevron is the second signal.
- Never hide something the user needs to complete the task in front of them.
- First item open by default when the page is a single FAQ.
