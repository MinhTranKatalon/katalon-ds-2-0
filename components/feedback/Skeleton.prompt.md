Holds the layout while content loads, in the shape of the real thing.

```jsx
<Skeleton lines={3} />
<Skeleton width={120} height={36} radius="var(--k-radius-lg)" />
```

Rules:
- Match the real content's shape and count. A skeleton that does not match is a layout jump.
- Flat tinted rectangles — the sheen is a web-only nicety and degrades to a static tint.
- Over a few seconds, say what is happening in words instead.
