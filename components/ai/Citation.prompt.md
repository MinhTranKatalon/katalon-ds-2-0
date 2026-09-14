Shows where an answer came from — a run, a log line, a doc page.

```jsx
<p>Three cases hit the same locator <Citation index={1} label="run 8f2a91" href="/runs/8f2a91" />.</p>
<CitationSources sources={[{ label: 'Run 8f2a91 · failure log', href: '/runs/8f2a91', meta: '14 Sep' }]} />
```

Rules:
- Inline numerals match the numbered list — a citation with no source entry is a dead reference.
- Cite the object the user can open, not a generic page.
- AI output is a starting point, not a locked result: every cited artifact stays editable.
