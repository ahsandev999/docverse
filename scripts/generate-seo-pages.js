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
    description: 'Convert PDF files to editable Microsoft Word documents (.docx) online for free. Preserves layout, formatting, and text.',
  },
  {
    slug: 'word-to-pdf',
    name: 'Word to PDF Converter',
    description: 'Convert Word documents (.docx, .doc) to vector PDF files online for free. Preserves fonts, images, and formatting.',
  },
  {
    slug: 'excel-to-pdf',
    name: 'Excel to PDF Converter',
    description: 'Convert Excel spreadsheets (.xlsx, .xls) to PDF tables online for free. Preserves cell grids, formulas, and charts.',
  },
  {
    slug: 'powerpoint-to-pdf',
    name: 'PowerPoint to PDF Converter',
    description: 'Convert PowerPoint presentations (.pptx, .ppt) to PDF slides online for free. Preserves widescreen slide layouts.',
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF Converter',
    description: 'Convert JPG images to PDF documents online for free. Combine multiple JPG images into one clean PDF.',
  },
  {
    slug: 'png-to-pdf',
    name: 'PNG to PDF Converter',
    description: 'Convert PNG images to PDF documents online for free. Preserves image transparency and resolution.',
  },
  {
    slug: 'pdf-to-jpg',
    name: 'PDF to JPG Converter',
    description: 'Convert PDF pages into high-resolution JPG images online for free. Download individual images or a ZIP archive.',
  },
  {
    slug: 'pdf-to-png',
    name: 'PDF to PNG Converter',
    description: 'Convert PDF pages into crisp PNG images online for free. Preserves transparency and vector crispness.',
  },
  {
    slug: 'merge-pdf',
    name: 'Merge PDF Files Online',
    description: 'Combine multiple PDF files into one single PDF document online for free. Fast, secure, and easy to use.',
  },
  {
    slug: 'split-pdf',
    name: 'Split PDF Pages Online',
    description: 'Extract specific pages or page ranges from a PDF document online for free. Download custom PDF extracts.',
  },
  {
    slug: 'compress-pdf',
    name: 'Compress PDF File Size Online',
    description: 'Reduce PDF file size for email attachment online for free while maintaining vector text sharpness and visual quality.',
  },
  {
    slug: 'rotate-pdf',
    name: 'Rotate PDF Pages Online',
    description: 'Rotate PDF pages permanently online for free. Turn landscape or upside-down pages 90, 180, or 270 degrees.',
  },
  {
    slug: 'delete-pages',
    name: 'Delete Pages from PDF',
    description: 'Remove unwanted pages from a PDF document online for free. Select and delete PDF pages instantly.',
  },
  {
    slug: 'extract-pages',
    name: 'Extract Pages from PDF',
    description: 'Extract select pages from any PDF file online for free into a new downloadable PDF document.',
  },
  {
    slug: 'organize-pages',
    name: 'Organize PDF Pages Interactive Workspace',
    description: 'Reorder, rotate, delete, and organize PDF pages visually using an interactive drag-and-drop thumbnail workspace.',
  },
];

function generateToolHtml(templateHtml, tool) {
  const canonicalUrl = `https://docverse.cloud/tools/${tool.slug}`;
  const fullTitle = `${tool.name} | DocVerse Free PDF Tools`;
  const fullDesc = tool.description;

  let html = templateHtml;

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/gi,
    `<title>${fullTitle}</title>`
  );

  // Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/gi,
    `<meta name="description" content="${fullDesc}" />`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/gi,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace Open Graph Tags
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/gi,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/gi,
    `<meta property="og:title" content="${fullTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/gi,
    `<meta property="og:description" content="${fullDesc}" />`
  );

  // Replace Twitter Card Tags
  html = html.replace(
    /<meta name="twitter:url" content=".*?" \/>/gi,
    `<meta name="twitter:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?" \/>/gi,
    `<meta name="twitter:title" content="${fullTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?" \/>/gi,
    `<meta name="twitter:description" content="${fullDesc}" />`
  );

  // Inject BreadcrumbList JSON-LD
  const breadcrumbJsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://docverse.cloud/" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://docverse.cloud/#tools" },
        { "@type": "ListItem", "position": 3, "name": "${tool.name}", "item": "${canonicalUrl}" }
      ]
    }
    </script>
  `;

  html = html.replace('</head>', `${breadcrumbJsonLd}\n</head>`);

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

  console.log('✅ [SEO Generator] Successfully generated unique static HTML routes with Title, Canonical, OG:URL, and JSON-LD schemas for all 15 tools!');
}

run();
