# Deployment (Vercel)

## Required for Hackathon
The deployment must be publicly accessible.

## Recommended
Deploy on Vercel.

## Steps
1. Push code to GitHub (public)
2. Create a new Vercel project from the repo
3. Set environment variables in Vercel:
   - NEXTAUTH_URL = your production URL
   - NEXTAUTH_SECRET = long random value
   - DATABASE_URL:
     - If using SQLite, prefer switching to Postgres for Vercel
     - Recommended: Neon or Supabase Postgres, then set DATABASE_URL accordingly
4. Run Prisma migrations in production:
   - Use `prisma migrate deploy` in build or a Vercel post-deploy step

## Notes
- For easiest hackathon deploy, use Postgres (Neon/Supabase) rather than SQLite on Vercel.
- Ensure `/login` works and protected routes redirect properly.

## What to Submit
- Live URL (Vercel)
- Public GitHub repo link
- routes.md
- Problem/Idea description (SUBMISSION.md)
