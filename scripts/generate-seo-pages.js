import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

const tools = [
  {
    slug: 'pdf-to-word',
    name: 'PDF to Word Converter',
    description: 'Convert PDF to Word (DOCX) online for free. Preserves formatting, images, and layouts. Fast, secure, no signup required. Edit your PDFs as Word documents instantly.',
  },
  {
    slug: 'word-to-pdf',
    name: 'Word to PDF Converter',
    description: 'Convert Word (DOCX, DOC) to PDF online for free. Preserves fonts, layouts, images, and hyperlinks. Fast, secure, no signup required. Universal PDF format instantly.',
  },
  {
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG Converter',
    description: 'Convert PDF to JPG images online for free. Each PDF page becomes a high-quality JPG image. Fast, secure, no signup required. Extract images from any PDF instantly.',
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF Converter',
    description: 'Convert JPG images to PDF online for free. Combine multiple JPGs into one PDF document. Fast, secure, no signup required. Perfect for scans, photos, and receipts.',
  },
  {
    slug: 'pdf-to-png',
    name: 'PDF to PNG Converter',
    description: 'Convert PDF to PNG online for free. Extract PDF pages as high-quality PNG images with transparent backgrounds. Fast, secure, no signup required.',
  },
  {
    slug: 'png-to-pdf',
    name: 'PNG to PDF Converter',
    description: 'Convert PNG images to PDF online for free. Combine multiple PNGs into one PDF document. Preserves transparency and quality. Fast, secure, no signup required.',
  },
  {
    slug: 'excel-to-pdf',
    name: 'Excel to PDF Converter',
    description: 'Convert Excel (XLSX, XLS) to PDF online for free. Preserves tables, formulas, charts, and formatting. Fast, secure, no signup required. Professional PDFs instantly.',
  },
  {
    slug: 'powerpoint-to-pdf',
    name: 'PowerPoint to PDF Converter',
    description: 'Convert PowerPoint (PPTX, PPT) to PDF online for free. Preserves slide layouts, images, fonts, and formatting. Fast, secure, no signup required.',
  },
  {
    slug: 'merge-pdf',
    name: 'Merge PDF — Combine PDF Files Online',
    description: 'Merge PDF files online for free. Combine multiple PDFs into one document in any order. Fast, secure, no signup required. Unlimited merges without watermarks.',
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF — Split PDF by Page Range',
    description: 'Split PDF files online for free. Split by page ranges or extract individual pages into separate PDFs. Fast, secure, no signup required. Preserve quality and formatting.',
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF — Reduce PDF File Size Online',
    description: 'Compress PDF files online for free. Reduce file size while maintaining quality. Fast, secure, no signup required. Make PDFs smaller for email, web, and sharing.',
  },
  {
    slug: 'rotate-pdf',
    name: 'Rotate PDF — Rotate PDF Pages Online',
    description: 'Rotate PDF pages online for free. Rotate 90, 180, or 270 degrees. Fix upside-down or sideways scanned PDFs instantly. Fast, secure, no signup required.',
  },
  {
    slug: 'organize-pages',
    name: 'Organize PDF Pages — Reorder & Rearrange PDF',
    description: 'Organize PDF pages online for free. Reorder, rotate, and rearrange pages visually with drag-and-drop. Fast, secure, no signup required. Restructure PDFs instantly.',
  },
  {
    slug: 'delete-pages',
    name: 'Delete PDF Pages — Remove Pages from PDF',
    description: 'Delete PDF pages online for free. Remove unwanted, blank, or extra pages from your PDF instantly. Fast, secure, no signup required. Preserves quality and formatting.',
  },
  {
    slug: 'extract-pages',
    name: 'Extract PDF Pages — Pull Pages Into New PDF',
    description: 'Extract PDF pages online for free. Pull specific pages from any PDF into a new document. Fast, secure, no signup required. Preserves quality and formatting.',
  },
];

const faqsMap = {
  'pdf-to-word': [
    { question: 'How do I convert a PDF to a Word document?', answer: 'Simply upload your PDF to DocVerse, click "Convert," and download the editable Word (DOCX) file in seconds. No software installation or account required.' },
    { question: 'Is DocVerse PDF to Word converter free?', answer: 'Yes, DocVerse is 100% free with no hidden charges, no watermarks, and no signup required. Convert unlimited PDFs to Word.' },
    { question: 'Will the formatting be preserved after conversion?', answer: 'Yes. Our converter maintains fonts, images, tables, bullet points, hyperlinks, and multi-column layouts as accurately as possible.' },
    { question: 'Can I convert scanned PDF files to Word?', answer: 'Yes. DocVerse extracts text streams and document structures from PDFs to convert them into editable Word documents.' },
    { question: 'Is my PDF file safe when I upload it?', answer: 'Absolutely. All processing occurs in temporary memory or locally in your browser. Temporary server files are deleted immediately after conversion. We never access, share, or store your content.' },
    { question: "What's the maximum file size I can convert?", answer: 'DocVerse supports PDF files up to 100 MB per upload, which covers most documents including large reports and eBooks.' },
    { question: 'Can I convert password-protected PDFs?', answer: "You'll need to unlock the PDF first using our free PDF tools, then convert it to Word." },
    { question: 'Does it work on Mac, Windows, and mobile?', answer: 'Yes. DocVerse is browser-based and works on all devices — Windows, macOS, Linux, iOS, and Android — with no installation needed.' },
    { question: 'Can I convert multiple PDFs to Word at once?', answer: 'Yes, batch conversion is supported. Upload multiple PDFs and convert them all in one go.' },
    { question: "What's the difference between DOC and DOCX?", answer: 'DOCX is the modern XML-based Word format (2007+), offering smaller file sizes and better compatibility. DocVerse converts to DOCX for maximum compatibility.' }
  ],
  'word-to-pdf': [
    { question: 'How do I convert a Word document to PDF?', answer: 'Upload your DOCX or DOC file to DocVerse, click "Convert," and download the PDF in seconds. No software or signup required.' },
    { question: 'Is the Word to PDF converter free?', answer: 'Yes, DocVerse is completely free with no watermarks, no file limits, and no account needed.' },
    { question: 'Will my formatting stay the same?', answer: 'Yes. All fonts, images, tables, hyperlinks, headers, and footers are preserved exactly as in your original Word document.' },
    { question: 'Does it support .doc (old Word format)?', answer: 'Yes, both modern DOCX and legacy DOC files are fully supported.' },
    { question: 'Can I convert Word files with images and tables?', answer: 'Absolutely. Images, tables, charts, and embedded objects are all preserved perfectly in the PDF output.' },
    { question: 'Are my files safe when I upload them?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately after conversion. We never access or store your data.' },
    { question: "What's the maximum Word file size?", answer: 'DocVerse supports Word files up to 100 MB, suitable for large reports, eBooks, and manuals.' },
    { question: 'Can I convert password-protected Word files?', answer: 'Password-protected files must be unlocked first before conversion.' },
    { question: 'Does it work on Mac and mobile devices?', answer: 'Yes. DocVerse runs in any browser on Windows, Mac, Linux, iOS, and Android.' },
    { question: 'Do I need Microsoft Word installed?', answer: 'No. DocVerse works entirely in your browser — no Microsoft Word or any software required.' }
  ],
  'pdf-to-jpg': [
    { question: 'How do I convert PDF to JPG?', answer: 'Upload your PDF to DocVerse, click "Convert to JPG," and download your images. Each PDF page becomes a separate high-quality JPG file.' },
    { question: 'Is the PDF to JPG converter free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no file limits, and no signup required.' },
    { question: 'What quality will the JPG images be?', answer: 'Images are rendered at high resolution (300 DPI+) for sharp, crisp output suitable for print or web use.' },
    { question: 'Can I convert a multi-page PDF to JPG?', answer: 'Yes. Each page of your PDF is converted into a separate JPG image. You can download them individually or as a ZIP archive.' },
    { question: 'Will the images have watermarks?', answer: 'No. DocVerse produces clean JPG images with zero watermarks or branding.' },
    { question: 'Are my PDF files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: "What's the maximum PDF file size?", answer: 'DocVerse supports PDFs up to 100 MB, which covers most documents including image-heavy files.' },
    { question: 'Can I extract just one page as JPG?', answer: 'Yes. After conversion, you can download any individual page as a JPG image.' },
    { question: 'Does it work on mobile devices?', answer: 'Yes. DocVerse works in any browser on Windows, Mac, Linux, iOS, and Android.' },
    { question: "What's the difference between JPG and JPEG?", answer: "There's no difference — JPG and JPEG are the same format. DocVerse outputs .jpg files that are 100% compatible with JPEG." }
  ],
  'jpg-to-pdf': [
    { question: 'How do I convert JPG to PDF?', answer: 'Upload one or more JPG images to DocVerse, arrange them in your preferred order, click "Convert," and download your PDF instantly.' },
    { question: 'Can I combine multiple JPG images into one PDF?', answer: 'Yes. DocVerse lets you upload multiple JPG files and merges them into a single PDF document in your chosen order.' },
    { question: 'Is the JPG to PDF converter free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no file limits, and no signup required.' },
    { question: 'Will image quality be preserved?', answer: 'Yes. Images are converted at their original quality without compression or blurring.' },
    { question: 'Can I reorder images before converting?', answer: 'Yes. Drag and drop images to arrange them in your desired order before conversion.' },
    { question: 'What image formats are supported?', answer: 'DocVerse supports JPG and JPEG files. For PNG images, use our dedicated PNG to PDF converter.' },
    { question: 'Are my images safe when I upload them?', answer: 'Absolutely. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: "What's the maximum file size?", answer: 'DocVerse supports uploads up to 100 MB total, allowing dozens of high-resolution images per PDF.' },
    { question: 'Can I convert photos from my phone?', answer: 'Yes. DocVerse works on iOS and Android browsers — upload photos directly from your phone gallery.' },
    { question: 'Will the PDF have watermarks?', answer: 'No. DocVerse produces clean, professional PDFs with zero watermarks or branding.' }
  ],
  'pdf-to-png': [
    { question: 'How do I convert PDF to PNG?', answer: 'Upload your PDF to DocVerse, click "Convert to PNG," and download high-quality PNG images. Each PDF page becomes a separate PNG file.' },
    { question: "What's the difference between PDF to PNG and PDF to JPG?", answer: 'PNG is lossless with transparent background support, ideal for graphics and design. JPG uses compression, better for photos with smaller file sizes.' },
    { question: 'Are PNG images higher quality than JPG?', answer: 'Yes. PNG uses lossless compression, preserving every pixel exactly. JPG uses lossy compression, which can reduce quality.' },
    { question: 'Can I get transparent backgrounds?', answer: 'Yes. DocVerse supports transparent PNG output for design and layering purposes.' },
    { question: 'Is the PDF to PNG converter free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no limits, and no signup required.' },
    { question: 'What resolution will the PNGs be?', answer: 'Images are rendered at high resolution (300 DPI+) for sharp, professional-quality output.' },
    { question: 'Can I convert multi-page PDFs to PNG?', answer: 'Yes. Each PDF page is converted to a separate PNG image. Download them individually or as a ZIP file.' },
    { question: 'Are my PDF files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: "What's the maximum PDF file size?", answer: 'DocVerse supports PDFs up to 100 MB per upload.' },
    { question: 'Does it work on mobile devices?', answer: 'Yes. DocVerse works in any browser on Windows, Mac, Linux, iOS, and Android.' }
  ],
  'png-to-pdf': [
    { question: 'How do I convert PNG to PDF?', answer: 'Upload one or more PNG images to DocVerse, arrange them in order, click "Convert," and download your PDF in seconds.' },
    { question: 'Can I combine multiple PNG images into one PDF?', answer: 'Yes. DocVerse merges multiple PNG files into a single PDF document in your chosen order.' },
    { question: 'Is the PNG to PDF converter free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no file limits, and no signup required.' },
    { question: 'Will PNG quality be preserved in the PDF?', answer: 'Yes. Images are converted at their original quality without compression or loss.' },
    { question: 'Can I reorder images before converting?', answer: 'Yes. Drag and drop images to set the exact page order you want.' },
    { question: 'What image formats can I upload?', answer: 'This tool accepts PNG files. For JPG images, use our JPG to PDF converter.' },
    { question: 'Are my PNG files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: "What's the maximum upload size?", answer: 'DocVerse supports uploads up to 100 MB total, enough for many high-resolution PNGs per PDF.' },
    { question: 'Can I convert screenshots to PDF?', answer: 'Absolutely. PNG screenshots are perfect for conversion — DocVerse handles them beautifully.' },
    { question: 'Does the PDF have watermarks?', answer: 'No. DocVerse produces clean, professional PDFs with zero watermarks or branding.' }
  ],
  'excel-to-pdf': [
    { question: 'How do I convert Excel to PDF?', answer: 'Upload your XLSX or XLS file to DocVerse, click "Convert," and download the PDF in seconds. No software or signup needed.' },
    { question: 'Is the Excel to PDF converter free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no file limits, and no account required.' },
    { question: 'Will my tables and formatting be preserved?', answer: 'Yes. All tables, colors, borders, fonts, and cell formatting are preserved exactly as in your original spreadsheet.' },
    { question: 'Does it convert charts and graphs?', answer: 'Absolutely. Charts, graphs, images, and embedded objects are all converted accurately in the PDF.' },
    { question: 'Can I convert multi-sheet workbooks?', answer: 'Yes. DocVerse converts all sheets in your workbook, either combined into one PDF or as separate sections.' },
    { question: 'Does it work with .xls (old Excel format)?', answer: 'Yes, both modern XLSX and legacy XLS files are fully supported.' },
    { question: 'Are my Excel files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: "What's the maximum file size?", answer: 'DocVerse supports Excel files up to 100 MB, sufficient for large datasets and complex workbooks.' },
    { question: 'Can I convert password-protected Excel files?', answer: 'Password-protected spreadsheets must be unlocked first before conversion.' },
    { question: 'Do I need Microsoft Excel installed?', answer: 'No. DocVerse works entirely in your browser without any software installation.' }
  ],
  'powerpoint-to-pdf': [
    { question: 'How do I convert PowerPoint to PDF?', answer: 'Upload your PPTX or PPT file to DocVerse, click "Convert," and download the PDF in seconds. No software or signup required.' },
    { question: 'Is the PowerPoint to PDF converter free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no file limits, and no account needed.' },
    { question: 'Will slide layouts and fonts be preserved?', answer: 'Yes. All slide layouts, fonts, colors, images, and design elements are preserved exactly as in your original presentation.' },
    { question: 'Does it support animations and transitions?', answer: "Animations are captured as static frames in the PDF. Slide transitions don't apply to PDFs, but visual content is preserved." },
    { question: 'Can I convert .ppt (old PowerPoint format)?', answer: 'Yes, both modern PPTX and legacy PPT files are fully supported.' },
    { question: 'Does it work with 16:9 widescreen presentations?', answer: 'Absolutely. DocVerse supports both 16:9 widescreen and 4:3 standard aspect ratios.' },
    { question: 'Are my PowerPoint files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: "What's the maximum file size?", answer: 'DocVerse supports PowerPoint files up to 100 MB, sufficient for large multimedia presentations.' },
    { question: 'Will hyperlinks work in the PDF?', answer: 'Yes. Hyperlinks in your PowerPoint slides are preserved and functional in the exported PDF.' },
    { question: 'Do I need Microsoft PowerPoint installed?', answer: 'No. DocVerse works entirely in your browser — no software installation required.' }
  ],
  'merge-pdf': [
    { question: 'How do I merge PDF files online?', answer: 'Upload multiple PDFs to DocVerse, drag to arrange them in your preferred order, click "Merge PDF," and download the combined file.' },
    { question: 'Is the Merge PDF tool free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no file limits, and no signup required.' },
    { question: 'How many PDFs can I merge at once?', answer: "There's no strict limit on the number of PDFs — you can merge as many as you need in a single operation, up to a total size of 100 MB." },
    { question: 'Will the merged PDF have watermarks?', answer: 'No. DocVerse produces clean merged PDFs with zero watermarks or branding.' },
    { question: 'Can I choose the order of the PDFs?', answer: 'Yes. Drag and drop to arrange your PDFs in any order before merging.' },
    { question: 'Will the quality of my PDFs be preserved?', answer: 'Yes. Original PDF quality, fonts, images, and hyperlinks are fully preserved in the merged output.' },
    { question: 'Are my files safe when I upload them?', answer: 'Absolutely. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: 'Can I merge password-protected PDFs?', answer: 'Password-protected PDFs must be unlocked first before merging.' },
    { question: 'Does it work on mobile devices?', answer: 'Yes. DocVerse works in any browser on Windows, Mac, Linux, iOS, and Android.' },
    { question: 'Can I preview PDFs before merging?', answer: 'Yes. DocVerse shows thumbnails of each PDF so you can verify content and order before merging.' }
  ],
  'split-pdf': [
    { question: 'How do I split a PDF file online?', answer: 'Upload your PDF to DocVerse, specify the page ranges you want to split, click Split PDF, and download your separate files.' },
    { question: 'Can I split a PDF into individual pages?', answer: 'Yes. You can split a PDF so that each page becomes its own separate PDF file.' },
    { question: 'Is the Split PDF tool free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no file limits, and no signup required.' },
    { question: 'Can I split by specific page ranges?', answer: 'Yes. Specify ranges like 1-5, 10-15, or 20-30 — you control exactly where to split.' },
    { question: 'Will splitting affect PDF quality?', answer: 'No. Each split file preserves the original quality, fonts, images, and formatting from the original.' },
    { question: 'How many splits can I make at once?', answer: 'There is no strict limit. Split your PDF into as many parts as needed within the 100 MB upload limit.' },
    { question: 'Are my files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: 'Can I split password-protected PDFs?', answer: 'Password-protected files must be unlocked first using our Unlock PDF tool.' },
    { question: 'Does it work on mobile?', answer: 'Yes. DocVerse works in any browser on Windows, Mac, Linux, iOS, and Android.' },
    { question: 'Do split files have watermarks?', answer: 'No. DocVerse produces clean PDFs with zero watermarks.' }
  ],
  'compress-pdf': [
    { question: 'How do I compress a PDF file?', answer: 'Upload your PDF, click Compress PDF, and download a smaller file instantly.' },
    { question: 'Will compression reduce quality?', answer: 'Our smart compression minimizes visible quality loss while significantly reducing file size.' },
    { question: 'How much smaller will my PDF be?', answer: 'Typically 50-80% smaller, depending on the original file content and image density.' },
    { question: 'Can I compress password-protected PDFs?', answer: 'You must unlock the PDF first using our Unlock PDF tool.' },
    { question: 'Will hyperlinks still work?', answer: 'Yes. All hyperlinks, forms, and interactive elements remain fully functional.' },
    { question: 'Is compression free?', answer: 'Yes, DocVerse is 100% free with no limits, no watermarks, and no signup.' },
    { question: 'Can I compress multiple PDFs at once?', answer: 'Yes, batch compression is supported.' },
    { question: "What's the file size limit?", answer: 'DocVerse supports PDFs up to 100 MB for compression.' },
    { question: 'Does it work on mobile?', answer: 'Yes. DocVerse works on any browser, including mobile.' },
    { question: 'Is my file safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' }
  ],
  'rotate-pdf': [
    { question: 'How do I rotate a PDF page?', answer: 'Upload your PDF, select the rotation angle, choose which pages to rotate, and download the corrected file.' },
    { question: 'Can I rotate just one page?', answer: 'Yes. Apply rotation to all pages or only selected pages within the document.' },
    { question: 'What rotation angles are available?', answer: 'Rotate 90° clockwise, 90° counter-clockwise, or 180°.' },
    { question: 'Will rotation affect quality?', answer: 'No. Rotation is lossless — quality and content remain exactly the same.' },
    { question: 'Can I rotate scanned PDFs?', answer: 'Yes. Rotation works perfectly on scanned and image-based PDFs.' },
    { question: 'Is rotation free?', answer: 'Yes, DocVerse is 100% free with no limits or watermarks.' },
    { question: 'Does it work on mobile?', answer: 'Yes. DocVerse works in any browser on mobile devices.' },
    { question: "What's the file size limit?", answer: 'DocVerse supports PDFs up to 100 MB.' },
    { question: 'Can I rotate landscape pages to portrait?', answer: 'Yes. Any rotation angle can be applied to correct orientation.' },
    { question: 'Are my files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' }
  ],
  'organize-pages': [
    { question: 'How do I organize PDF pages online?', answer: 'Upload your PDF to DocVerse, drag page thumbnails to reorder them, rotate any misaligned pages, and download the restructured file.' },
    { question: 'Can I rearrange pages visually?', answer: 'Yes. DocVerse shows every page as a thumbnail, letting you drag and drop pages into any order.' },
    { question: 'Is the Organize Pages tool free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no limits, and no signup required.' },
    { question: 'Can I rotate pages while organizing?', answer: 'Yes. You can rotate individual pages 90°, 180°, or 270° during organization.' },
    { question: 'Will page order changes affect quality?', answer: 'No. Reordering is lossless — quality, fonts, images, and formatting remain intact.' },
    { question: 'Can I preview changes before saving?', answer: 'Yes. See real-time thumbnails of your new page order before downloading.' },
    { question: 'Can I delete pages during organization?', answer: 'This tool focuses on reordering. Use our Delete Pages tool to remove specific pages.' },
    { question: 'Are my files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: "What's the maximum PDF size?", answer: 'DocVerse supports PDFs up to 100 MB.' },
    { question: 'Does it work on mobile devices?', answer: 'Yes. DocVerse works in any browser on Windows, Mac, Linux, iOS, and Android.' }
  ],
  'delete-pages': [
    { question: 'How do I delete pages from a PDF?', answer: 'Upload your PDF to DocVerse, select the pages to remove using visual thumbnails, click Delete Pages, and download the cleaned file.' },
    { question: 'Can I delete multiple pages at once?', answer: 'Yes. Select any number of pages simultaneously and remove them all in one action.' },
    { question: 'Is the Delete Pages tool free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no limits, and no signup required.' },
    { question: 'Will deleting pages affect the remaining ones?', answer: 'No. Remaining pages keep their original quality, formatting, and hyperlinks intact.' },
    { question: 'Can I delete blank pages?', answer: 'Yes. Select any blank pages from the thumbnail view and remove them instantly.' },
    { question: 'Can I preview before deleting?', answer: 'Yes. Visual thumbnails let you see exactly which pages you are removing before saving.' },
    { question: 'Can I undo a deletion?', answer: "Deletions apply to the downloaded file only — your original upload isn't modified. Simply re-upload if needed." },
    { question: 'Are my files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: "What's the maximum PDF size?", answer: 'DocVerse supports PDFs up to 100 MB.' },
    { question: 'Does it work on mobile?', answer: 'Yes. DocVerse works in any browser on iOS, Android, Windows, Mac, and Linux.' }
  ],
  'extract-pages': [
    { question: 'How do I extract pages from a PDF?', answer: 'Upload your PDF to DocVerse, select the pages you want to extract using visual thumbnails, click Extract Pages, and download a new PDF containing only those pages.' },
    { question: "What's the difference between Extract and Split?", answer: 'Extract creates one new PDF with only your selected pages. Split divides a PDF into multiple separate files.' },
    { question: 'Can I extract non-consecutive pages?', answer: 'Yes. Select any combination of pages — consecutive (5-10) or non-consecutive (1, 5, 8, 12).' },
    { question: 'Is the Extract Pages tool free?', answer: 'Yes, DocVerse is 100% free with no watermarks, no limits, and no signup required.' },
    { question: 'Will extracted pages keep original quality?', answer: 'Yes. Extracted pages preserve original quality, fonts, images, hyperlinks, and formatting exactly.' },
    { question: 'Can I extract just one page?', answer: "Yes. Extract a single page or multiple pages — you're in complete control." },
    { question: 'Can I preview pages before extracting?', answer: 'Yes. Visual thumbnails let you see and confirm your selection before creating the new PDF.' },
    { question: 'Are my files safe?', answer: 'Yes. Files are processed in temporary memory and temporary server files are deleted immediately.' },
    { question: "What's the maximum PDF size?", answer: 'DocVerse supports PDFs up to 100 MB.' },
    { question: 'Does it work on mobile?', answer: 'Yes. DocVerse works in any browser on iOS, Android, Windows, Mac, and Linux.' }
  ]
};

function generateToolHtml(templateHtml, tool) {
  const canonicalUrl = `https://docverse.cloud/tools/${tool.slug}`;
  const fullTitle = `${tool.name} | DocVerse Free PDF Tools`;
  const fullDesc = tool.description;
  const toolFaqs = faqsMap[tool.slug] || [
    { question: `Is using ${tool.name} 100% free?`, answer: 'Yes, DocVerse provides 100% free online document conversion and editing with zero sign-up required.' },
    { question: 'Are my uploaded files safe and private?', answer: 'Your privacy is guaranteed. Temporary server files are deleted immediately.' },
    { question: 'Do I need to install any software?', answer: 'No installation needed! DocVerse operates entirely inside your web browser.' }
  ];

  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${fullTitle}</title>`);

  // Replace Meta Description
  html = html.replace(/<meta name="description" content=".*?" \/>/gi, `<meta name="description" content="${fullDesc}" />`);

  // Replace Canonical Link
  html = html.replace(/<link rel="canonical" href=".*?" \/>/gi, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace Open Graph Tags
  html = html.replace(/<meta property="og:url" content=".*?" \/>/gi, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/gi, `<meta property="og:title" content="${fullTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/gi, `<meta property="og:description" content="${fullDesc}" />`);

  // Replace Twitter Card Tags
  html = html.replace(/<meta name="twitter:url" content=".*?" \/>/gi, `<meta name="twitter:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/gi, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/gi, `<meta name="twitter:description" content="${fullDesc}" />`);

  // Inject Complete JSON-LD Graph Schema
  const schemaJsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "DocVerse ${tool.name}",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any (Web-based)",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "${fullDesc}"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://docverse.cloud/" },
            { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://docverse.cloud/#tools" },
            { "@type": "ListItem", "position": 3, "name": "${tool.name}", "item": "${canonicalUrl}" }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": ${JSON.stringify(
            toolFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            }))
          )}
        }
      ]
    }
    </script>
  `;

  html = html.replace('</head>', `${schemaJsonLd}\n</head>`);

  return html;
}

function run() {
  const indexHtmlPath = path.join(rootDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) return;

  const templateHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // Generate for dist/ if built, and public/ for dev server
  const targets = [distDir, publicDir];

  for (const target of targets) {
    if (!fs.existsSync(target)) {
      try {
        fs.mkdirSync(target, { recursive: true });
      } catch {
        continue;
      }
    }

    for (const tool of tools) {
      const toolDir = path.join(target, 'tools', tool.slug);
      fs.mkdirSync(toolDir, { recursive: true });
      const toolHtml = generateToolHtml(templateHtml, tool);
      fs.writeFileSync(path.join(toolDir, 'index.html'), toolHtml, 'utf8');
    }
  }

  console.log('✅ [SEO Generator] Successfully generated unique static HTML routes with Title, Canonical, OG:URL, and 10 FAQs in FAQPage JSON-LD schemas for all 15 tools!');
}

run();
