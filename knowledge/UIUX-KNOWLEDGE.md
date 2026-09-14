# UIUX-KNOWLEDGE.md — Consolidated Design Intelligence for Claude Design

> One reference file distilled from three skills (UI/UX Pro Max, UX Designer, Mobile App UI Design)
> plus curated UX principles, tuned for Katalon True Platform work.
> **How to use:** add this to Claude Design **Project knowledge** alongside `DESIGN.md`.
> `DESIGN.md` defines Katalon's specific brand/tokens and ALWAYS wins. This file is the
> general design reasoning Claude applies when the brand file is silent.

---

## 0. How Claude should use this file

1. Brand decisions (color, type, spacing, onboarding structure) → follow `DESIGN.md` first.
2. General UX/UI quality (accessibility, forms, tables, microcopy, motion) → follow this file.
3. Before finishing any screen → run the **Pre-ship checklist** (section 11).
4. Need depth beyond this digest → consult the **Reference Library** (section 12).

Decision criterion: *if the task changes how something looks, feels, moves, or is interacted with, apply this file.*

---

## 1. Core philosophy

**User-centered design**
1. Understand users before designing.
2. Reduce cognitive load — keep interfaces simple and intuitive.
3. Provide feedback — every action has a visible response.
4. Maintain consistency — follow patterns users already expect.
5. Design for accessibility from the start, not as a retrofit.

**UX hierarchy of needs** (lower must be solved before higher pays off):
Functional → Reliable → Usable → Convenient → Pleasurable.

---

## 2. Priority rule categories (apply in this order)

Ordered by impact. When time is limited, fix lower numbers first.

| # | Category | Level | Must have | Avoid |
|---|----------|-------|-----------|-------|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, alt text, keyboard nav, aria-labels | Removing focus rings; icon-only buttons without labels |
| 2 | Touch & interaction | CRITICAL | Targets ≥44×44px, ≥8px spacing, loading feedback | Hover-only actions; instant 0ms state changes |
| 3 | Performance | HIGH | WebP/AVIF, lazy-load, reserve space (CLS < 0.1) | Layout shift; layout thrashing |
| 4 | Style selection | HIGH | Match product type, consistency, SVG icons | Mixing styles randomly; emoji as icons |
| 5 | Layout & responsive | HIGH | Mobile-first breakpoints, viewport meta, no h-scroll | Fixed px widths; disabling zoom |
| 6 | Typography & color | MEDIUM | Base 16px, line-height 1.5, semantic tokens | Body < 12px; gray-on-gray; raw hex in components |
| 7 | Animation | MEDIUM | 150–300ms, motion conveys meaning, honor reduced-motion | Decorative-only motion; animating width/height |
| 8 | Forms & feedback | MEDIUM | Visible labels, error near field, helper text | Placeholder-only labels; errors only at top |
| 9 | Navigation | HIGH | Predictable back, bottom nav ≤5 items, deep linking | Overloaded nav; broken back behavior |
| 10 | Charts & data | LOW | Legends, tooltips, accessible colors | Conveying meaning by color alone |

---

## 3. Accessibility (WCAG 2.2 AA baseline)

- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI components.
- Visible focus rings (2–4px) on every interactive element. Never remove them.
- Descriptive alt text for meaningful images; empty alt for decorative.
- `aria-label` on icon-only buttons; logical reading order for screen readers.
- Tab order matches visual order; full keyboard operability; provide skip-to-content.
- Sequential heading hierarchy (h1→h6, no skipped levels).
- Never convey information by color alone — pair with icon or text.
- Respect `prefers-reduced-motion`; support system text scaling without truncation.
- Always provide cancel/escape routes in modals and multi-step flows.

---

## 4. Typography & color

- Body 16px minimum, line-height 1.5; heading scale 1.3–1.6×.
- Use semantic tokens (`--text-primary`, `--surface`), never raw hex in components.
- Establish hierarchy through size, weight, color, and spacing — not decoration.
- **60/30/10 color rule:** 60% dominant/neutral surface, 30% secondary, 10% accent.
  The 10% accent is where the eye goes — reserve it for the single most important action.
- Limit typefaces to 1–2 families; pair a display/heading face with a readable body face.

---

## 5. Forms & inputs

Key facts: ~81% of users abandon forms after starting; cutting fields 20–60% often loses no real data; multi-step forms can lift completion meaningfully.

Principles:
1. Ask only what you need — every field is friction.
2. One column scans best; group related fields.
3. Labels always visible, positioned above the input (best for mobile and long forms). Never placeholder-only.
4. Smart defaults and pre-fill where possible.
5. Inline validation; error text directly below the field, never only summarized at top.
6. Progressive disclosure — reveal fields only when relevant.
7. Errors should be specific and recovery-oriented ("Enter a valid work email", not "Invalid input").

---

## 6. UX writing & microcopy

Every interface word is design. Aim for clarity over cleverness.

- "Delete this file?" not "Are you sure you wish to proceed with the deletion of the selected item?"
- "Sign up" not "Get started on your journey".
- "Saved" not "Your changes have been successfully persisted".

Rules: be clear, concise, human, and consistent. Button labels state the action ("Start free trial", "Contact sales"). Empty states teach: say what the feature does and offer one action. Loading text is honest and brief.

---

## 7. Onboarding & activation

The bridge between sign-up and engaged use. (Katalon's locked 3-screen structure in `DESIGN.md` overrides anything here.)

General patterns:
- Product tours: 3–5 steps max, one feature per step, spotlight the real UI element, show "step N of M", always allow Skip.
- Trigger contextually, not on every login.
- Show, don't tell — a 30s demo beats a paragraph.
- Reduce decision paralysis: offer a clear default path plus an escape ("try sample" vs "use my own data").
- Measure activation (first meaningful action), not just sign-up.

---

## 8. AI / chat UX patterns (for True Platform's AI chat)

Message layout:
- User messages: right-aligned, accent background, rounded.
- AI messages: left-aligned, neutral/light background, max width 70–80% for readability.
- System messages: centered, muted, no bubble.
- Timestamps at natural breaks or on hover, not on every message.

Streaming & control:
- Show a typing/cursor indicator; render markdown incrementally (not raw-then-reformat).
- Always offer a **Stop** button mid-generation.
- Per-message actions: copy, regenerate, thumbs up/down.
- Show sources/citations as distinct chips under the answer when relevant.
- For loading > 1s, use named-step indicators or skeletons, not an indefinite spinner.

---

## 9. Data tables & visualization (reports/analytics screens)

Tables:
- Sortable column headers with clear sort affordance and `aria-sort`.
- Sticky headers on long tables; right-align numbers, left-align text.
- Use badges for status; provide row actions with accessible labels.
- Zebra striping or row hover for scanability; paginate or virtualize 50+ rows.

Charts:
- Always include legends and tooltips.
- Use a color scale plus shape/label — never color alone.
- Charts are the hero; keep surrounding chrome quiet. Semantic green=pass, red=fail.

---

## 10. Emotional design & trust (Don Norman's three levels)

1. **Visceral — "I want it":** first impression forms in ~50ms; users decide to stay within ~3s. Prioritize visual cleanliness (whitespace, alignment), professional type, quality imagery, and a smooth loading experience (skeletons, not spinners).
2. **Behavioral — "I can use it":** feedback within 100ms, predictable behavior, forgiving error handling.
3. **Reflective — "I'm proud to use it":** consistent brand personality, moments of delight that don't get in the way.

Trust signals on commercial pages: clear pricing, no dark patterns (no fake urgency, no hidden cancel), social proof, transparent terms.

---

## 11. Pre-ship checklist (run before finishing any screen)

- [ ] Contrast ≥ 4.5:1; visible focus states; keyboard-operable.
- [ ] Touch targets ≥ 44px with ≥ 8px spacing.
- [ ] One clear primary action per screen/section.
- [ ] Labels visible; errors inline and specific.
- [ ] No layout shift; images sized; skeletons for >1s loads.
- [ ] Motion 150–300ms and meaningful; reduced-motion respected.
- [ ] Responsive: no horizontal scroll, zoom enabled, mobile-first.
- [ ] Tokens used (no raw hex); accent reserved for the single key action.
- [ ] Matches `DESIGN.md` brand rules (navy primary, amber = upgrade CTA only).

---

## 12. Pricing page specifics (tuned for True Platform)

Structure that works for B2B SaaS:
- Plan cards side by side; mark one "Most popular" with a subtle badge (not a loud color).
- Monthly/Annual toggle up top; if annual is cheaper, state the savings explicitly.
- Each card: plan name → one-line "who it's for" → price + cycle → key features → one CTA.
- Below the cards: a full feature-comparison table for buyers who want detail.
- FAQ section at the bottom for objections (billing, seats, support, security).

Conversion & clarity:
- Primary plan CTAs = navy. Enterprise "Contact sales" = amber (the one upgrade/conversion accent).
- Never invent prices or features — populate only from supplied content.
- Anchor value before price; lead each plan with its outcome, not its feature count.
- Make the recommended path obvious to reduce decision paralysis (Hick's Law).
- Honest, friction-free: visible terms, easy downgrade/cancel, no countdowns.

---

## 13. Reference Library (consult for depth)

Installed-skill sources this file distills:
- UI/UX Pro Max — https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (palettes, font pairings, product-type reasoning, full rule DB)
- UX Designer Skill — https://github.com/szilu/ux-designer-skill (onboarding, forms, AI UX, accessibility, writing modules)
- Mobile App UI Design — https://github.com/ceorkm/mobile-app-ui-design (mobile conventions, emotional design)

Recommended additional skills:
- Anthropic frontend-design — https://github.com/anthropics/skills (creative direction; the design foundation)
- Vercel Web Interface Guidelines — https://github.com/vercel-labs/web-interface-guidelines (100+ correctness rules for review)
- Designer Skills (Marie-Claire Dean) — https://github.com/Owl-Listener/designer-skills (full lifecycle)

Claude Design specific:
- awesome-claude-design — https://github.com/rohitg00/awesome-claude-design (DESIGN.md families, remix recipes)

UX principles & evidence:
- Laws of UX — https://lawsofux.com (Hick's, Peak-End, Jakob's)
- Growth.Design case studies — https://growth.design/case-studies (onboarding & trial-to-paid teardowns)
- Nielsen Norman Group — https://www.nngroup.com/articles/
- Apple HIG — https://developer.apple.com/design/human-interface-guidelines
- Material 3 — https://m3.material.io

When to use which: brand → DESIGN.md; pattern depth → UX Designer Skill then NN/g; onboarding/conversion → Growth.Design + Laws of UX; final review → Vercel Guidelines.

---

*Consolidated for Minh — Director, Creative, Katalon. Companion to DESIGN.md. Last updated 2026-06-22.*
