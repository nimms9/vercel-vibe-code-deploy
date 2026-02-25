# Auth Requirements – Add Signup

## Goal
Add a real signup feature so the core flow is:
signup OR demo login → profile → generate plan → save plan → history.

## Requirements
- Implement `/signup` route with a form: email + password + confirm password.
- Validate inputs (basic):
  - email format
  - password min length (e.g., 8)
  - password and confirm match
  - show clear inline errors
- On submit:
  - create a new User record in DB
  - store password securely (bcrypt)
  - if email already exists, return a friendly error
- After successful signup:
  - either auto-login and redirect to `/dashboard`, OR redirect to `/login` with a success message
  - keep behavior consistent with existing auth approach

## Tech constraints
- Do NOT change database schema unless absolutely required.
- Use existing Prisma User model with `passwordHash`.
- Use existing auth (NextAuth Credentials) if present; otherwise implement minimal session auth consistent with the app.
- Add visible loading + error states on signup submit.

## Definition of done
- A new user can sign up and then access protected pages after authentication.
- Middleware protection still works.
- Demo credentials still work (if present).
- `npm run build` succeeds.
