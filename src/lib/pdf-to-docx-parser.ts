import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Document, Paragraph, TextRun, Packer, HeadingLevel, PageBreak } from 'docx';
import { PDFProcessingError } from './pdf-utils';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

export interface PdfToDocxResult {
  docxBytes: Uint8Array;
  docxFileName: string;
}

interface TextItemObj {
  str: string;
  dir?: string;
  transform: number[];
  width: number;
  height: number;
  fontName: string;
  hasEOL?: boolean;
}

/**
 * High-performance client-side PDF to DOCX converter engine.
 * Uses PDF.js text extractor + OpenXML docx document compiler to build real,
 * editable Microsoft Word (.docx) binary packages.
 */
export async function convertPdfToDocxClientSide(file: File): Promise<PdfToDocxResult> {
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  try {
    const rawBuffer = await file.arrayBuffer();
    const data = new Uint8Array(rawBuffer);
    const loadingTask = pdfjsLib.getDocument({ data });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    if (numPages === 0) {
      throw new PDFProcessingError('PDF document contains no pages.', 'empty');
    }

    const docChildren: Paragraph[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const items = textContent.items as TextItemObj[];

      if (pageNum > 1 && docChildren.length > 0) {
        docChildren.push(
          new Paragraph({
            children: [new PageBreak()],
          })
        );
      }

      if (items.length === 0) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `[Page ${pageNum} - Image / Non-Text Content]`,
                italics: true,
                color: '888888',
              }),
            ],
          })
        );
        continue;
      }

      // Group text items into lines based on Y-coordinates
      const lines: { y: number; items: TextItemObj[] }[] = [];

      for (const item of items) {
        if (!item.str || !item.str.trim()) continue;
        const y = Math.round(item.transform[5]);
        const existingLine = lines.find((l) => Math.abs(l.y - y) <= 4);

        if (existingLine) {
          existingLine.items.push(item);
        } else {
          lines.push({ y, items: [item] });
        }
      }

      // Sort lines top to bottom
      lines.sort((a, b) => b.y - a.y);

      for (const line of lines) {
        // Sort line items left to right
        line.items.sort((a, b) => a.transform[4] - b.transform[4]);
        const lineText = line.items.map((it) => it.str).join(' ').trim();

        if (!lineText) continue;

        const maxFontHeight = Math.max(...line.items.map((it) => Math.abs(it.height || 12)));
        const isBold = line.items.some(
          (it) => (it.fontName || '').toLowerCase().includes('bold') || (it.fontName || '').toLowerCase().includes('goth')
        );

        const isHeading = maxFontHeight >= 16;
        const isSubheading = maxFontHeight >= 13 && maxFontHeight < 16;

        if (isHeading) {
          docChildren.push(
            new Paragraph({
              text: lineText,
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 240, after: 120 },
            })
          );
        } else if (isSubheading) {
          docChildren.push(
            new Paragraph({
              text: lineText,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 180, after: 90 },
            })
          );
        } else {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: lineText,
                  bold: isBold,
                  size: Math.round(Math.max(18, Math.min(maxFontHeight * 2, 28))),
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: docChildren.length > 0 ? docChildren : [
            new Paragraph({
              children: [
                new TextRun({
                  text: `DocVerse Converted PDF Document: ${file.name}`,
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const arrayBuffer = await blob.arrayBuffer();
    const docxBytes = new Uint8Array(arrayBuffer);

    return {
      docxBytes,
      docxFileName: `${baseName}.docx`,
    };
  } catch (err) {
    if (err instanceof PDFProcessingError) throw err;
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('Password') || msg.includes('encrypted')) {
      throw new PDFProcessingError('This PDF is password-protected and cannot be converted.', 'encrypted');
    }
    throw new PDFProcessingError(`Failed to convert ${file.name} to Word DOCX: ${msg}`, 'unknown');
  }
}
