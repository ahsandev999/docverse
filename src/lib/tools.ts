import { Tool, ToolCategory } from '../types';

export type { ToolCategory };

export const iconMap: Record<string, string> = {
  FileText: '📄',
  FileUp: '📝',
  Image: '🖼️',
  FilePlus: '📋',
  ImagePlus: '🖼️',
  FilePlus2: '📋',
  Table: '📊',
  Monitor: '📽️',
  GitMerge: '🔗',
  Scissors: '✂️',
  ArrowDownToLine: '📦',
  RotateCw: '🔄',
  LayoutGrid: '📐',
  Trash2: '🗑️',
  Copy: '📑',
};

export const tools: Tool[] = [
  {
    id: 'pdf-to-word',
    slug: 'pdf-to-word',
    name: 'PDF to Word Converter',
    shortName: 'PDF → Word',
    description: 'Convert PDF to Word (DOCX) online for free. Preserves formatting, images, and layouts. Fast, secure, no signup required.',
    longDescription: 'Transform your static PDF documents into fully editable Word files. Our advanced conversion engine preserves formatting, tables, images, and text layout with exceptional accuracy.',
    category: 'convert',
    iconName: 'FileText',
    gradient: 'from-blue-500 to-cyan-500',
    inputFormat: 'PDF',
    outputFormat: 'DOCX',
    popular: true,
    acceptTypes: '.pdf',
    multiple: false,
    steps: ['Upload your PDF file (drag & drop or browse)', 'Click the "Convert to Word" button', 'Download your editable DOCX file'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'PDF to Word Converter — Free Online PDF to DOCX',
    seoDescription: 'Convert PDF to Word (DOCX) online for free. Preserves formatting, images, and layouts. Fast, secure, no signup required. Edit your PDFs as Word documents instantly.',
    subtitle: 'Convert PDF files to fully editable Microsoft Word documents while preserving formatting, images, tables, and layouts with high accuracy.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Processing' },
      { icon: '⚡', text: 'Fast Conversion' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup Required' }
    ],
    seoContent: `PDF files are perfect for sharing, but editing them can be a challenge. Converting PDF to Word (DOCX) unlocks your document, letting you modify text, update tables, replace images, and reformat content with ease. Whether you're a student updating a research paper, a business professional revising a contract, or a developer working with reports, converting PDF to Word saves hours of manual retyping.

Microsoft Word remains the world's most-used document editor, and DOCX is the universal standard for editable documents. By converting PDF to Word with DocVerse, you gain full control over your content — edit fonts, adjust paragraphs, add comments, track changes, and collaborate seamlessly.

Our PDF to Word converter uses advanced parsing technology to preserve original formatting: fonts, colors, headings, bullet lists, tables, images, hyperlinks, and multi-column layouts remain intact. Vector text streams and layout boundaries are mapped with precision.

Unlike desktop software that requires installation, DocVerse works instantly in any browser — on Windows, macOS, Linux, iOS, or Android. No software downloads, no signups, no watermarks. Just upload your PDF, click convert, and download your Word file in seconds.`,
    keyFeatures: [
      'Preserves original formatting, fonts, and layout',
      'Supports tables, images, and multi-column pages',
      'Retains hyperlinks and structural formatting',
      'Batch multi-file processing supported',
      'Instant automatic file deletion for complete privacy',
      'Works on any browser or operating system',
      'Zero watermarks on output files',
      'No email or account signup required',
      '100% free with unlimited usage'
    ]
  },
  {
    id: 'word-to-pdf',
    slug: 'word-to-pdf',
    name: 'Word to PDF Converter',
    shortName: 'Word → PDF',
    description: 'Convert Word (DOCX, DOC) to PDF online for free. Preserves fonts, layouts, images, and hyperlinks. Fast, secure, no signup required.',
    longDescription: 'Easily convert your Word documents to universally compatible PDF files. Perfect formatting preservation ensures your documents look identical across all devices and platforms.',
    category: 'convert',
    iconName: 'FileUp',
    gradient: 'from-cyan-500 to-blue-500',
    inputFormat: 'DOCX',
    outputFormat: 'PDF',
    popular: true,
    acceptTypes: '.doc,.docx',
    multiple: false,
    steps: ['Upload your Word file (DOCX or DOC)', 'Click the "Convert to PDF" button', 'Download your professional PDF file'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'Word to PDF Converter — Free Online DOCX to PDF',
    seoDescription: 'Convert Word (DOCX, DOC) to PDF online for free. Preserves fonts, layouts, images, and hyperlinks. Fast, secure, no signup required. Universal PDF format instantly.',
    subtitle: 'Convert Microsoft Word documents (DOCX, DOC) to professional PDF files while preserving fonts, layouts, images, and hyperlinks with perfect accuracy.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Instant Conversion' },
      { icon: '🗑️', text: 'Zero Data Retention' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Account Needed' }
    ],
    seoContent: `Microsoft Word is the world's most-used document editor, but sharing DOCX files comes with challenges: formatting shifts across devices, fonts get replaced, and layouts break on different versions of Word. Converting Word to PDF solves all these problems by locking your document into a universal format that looks identical everywhere.

PDF is the global standard for professional documents — resumes, contracts, invoices, reports, eBooks, and legal papers. When you convert Word to PDF, your document displays exactly as intended on any device, in any browser, on any operating system. No more worrying about missing fonts, broken layouts, or accidental edits.

DocVerse's Word to PDF converter preserves everything: fonts, headings, bullet lists, tables, images, hyperlinks, page numbers, headers, footers, and embedded objects. Whether your document has one page or 500, complex tables or simple text, our converter delivers pixel-perfect PDFs every time.

Unlike Microsoft Word's built-in export, DocVerse works instantly in your browser — no software needed. Perfect for Chromebook users, Linux users, or anyone without Microsoft Office installed. Upload your Word file, click convert, and get a professional PDF in seconds.`,
    keyFeatures: [
      'Preserves fonts, layouts, and formatting perfectly',
      'Maintains tables, images, and embedded graphics',
      'Retains hyperlinks and bookmarks intact',
      'Supports both modern DOCX and legacy DOC files',
      'Handles headers, footers, and page numbering',
      'Batch conversion supported',
      'Instant file deletion for maximum privacy',
      'Works on all devices and web browsers',
      'Zero watermarks on converted PDF output',
      '100% free with unlimited conversions'
    ]
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG Converter',
    shortName: 'PDF → JPG',
    description: 'Convert PDF to JPG images online for free. Each PDF page becomes a high-quality JPG image. Fast, secure, no signup required.',
    longDescription: 'Extract every page from your PDF as high-resolution JPG images. Ideal for presentations, web publishing, or when you need individual page images from your document.',
    category: 'convert',
    iconName: 'Image',
    gradient: 'from-orange-500 to-amber-500',
    inputFormat: 'PDF',
    outputFormat: 'JPG',
    popular: true,
    acceptTypes: '.pdf',
    multiple: false,
    steps: ['Upload your PDF file', 'Click the "Convert to JPG" button', 'Download your JPG images (individually or as ZIP)'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'PDF to JPG Converter — Free Online PDF to Image',
    seoDescription: 'Convert PDF to JPG images online for free. Each PDF page becomes a high-quality JPG image. Fast, secure, no signup required. Extract images from any PDF instantly.',
    subtitle: 'Convert PDF pages into high-quality JPG images. Extract every page as a separate image, or pull specific images from your PDF with pixel-perfect quality.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Processing' },
      { icon: '⚡', text: 'High-DPI Output' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Registration' }
    ],
    seoContent: `Sometimes you need images, not documents. Converting PDF to JPG unlocks countless possibilities: sharing PDF pages on social media, embedding them in websites, using them in presentations, or simply viewing PDF content on devices that don't support PDF natively. JPG is the universal image format — supported by every browser, device, app, and platform on Earth.

Whether you're a designer extracting graphics from a PDF portfolio, a student saving textbook pages as images, a marketer creating social posts from PDF reports, or a developer building image galleries, DocVerse's PDF to JPG converter makes it effortless. Each PDF page is converted into a separate high-resolution JPG image, preserving colors, sharpness, and detail.

Our canvas rendering engine processes PDFs at high resolution (up to 300 DPI) to ensure crystal-clear images. Text remains sharp, graphics stay vibrant, and colors match the original. You can convert single-page or multi-page PDFs, and download all images individually or bundled into a ZIP file.

Unlike screen-capture tools that produce low-quality results, DocVerse converts PDFs at the source — delivering professional-grade JPG images suitable for print, web, and everything in between. It works in any browser without installation, so you can convert PDFs on your phone, tablet, or desktop with zero hassle.`,
    keyFeatures: [
      'High-resolution JPG output (up to 300 DPI)',
      'Converts every PDF page to a separate image file',
      'Preserves original document colors, fonts, and graphics',
      'Download individual images or a bundled ZIP archive',
      'Batch conversion processing supported',
      'Instant automatic file deletion for privacy',
      'Works on all mobile devices, desktops, and web browsers',
      'Zero watermarks or logos on exported images',
      'No signup or email registration required',
      '100% free with unlimited usage'
    ]
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF Converter',
    shortName: 'JPG → PDF',
    description: 'Convert JPG images to PDF online for free. Combine multiple JPGs into one PDF document. Fast, secure, no signup required. Perfect for scans, photos, and receipts.',
    longDescription: 'Combine multiple JPG images into a single, well-organized PDF document. Perfect for creating photo albums, reports, or compiling scanned documents.',
    category: 'convert',
    iconName: 'FilePlus',
    gradient: 'from-amber-500 to-orange-500',
    inputFormat: 'JPG',
    outputFormat: 'PDF',
    popular: true,
    acceptTypes: '.jpg,.jpeg',
    multiple: true,
    steps: ['Upload your JPG images (single or multiple)', 'Reorder pages if needed', 'Click "Convert to PDF" and download'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'JPG to PDF Converter — Free Online Image to PDF',
    seoDescription: 'Convert JPG images to PDF online for free. Combine multiple JPGs into one PDF document. Fast, secure, no signup required. Perfect for scans, photos, and receipts.',
    subtitle: 'Convert JPG images into professional PDF documents. Combine multiple images into a single PDF, reorder pages, and adjust layout — all in your browser.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Instant Conversion' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `Images are everywhere — receipts, screenshots, scanned documents, ID cards, handwritten notes, product photos. But sharing dozens of JPG files is messy, and most professional workflows require PDFs. Converting JPG to PDF organizes your images into a single, universal document that's easy to share, print, sign, and archive.

Whether you're a business professional compiling receipts for expense reports, a student submitting scanned assignments, a real estate agent creating property portfolios, or someone digitizing family photos, DocVerse's JPG to PDF converter makes it effortless. Upload multiple JPG images and combine them into a single PDF with just one click.

Our converter maintains the original image quality — no compression, no blurring, no quality loss. You control the order of pages, and each image becomes a properly formatted PDF page. Perfect for creating photo albums, scanned document collections, image portfolios, or any project that requires multiple images in one file.

PDF is the universal format accepted everywhere: email attachments, cloud storage, printers, e-signature platforms, and government portals. By converting JPG to PDF, you make your images accessible, professional, and easy to distribute. DocVerse works entirely in your browser — no installation, no signup, no watermarks. Just fast, free, secure conversion.`,
    keyFeatures: [
      'Combine multiple JPG images into one PDF',
      'Preserves original image quality',
      'Reorder images before conversion',
      'Auto page-size adjustment',
      'Supports JPG and JPEG formats',
      'Batch upload supported',
      'Files auto-deleted for privacy',
      'Works on all devices and browsers',
      'No watermarks on output',
      '100% free, unlimited use'
    ]
  },
  {
    id: 'pdf-to-png',
    slug: 'pdf-to-png',
    name: 'PDF to PNG Converter',
    shortName: 'PDF → PNG',
    description: 'Convert PDF to PNG online for free. Extract PDF pages as high-quality PNG images with transparent backgrounds. Fast, secure, no signup required.',
    longDescription: 'Convert your PDF pages into high-quality PNG images with transparency support. Great for graphic design, web content, and high-fidelity image extraction.',
    category: 'convert',
    iconName: 'ImagePlus',
    gradient: 'from-pink-500 to-rose-500',
    inputFormat: 'PDF',
    outputFormat: 'PNG',
    popular: false,
    acceptTypes: '.pdf',
    multiple: false,
    steps: ['Upload your PDF file', 'Click "Convert to PNG"', 'Download your PNG images'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'PDF to PNG Converter — Free Online PDF to PNG Image',
    seoDescription: 'Convert PDF to PNG online for free. Extract PDF pages as high-quality PNG images with transparent backgrounds. Fast, secure, no signup required.',
    subtitle: 'Convert PDF pages into high-quality PNG images with transparent backgrounds. Perfect for designers, developers, and anyone needing lossless PDF-to-image conversion.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Lossless Quality' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `PNG is the gold standard for high-quality images, especially when transparency, sharp edges, or lossless compression matter. Unlike JPG, which uses lossy compression, PNG preserves every pixel exactly — making it perfect for logos, diagrams, screenshots, technical drawings, and any content where visual fidelity is critical.

Converting PDF to PNG is essential for designers extracting graphics from client PDFs, developers building image assets from documentation, marketers pulling visuals for social media, educators creating slide materials, and anyone needing pristine image quality. DocVerse's PDF to PNG converter renders each PDF page as a high-resolution PNG image with crystal-clear text and vibrant graphics.

Our converter supports transparent backgrounds, letting you overlay PDF content onto other designs without ugly white boxes. Perfect for creating website graphics, presentation slides, marketing materials, or design mockups. Each page is converted at high DPI to ensure your PNGs look sharp even when scaled up.

DocVerse works entirely in your browser — no software installation, no signup, no watermarks. Whether you're on Windows, Mac, Linux, iOS, or Android, you can convert PDFs to PNG in seconds. Files are encrypted during upload and automatically deleted for your privacy.`,
    keyFeatures: [
      'Lossless PNG output (no quality loss)',
      'Transparent background support',
      'High-resolution rendering (300 DPI+)',
      'Converts every page separately',
      'Download individual PNGs or ZIP',
      'Preserves colors, fonts, and graphics',
      'Batch conversion supported',
      'Files auto-deleted for privacy',
      'No watermarks on output',
      '100% free, unlimited use'
    ]
  },
  {
    id: 'png-to-pdf',
    slug: 'png-to-pdf',
    name: 'PNG to PDF Converter',
    shortName: 'PNG → PDF',
    description: 'Convert PNG images to PDF online for free. Combine multiple PNGs into one PDF document. Preserves transparency and quality. Fast, secure, no signup required.',
    longDescription: 'Transform your PNG images into a clean, professional PDF document. Supports multiple images and maintains the original quality and transparency.',
    category: 'convert',
    iconName: 'FilePlus2',
    gradient: 'from-rose-500 to-pink-500',
    inputFormat: 'PNG',
    outputFormat: 'PDF',
    popular: false,
    acceptTypes: '.png',
    multiple: true,
    steps: ['Upload your PNG images', 'Reorder them as needed', 'Click "Convert to PDF" and download'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'PNG to PDF Converter — Free Online PNG to PDF',
    seoDescription: 'Convert PNG images to PDF online for free. Combine multiple PNGs into one PDF document. Preserves transparency and quality. Fast, secure, no signup required.',
    subtitle: 'Convert PNG images into professional PDF documents. Combine multiple PNG files, preserve transparency, and create shareable PDFs — all in your browser.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Instant Conversion' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `PNG images are perfect for high-quality graphics, screenshots, logos, and designs — but sharing multiple PNGs individually is inefficient. Converting PNG to PDF bundles your images into a single, professional document that's easy to email, print, upload, and archive. PDF is the universal format trusted by businesses, schools, governments, and platforms worldwide.

Whether you're a designer creating a portfolio, a developer documenting screenshots, a marketer compiling social media assets, or a student submitting design projects, DocVerse's PNG to PDF converter makes it seamless. Upload multiple PNG images and combine them into one polished PDF — with just a few clicks.

Our converter preserves the original quality of your PNG images, including sharpness, colors, and details. You can reorder pages before conversion, ensuring your PDF follows the exact sequence you want. Perfect for creating design portfolios, screenshot collections, tutorial guides, product catalogs, or any multi-image document.

Unlike desktop software, DocVerse requires zero installation. It runs entirely in your browser and works flawlessly on Windows, Mac, Linux, iOS, and Android. Your files are encrypted during upload and automatically deleted within 1 hour — giving you enterprise-grade privacy with consumer-friendly ease.`,
    keyFeatures: [
      'Combine multiple PNG images into one PDF',
      'Preserves original PNG quality',
      'Reorder pages before conversion',
      'Auto page-size optimization',
      'Batch upload supported',
      'Files auto-deleted for privacy',
      'Works on all devices and browsers',
      'No watermarks on output',
      'No signup or registration required',
      '100% free, unlimited use'
    ]
  },
  {
    id: 'excel-to-pdf',
    slug: 'excel-to-pdf',
    name: 'Excel to PDF Converter',
    shortName: 'Excel → PDF',
    description: 'Convert Excel (XLSX, XLS) to PDF online for free. Preserves tables, formulas, charts, and formatting. Fast, secure, no signup required. Professional PDFs instantly.',
    longDescription: 'Convert your Excel spreadsheets into perfectly formatted PDF documents. Preserves table structures, charts, and data formatting for professional sharing.',
    category: 'convert',
    iconName: 'Table',
    gradient: 'from-emerald-500 to-green-500',
    inputFormat: 'XLSX',
    outputFormat: 'PDF',
    popular: false,
    acceptTypes: '.xls,.xlsx',
    multiple: false,
    steps: ['Upload your Excel file (XLSX or XLS)', 'Click the "Convert to PDF" button', 'Download your professional PDF file'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'Excel to PDF Converter — Free Online XLSX to PDF',
    seoDescription: 'Convert Excel (XLSX, XLS) to PDF online for free. Preserves tables, formulas, charts, and formatting. Fast, secure, no signup required. Professional PDFs instantly.',
    subtitle: 'Convert Excel spreadsheets (XLSX, XLS) into clean, professional PDF documents. Preserves tables, charts, formulas, and formatting with pixel-perfect accuracy.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Instant Conversion' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `Excel spreadsheets are powerful for calculations and data analysis, but sharing them creates problems. Recipients might not have Excel, formulas could break, formatting shifts across versions, and cells get accidentally edited. Converting Excel to PDF locks your spreadsheet into a universal format that displays identically everywhere — protecting data integrity and preventing unwanted edits.

PDF is the professional standard for financial reports, invoices, budgets, sales data, and business analytics. When you convert Excel to PDF, your carefully crafted spreadsheet becomes a shareable, printable document that looks polished on any device. Perfect for accountants sending reports to clients, managers distributing budgets, sales teams sharing performance data, or students submitting Excel projects.

DocVerse's Excel to PDF converter preserves everything: cell formatting, colors, borders, merged cells, charts, graphs, images, and even multi-sheet workbooks. Fonts stay intact, tables render perfectly, and page breaks are optimized for clean printing. Whether your spreadsheet has one sheet or fifty, complex formulas or simple data, our converter produces PDFs that look exactly like your original.

DocVerse runs entirely in your browser — no Excel installation required. Perfect for Chromebook users, Linux users, or anyone without Microsoft Office. Upload your XLSX or XLS file, click convert, and download a professional PDF in seconds. Zero watermarks, zero signup, zero cost.`,
    keyFeatures: [
      'Preserves tables, formatting, and colors',
      'Maintains charts, graphs, and images',
      'Supports multi-sheet workbooks',
      'Handles merged cells and borders',
      'Works with both XLSX and legacy XLS',
      'Optimized page breaks for printing',
      'Batch conversion supported',
      'Files auto-deleted for privacy',
      'No watermarks on output',
      '100% free, unlimited use'
    ]
  },
  {
    id: 'powerpoint-to-pdf',
    slug: 'powerpoint-to-pdf',
    name: 'PowerPoint to PDF Converter',
    shortName: 'PPT → PDF',
    description: 'Convert PowerPoint (PPTX, PPT) to PDF online for free. Preserves slide layouts, images, fonts, and formatting. Fast, secure, no signup required.',
    longDescription: 'Transform your PowerPoint presentations into shareable PDF files. Preserves slide layouts, images, and formatting for universal compatibility.',
    category: 'convert',
    iconName: 'Monitor',
    gradient: 'from-red-500 to-orange-500',
    inputFormat: 'PPTX',
    outputFormat: 'PDF',
    popular: false,
    acceptTypes: '.ppt,.pptx',
    multiple: false,
    steps: ['Upload your PowerPoint file (PPTX or PPT)', 'Click the "Convert to PDF" button', 'Download your professional PDF file'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'PowerPoint to PDF Converter — Free Online PPTX to PDF',
    seoDescription: 'Convert PowerPoint (PPTX, PPT) to PDF online for free. Preserves slide layouts, images, fonts, and formatting. Fast, secure, no signup required.',
    subtitle: 'Transform your PowerPoint presentations (PPTX, PPT) into shareable PDF files. Preserves slide layouts, images, fonts, and formatting for universal compatibility.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Fast Conversion' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `PowerPoint presentations are visually stunning, but sharing PPTX files creates real problems. Recipients might not have PowerPoint, animations may not display correctly, fonts get replaced with defaults, and formatting shifts between versions. Converting PowerPoint to PDF preserves your carefully designed slides in a universal format that looks identical on any device — smartphone, tablet, laptop, or desktop.

PDF is the professional standard for sharing presentations. Whether you're a business executive emailing a pitch deck, a teacher distributing lecture slides, a student submitting a project, or a marketer sharing a proposal, converting to PDF ensures your content is viewed exactly as you designed it. Plus, PDFs are smaller, more secure, and can't be accidentally edited by recipients.

DocVerse's PowerPoint to PDF converter preserves everything: slide layouts, images, fonts, colors, backgrounds, embedded objects, hyperlinks, and page transitions (as static frames). Whether you're working with a 5-slide sales pitch or a 100-slide training presentation, our converter delivers crisp, professional PDFs that maintain the visual impact of your original slides.

Unlike PowerPoint's built-in export, DocVerse works instantly in your browser — no Microsoft Office installation required. Perfect for Chromebook users, Linux users, or anyone without PowerPoint. Upload your PPTX or PPT file, click convert, and download a professional PDF in seconds. Zero watermarks, zero signup, zero cost.`,
    keyFeatures: [
      'Preserves slide layouts and design',
      'Maintains fonts, colors, and images',
      'Supports both 16:9 widescreen and 4:3 formats',
      'Retains hyperlinks and embedded objects',
      'Works with PPTX and legacy PPT',
      'Handles multi-slide presentations',
      'Batch conversion supported',
      'Files auto-deleted for privacy',
      'No watermarks on output',
      '100% free, unlimited use'
    ]
  },
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    name: 'Merge PDF — Combine PDF Files Online',
    shortName: 'Merge PDF',
    description: 'Merge PDF files online for free. Combine multiple PDFs into one document in any order. Fast, secure, no signup required. Unlimited merges without watermarks.',
    longDescription: 'Seamlessly merge multiple PDF files into one unified document. Drag and drop to reorder, then combine them instantly. Perfect for compiling reports and presentations.',
    category: 'organize',
    iconName: 'GitMerge',
    gradient: 'from-violet-500 to-purple-500',
    inputFormat: 'PDF',
    outputFormat: 'PDF',
    popular: true,
    acceptTypes: '.pdf',
    multiple: true,
    steps: ['Upload all the PDF files you want to combine', 'Drag to reorder them in your preferred sequence', 'Click "Merge PDF" and download your combined file'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'Merge PDF — Combine Multiple PDF Files Online Free',
    seoDescription: 'Merge PDF files online for free. Combine multiple PDFs into one document in any order. Fast, secure, no signup required. Unlimited merges without watermarks.',
    subtitle: 'Combine multiple PDF files into a single, organized document. Drag and drop to reorder, merge in any sequence, and download instantly — no signup required.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Instant Merge' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `Managing multiple PDF files is frustrating — separate contracts, scattered invoices, individual chapter files, or a dozen scanned pages. Merging PDFs solves this by combining them into a single, organized document that's easy to share, print, archive, and reference. One file. One download. Zero confusion.

Whether you're a business professional combining contracts and appendices, a student merging research papers, a lawyer consolidating case documents, a designer bundling portfolio pieces, or an accountant compiling financial statements, DocVerse's Merge PDF tool makes it effortless. Upload multiple PDFs, arrange them in your desired order with drag-and-drop, and download a single merged PDF in seconds.

Our merger preserves everything from the original PDFs: page quality, fonts, images, hyperlinks, bookmarks, and metadata. No compression, no quality loss, no watermarks. The merged output looks and behaves exactly like a single natively-created PDF.

DocVerse works entirely in your browser — no software installation, no account creation, no waiting in queues. Merge unlimited PDFs on Windows, Mac, Linux, iOS, or Android. Files are encrypted during upload and automatically deleted within 1 hour, ensuring your sensitive documents stay private. It's the fastest, cleanest way to merge PDFs online.`,
    keyFeatures: [
      'Combine unlimited PDF files into one',
      'Drag-and-drop reordering',
      'Preserves original PDF quality',
      'Maintains fonts, images, and hyperlinks',
      'Preview pages before merging',
      'No page count limits',
      'Files auto-deleted for privacy',
      'Works on all devices and browsers',
      'No watermarks on merged output',
      '100% free, unlimited use'
    ]
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    name: 'Split PDF — Split PDF by Page Range',
    shortName: 'Split PDF',
    description: 'Split PDF files online for free. Split by page ranges or extract individual pages into separate PDFs. Fast, secure, no signup required. Preserve quality and formatting.',
    longDescription: 'Split PDF files into separate documents by page ranges. Extract specific pages, divide large PDFs into smaller files, or create individual page documents instantly.',
    category: 'organize',
    iconName: 'Scissors',
    gradient: 'from-purple-500 to-violet-500',
    inputFormat: 'PDF',
    outputFormat: 'PDF',
    popular: true,
    acceptTypes: '.pdf',
    multiple: false,
    steps: ['Upload your PDF file', 'Select page ranges to split (e.g., 1-5, 6-10)', 'Click "Split PDF" and download separate files'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'Split PDF — Split PDF by Page Range Online Free',
    seoDescription: 'Split PDF files online for free. Split by page ranges or extract individual pages into separate PDFs. Fast, secure, no signup required. Preserve quality and formatting.',
    subtitle: 'Split PDF files into separate documents by page ranges. Extract specific pages, divide large PDFs into smaller files, or create individual page documents instantly.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Instant Split' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `Large PDF documents are difficult to manage, share, and navigate. Whether you have a 200-page contract where you only need the signature pages, a textbook chapter you want to share separately, or a report that needs to be divided by section, splitting PDFs gives you complete control over your content.

DocVerse's Split PDF tool lets you split by page ranges (pages 1-10, 11-20, etc.) or extract specific pages into separate PDF files. Perfect for lawyers isolating contract clauses, students sharing specific textbook chapters, accountants separating quarterly reports, and anyone who needs precise document division without compromising quality.

Unlike manual printing and rescanning, our splitter works directly on the digital file — preserving fonts, images, hyperlinks, and formatting exactly. Each split PDF is a fully functional, independent document that can be shared, edited further, or merged back together later.

DocVerse runs entirely in your browser — no software installation, no account creation. Upload your PDF, define your split ranges, and download separate files instantly. Files are encrypted during upload and automatically deleted within 1 hour.`,
    keyFeatures: [
      'Split by custom page ranges',
      'Extract individual pages as separate PDFs',
      'Divide large PDFs into smaller files',
      'Preserve original quality and formatting',
      'Batch splitting supported',
      'Preview pages before splitting',
      'Maintain hyperlinks and bookmarks',
      'No watermarks on output',
      '100% free, unlimited use',
      'Auto file deletion for privacy'
    ]
  },
  {
    id: 'compress-pdf',
    slug: 'compress-pdf',
    name: 'Compress PDF — Reduce PDF File Size Online',
    shortName: 'Compress',
    description: 'Compress PDF files online for free. Reduce file size while maintaining quality. Fast, secure, no signup required. Make PDFs smaller for email, web, and sharing.',
    longDescription: 'Reduce PDF file size online without losing quality. Make your PDFs smaller for faster email sharing, web uploads, and storage — with zero quality loss.',
    category: 'optimize',
    iconName: 'ArrowDownToLine',
    gradient: 'from-emerald-500 to-teal-500',
    inputFormat: 'PDF',
    outputFormat: 'PDF',
    popular: true,
    acceptTypes: '.pdf',
    multiple: false,
    steps: ['Upload your PDF file', 'Click "Compress PDF"', 'Download the smaller file instantly'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'Compress PDF — Reduce PDF File Size Online Free',
    seoDescription: 'Compress PDF files online for free. Reduce file size while maintaining quality. Fast, secure, no signup required. Make PDFs smaller for email, web, and sharing.',
    subtitle: 'Reduce PDF file size online without losing quality. Make your PDFs smaller for faster email sharing, web uploads, and storage — with zero quality loss.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Smart Compression' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `Large PDF files are a common frustration — they take forever to email, fail to upload to web forms, consume excessive storage, and slow down websites. Compressing PDFs solves this by reducing file size while preserving text readability, image quality, and document functionality.

DocVerse's Compress PDF tool uses intelligent compression algorithms that shrink file sizes significantly — often by 50-80% — with minimal visible quality loss. Perfect for emailing contracts, uploading resumes to job portals, submitting forms with file size limits, optimizing PDFs for websites, or reducing storage costs.

Our compression is smart, not destructive. Text remains sharp and readable. Images are optimized, not blurred. Hyperlinks, forms, and bookmarks stay fully functional. Whether you're compressing a 2-page resume or a 200-page report, DocVerse delivers the smallest possible file that still looks professional.

DocVerse runs in your browser — no installation, no signup, no queues. Upload, compress, download. Your files are encrypted during upload and deleted automatically within 1 hour.`,
    keyFeatures: [
      'Reduce file size by 50-80%',
      'Maintain text readability',
      'Preserve images and graphics',
      'Keep hyperlinks and forms functional',
      'Fast compression in seconds',
      'No visible quality loss',
      'Batch compression supported',
      'No watermarks',
      '100% free, unlimited use',
      'Auto file deletion'
    ]
  },
  {
    id: 'rotate-pdf',
    slug: 'rotate-pdf',
    name: 'Rotate PDF — Rotate PDF Pages Online',
    shortName: 'Rotate',
    description: 'Rotate PDF pages online for free. Rotate 90, 180, or 270 degrees. Fix upside-down or sideways scanned PDFs instantly. Fast, secure, no signup required.',
    longDescription: 'Rotate PDF pages to the correct orientation. Fix sideways or upside-down pages at 90°, 180°, or 270° — perfect for scanned documents and misaligned files.',
    category: 'organize',
    iconName: 'RotateCw',
    gradient: 'from-indigo-500 to-blue-500',
    inputFormat: 'PDF',
    outputFormat: 'PDF',
    popular: false,
    acceptTypes: '.pdf',
    multiple: false,
    steps: ['Upload your PDF file', 'Select rotation angle (90°, 180°, 270°)', 'Choose all pages or specific pages', 'Download corrected PDF'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'Rotate PDF — Rotate PDF Pages Online Free',
    seoDescription: 'Rotate PDF pages online for free. Rotate 90, 180, or 270 degrees. Fix upside-down or sideways scanned PDFs instantly. Fast, secure, no signup required.',
    subtitle: 'Rotate PDF pages to the correct orientation. Fix sideways or upside-down pages at 90°, 180°, or 270° — perfect for scanned documents and misaligned files.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Instant Rotation' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `Scanned documents, mobile captures, and misaligned files often result in PDF pages that are sideways or upside-down — making them frustrating to read and impossible to share professionally. Rotating PDF pages fixes this in seconds, restoring your document to the correct orientation without affecting quality, formatting, or content.

Whether you're fixing a scanned contract that's lying on its side, correcting pages from a mobile document scanner, aligning landscape pages that should be portrait, or rotating a single misaligned page in a multi-page report, DocVerse makes it effortless. Choose 90° clockwise, 90° counter-clockwise, or 180° rotation — apply to all pages or just selected ones.

Our rotation is non-destructive — text stays sharp, images remain intact, and hyperlinks continue to work. Unlike opening in desktop software and re-exporting, DocVerse rotates instantly in your browser with zero installation. Perfect for quick fixes on any device.

DocVerse works on Windows, Mac, Linux, iOS, and Android. Files are encrypted and deleted within 1 hour.`,
    keyFeatures: [
      'Rotate 90°, 180°, or 270° (any direction)',
      'Apply to all pages or selected pages',
      'Fix upside-down scanned documents instantly',
      'Preserve quality and formatting',
      'Preview before saving',
      'Batch rotation supported',
      'Works on mobile and desktop',
      'No watermarks',
      '100% free, unlimited use',
      'Auto file deletion'
    ]
  },
  {
    id: 'organize-pages',
    slug: 'organize-pages',
    name: 'Organize PDF Pages — Reorder & Rearrange PDF',
    shortName: 'Organize',
    description: 'Organize PDF pages online for free. Reorder, rotate, and rearrange pages visually with drag-and-drop. Fast, secure, no signup required. Restructure PDFs instantly.',
    longDescription: 'Reorder, rotate, and rearrange PDF pages visually with drag-and-drop. Restructure your entire document in seconds — no software installation required.',
    category: 'organize',
    iconName: 'LayoutGrid',
    gradient: 'from-fuchsia-500 to-pink-500',
    inputFormat: 'PDF',
    outputFormat: 'PDF',
    popular: false,
    acceptTypes: '.pdf',
    multiple: false,
    steps: ['Upload your PDF file', 'Drag page thumbnails to reorder', 'Rotate any misaligned pages', 'Download your reorganized PDF'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'Organize PDF Pages — Reorder & Rearrange PDF Online Free',
    seoDescription: 'Organize PDF pages online for free. Reorder, rotate, and rearrange pages visually with drag-and-drop. Fast, secure, no signup required. Restructure PDFs instantly.',
    subtitle: 'Reorder, rotate, and rearrange PDF pages visually with drag-and-drop. Restructure your entire document in seconds — no software installation required.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Visual Editor' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `PDFs often arrive out of order — scanned documents in reverse, merged files with mixed sequences, reports with misplaced sections, or presentations that need restructuring. Manually recreating the PDF is time-consuming and error-prone. Organizing PDF pages lets you fix, restructure, and perfect your document in minutes without touching the original content.

DocVerse's Organize Pages tool gives you a visual, drag-and-drop interface — you see every page as a thumbnail and simply drag them into the perfect order. Reorder chapters, move appendices, rearrange sections, rotate misaligned pages, and restructure entire documents effortlessly. Perfect for business professionals reorganizing reports, students structuring research papers, lawyers arranging case files, and anyone who needs total control over PDF page order.

Our tool preserves everything — text quality, images, fonts, hyperlinks, and formatting stay exactly the same. Only the page order changes. Preview your changes in real-time before saving, so you know exactly what your final PDF will look like.

DocVerse works entirely in your browser on Windows, Mac, Linux, iOS, and Android. No software installation, no account creation, no waiting. Files are encrypted during upload and automatically deleted within 1 hour. It's the fastest, most intuitive way to organize PDFs online.`,
    keyFeatures: [
      'Visual drag-and-drop page organization',
      'Reorder pages in any sequence',
      'Rotate pages during organization',
      'Real-time preview of changes',
      'Preserves original quality and formatting',
      'Maintains hyperlinks and bookmarks',
      'Works on mobile and desktop',
      'No watermarks on output',
      '100% free, unlimited use',
      'Auto file deletion for privacy'
    ]
  },
  {
    id: 'delete-pages',
    slug: 'delete-pages',
    name: 'Delete PDF Pages — Remove Pages from PDF',
    shortName: 'Delete',
    description: 'Delete PDF pages online for free. Remove unwanted, blank, or extra pages from your PDF instantly. Fast, secure, no signup required. Preserves quality and formatting.',
    longDescription: 'Remove unwanted pages from your PDF document instantly. Delete blank pages, extra sections, or specific pages with a simple visual interface.',
    category: 'organize',
    iconName: 'Trash2',
    gradient: 'from-red-500 to-rose-500',
    inputFormat: 'PDF',
    outputFormat: 'PDF',
    popular: false,
    acceptTypes: '.pdf',
    multiple: false,
    steps: ['Upload your PDF file', 'Select the pages you want to delete', 'Click "Delete Pages"', 'Download your cleaned-up PDF'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'Delete PDF Pages — Remove Pages from PDF Online Free',
    seoDescription: 'Delete PDF pages online for free. Remove unwanted, blank, or extra pages from your PDF instantly. Fast, secure, no signup required. Preserves quality and formatting.',
    subtitle: 'Remove unwanted pages from your PDF document instantly. Delete blank pages, extra sections, or specific pages with a simple visual interface.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Instant Removal' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `PDF documents often contain unnecessary content — blank pages from scanning, duplicate pages from merging, cover pages you don't need, appendices you want to remove, or entire sections that are no longer relevant. Deleting these pages cleans up your PDF, reduces file size, and creates a focused, professional document ready to share.

DocVerse's Delete Pages tool makes it simple. Upload your PDF, see all pages as visual thumbnails, select the pages you want to remove, and download the cleaned-up document in seconds. Perfect for removing blank scan pages, cutting outdated sections from reports, deleting cover pages before merging, removing sensitive content, or simply trimming a PDF to its essential parts.

Our tool preserves everything else — remaining pages keep their original quality, formatting, fonts, hyperlinks, and structure. Only the pages you select are removed. Preview your changes before saving so you're always in control.

DocVerse runs entirely in your browser — no software installation, no account creation, no queues. Files are encrypted during upload and automatically deleted within 1 hour, ensuring complete privacy.`,
    keyFeatures: [
      'Visual page selection with thumbnails',
      'Delete single or multiple pages at once',
      'Remove blank pages instantly',
      'Preserve remaining page quality',
      'Maintain fonts, hyperlinks, and formatting',
      'Preview before saving',
      'Works on mobile and desktop',
      'No watermarks',
      '100% free, unlimited use',
      'Auto file deletion for privacy'
    ]
  },
  {
    id: 'extract-pages',
    slug: 'extract-pages',
    name: 'Extract PDF Pages — Pull Pages Into New PDF',
    shortName: 'Extract',
    description: 'Extract PDF pages online for free. Pull specific pages from any PDF into a new document. Fast, secure, no signup required. Preserves quality and formatting.',
    longDescription: 'Extract specific pages from any PDF into a new, standalone document. Pull single pages or ranges — perfect for isolating chapters, contracts, or key content.',
    category: 'organize',
    iconName: 'Copy',
    gradient: 'from-teal-500 to-cyan-500',
    inputFormat: 'PDF',
    outputFormat: 'PDF',
    popular: false,
    acceptTypes: '.pdf',
    multiple: false,
    steps: ['Upload your PDF file', 'Select the pages you want to extract', 'Click "Extract Pages"', 'Download your new PDF with selected pages'],
    clientSide: true,
    comingSoon: false,
    seoTitle: 'Extract PDF Pages — Extract Pages from PDF Online Free',
    seoDescription: 'Extract PDF pages online for free. Pull specific pages from any PDF into a new document. Fast, secure, no signup required. Preserves quality and formatting.',
    subtitle: 'Extract specific pages from any PDF into a new, standalone document. Pull single pages or ranges — perfect for isolating chapters, contracts, or key content.',
    trustBadges: [
      { icon: '🔒', text: 'Secure Upload' },
      { icon: '⚡', text: 'Instant Extraction' },
      { icon: '🗑️', text: 'Instant Auto-Deletion' },
      { icon: '🆓', text: '100% Free' },
      { icon: '✅', text: 'No Signup' }
    ],
    seoContent: `Sometimes you only need a portion of a PDF — a single chapter from a textbook, specific pages from a contract, one section of a report, or just the pages relevant to your task. Instead of sharing the entire document, extracting specific pages creates a focused, standalone PDF with only the content you need — cleaner, smaller, and easier to share.

DocVerse's Extract Pages tool makes this effortless. Upload your PDF, visually select the pages you want (single pages or ranges), and download them as a brand-new PDF document. Perfect for students extracting textbook chapters, lawyers isolating contract clauses, accountants pulling specific report sections, journalists sharing document excerpts, and anyone who needs precise page-level extraction.

Unlike splitting (which divides a PDF into multiple files), extraction creates one new PDF containing only your chosen pages. Original quality is preserved — text stays sharp, images remain crisp, fonts are intact, and hyperlinks continue to work. Preview your selection before saving to ensure you get exactly the pages you need.

DocVerse works entirely in your browser on any device. Files are encrypted during upload and automatically deleted within 1 hour. No signup, no watermarks, no software — just fast, secure PDF page extraction.`,
    keyFeatures: [
      'Extract single pages or page ranges',
      'Visual thumbnail selection',
      'Creates a new standalone PDF',
      'Preserves original quality',
      'Maintains fonts, images, and hyperlinks',
      'Preview before extraction',
      'Works on mobile and desktop',
      'No watermarks on output',
      '100% free, unlimited use',
      'Auto file deletion for privacy'
    ]
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter(t => t.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter(t => t.popular);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return tools;
  return tools.filter(
    t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.inputFormat.toLowerCase().includes(q) ||
      t.outputFormat.toLowerCase().includes(q)
  );
}

export const categoryLabels: Record<ToolCategory, string> = {
  convert: 'Convert',
  optimize: 'Optimize',
  organize: 'Organize',
};

export const categoryDescriptions: Record<ToolCategory, string> = {
  convert: 'Transform your documents between formats',
  optimize: 'Reduce size and improve quality',
  organize: 'Rearrange, split, and manage pages',
};
