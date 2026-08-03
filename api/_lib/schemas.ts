import { z } from 'zod';

export const processFileSchema = z.object({
  toolSlug: z.string().min(1),
  options: z.record(z.unknown()).optional(),
});

export const fileHistoryQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
  toolSlug: z.string().optional(),
});

export const deleteFileSchema = z.object({
  fileId: z.string().min(1),
});
