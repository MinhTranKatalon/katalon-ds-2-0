The action control — one `primary` per block, everything else `neutral`, `ghost` or `ink`.

```jsx
<Button variant="primary" iconEnd={<Icon name="arrow-right" size={18} />}>Start free trial</Button>
<Button variant="neutral">Cancel</Button>
```

Rules:
- Height 44 / 48 / 56 by size — never below 44px on web.
- Labels start with a verb and name the object: "Run test case", not "OK".
- **On a coloured card the CTA is never green** — use `ink` on a light fill, `neutral` on a dark one.
- `danger` only for destructive confirms, and the copy states the consequence and the count.
- Disabled is a last resort; explain the blocker nearby instead.
