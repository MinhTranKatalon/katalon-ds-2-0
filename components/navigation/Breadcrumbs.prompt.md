Shows the path to a nested object — a test case inside a suite inside a project.

```jsx
<Breadcrumbs items={[{ label: 'Projects', href: '/p' }, { label: 'Checkout', href: '/p/1' }, { label: 'Login flow' }]} />
```

Rules:
- The last crumb carries `aria-current="page"` and is plain text, never a link.
- `/` is the separator — typographic, not an icon.
- Don't use it for a two-level hierarchy; a back link is clearer.
