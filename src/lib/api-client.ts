import { convertOfficeClientSide } from './office-parser';

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

export interface ConvertOfficeResult {
  pdfBytes: Uint8Array;
  pdfFileName: string;
}

export async function convertOfficeToPDF(file: File): Promise<ConvertOfficeResult> {
  try {
    const fileData = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = (reader.result as string) || '';
        resolve(res.split(',')[1] || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const authHeaders = await getAuthHeader();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    try {
      const response = await fetch('/api/convert-office', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({
          fileName: file.name,
          fileData,
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.pdfData) {
          const base64Str = (result.pdfData || '').replace(/^data:application\/pdf;base64,/, '');
          const binaryPdf = atob(base64Str);
          const pdfBytes = new Uint8Array(binaryPdf.length);
          for (let i = 0; i < binaryPdf.length; i++) {
            pdfBytes[i] = binaryPdf.charCodeAt(i);
          }

          return {
            pdfBytes,
            pdfFileName: result.pdfFileName || `${file.name.replace(/\.[^/.]+$/, '')}.pdf`,
          };
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }
  } catch {
    // Fast path to client-side conversion engine when local proxy times out
  }

  // Seamless client-side office document conversion engine
  return convertOfficeClientSide(file);
}

