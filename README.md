# VitaLens — Clinically inspired vitamin guidance

VitaLens is a hackathon-ready demo app that generates a personalized vitamin plan based on age range, diet style, goals, allergies, and health flags. It separates fat-soluble vs water-soluble guidance, includes safety notes, and saves plan history for returning users.

## Tech Stack
- Next.js App Router
- Tailwind CSS
- Prisma + SQLite (local dev, Postgres compatible)
- NextAuth Credentials auth

## Features
- Marketing landing page + supporting pages
- Auth (signup/login)
- Protected app routes (dashboard, profile, plan, history, settings)
- Rule-based plan generation
- Saved plan history
- API route handlers for profile + plan

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment
```bash
cp .env.example .env
```

### 3) Initialize database
```bash
npx prisma migrate dev --name init
npm run prisma:seed
```

### 4) Run dev server
```bash
npm run dev
```

Open `http://localhost:3000`.

### Demo Account
- Email: `demo@vitalens.app`
- Password: `DemoPass123!`
After signup, users are redirected to `/login` with a success banner.

## Scripts
- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run prisma:migrate` — Run Prisma migrations
- `npm run prisma:seed` — Seed demo user

## Route Highlights
See `routes.md` for the human-readable route map. Open `routes.md` for judges.

## Path Aliases
The `@` alias maps to `src/`. Shared helpers live in `src/lib` (for example: `@/lib/prisma`).

## Notes
- Guidance is informational and not medical advice.
- Plan generation is rule-based for deterministic demo behavior.
- Password hashing uses bcrypt with 10 salt rounds (acceptable for hackathon; increase for production).

## Observing Loading & Error States
- Signup/Login: submit with an invalid password to see inline error banners and disabled buttons.
- Profile: disconnect network or block `/api/profile` to see the retry banner.
- Plan: click “Generate plan” without completing profile to see a clear error state.

## Judge Steps (Copy/Paste)
1. Open the app homepage.
2. Sign up or log in with the demo account (`demo@vitalens.app` / `DemoPass123!`).
3. Complete the Profile form and click “Save & generate plan.”
4. Visit `/plan` to view the generated recommendations.
5. Visit `/history` to confirm prior plans are listed.

## Expected Live Behavior
You should be able to:
1. Sign up or use the demo account.
2. Complete a profile and save it.
3. Generate a plan and see recommendations.
4. Refresh `/plan` and still see the last saved plan.

## Known Caveats
- Email verification and password reset screens are stubs (planned).
