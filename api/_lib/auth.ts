import { verifyToken } from '@clerk/backend';
import type { VercelRequest } from '@vercel/node';

export interface AuthResult {
  userId: string | null;
  email: string | null;
  name: string | null;
  imageUrl: string | null;
}

export async function getClerkAuth(req: VercelRequest): Promise<AuthResult> {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return { userId: null, email: null, name: null, imageUrl: null };
  }

  const token = authHeader.substring(7);
  if (!token) {
    return { userId: null, email: null, name: null, imageUrl: null };
  }

  const secretKey = process.env.CLERK_SECRET_KEY;

  try {
    if (secretKey && secretKey !== 'sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') {
      const verified = await verifyToken(token, { secretKey });
      return {
        userId: verified.sub,
        email: (verified.email as string) || null,
        name: (verified.name as string) || null,
        imageUrl: (verified.image_url as string) || null,
      };
    }

    // Local dev fallback parsing
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { userId: null, email: null, name: null, imageUrl: null };
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64').toString('utf-8')
    );

    return {
      userId: payload.sub || null,
      email: payload.email || null,
      name: payload.name || null,
      imageUrl: payload.image_url || null,
    };
  } catch {
    return { userId: null, email: null, name: null, imageUrl: null };
  }
}

export async function requireAuth(
  req: VercelRequest,
  res: VercelResponse
): Promise<AuthResult | null> {
  const auth = await getClerkAuth(req);
  if (!auth.userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }
  return auth;
}

// Minimal VercelResponse type for type safety without importing
export interface VercelResponse {
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
  send(body: unknown): VercelResponse;
}
