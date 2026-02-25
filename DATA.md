# Data Model & Storage

## Database
- Prisma ORM
- SQLite for local development
- Keep schema Postgres-compatible

## Entities

### User
- id (string)
- email (unique)
- passwordHash (for Credentials auth) OR managed by NextAuth adapter
- createdAt, updatedAt

### Profile
- id
- userId (unique)
- ageRange (enum/string)
- dietStyle (enum/string)
- goals (string array or JSON)
- allergies (string)
- budget (enum/string)
- healthFlags (JSON: pregnancy, anticoagulants, thyroidMeds, etc.)
- createdAt, updatedAt

### Plan
- id
- userId
- profileSnapshot (JSON)
- recommendations (JSON)
- safetyNotes (string)
- createdAt

## Future Postgres Upgrade (Optional)
When running on Postgres, consider storing JSON fields as `JSONB` instead of `TEXT`:
- Profile: `goals`, `healthFlags`
- Plan: `profileSnapshot`, `recommendations`
This enables native JSON querying and validation without changing the core MVP logic.

## Recommendation JSON Shape (example)
```json
{
  "items": [
    {
      "name": "Vitamin D3",
      "dose": "1000–2000 IU daily",
      "timing": "With food (morning or lunch)",
      "why": "Supports immune function and bone health",
      "cautions": ["Consult clinician if on certain medications"]
    }
  ],
  "estimatedMonthlyCost": "$15–$35"
}
