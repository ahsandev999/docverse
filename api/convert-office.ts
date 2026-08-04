import type { VercelRequest, VercelResponse } from '@vercel/node';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';

const execFileAsync = promisify(execFile);

export const config = {
  api: {
    bodyParser: { sizeLimit: '30mb' },
  },
};

const ALLOWED_EXTENSIONS = ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

/**
 * Finds the local path to LibreOffice (soffice) executable across Windows/Linux/macOS.
 */
function getLibreOfficeExecutable(): string | null {
  const isWin = process.platform === 'win32';
  const candidatePaths = isWin
    ? [
        'soffice',
        'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
        'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
      ]
    : ['soffice', 'libreoffice', '/usr/bin/soffice', '/usr/bin/libreoffice'];

  for (const exe of candidatePaths) {
    try {
      if (fs.existsSync(exe) || !exe.includes('/') && !exe.includes('\\')) {
        return exe;
      }
    } catch {
      // Continue searching
    }
  }
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const { fileName, fileData } = req.body || {};

  if (!fileName || !fileData) {
    return res.status(400).json({ error: 'Missing required parameters: fileName and fileData (base64).' });
  }

  // 1. Sanitize filename & prevent directory traversal
  const safeName = path.basename(fileName).replace(/[^a-zA-Z0-9_.-]/g, '_');
  const ext = path.extname(safeName).toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return res.status(415).json({
      error: `Unsupported file format "${ext}". Allowed extensions: ${ALLOWED_EXTENSIONS.join(', ')}`,
    });
  }

  // 2. Decode base64 payload & enforce size limits
  let buffer: Buffer;
  try {
    const base64Data = fileData.replace(/^data:.*;base64,/, '');
    buffer = Buffer.from(base64Data, 'base64');
  } catch {
    return res.status(400).json({ error: 'Invalid base64 document payload.' });
  }

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return res.status(413).json({ error: 'File size exceeds maximum allowed limit of 25MB.' });
  }

  const tmpDir = os.tmpdir();
  const fileHash = Math.random().toString(36).substring(2, 9);
  const inputFilePath = path.join(tmpDir, `docverse_${fileHash}_${safeName}`);
  const expectedPdfName = `${path.basename(inputFilePath, ext)}.pdf`;
  const expectedPdfPath = path.join(tmpDir, expectedPdfName);

  try {
    // Write uploaded file to temporary directory
    fs.writeFileSync(inputFilePath, buffer);

    const sofficeExe = getLibreOfficeExecutable();
    let pdfBuffer: Buffer | null = null;

    if (sofficeExe) {
      try {
        // Execute LibreOffice headless conversion CLI
        await execFileAsync(sofficeExe, [
          '--headless',
          '--convert-to',
          'pdf',
          '--outdir',
          tmpDir,
          inputFilePath,
        ], { timeout: 30000 });

        if (fs.existsSync(expectedPdfPath)) {
          pdfBuffer = fs.readFileSync(expectedPdfPath);
        }
      } catch (cmdErr) {
        console.warn('[DocVerse Office Convert] LibreOffice CLI error:', cmdErr);
      }
    }

    // High-performance Cloud Fallback for environments without local LibreOffice CLI (e.g. Serverless Vercel)
    if (!pdfBuffer) {
      try {
        const formData = new FormData();
        const fileBlob = new Blob([buffer]);
        formData.append('files', fileBlob, safeName);

        const cloudResponse = await fetch('https://gotenberg.docverse.cloud/forms/libreoffice/convert', {
          method: 'POST',
          body: formData,
        });

        if (cloudResponse.ok) {
          const arrayBuf = await cloudResponse.arrayBuffer();
          pdfBuffer = Buffer.from(arrayBuf);
        }
      } catch {
        // Continue to error fallback
      }
    }

    if (!pdfBuffer) {
      return res.status(500).json({
        error: 'Office to PDF conversion requires LibreOffice installed on the server environment.',
      });
    }

    // Return converted PDF payload
    const base64Pdf = pdfBuffer.toString('base64');
    const pdfFileName = `${path.basename(safeName, ext)}.pdf`;

    return res.status(200).json({
      success: true,
      pdfFileName,
      pdfData: `data:application/pdf;base64,${base64Pdf}`,
      size: pdfBuffer.length,
    });
  } catch (err) {
    console.error('[DocVerse Office Convert] Conversion error:', err);
    return res.status(500).json({
      error: 'An unexpected error occurred while processing your document conversion.',
    });
  } finally {
    // 3. Clean up temporary files immediately
    try {
      if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
      if (fs.existsSync(expectedPdfPath)) fs.unlinkSync(expectedPdfPath);
    } catch {
      // Ignore cleanup errors
    }
  }
}
