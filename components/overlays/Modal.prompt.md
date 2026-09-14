Interrupts for one decision that cannot be deferred.

```jsx
<Modal open={open} onClose={close} title="Delete “Login flow”?"
  description="This removes the test case and its 12 steps. This can't be undone."
  footer={<><Button variant="neutral" onClick={close}>Cancel</Button><Button variant="danger">Delete test case</Button></>} />
```

Rules:
- Destructive confirms state the consequence **and the count**. The confirm button names the act, never "OK".
- Escape and scrim click both close. Confirm last in the footer.
- The scrim is `rgba(15,20,25,.4)` — one of only three places transparency appears.
- Never stack two modals. Never use one for content the page could hold.
