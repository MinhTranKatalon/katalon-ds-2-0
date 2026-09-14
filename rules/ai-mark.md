# Katalon AI motion mark — the agent's working state

Catalog: Foundations / Katalon AI. Component: `thinking-mark.jsx` (package root — the path the catalog loads).

**When an agent is working, the mark moves. A static glyph in place of a working state is
a bug, not a simplification.** This is the one place in the system where motion carries
meaning rather than polish: it is the difference between "the product is thinking" and
"the product has frozen".

## The component

```html
<x-import component="ThinkingMark" from="./thinking-mark.jsx"
          mode="thinking" size="28" tint="#0F8461" dark="false"
          hint-size="28px,28px"></x-import>
```

| Prop | Values |
|---|---|
| `mode` | one of the 16 states below |
| `size` | 28 in an avatar slot · 32 in a panel · 20 inline with a label |
| `tint` | `--k-action-600` `#0F8461` on light, `--k-bright-400` on dark |
| `dark` | `true` on a dark ground |

Never redraw it, never substitute a spinner, three dots, a pulsing circle or a line icon.
It is a brand asset with the standing of the logo.

## The 16 states

Pick the state that names **what is actually happening**. The label beside it says the same
thing in words — the mark alone never carries the meaning.

| Mode | The work it names |
|---|---|
| `thinking` | Reading the request |
| `searching` | Looking through the project |
| `scanning` | Pulling data out of an upload |
| `fetching` | Pulling run data |
| `analyzing` | Reading a suite layer by layer |
| `reasoning` | Following the chain |
| `solving` | Composing the answer |
| `processing` | Loading data, preparing an answer |
| `working` | Calling a tool |
| `executing` | Running the suite |
| `generating` | Writing test cases |
| `drafting` | Sketching a first pass |
| `reviewing` | Checking the result before it ships |
| `debugging` | Stepping through a failure |
| `fixing` | Repairing a broken locator |
| `waiting` | Queued for a device |

## Rules

1. **A working agent shows a moving mark.** Any surface that depicts an agent mid-task —
   chat, panel, run view, wizard — uses `ThinkingMark` in the matching mode. A static
   avatar there is wrong even when the screenshot is a mockup.
2. **The state must match the work.** Do not run `thinking` through a whole flow because
   it is the first in the list. Reading a log is `analyzing`; calling a tool is
   `working`; running a suite is `executing`.
3. **One mark per surface**, in one place, and the label changes with it. Two marks
   animating at once reads as two agents.
4. **It stops when the work stops.** The mark leaves the moment output begins streaming;
   it never idles under a finished answer.
5. **Colour is the tint token, not a hue you pick** — `action-600` on light,
   `bright-400` on dark. Never recoloured per surface.
6. **`prefers-reduced-motion` shows the final frame** — still legible, still the mark.
7. **Never invent a state.** 16 is the set. If the work you are depicting is not in the
   table, that is a question, not licence to add a 17th.

## Open question — do not resolve without the owner

`thinking-mark.jsx` carries a **17th mode, `listening`**, that the catalog's
state gallery does not show. Either the gallery is missing a row or the mode is a leftover.
Until the owner says which, **do not use `listening`** and do not delete it. Law 03.
