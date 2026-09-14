Shows that Katalon AI is working, and on what.

```jsx
import { ThinkingMark } from '../../thinking-mark.jsx';  // or window.ThinkingMark

<AiStatus mark={ThinkingMark} mode="analyzing" label="Reading the failure log" />
<AiStatus mode="executing" label="Running 179 cases" />
```

Rules:
- **Never a spinner, three dots or a line icon in its place**, and never a static mark.
- Pick the mode that names the real work — `analyzing` for reading a log, `executing` for a run, `working` for a tool call.
- Every state pairs motion with a text label, and degrades to a static mark under `prefers-reduced-motion`.
- `aria-live="polite"` so the state is announced.
- **Pass `mark`** (or set `window.ThinkingMark`). Without the engine it degrades to the static
  brand mark and logs a warning — usable, but not the intended state.
