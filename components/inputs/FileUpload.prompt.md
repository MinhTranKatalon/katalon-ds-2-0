Takes a file — test data, a keystore, a report import.

```jsx
<FileUpload accept=".csv" onFiles={upload} hint="Drop a CSV of test data, or browse" />
```

Rules:
- Drag-and-drop is never the only route — the browse button always exists.
- The hint names the format and what it is for, not "Upload a file".
- After a file lands, show its name and size and a way to remove it.
