# PRD — Vitamin Guidance Web App

## Product Name
VitaminPlan (working name)

## One-liner
Clinically inspired vitamin guidance, personalized in minutes.

## Target User
Adults who want simple, credible supplement guidance based on their goals, diet, and basic health preferences, without wading through confusing advice.

## Problem
Most supplement guidance online is either generic, salesy, or overwhelming. Users struggle to know what to take, why, and how much, and they don’t trust random recommendations.

## Solution
A short questionnaire generates a personalized plan with:
- Recommended supplements
- Rationale (plain-English)
- Suggested dosage ranges and timing
- Warnings / contraindications (basic)
- An estimated monthly cost range

## Primary User Action (Core Flow)
1. User lands on `/` and clicks **Create my plan**
2. User signs up/logs in (optional but encouraged)
3. User completes profile questionnaire
4. App generates a plan and displays it
5. User can edit inputs and regenerate
6. Plan is saved and viewable later (`/history`)

## Features (MVP)
### Must Have
- Landing page with clear CTAs (already designed)
- Profile questionnaire (goals, age range, diet style, allergies, sleep, energy, stress, budget)
- Plan generation (rule-based algorithm)
- Plan display page with sections:
  - “Top recommendations”
  - “Why these”
  - “How to take”
  - “Safety notes”
- Save and retrieve current plan for logged-in user
- History list for past plans (optional if time; encouraged)

### Nice to Have (Polish)
- “How it works” micro-section on landing
- Trust indicators (e.g., “Evidence-informed,” “Not medical advice,” “References”)
- Printable view or share link
- Basic analytics events (optional)

## Non-Goals (for MVP)
- Replacing medical advice
- Complex medical condition analysis
- Insurance / lab results integration

## Tech Plan
- Next.js 14+ App Router
- Tailwind CSS
- shadcn/ui optional for forms/cards/buttons
- Prisma + SQLite (local dev), compatible with Postgres later
- NextAuth (Credentials provider) for quick auth
- Route Handlers in `/app/api/*` for plan generation + profile saving
- Middleware to protect `/dashboard`, `/profile`, `/plan`, `/history`, `/settings`

## API Requirements (if using Route Handlers)
- `POST /api/plan/generate` -> generates and saves plan
- `GET /api/plan` -> fetch current plan
- `POST /api/profile` -> save/update profile
- `GET /api/profile` -> fetch profile
- `GET /api/supplements/search?q=` -> optional search endpoint for supplements list

## Definition of Done (Judges)
- Live deployment URL works
- A reviewer can:
  - Visit `/`
  - Create account or use test account
  - Complete profile
  - Generate plan
  - Refresh page and still see saved plan
- Submission includes:
  - Public repo link
  - routes.md
  - This PRD and a short submission description

## Copy / Disclaimers
- Add “Not medical advice” disclaimer in footer and near plan results.
