/**
 * Typed API Client for interacting with DocVerse Serverless Backend Endpoints (/api/*)
 */

export interface ProcessFileResponse {
  fileId: string;
  message: string;
}

export interface UserFileRecord {
  id: string;
  originalName: string;
  fileSize: number;
  resultSize?: number;
  toolSlug: string;
  status: string;
  mimeType: string;
  createdAt: string;
}

export interface FileHistoryResponse {
  files: UserFileRecord[];
  total: number;
}

async function getAuthHeader(): Promise<Record<string, string>> {
  try {
    const userJson = localStorage.getItem('docverse-user');
    if (userJson) {
      const user = JSON.parse(userJson);
      // Construct auth header for serverless endpoints
      const mockPayload = {
        sub: user.id || 'usr_default',
        email: user.email || 'user@example.com',
        name: user.name || 'User',
      };
      const encodedPayload = btoa(JSON.stringify(mockPayload));
      const token = `header.${encodedPayload}.signature`;
      return { Authorization: `Bearer ${token}` };
    }
  } catch {
    // Ignore fallback errors
  }
  return {};
}

export async function logFileProcessing(toolSlug: string, originalName: string, fileSize: number): Promise<ProcessFileResponse | null> {
  try {
    const authHeaders = await getAuthHeader();
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify({
        toolSlug,
        options: { originalName, fileSize },
      }),
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function fetchUserFileHistory(): Promise<UserFileRecord[]> {
  try {
    const authHeaders = await getAuthHeader();
    const response = await fetch('/api/files?limit=20', {
      method: 'GET',
      headers: {
        ...authHeaders,
      },
    });

    if (!response.ok) return [];
    const data: FileHistoryResponse = await response.json();
    return data.files || [];
  } catch {
    return [];
  }
}
