import type { VercelRequest } from '@vercel/node';
import { requireAuth, type VercelResponse } from '../_lib/auth';
import { prisma } from '../_lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = await requireAuth(req, res);
  if (!auth) return;

  try {
    const { fileId } = req.body;
    if (!fileId) return res.status(400).json({ error: 'fileId is required' });

    const user = await prisma.user.findUnique({ where: { clerkId: auth.userId! } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const file = await prisma.file.findFirst({
      where: { id: fileId, userId: user.id },
    });

    if (!file) return res.status(404).json({ error: 'File not found' });

    await prisma.file.delete({ where: { id: fileId } });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[API] Error deleting file:', error);
    return res.status(500).json({ error: 'Failed to delete file' });
  }
}
