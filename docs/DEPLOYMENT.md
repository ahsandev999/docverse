# DocVerse — Deployment Guide

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Cloudflare R2 bucket
- Clerk account
- Vercel account

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable                      | Required | Description                    |
|-------------------------------|----------|--------------------------------|
| DATABASE_URL                  | Yes      | PostgreSQL connection string   |
| VITE_CLERK_PUBLISHABLE_KEY    | Yes      | Clerk frontend key             |
| CLERK_SECRET_KEY              | Yes      | Clerk backend key              |
| R2_ACCOUNT_ID                 | Yes      | Cloudflare account ID          |
| R2_ACCESS_KEY_ID              | Yes      | R2 access key                  |
| R2_SECRET_ACCESS_KEY          | Yes      | R2 secret key                  |
| R2_BUCKET_NAME                | Yes      | R2 bucket name                 |

## Database Setup

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed (optional)
npx prisma db seed
```

## Frontend Deployment (Vercel)

```bash
npm run build
vercel deploy --prod
```

Set environment variables in the Vercel dashboard.

## Security Checklist

- [ ] All secrets in environment variables (never committed)
- [ ] CORS configured for production domain only
- [ ] CSP headers set via `vercel.json`
- [ ] Rate limiting enabled on all API routes
- [ ] CSRF protection with double-submit cookies
- [ ] File upload validation (magic bytes + MIME + size)
- [ ] R2 signed URLs with expiration
- [ ] HTTPS enforced
- [ ] Input sanitization on all user data
- [ ] SQL injection prevention (Prisma parameterized queries)

## Monitoring

- Vercel Analytics for frontend performance
- Structured logging for API requests
- Error tracking (Sentry recommended)
- R2 storage usage alerts
- Database query performance monitoring
