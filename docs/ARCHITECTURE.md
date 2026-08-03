# DocVerse — Architecture Documentation

## Overview

DocVerse is a modern document productivity SaaS platform built with a client-server architecture. The frontend is a Vite + React + TypeScript SPA, designed to connect to a backend API powered by Next.js API Routes (or any REST API).

## System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      Browser                              │
│  ┌────────────────────────────────────────────────────┐  │
│  │              React SPA (Vite)                       │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │  │
│  │  │  Pages    │  │  Hooks   │  │  Services Layer  │ │  │
│  │  └────┬─────┘  └────┬─────┘  └────────┬─────────┘ │  │
│  │       │             │                  │            │  │
│  │  ┌────┴─────────────┴──────────────────┴──────────┐ │  │
│  │  │              API Client Layer                   │ │  │
│  │  └──────────────────────┬────────────────────────┘ │  │
│  └─────────────────────────┼──────────────────────────┘  │
└────────────────────────────┼─────────────────────────────┘
                             │ HTTPS
┌────────────────────────────┼─────────────────────────────┐
│                    API Server (Next.js)                    │
│  ┌─────────────────────────┴──────────────────────────┐  │
│  │              Middleware Stack                        │  │
│  │  Auth · CSRF · Rate Limit · Logging · Validation   │  │
│  └─────────────────────────┬──────────────────────────┘  │
│                            │                               │
│  ┌─────────────────────────┴──────────────────────────┐  │
│  │              Route Handlers                         │  │
│  │  /api/auth/* · /api/files/* · /api/process/*      │  │
│  └───┬──────────────────────┬───────────────────────┘  │
│      │                      │                            │
│  ┌───┴──────┐        ┌─────┴──────┐                     │
│  │  Prisma   │        │ Cloudflare │                     │
│  │  (ORM)    │        │    R2      │                     │
│  └───┬──────┘        └────────────┘                     │
│      │                                                   │
│  ┌───┴──────┐                                            │
│  │PostgreSQL │                                            │
│  └──────────┘                                            │
└──────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Directory Structure

```
src/
├── App.tsx                    # Root component with providers
├── main.tsx                   # Entry point
├── index.css                  # Global styles + Tailwind
├── types/
│   └── index.ts               # Shared TypeScript types
├── lib/
│   ├── api/
│   │   ├── client.ts          # HTTP client with interceptors
│   │   ├── errors.ts          # Typed error classes
│   │   └── index.ts           # Barrel export
│   ├── config/
│   │   └── env.ts             # Validated environment config
│   ├── security/
│   │   ├── index.ts           # Input validation, file validation, CSRF
│   │   └── rate-limiter.ts    # Client-side rate limiting
│   ├── services/
│   │   ├── auth-service.ts    # Authentication (mock → Clerk)
│   │   ├── storage-service.ts # File/notification/usage persistence
│   │   └── index.ts           # Barrel export
│   ├── validation/
│   │   └── index.ts           # Zod schemas for forms
│   ├── pdf-utils.ts           # Client-side PDF processing (pdf-lib)
│   ├── tools.ts               # Tool definitions + icon map
│   └── storage.ts             # Legacy localStorage utils (shared helpers)
├── hooks/
│   ├── useAuth.tsx            # Auth context + hook
│   ├── useTheme.tsx           # Dark/light theme
│   ├── useDocumentTitle.ts    # Per-page SEO titles
│   └── useScrollToTop.tsx     # Route change scroll reset
├── components/
│   ├── layout/                # Navbar, Footer, DashboardLayout
│   ├── landing/               # Hero, ToolsGrid, Features, Stats
│   ├── dashboard/             # Dashboard content
│   ├── tools/                 # ToolPage (processing pipeline)
│   └── ui/                    # DropZone, ErrorBoundary, Button
├── pages/                     # Route-level page components
└── test/                      # Test setup + test files
```

### Service Layer Pattern

All data access goes through service modules (`src/lib/services/`). Currently backed by localStorage, but each service has the same interface the API client will use:

```typescript
// Current (localStorage)
const files = fileService.list({ page: 1, limit: 20 });

// Future (API)
const files = await apiClient.get('/files', { page: '1', limit: '20' });
```

### Error Handling Strategy

1. **Typed errors**: `AppError` hierarchy with `code`, `statusCode`, `details`
2. **API responses**: Consistent `{ success, data, error, meta }` envelope
3. **Component level**: `ErrorBoundary` catches render crashes
4. **Processing level**: `PDFProcessingError` with specific codes
5. **Validation level**: Zod schemas with user-friendly messages

## Backend Architecture (Target)

### API Routes

| Method | Path                      | Description              |
|--------|---------------------------|--------------------------|
| POST   | `/api/auth/sign-in`       | Email/password sign in   |
| POST   | `/api/auth/sign-up`       | Create account           |
| POST   | `/api/auth/sign-out`      | End session              |
| POST   | `/api/auth/reset-password`| Password reset email     |
| GET    | `/api/auth/session`       | Current session info     |
| POST   | `/api/files/upload`       | Upload file (multipart)  |
| GET    | `/api/files`              | List files (paginated)   |
| GET    | `/api/files/:id`          | Get file metadata        |
| GET    | `/api/files/:id/download` | Get signed download URL  |
| DELETE | `/api/files/:id`          | Delete file              |
| POST   | `/api/files/:id/favorite` | Toggle favorite          |
| POST   | `/api/process`            | Start processing job     |
| GET    | `/api/process/:id`        | Get job status           |
| GET    | `/api/dashboard/stats`    | Dashboard statistics     |
| GET    | `/api/notifications`      | List notifications       |
| PATCH  | `/api/notifications/:id`  | Mark as read             |
| GET    | `/api/settings`           | User settings            |
| PATCH  | `/api/settings`           | Update settings          |
| GET    | `/api/usage`              | Usage statistics         |

### Middleware Stack

1. **CORS** — Restrict origins
2. **CSRF** — Double-submit cookie pattern
3. **Rate Limiting** — Per-user, per-route
4. **Authentication** — Clerk session validation
5. **Authorization** — Plan-based feature access
6. **Request Logging** — Structured JSON logs
7. **Input Validation** — Zod on server-side

## Authentication Flow

### Current (Mock)

```
User → SignIn Form → authService.signIn() → localStorage session
```

### Target (Clerk)

```
User → Clerk Hosted UI → JWT Session → API validates via Clerk Backend SDK
```

Clerk integration steps:
1. Install `@clerk/clerk-react`
2. Wrap app in `<ClerkProvider>`
3. Replace `authService` calls with `useAuth()` from Clerk
4. Add middleware to protect API routes
5. Configure Google OAuth in Clerk dashboard

## File Processing Pipeline

### Client-Side (Current)

Tools that can run in the browser use `pdf-lib`:
- Merge PDF, Rotate PDF, Delete/Extract Pages, Compress PDF, Images to PDF, Split PDF

### Server-Side (Target)

Tools requiring server processing:
- PDF to Word, Word to PDF, PDF to JPG, PDF to PNG, Excel to PDF, PowerPoint to PDF, Organize Pages

These are marked `comingSoon: true` in the tool registry.

## Deployment

### Vercel (Frontend)

```bash
npm run build
vercel deploy --prod
```

Environment variables set in Vercel dashboard.

### Database

```bash
npx prisma migrate deploy
npx prisma generate
```

### Cloudflare R2

- Bucket: `docverse-files`
- Lifecycle rules: auto-delete after 24h for free tier
- Signed URLs for secure downloads
