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

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

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
      if (fs.existsSync(exe) || (!exe.includes('/') && !exe.includes('\\'))) {
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
    return res.status(400).json({ error: 'Missing required parameters: fileName and fileData.' });
  }

  const safeName = path.basename(fileName).replace(/[^a-zA-Z0-9_.-]/g, '_');
  const ext = path.extname(safeName).toLowerCase();

  if (ext !== '.pdf') {
    return res.status(415).json({ error: 'Invalid file extension. PDF to Word requires a .pdf file.' });
  }

  let buffer: Buffer;
  try {
    const base64Data = fileData.replace(/^data:.*;base64,/, '');
    buffer = Buffer.from(base64Data, 'base64');
  } catch {
    return res.status(400).json({ error: 'Invalid base64 payload.' });
  }

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return res.status(413).json({ error: 'File size exceeds maximum allowed limit of 25MB.' });
  }

  // Validate PDF magic bytes (%PDF-)
  if (buffer.length < 5 || buffer.toString('utf8', 0, 5) !== '%PDF-') {
    return res.status(400).json({ error: 'The uploaded file is not a valid PDF document.' });
  }

  const tmpDir = os.tmpdir();
  const fileHash = Math.random().toString(36).substring(2, 9);
  const inputFilePath = path.join(tmpDir, `docverse_${fileHash}_${safeName}`);
  const expectedDocxName = `${path.basename(inputFilePath, ext)}.docx`;
  const expectedDocxPath = path.join(tmpDir, expectedDocxName);

  try {
    fs.writeFileSync(inputFilePath, buffer);

    const sofficeExe = getLibreOfficeExecutable();
    let docxBuffer: Buffer | null = null;

    if (sofficeExe) {
      try {
        await execFileAsync(sofficeExe, [
          '--headless',
          '--infilter=writer_pdf_import',
          '--convert-to',
          'docx',
          '--outdir',
          tmpDir,
          inputFilePath,
        ], { timeout: 35000 });

        if (fs.existsSync(expectedDocxPath)) {
          docxBuffer = fs.readFileSync(expectedDocxPath);
        }
      } catch (cmdErr) {
        console.warn('[DocVerse PDF to Word] LibreOffice CLI error:', cmdErr);
      }
    }

    // Cloud fallback for serverless container
    if (!docxBuffer) {
      try {
        const formData = new FormData();
        const fileBlob = new Blob([new Uint8Array(buffer)]);
        formData.append('files', fileBlob, safeName);

        const cloudResponse = await fetch('https://gotenberg.docverse.cloud/forms/libreoffice/convert', {
          method: 'POST',
          body: formData,
        });

        if (cloudResponse.ok) {
          const arrayBuf = await cloudResponse.arrayBuffer();
          docxBuffer = Buffer.from(arrayBuf);
        }
      } catch {
        // Fallback handled on client side
      }
    }

    if (!docxBuffer) {
      return res.status(500).json({
        error: 'PDF to Word conversion server engine is unavailable.',
      });
    }

    const base64Docx = docxBuffer.toString('base64');
    const docxFileName = `${path.basename(safeName, ext)}.docx`;

    return res.status(200).json({
      success: true,
      docxFileName,
      docxData: `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64Docx}`,
      size: docxBuffer.length,
    });
  } catch (err) {
    console.error('[DocVerse PDF to Word] Error:', err);
    return res.status(500).json({ error: 'An unexpected error occurred during PDF to Word conversion.' });
  } finally {
    try {
      if (fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
      if (fs.existsSync(expectedDocxPath)) fs.unlinkSync(expectedDocxPath);
    } catch {
      // Ignore cleanup error
    }
  }
}
