# UI Specification

## Design Principles
- Clean clinical aesthetic
- Strong hierarchy, minimal clutter
- Trust-forward language
- Fast, clear primary CTA

## Global Layout
- Top nav: Logo, links (How it works, Pricing optional), Login, CTA
- Footer: Terms, Privacy, Disclaimer (“Not medical advice”), Contact

## Pages

### `/` Landing
Sections:
1. Hero
   - Headline: Clinically inspired vitamin guidance, personalized in minutes
   - Subhead: Short credibility statement
   - CTA: Create my plan
   - Secondary CTA: Try for free
2. How it works (micro-section)
   - 3 steps: Answer → Generate → Adjust
3. Trust indicators
   - “Evidence-informed”
   - “Transparent rationale”
   - “No spam”
4. Feature highlights
5. Footer

### `/signup` + `/login`
- Minimal form
- Include “Demo account” hint if provided
- Error states (invalid credentials)
- Link between signup/login

### `/dashboard` (Protected)
- Welcome card
- Status: profile completion
- Primary CTA: Continue profile / View plan
- Shortcut tiles: Profile, Plan, History, Settings

### `/profile` (Protected)
Form sections:
- Basics: age range, sex (optional), diet style
- Goals: energy, sleep, stress, fitness, immunity (multi-select)
- Constraints: allergies, vegetarian/vegan, budget range
- Health flags (optional): pregnancy, blood thinners, thyroid meds (simple checkboxes)
Actions:
- Save
- Save & generate plan

### `/plan` (Protected)
- “Your plan” summary
- Supplement cards (name, dosage range, timing, why)
- Safety notes section
- Regenerate button
- Last generated timestamp
- Disclaimer

### `/history` (Protected)
- List of previous plans (date, key goal)
- Click to view (optional), or expandable details

### `/settings` (Protected)
- Account basics (email)
- Sign out
- Delete account (optional)

## Components
- Button, Card, Badge, Alert, FormField
- Loading skeletons for plan/profile fetch
- Error banner component

## Accessibility Minimum
- All inputs labeled
- Focus visible for keyboard nav
- Buttons have descriptive text
- Color contrast reasonable
