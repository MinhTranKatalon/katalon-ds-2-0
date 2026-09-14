Names an icon-only control, or spells out a truncated value.

```jsx
<Tooltip label="Rerun failed cases">
  <IconButton label="Rerun failed"><Icon name="arrows-rotate" size={20} /></IconButton>
</Tooltip>
```

Rules:
- Opens on hover **and** focus — a hover-only tooltip is unreachable by keyboard.
- Never the only place information lives. Anything needed to act goes on the page.
- One short phrase. Longer explanation is a `Popover`.
