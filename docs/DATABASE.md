# DocVerse — Database Schema Documentation

## Entity Relationship Diagram

```
User ─────────────────────────────────────────────────────────┐
  │ 1:1   UserSettings                                       │
  │ 1:1   StorageUsage                                       │
  │ 1:N   File                                               │
  │ 1:N   ProcessingJob                                      │
  │ 1:N   Favorite                                           │
  │ 1:N   Notification                                       │
  │ 1:N   UsageStat                                          │
  │ 1:N   ApiKey                                             │
  └──────────────────────────────────────────────────────────┘

File ─────────────────────────────────────────────────────────┐
  │ 1:N   ProcessingJob                                      │
  │ 1:N   Favorite                                           │
  │ 1:N   Download                                           │
  └──────────────────────────────────────────────────────────┘
```

## Tables

### users
| Column         | Type      | Constraints              |
|----------------|-----------|--------------------------|
| id             | String    | PK, cuid                 |
| clerkId        | String?   | Unique, indexed          |
| email          | String    | Unique, indexed          |
| name           | String    | Not null                 |
| avatarUrl      | String?   |                          |
| plan           | Enum      | FREE, PRO, BUSINESS      |
| emailVerified  | Boolean   | Default false            |
| createdAt      | DateTime  | Default now()            |
| updatedAt      | DateTime  | Auto-updated             |

### user_settings
| Column                  | Type     | Constraints              |
|-------------------------|----------|--------------------------|
| id                      | String   | PK, cuid                 |
| userId                  | String   | FK → users, Unique       |
| defaultCompression      | String   | Default 'medium'         |
| autoDeleteFiles         | Boolean  | Default true             |
| autoDeleteAfterDays     | Int      | Default 1                |
| emailNotifications     | Boolean  | Default true             |
| language                | String   | Default 'en'             |
| theme                   | String   | Default 'system'         |

### files
| Column       | Type      | Constraints                          |
|--------------|-----------|--------------------------------------|
| id           | String    | PK, cuid                             |
| userId       | String    | FK → users, indexed                  |
| originalName | String    | Not null                             |
| storedName   | String    | Not null (R2 key)                    |
| storageKey   | String    | Not null                             |
| mimeType     | String    | Not null                             |
| size         | Int       | Not null (bytes)                     |
| status       | Enum      | UPLOADING, UPLOADED, PROCESSING, etc |
| toolSlug     | String?   | Indexed                              |
| pageCount    | Int?      |                                      |
| metadata     | Json?     |                                      |
| expiresAt    | DateTime? | For auto-deletion                   |
| deletedAt    | DateTime? | Soft delete                         |

### storage_usage
| Column      | Type    | Constraints              |
|-------------|---------|--------------------------|
| id          | String  | PK, cuid                 |
| userId      | String  | FK → users, Unique       |
| totalBytes  | BigInt  | Default 0                |
| fileCount   | Int     | Default 0                |

### processing_jobs
| Column       | Type      | Constraints              |
|--------------|-----------|--------------------------|
| id           | String    | PK, cuid                 |
| userId       | String    | FK → users               |
| fileId       | String?   | FK → files (SET NULL)    |
| toolSlug     | String    | Indexed                  |
| status       | Enum      | PENDING, RUNNING, etc    |
| options      | Json?     | Tool-specific params     |
| resultKey    | String?   | R2 key for result        |
| resultName   | String?   | Output filename          |
| resultSize   | Int?      | Output size in bytes     |
| error        | String?   | Error message            |
| startedAt    | DateTime? |                          |
| completedAt  | DateTime? |                          |

### favorites
| Column   | Type     | Constraints              |
|----------|----------|--------------------------|
| id       | String   | PK, cuid                 |
| userId   | String   | FK → users               |
| fileId   | String   | FK → files               |
| Unique   | (userId, fileId)                     |

### notifications
| Column    | Type     | Constraints              |
|-----------|----------|--------------------------|
| id        | String   | PK, cuid                 |
| userId    | String   | FK → users               |
| type      | Enum     | INFO, SUCCESS, etc       |
| title     | String   | Not null                 |
| message   | String   | Not null                 |
| read      | Boolean  | Default false            |
| actionUrl | String?  |                          |

### usage_stats
| Column    | Type    | Constraints                          |
|-----------|---------|--------------------------------------|
| id        | String  | PK, cuid                             |
| userId    | String  | FK → users                           |
| date      | Date    | Indexed                              |
| toolSlug  | String  | Indexed                              |
| count     | Int     | Default 0                            |
| totalSize | BigInt  | Default 0                            |
| Unique    | (userId, date, toolSlug)             |

### downloads
| Column    | Type     | Constraints              |
|-----------|----------|--------------------------|
| id        | String   | PK, cuid                 |
| fileId    | String   | FK → files               |
| userId    | String   | FK → users               |
| ipAddress | String?  |                          |
| userAgent | String?  |                          |

### api_keys
| Column    | Type      | Constraints              |
|-----------|-----------|--------------------------|
| id        | String    | PK, cuid                 |
| userId    | String    | FK → users               |
| name      | String    | Not null                 |
| keyHash   | String    | Unique, indexed          |
| prefix    | String    | For identification       |
| lastUsed  | DateTime? |                          |
| expiresAt | DateTime? |                          |
| revokedAt | DateTime? |                          |

## Reserved Tables (Future)

- `subscriptions` — Stripe integration
- `ai_usage` — AI/LLM token tracking
- `ocr_jobs` — OCR processing queue
- `teams` / `team_members` — Team collaboration

## Indexes

Key indexes for query performance:
- `files(userId, status)` — Dashboard file listing
- `files(createdAt)` — Chronological sorting
- `processing_jobs(userId, status)` — Active jobs
- `notifications(userId, read)` — Unread count
- `usage_stats(userId, date)` — Daily usage
