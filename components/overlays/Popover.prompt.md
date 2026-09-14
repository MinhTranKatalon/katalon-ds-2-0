Explains something in more than a phrase, without taking over the page.

```jsx
<Popover title="How flakiness is scored" trigger={<IconButton label="About flakiness"><Icon name="circle-info" size={18} /></IconButton>}>
  A case is flaky when it changes result across retries on the same commit.
</Popover>
```

Rules:
- A phrase is a `Tooltip`; a paragraph or a control is a `Popover`; a decision is a `Modal`.
- Escape and outside click both close it.
- Keyboard reachable — it opens from a real button, never a hover-only target.
