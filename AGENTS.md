# Agent Instructions (Codex)

## Goal
Build a complete, hackathon-ready web app for "Clinically inspired vitamin guidance, personalized in minutes" based on:
- HACKATHON_FEEDBACK.md
- routes.md
- PRD.md
- UI.md
- DATA.md

## Tech Requirements (Must Follow)
- Framework: Next.js 14+ with App Router
- Styling: Tailwind CSS (preferred) + optionally shadcn/ui
- Backend: Next.js Route Handlers (/app/api/*) and/or Server Actions
- Database: Optional but encouraged — implement with Prisma + SQLite for local dev
  - If an external DB is desired later, keep Prisma compatible with Postgres
- Auth: Optional but encouraged — implement NextAuth (Credentials provider) for hackathon simplicity
- Deployment: Required — Vercel recommended

## Non-negotiables (Acceptance Criteria)
- App must run locally:
  - `npm install`
  - `npm run dev`
  - `npm run build` must succeed
- Provide:
  - Protected routes via middleware (where applicable)
  - Working end-to-end “Create my plan” flow
  - Loading + error states
  - Basic accessibility: keyboard focus visible, form labels, reasonable contrast
- Provide hackathon deliverables:
  - Live URL placeholder in SUBMISSION.md
  - Public repo placeholder in SUBMISSION.md
  - Human-readable route map in routes.md
  - 3–6 sentence problem/idea in SUBMISSION.md
  - README improvements (setup, tech highlights, testing steps)

## Implementation Guidance
- Prefer simple, shippable features over complexity.
- Keep UI polished and cohesive.
- Use a deterministic “plan generation” algorithm initially (rule-based) so the demo works without external APIs.
- If you add AI later, isolate behind an API route with env var gating.

## Output Expectations
- Create missing pages/components according to routes.md + UI.md.
- Wire up DB models in Prisma, with migrations.
- Add seed script for demo user + example profile (if auth enabled).
- Update README.md to be judge-friendly.

## When uncertain
- Choose the simplest option that satisfies the rubric and document it in README.md.
