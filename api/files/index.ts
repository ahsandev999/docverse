import type { VercelRequest } from '@vercel/node';
import { requireAuth, type VercelResponse } from '../_lib/auth';
import { prisma } from '../_lib/db';
import { fileHistoryQuerySchema } from '../_lib/schemas';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = await requireAuth(req, res);
  if (!auth) return;

  try {
    const query = fileHistoryQuerySchema.parse(req.query);
    const user = await prisma.user.findUnique({ where: { clerkId: auth.userId! } });
    if (!user) return res.status(200).json({ files: [], total: 0 });

    const where = {
      userId: user.id,
      ...(query.toolSlug ? { toolSlug: query.toolSlug } : {}),
    };

    const [files, total] = await Promise.all([
      prisma.file.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: query.limit,
        skip: query.offset,
        select: {
          id: true,
          originalName: true,
          fileSize: true,
          resultSize: true,
          toolSlug: true,
          status: true,
          mimeType: true,
          createdAt: true,
        },
      }),
      prisma.file.count({ where }),
    ]);

    return res.status(200).json({
      files: files.map((f) => ({
        ...f,
        status: f.status.toLowerCase(),
        size: f.fileSize,
        name: f.originalName,
        createdAt: f.createdAt.toISOString(),
      })),
      total,
    });
  } catch (error) {
    console.error('[API] Error fetching files:', error);
    return res.status(500).json({ error: 'Failed to fetch files' });
  }
}
