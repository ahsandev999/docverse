# DocVerse — Production Setup Guide

This guide walks you through setting up **Clerk Authentication**, **Neon PostgreSQL**, and **Prisma** for a fully live DocVerse deployment.

---

## Step 1: Create a Clerk Application

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com) and sign up or log in.
2. Click **"Create Application"**.
3. Name it `DocVerse` (or whatever you prefer).
4. Enable the sign-in methods you want (Email, Google, GitHub, etc.).
5. Click **"Create"**.

### Get your API keys

1. In your Clerk dashboard, go to **API Keys** in the left sidebar.
2. Copy the **Publishable Key** (starts with `pk_test_...`).
3. Copy the **Secret Key** (starts with `sk_test_...`).

### Configure allowed origins

1. Go to **Paths** under your application settings.
2. Set:
   - **Sign-in URL**: `/sign-in`
   - **Sign-up URL**: `/sign-up`
   - **After sign-in URL**: `/dashboard`
   - **After sign-up URL**: `/dashboard`

---

## Step 2: Create a Neon Database

1. Go to [https://console.neon.tech](https://console.neon.tech) and sign up or log in.
2. Click **"Create Project"**.
3. Name it `docverse` and select a region close to your users.
4. Click **"Create Project"**.

### Get your connection strings

1. On the project dashboard, you'll see your connection strings.
2. Copy the **Pooled connection** string (this is your `DATABASE_URL` — it uses the `-pooler` endpoint).
3. Copy the **Direct connection** string (this is your `DIRECT_URL`).

Both look like:
```
postgresql://username:password@ep-cool-name-123456.us-east-2.aws.neon.tech/docverse?sslmode=require
```

The **pooled** one will have `-pooler` in the hostname.

---

## Step 3: Set Environment Variables in Vercel

### Option A: Using the Vercel Dashboard (Recommended)

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard).
2. Click on your **DocVerse** project.
3. Go to **Settings** → **Environment Variables**.
4. Add these 4 variables:

| Name | Value | Environments |
|------|-------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_XXXXXXXXXXXX` | Production, Preview, Development |
| `CLERK_SECRET_KEY` | `sk_test_XXXXXXXXXXXX` | Production, Preview, Development |
| `DATABASE_URL` | `postgresql://...-pooler...` | Production, Preview, Development |
| `DIRECT_URL` | `postgresql://...direct...` | Production, Preview, Development |

5. Click **Save**.

### Option B: Using the Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project (if not already linked)
vercel link

# Set each variable
vercel env add VITE_CLERK_PUBLISHABLE_KEY
# Paste: pk_test_XXXXXXXXXXXX
# Select: Production, Preview, Development

vercel env add CLERK_SECRET_KEY
# Paste: sk_test_XXXXXXXXXXXX
# Select: Production, Preview, Development

vercel env add DATABASE_URL
# Paste: postgresql://user:pass@ep-xxx-pooler.neon.tech/docverse?sslmode=require
# Select: Production, Preview, Development

vercel env add DIRECT_URL
# Paste: postgresql://user:pass@ep-xxx.neon.tech/docverse?sslmode=require
# Select: Production, Preview, Development
```

---

## Step 4: Push the Database Schema

After setting the environment variables, you need to create the database tables.

### Option A: Using Vercel CLI (Easiest)

```bash
# Pull environment variables to your local .env
vercel env pull .env.local

# Generate the Prisma client
npx prisma generate

# Push the schema to Neon
npx prisma db push
```

You should see:
```
🚀  Your database is now in sync with your Prisma schema.
```

### Option B: Using Neon's SQL Editor

1. Go to your Neon project dashboard.
2. Click **SQL Editor**.
3. Paste this SQL and click **Run**:

```sql
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "storedKey" TEXT NOT NULL,
    "resultKey" TEXT,
    "toolSlug" TEXT NOT NULL,
    "status" "FileStatus" NOT NULL DEFAULT 'PROCESSING',
    "fileSize" INTEGER NOT NULL,
    "resultSize" INTEGER,
    "mimeType" TEXT NOT NULL DEFAULT 'application/pdf',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'BUSINESS');
CREATE TYPE "FileStatus" AS ENUM ('UPLOADING', 'PROCESSING', 'COMPLETED', 'ERROR');

CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "File_userId_createdAt_idx" ON "File"("userId", "createdAt" DESC);
CREATE INDEX "File_toolSlug_idx" ON "File"("toolSlug");

ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

---

## Step 5: Redeploy

After setting the environment variables and pushing the schema, redeploy:

```bash
# Deploy to production
vercel --prod
```

Or go to your Vercel dashboard → **Deployments** → Click **"Redeploy"** on the latest deployment.

---

## Step 6: Verify

1. Visit your live site.
2. The **dark mode toggle** should work (click the moon/sun icon in the navbar).
3. Click **"Get Started Free"** → you'll see the sign-up page.
4. If Clerk keys are set, you'll be redirected to Clerk's hosted sign-in.
5. After signing in, you'll land on the **Dashboard**.
6. Go to **Tools** → click any non-"Coming Soon" tool (like Merge PDF) → upload files → process → download.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Vercel Edge                       │
│                                                      │
│  ┌──────────────┐     ┌──────────────────────────┐  │
│  │  Vite SPA    │     │  API Routes (serverless) │  │
│  │  (React)     │────▶│  /api/user               │  │
│  │              │     │  /api/process             │  │
│  │  - Clerk     │     │  /api/files              │  │
│  │  - pdf-lib   │     │  /api/files/delete       │  │
│  │  - Tailwind  │     │                          │  │
│  └──────────────┘     │  - Prisma ORM            │  │
│                       │  - Clerk JWT verify       │  │
│                       └──────────┬───────────────┘  │
│                                  │                   │
│                                  ▼                   │
│                       ┌──────────────────────┐      │
│                       │  Neon PostgreSQL     │      │
│                       │  (Serverless DB)     │      │
│                       └──────────────────────┘      │
└─────────────────────────────────────────────────────┘
```

---

## Environment Variables Reference

| Variable | Where to get | Used by | Required |
|----------|-------------|---------|----------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard → API Keys | Browser (React) | Yes |
| `CLERK_SECRET_KEY` | Clerk Dashboard → API Keys | API routes | Yes |
| `DATABASE_URL` | Neon Dashboard → Connection string | Prisma (pooled) | Yes |
| `DIRECT_URL` | Neon Dashboard → Connection string | Prisma (direct) | Yes |

---

## Local Development

```bash
# 1. Copy the example env file
cp .env.example .env.local

# 2. Fill in your keys in .env.local

# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to database
npx prisma db push

# 5. Start dev server
npm run dev
```

The app works **without** Clerk/Neon keys in local development — it falls back to localStorage-based auth and local file processing.
