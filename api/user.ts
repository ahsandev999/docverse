import type { VercelRequest } from '@vercel/node';
import { requireAuth, type VercelResponse } from '../_lib/auth';
import { prisma } from '../_lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = await requireAuth(req, res);
  if (!auth) return;

  try {
    let user = await prisma.user.findUnique({
      where: { clerkId: auth.userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: auth.userId,
          email: auth.email || '',
          name: auth.name,
          avatarUrl: auth.imageUrl,
        },
      });
    } else if (auth.email && user.email !== auth.email) {
      user = await prisma.user.update({
        where: { clerkId: auth.userId },
        data: {
          email: auth.email,
          name: auth.name || user.name,
          avatarUrl: auth.imageUrl || user.avatarUrl,
        },
      });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      plan: user.plan.toLowerCase(),
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('[API] Error fetching user:', error);
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
}
