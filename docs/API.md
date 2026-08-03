# DocVerse — API Documentation

## Base URL

```
Development: http://localhost:3001/api
Production:  https://api.docverse.app/api
```

## Authentication

All authenticated endpoints require a Bearer token:

```
Authorization: Bearer <token>
```

Tokens are obtained via Clerk authentication.

## Response Format

All responses follow a consistent envelope:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "hasMore": true
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [...]
  }
}
```

## Error Codes

| Code                   | HTTP Status |
|------------------------|-------------|
| VALIDATION_ERROR       | 400         |
| AUTHENTICATION_ERROR   | 401         |
| AUTHORIZATION_ERROR    | 403         |
| NOT_FOUND              | 404         |
| RATE_LIMIT_ERROR       | 429         |
| FILE_TOO_LARGE         | 413         |
| QUOTA_EXCEEDED         | 429         |
| STORAGE_ERROR          | 500         |

## Endpoints

### Authentication

#### POST /auth/sign-in

```json
// Request
{ "email": "user@example.com", "password": "secret123" }

// Response
{ "success": true, "data": { "user": {...}, "token": "...", "expiresAt": "..." } }
```

#### POST /auth/sign-up

```json
// Request
{ "name": "John", "email": "john@example.com", "password": "Secret123" }

// Response
{ "success": true, "data": { "user": {...}, "token": "...", "expiresAt": "..." } }
```

#### POST /auth/sign-out

Invalidates the current session.

#### POST /auth/reset-password

```json
// Request
{ "email": "user@example.com" }

// Response
{ "success": true, "data": { "message": "Reset email sent" } }
```

### Files

#### POST /files/upload

Multipart form data with file + toolSlug.

Supports progress tracking via chunked upload.

#### GET /files?page=1&limit=20&status=completed&toolSlug=merge-pdf

Paginated file listing with filters.

#### GET /files/:id

Single file metadata.

#### GET /files/:id/download

Returns a signed R2 URL for secure download.

#### DELETE /files/:id

Soft-deletes a file.

#### POST /files/:id/favorite

Toggles favorite status.

### Processing

#### POST /process

```json
{
  "toolSlug": "merge-pdf",
  "fileIds": ["file1", "file2"],
  "options": { "rotationAngle": 90 }
}
```

#### GET /process/:id

Returns current processing job status.

### Dashboard

#### GET /dashboard/stats

```json
{
  "totalFiles": 42,
  "completedFiles": 38,
  "totalSize": 104857600,
  "dailyUsage": 5,
  "favorites": 3
}
```

### Notifications

#### GET /notifications

#### PATCH /notifications/:id

```json
{ "read": true }
```

### Settings

#### GET /settings

#### PATCH /settings

```json
{ "theme": "dark", "autoDeleteFiles": false }
```

### Usage

#### GET /usage?days=30

Returns daily usage breakdown.
