import JSZip from 'jszip';
import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';
import { PDFProcessingError } from './pdf-utils';

export interface OfficeConversionOptions {
  file: File;
}

function sanitizePdfText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, '-')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[^\x20-\x7E\t\r\n]/g, '');
}

/**
 * Client-side fallback engine for converting Word (DOCX), Excel (XLSX), and PowerPoint (PPTX)
 * files directly to vector PDF documents using JSZip and pdf-lib.
 */
export async function convertOfficeClientSide(file: File): Promise<{ pdfBytes: Uint8Array; pdfFileName: string }> {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  const baseName = file.name.replace(/\.[^/.]+$/, '');

  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    if (ext === 'docx' || ext === 'doc') {
      await renderDocxToPdf(zip, pdfDoc, font, fontBold, baseName);
    } else if (ext === 'xlsx' || ext === 'xls') {
      await renderXlsxToPdf(zip, pdfDoc, font, fontBold, baseName);
    } else if (ext === 'pptx' || ext === 'ppt') {
      await renderPptxToPdf(zip, pdfDoc, font, fontBold, baseName);
    } else {
      throw new PDFProcessingError(`Unsupported office format .${ext}`, 'unknown');
    }

    const pdfBytes = await pdfDoc.save();
    return {
      pdfBytes,
      pdfFileName: `${baseName}.pdf`,
    };
  } catch (err) {
    if (err instanceof PDFProcessingError) throw err;
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('encrypted') || msg.includes('Password')) {
      throw new PDFProcessingError('This Office document is password-protected and cannot be converted.', 'encrypted');
    }
    throw new PDFProcessingError(`Failed to convert ${file.name} to PDF: ${msg}`, 'unknown');
  }
}

async function renderDocxToPdf(
  zip: JSZip,
  pdfDoc: PDFDocument,
  font: PDFFont,
  fontBold: PDFFont,
  title: string
) {
  const documentXml = await zip.file('word/document.xml')?.async('text');
  if (!documentXml) {
    throw new PDFProcessingError('Invalid DOCX document structure.', 'corrupted');
  }

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(documentXml, 'text/xml');
  const paragraphNodes = Array.from(xmlDoc.getElementsByTagName('w:p'));

  let currentPage = pdfDoc.addPage([595.28, 841.89]); // A4 Page
  let y = 790;
  const margin = 50;
  const maxWidth = 495;

  const safeTitle = sanitizePdfText(title) || 'Document';
  currentPage.drawText(safeTitle, { x: margin, y, size: 18, font: fontBold, color: rgb(0.1, 0.1, 0.2) });
  y -= 30;

  for (const p of paragraphNodes) {
    const textNodes = Array.from(p.getElementsByTagName('w:t'));
    const rawText = textNodes.map((t) => t.textContent || '').join('').trim();
    const pText = sanitizePdfText(rawText);

    if (!pText) {
      y -= 10;
      continue;
    }

    const isHeading = p.querySelector('w\\:pStyle[w\\:val*="Heading"], pStyle[val*="Heading"]') !== null;
    const fontSize = isHeading ? 14 : 11;
    const currentFont = isHeading ? fontBold : font;
    const fontColor = isHeading ? rgb(0.15, 0.25, 0.5) : rgb(0.15, 0.15, 0.15);

    const words = pText.split(' ');
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const lineWidth = currentFont.widthOfTextAtSize(testLine, fontSize);

      if (lineWidth > maxWidth) {
        if (y < 60) {
          currentPage = pdfDoc.addPage([595.28, 841.89]);
          y = 790;
        }
        currentPage.drawText(currentLine, { x: margin, y, size: fontSize, font: currentFont, color: fontColor });
        y -= fontSize + 4;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      if (y < 60) {
        currentPage = pdfDoc.addPage([595.28, 841.89]);
        y = 790;
      }
      currentPage.drawText(currentLine, { x: margin, y, size: fontSize, font: currentFont, color: fontColor });
      y -= fontSize + 6;
    }
  }
}

async function renderXlsxToPdf(
  zip: JSZip,
  pdfDoc: PDFDocument,
  font: PDFFont,
  fontBold: PDFFont,
  title: string
) {
  const sharedStringsXml = await zip.file('xl/sharedStrings.xml')?.async('text');
  const sharedStrings: string[] = [];
  if (sharedStringsXml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sharedStringsXml, 'text/xml');
    const tNodes = Array.from(xmlDoc.getElementsByTagName('t'));
    tNodes.forEach((t) => sharedStrings.push(sanitizePdfText(t.textContent || '')));
  }

  const sheetXml = await zip.file('xl/worksheets/sheet1.xml')?.async('text');
  if (!sheetXml) {
    throw new PDFProcessingError('Invalid XLSX document structure.', 'corrupted');
  }

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(sheetXml, 'text/xml');
  const rowNodes = Array.from(xmlDoc.getElementsByTagName('row'));

  let currentPage = pdfDoc.addPage([841.89, 595.28]); // A4 Landscape for Excel
  let y = 540;
  const margin = 40;

  const safeTitle = sanitizePdfText(title) || 'Spreadsheet';
  currentPage.drawText(`Spreadsheet: ${safeTitle}`, { x: margin, y, size: 16, font: fontBold, color: rgb(0.1, 0.4, 0.2) });
  y -= 30;

  for (const rowNode of rowNodes) {
    const cellNodes = Array.from(rowNode.getElementsByTagName('c'));
    const rowValues: string[] = [];

    for (const c of cellNodes) {
      const type = c.getAttribute('t');
      const vNode = c.getElementsByTagName('v')[0];
      let val = vNode?.textContent || '';
      if (type === 's' && sharedStrings[parseInt(val, 10)]) {
        val = sharedStrings[parseInt(val, 10)];
      }
      val = sanitizePdfText(val);
      if (val) rowValues.push(val);
    }

    if (rowValues.length === 0) continue;

    if (y < 50) {
      currentPage = pdfDoc.addPage([841.89, 595.28]);
      y = 540;
    }

    const rowText = sanitizePdfText(rowValues.slice(0, 7).join('   |   '));
    currentPage.drawText(rowText.substring(0, 110), {
      x: margin,
      y,
      size: 10,
      font: rowNode.getAttribute('r') === '1' ? fontBold : font,
      color: rgb(0.2, 0.2, 0.2),
    });
    y -= 18;
  }
}

async function renderPptxToPdf(
  zip: JSZip,
  pdfDoc: PDFDocument,
  font: PDFFont,
  fontBold: PDFFont,
  title: string
) {
  const slideFiles = Object.keys(zip.files).filter(
    (f) => f.startsWith('ppt/slides/slide') && f.endsWith('.xml')
  ).sort();

  const safeTitle = sanitizePdfText(title) || 'Presentation';

  if (slideFiles.length === 0) {
    const page = pdfDoc.addPage([841.89, 595.28]);
    page.drawText(safeTitle, { x: 50, y: 500, size: 24, font: fontBold, color: rgb(0.2, 0.2, 0.5) });
    return;
  }

  const parser = new DOMParser();

  for (let i = 0; i < slideFiles.length; i++) {
    const slideXml = await zip.file(slideFiles[i])?.async('text');
    if (!slideXml) continue;

    const xmlDoc = parser.parseFromString(slideXml, 'text/xml');
    const textNodes = Array.from(xmlDoc.getElementsByTagName('a:t'));
    const slideTexts = textNodes.map((t) => sanitizePdfText(t.textContent || '')).filter(Boolean);

    const page = pdfDoc.addPage([841.89, 595.28]);
    let y = 520;

    page.drawRectangle({
      x: 0,
      y: 540,
      width: 841.89,
      height: 55,
      color: rgb(0.1, 0.2, 0.4),
    });
    page.drawText(`${safeTitle} - Slide ${i + 1}`, { x: 40, y: 558, size: 16, font: fontBold, color: rgb(1, 1, 1) });

    for (const txt of slideTexts) {
      if (y < 60) break;
      const isTitle = y === 520;
      page.drawText(txt.substring(0, 90), {
        x: 50,
        y,
        size: isTitle ? 16 : 12,
        font: isTitle ? fontBold : font,
        color: rgb(0.15, 0.15, 0.15),
      });
      y -= isTitle ? 30 : 20;
    }
  }
}
