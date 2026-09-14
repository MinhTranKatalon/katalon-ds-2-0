Teaches what the assistant is good at, on an empty conversation.

```jsx
<SuggestedPrompts onPick={ask} prompts={[
  'Why did the checkout suite fail?',
  'Which cases are flaky this week?',
  'Draft a test case for password reset',
]} />
```

Rules:
- Three to five, each a question a tester would actually ask about **their** data.
- Disappear once the conversation starts.
- Never generic ("Tell me about testing") — a prompt that teaches nothing is filler.
