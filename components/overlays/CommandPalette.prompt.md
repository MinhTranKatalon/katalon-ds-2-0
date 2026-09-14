Reaches any action by name, for users who live on the keyboard.

```jsx
<CommandPalette open={open} onClose={close} commands={[
  { id: 'run', label: 'Run test suite', group: 'Execution', shortcut: '⌘R', onRun: run },
]} />
```

Rules:
- An accelerator, never the only route — every command also lives in the UI.
- Labels start with a verb and name the object.
- The empty state quotes the query back: "No command matches “xyz”".
