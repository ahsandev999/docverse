import type { VercelRequest } from '@vercel/node';
import { requireAuth, type VercelResponse } from '../_lib/auth';
import { prisma } from '../_lib/db';
import { processFileSchema } from '../_lib/schemas';

export const config = {
  api: {
    bodyParser: { sizeLimit: '50mb' },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = await requireAuth(req, res);
  if (!auth) return;

  try {
    const body = processFileSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { clerkId: auth.userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // 100% Free unlimited usage mode

    const fileRecord = await prisma.file.create({
      data: {
        userId: user.id,
        originalName: body.toolSlug + '-input',
        storedKey: 'pending',
        toolSlug: body.toolSlug,
        fileSize: 0,
        status: 'PROCESSING',
      },
    });

    return res.status(200).json({
      fileId: fileRecord.id,
      message: 'File processing initiated',
    });
  } catch (error) {
    console.error('[API] Error processing file:', error);
    return res.status(500).json({ error: 'Failed to process file' });
  }
}
