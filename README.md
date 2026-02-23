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

## Scripts
- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run prisma:migrate` — Run Prisma migrations
- `npm run prisma:seed` — Seed demo user

## Route Highlights
See `routes.md` for the human-readable route map.

## Notes
- Guidance is informational and not medical advice.
- Plan generation is rule-based for deterministic demo behavior.

