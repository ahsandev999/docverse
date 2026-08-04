import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import JSZip from 'jszip';
import { PDFProcessingError } from './pdf-utils';

// Configure PDF.js worker URL for Vite bundling
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

export interface PageThumbnail {
  pageNum: number;
  dataUrl: string;
  width: number;
  height: number;
}

export interface RenderOptions {
  format: 'jpeg' | 'png';
  qualityScale?: number; // Low (1.0), Medium (1.5), High (2.0)
  onProgress?: (current: number, total: number) => void;
}

/**
 * Renders all pages of a PDF document to real JPG or PNG images.
 * If 1 page: returns a single image Blob.
 * If multiple pages: packs images into a valid ZIP archive Blob.
 */
export async function convertPdfToImages(
  file: File,
  options: RenderOptions
): Promise<{ blob: Blob; filename: string; mimeType: string }> {
  try {
    const rawBuffer = await file.arrayBuffer();
    const data = new Uint8Array(rawBuffer);
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    if (numPages === 0) {
      throw new PDFProcessingError('PDF contains no pages.', 'empty');
    }

    const scale = options.qualityScale || 1.5;
    const isJpeg = options.format === 'jpeg';
    const mimeType = isJpeg ? 'image/jpeg' : 'image/png';
    const ext = isJpeg ? 'jpg' : 'png';
    const baseName = file.name.replace(/\.[^/.]+$/, '');

    // Single-page PDF conversion
    if (numPages === 1) {
      const page = await pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new PDFProcessingError('Canvas 2D context unavailable.', 'unknown');
      }

      if (isJpeg) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      await page.render({ canvasContext: ctx, viewport, canvas }).promise;

      if (options.onProgress) options.onProgress(1, 1);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Failed to render canvas image blob'))),
          mimeType,
          isJpeg ? 0.92 : undefined
        );
      });

      return {
        blob,
        filename: `${baseName}.${ext}`,
        mimeType,
      };
    }

    // Multi-page PDF conversion -> ZIP package
    const zip = new JSZip();

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new PDFProcessingError('Canvas 2D context unavailable.', 'unknown');
      }

      if (isJpeg) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      await page.render({ canvasContext: ctx, viewport, canvas }).promise;

      const pageBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Failed to render canvas image blob'))),
          mimeType,
          isJpeg ? 0.92 : undefined
        );
      });

      const pageNumberPadded = String(pageNum).padStart(3, '0');
      zip.file(`${baseName}_page_${pageNumberPadded}.${ext}`, pageBlob);

      if (options.onProgress) options.onProgress(pageNum, numPages);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    return {
      blob: zipBlob,
      filename: `${baseName}_images.zip`,
      mimeType: 'application/zip',
    };
  } catch (err) {
    if (err instanceof PDFProcessingError) throw err;
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('Password') || msg.includes('encrypted')) {
      throw new PDFProcessingError('This PDF is password-protected and cannot be rendered.', 'encrypted');
    }
    if (msg.includes('Invalid PDF') || msg.includes('parse')) {
      throw new PDFProcessingError('The PDF file is corrupted or unreadable.', 'corrupted');
    }
    throw new PDFProcessingError(`Failed to convert PDF to images: ${msg}`, 'unknown');
  }
}

/**
 * Renders thumbnail previews for all pages in a PDF file (used by Organize Pages).
 */
export async function renderPdfThumbnails(file: File): Promise<PageThumbnail[]> {
  try {
    const rawBuffer = await file.arrayBuffer();
    const data = new Uint8Array(rawBuffer);
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;
    const thumbnails: PageThumbnail[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 0.3 }); // Thumbnail scale
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        thumbnails.push({
          pageNum: i,
          dataUrl: canvas.toDataURL('image/jpeg', 0.8),
          width: viewport.width,
          height: viewport.height,
        });
      }
    }

    return thumbnails;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('Password') || msg.includes('encrypted')) {
      throw new PDFProcessingError('This PDF is password-protected and cannot be previewed.', 'encrypted');
    }
    throw new PDFProcessingError('Failed to render page thumbnails.', 'corrupted');
  }
}
