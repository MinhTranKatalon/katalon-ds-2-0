A setting that applies the moment it is flipped.

```jsx
<Switch checked={healing} onChange={setHealing} label="Self-healing locators" hint="Retries with a generated locator when one breaks." />
```

Rules:
- Immediate effect. If the change needs a Save button, use `Checkbox`.
- The label states the on-state plainly: "Self-healing locators", not "Enable/disable healing".
- `role="switch"` plus `aria-checked` — never a styled checkbox.
