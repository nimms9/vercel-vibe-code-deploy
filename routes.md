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
/forgot-password — Password reset request
/reset-password — Set new password
/verify-email — Email verification

## App (Protected via Middleware)
/dashboard — User home
/profile — Demographics, diet, allergies
/plan — Personalized vitamin plan (primary feature)
/plan/history — Past recommendations
/history — Past recommendations (alias)
/insights — Solubility education & guidance
/settings — Account, notifications, billing

## API (Route Handlers)
POST /api/plan/generate — Generate or update vitamin plan
GET /api/plan — Fetch current plan
POST /api/profile — Save user profile
GET /api/profile — Fetch user profile
GET /api/vitamins — List vitamins & metadata
GET /api/sources — Food sources & allergens
GET /api/supplements/search — Search supplements catalog
POST /api/feedback — Collect user feedback
