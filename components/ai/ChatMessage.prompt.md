A single turn — the user's ask, or the assistant's answer.

```jsx
<ChatMessage role="user" name="Minh">Why did the checkout suite fail?</ChatMessage>
<ChatMessage role="assistant" footer={<MessageActions onCopy={copy} />}>
  3 of 49 cases failed. All three hit the same locator.
</ChatMessage>
```

Rules:
- The assistant is identified by `ai-katalon-color.svg` (`-white.svg` on green, dark or image grounds) — a locked brand asset, never redrawn or recoloured.
- Address the reader as **you**; state product status objectively with no subject: "3 of 49 test cases failed".
- Flat surfaces, 1px borders. No bubble tails, no gradients, no shadows.
