# Routes

## Public
/ — Landing page (marketing + personalized vitamin preview)
/how-it-works — How VitaLens works
/science — Science-backed approach & solubility primer
/testimonials — Customer stories
/features — Product features
/about — About the company
/blog — Blog index
/contact — Contact
/privacy — Privacy policy
/terms — Terms of service

## Auth
/signup — Create account
/login — Sign in
/forgot-password — Password reset request (planned stub)
/reset-password — Set new password (planned stub)
/verify-email — Email verification (planned stub)

## App (Protected via Middleware)
/dashboard — User home
/profile — Demographics, diet, allergies
/plan — Personalized vitamin plan (primary feature)
/plan/history — Past recommendations
/history — Past recommendations (alias)
/insights — Solubility education & guidance
/settings — Account, notifications, billing

## API (Route Handlers)
POST /api/plan/generate — Generate or update vitamin plan (auth required)
GET /api/plan — Fetch current plan (auth required)
POST /api/profile — Save user profile (auth required)
GET /api/profile — Fetch user profile (auth required)
GET /api/vitamins — List vitamins & metadata (public)
GET /api/sources — Food sources & allergens (public)
GET /api/supplements/search — Search supplements catalog (public)
POST /api/feedback — Collect user feedback (public)
