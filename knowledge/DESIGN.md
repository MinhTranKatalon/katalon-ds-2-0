# DESIGN.md — Katalon True Platform

> Source of truth for all UI/UX work on True Platform (katalon.com).
> Claude Design: read this file fully before generating any screen, flow, or component.
> Do not invent new tokens. When in doubt, follow the Decision Rules and the Reference Library below.

---

## 1. Identity

**Product:** True Platform — AI-powered software testing platform.
**Audience:** QA engineers, dev teams, engineering leaders evaluating during a free trial.
**Mood:** Confident, precise, modern. Enterprise-trustworthy but never boring or bureaucratic. Closer to Linear/Claude than to legacy enterprise tools.

**Three brand pillars (frame every screen around these, not generic user-goal language):**
1. AI-powered Testing
2. Team Collaboration
3. Reporting & Analytics

**North-star UX goals:**
- Communicate core platform capabilities fast.
- Convert trial users to paid customers.
- Minimal steps, concise copy. Benchmark: Claude's own onboarding (3 screens max).

---

## 2. Color System

> TODO(Minh): replace placeholder hex values with official Katalon brand codes.

| Token | Value | Usage |
|---|---|---|
| `--navy-900` | `#0F1E3D` (placeholder) | Primary buttons, headers, key actions |
| `--navy-700` | `#1B3A6B` (placeholder) | Hover state of primary buttons |
| `--amber-500` | `#F59E0B` (placeholder) | **Upgrade CTAs ONLY. Never anywhere else.** |
| `--ink` | `#111827` | Body text |
| `--ink-muted` | `#6B7280` | Secondary text, captions |
| `--surface` | `#FFFFFF` | Cards, panels |
| `--surface-alt` | `#F7F8FA` | Page background, alternating sections |
| `--border` | `#E5E7EB` | Dividers, card borders (1px) |
| `--success` | `#16A34A` | Passed tests |
| `--danger` | `#DC2626` | Failed tests |

**Hard rules:**
- ONE button system: navy. All primary actions use `--navy-900`.
- Amber is sacred: reserved exclusively for upgrade/conversion CTAs so it always stands out.
- No purple gradients. No rainbow dashboards. Charts use navy scale + semantic green/red.

---

## 3. Typography

- Primary typeface: Inter or brand-approved equivalent (TODO: confirm against katalon.com).
- Scale: 32/24/18/16/14/12. Body = 16px, line-height 1.6.
- Headlines: short, committed, benefit-led. No more than 8 words on onboarding screens.
- Microcopy: concise, active voice. Cut every word that does not earn its place.

## 4. Geometry & Spacing

- 8-point grid. Spacing tokens: 4 / 8 / 16 / 24 / 32 / 48 / 64.
- Border radius: 8px (inputs, buttons), 12px (cards). No pill buttons.
- Shadows: subtle, one level only (`0 1px 3px rgba(0,0,0,.08)`). Depth comes from hierarchy, not drop shadows.

---

## 5. Onboarding Pattern (locked structure)

Three screens, Claude-inspired. Do not add steps.

1. **Sign-up page** — value prop + product video. One field group, one navy CTA.
2. **Intro demo** — ~30-second full-screen video showing the platform in action.
3. **First chat screen** — demo results pre-loaded + feature chips mapped to the 3 brand pillars.

Principles: show, don't tell; progress is implicit (no step counters unless necessary); every screen has exactly one primary action.

---

## 6. Decision Rules

- Data-dense screens (reports, analytics): charts are the hero, chrome stays quiet. Reference the "data-dense" family in awesome-claude-design.
- Empty states must teach: show what the feature does + one navy CTA to try it.
- Trial banners and upgrade prompts: amber CTA, never blocking, always show value before asking.
- Accessibility: WCAG 2.2 AA minimum. Contrast ≥ 4.5:1 for text, visible focus states, 44px touch targets.
- Forms: inline validation, error text below field, never rely on color alone.

## 7. Reject List

- Inter-purple-gradient "AI startup" template look.
- Amber used for anything other than upgrade CTAs.
- Multi-step onboarding wizards (> 3 screens).
- Walls of feature text; paragraphs longer than 2 lines in onboarding.
- Toast spam, confetti, dark patterns (fake urgency, hidden cancel).

---

## 8. Reference Library

When making design decisions, consult these sources. Fetch and apply when relevant to the task.

### Skills & design intelligence (patterns, tokens, style systems)
- Anthropic official skills (frontend-design): https://github.com/anthropics/skills — creative direction; pick a deliberate aesthetic before coding.
- UI/UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill — style/palette/font-pairing database and product-type reasoning.
- UX Designer Skill: https://github.com/szilu/ux-designer-skill — 2026 best practices: onboarding, forms, accessibility, AI UX patterns.
- Vercel Web Interface Guidelines: https://github.com/vercel-labs/web-interface-guidelines — 100+ correctness rules; use when reviewing generated UI.
- Designer Skills (Marie-Claire Dean): https://github.com/Owl-Listener/designer-skills — full design lifecycle, research → handoff.
- Mobile App UI Design: https://github.com/ceorkm/mobile-app-ui-design — mobile patterns from Airbnb/Duolingo/Revolut; 60/30/10 color, Peak-End Rule.

### Claude Design specific
- awesome-claude-design: https://github.com/rohitg00/awesome-claude-design — DESIGN.md examples by aesthetic family, remix recipes, prompt packs. For True Platform, prefer the `data-dense` family.

### UX principles & evidence (use to justify decisions)
- Laws of UX: https://lawsofux.com — Hick's Law, Peak-End Rule, Jakob's Law, etc.
- Growth.Design case studies: https://growth.design/case-studies — onboarding & trial-to-paid conversion teardowns (Duolingo, Notion, Spotify).
- Nielsen Norman Group: https://www.nngroup.com/articles/ — usability research standards.
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines
- Material 3: https://m3.material.io

### How to use this library
1. Building a new screen → follow sections 1–7 of this file first; they always win over external sources.
2. Need a pattern not covered here (e.g., a new chart type, a settings layout) → check UX Designer Skill, then NN/g.
3. Onboarding or conversion question → Growth.Design case studies + Laws of UX (Peak-End Rule).
4. Final review before handoff → run against Vercel Web Interface Guidelines.

---

*Maintained by Minh — Product Design, Katalon. Last updated: 2026-06-05.*
