export interface ToolFAQ {
  question: string;
  answer: string;
}

export const toolFaqsMap: Record<string, ToolFAQ[]> = {
  'pdf-to-word': [
    {
      question: 'How do I convert a PDF to an editable Word document without losing formatting?',
      answer: 'DocVerse extracts text items, paragraph layouts, headings, and page structures from your PDF using our advanced OpenXML compiler, producing a fully editable .docx file compatible with Microsoft Word and Google Docs.'
    },
    {
      question: 'Can I edit the converted Word file in Microsoft Word, Google Docs, and LibreOffice?',
      answer: 'Yes! The generated file is a true Microsoft Word OpenXML (.docx) package that opens natively in Microsoft Word 2016+, Office 365, Google Docs, LibreOffice Writer, and Apple Pages.'
    },
    {
      question: 'Is converting confidential PDF files to Word secure on DocVerse?',
      answer: '100% secure. Your documents are processed in temporary encrypted memory or locally in your browser. All temporary server files are deleted automatically immediately after conversion.'
    }
  ],
  'word-to-pdf': [
    {
      question: 'How to convert DOCX or DOC to PDF online for free?',
      answer: 'Simply drag and drop your Microsoft Word file into DocVerse. Our conversion engine preserves your fonts, margins, tables, headers, and image layouts, generating a vector PDF document.'
    },
    {
      question: 'Will converting Word to PDF change my document formatting or fonts?',
      answer: 'No. DocVerse maintains exact page dimensions, line breaks, font styling, and graphics so your PDF matches your original Word document layout across all devices.'
    },
    {
      question: 'Can I convert Word files to PDF on mobile devices?',
      answer: 'Yes, DocVerse is fully responsive and runs smoothly inside Chrome, Safari, and Edge on iOS, Android, Windows, Mac, and Linux.'
    }
  ],
  'compress-pdf': [
    {
      question: 'How can I reduce PDF file size for email or online submission?',
      answer: 'Upload your PDF to DocVerse Compress tool. Our optimization algorithm compresses stream dictionaries and removes redundant PDF catalog overhead to significantly reduce file size while preserving high visual quality.'
    },
    {
      question: 'Does compressing a PDF reduce image resolution or text quality?',
      answer: 'DocVerse optimizes the PDF container structure without compromising vector text sharpness, ensuring your document remains clean, legible, and professional.'
    },
    {
      question: 'Is there a file size limit for PDF compression?',
      answer: 'DocVerse supports PDF files up to 100 MB free of charge, with zero registration or payment gates.'
    }
  ],
  'merge-pdf': [
    {
      question: 'How do I combine multiple PDF files into one single PDF?',
      answer: 'Drag and drop two or more PDF files into the upload area, arrange them in your preferred order, and click Process to instantly download a single merged PDF file.'
    },
    {
      question: 'Is there a limit to how many PDF files I can merge at once?',
      answer: 'DocVerse allows multi-file batch merging with no restrictive page or file count limits.'
    },
    {
      question: 'Are my merged PDF documents saved or shared on your server?',
      answer: 'Never. Files are merged locally or in temporary memory and are deleted automatically. We do not store or inspect your documents.'
    }
  ],
  'split-pdf': [
    {
      question: 'How do I extract specific pages or page ranges from a PDF?',
      answer: 'Upload your PDF, enter individual page numbers or page ranges (for example: 1-3, 5, 8-12), and click Process to generate a new PDF containing only your selected pages.'
    },
    {
      question: 'Can I split a multi-page PDF into separate single-page files?',
      answer: 'Yes! Specifying ranges or splitting all pages produces crisp individual PDF documents or a bundled archive for easy downloading.'
    }
  ],
  'rotate-pdf': [
    {
      question: 'How to rotate upside-down or landscape PDF pages permanently?',
      answer: 'Select your PDF, choose 90°, 180°, or 270° clockwise rotation, and apply the transformation to permanently fix page orientation.'
    },
    {
      question: 'Does rotating a PDF affect the text quality or page content?',
      answer: 'No. Page rotation modifies only the page view matrix inside the PDF header, keeping all original text vectors, fonts, and images 100% intact.'
    }
  ],
  'jpg-to-pdf': [
    {
      question: 'How do I convert JPG images into a single PDF document?',
      answer: 'Upload your JPG images, reorder them if needed, and DocVerse will embed them into standard PDF page dimensions for printing or emailing.'
    },
    {
      question: 'Will converting JPG to PDF reduce image sharpness?',
      answer: 'No, image streams are wrapped natively into PDF pages without lossy re-encoding.'
    }
  ],
  'png-to-pdf': [
    {
      question: 'How to convert PNG images with transparent backgrounds to PDF?',
      answer: 'Upload your PNG files into DocVerse. Our PNG engine preserves full alpha channel transparency and renders high-definition PDF output.'
    }
  ],
  'pdf-to-jpg': [
    {
      question: 'How to convert PDF pages into high-resolution JPG images?',
      answer: 'DocVerse renders each PDF page to an HTML5 canvas at 150-300 DPI resolution and exports them as crisp JPG image files.'
    },
    {
      question: 'Can I select low, medium, or high quality for PDF to image conversion?',
      answer: 'Yes, select High (300 DPI), Medium (150 DPI), or Low quality in the settings panel to customize file size and resolution.'
    }
  ],
  'pdf-to-png': [
    {
      question: 'How to extract PDF pages as PNG images with transparent backgrounds?',
      answer: 'Our canvas rendering pipeline converts PDF pages directly into PNG images, preserving vector graphics and transparent backgrounds.'
    }
  ],
  'excel-to-pdf': [
    {
      question: 'How to convert Excel spreadsheets (.xlsx, .xls) to PDF online?',
      answer: 'Upload your Excel spreadsheet. DocVerse converts cell grids, data tables, formulas, and charts into landscape PDF sheets.'
    }
  ],
  'powerpoint-to-pdf': [
    {
      question: 'How to convert PowerPoint presentations (.pptx, .ppt) to PDF?',
      answer: 'Upload your presentation slides. DocVerse converts 16:9 widescreen slide layouts, shapes, and images into a PDF slide deck.'
    }
  ],
  'organize-pages': [
    {
      question: 'How to visually reorder, delete, and rotate PDF pages in an interactive workspace?',
      answer: 'Use our visual thumbnail workspace to drag and drop page thumbnails into any sequence, rotate individual pages, or delete unnecessary pages.'
    }
  ],
  'delete-pages': [
    {
      question: 'How to remove unwanted pages from a PDF document online?',
      answer: 'Specify the page numbers you wish to remove, and DocVerse will produce a clean PDF with those pages stripped out.'
    }
  ],
  'extract-pages': [
    {
      question: 'How to extract select pages from a PDF file?',
      answer: 'Enter the exact page numbers or ranges to extract, and DocVerse will assemble a new PDF document containing only those targeted pages.'
    }
  ]
};

export function getFaqsForTool(slug: string): ToolFAQ[] {
  return toolFaqsMap[slug] || [
    {
      question: 'Is using this document tool 100% free?',
      answer: 'Yes, DocVerse provides 100% free online document conversion and editing with zero sign-up required and no hidden payment gates.'
    },
    {
      question: 'Are my uploaded files safe and private?',
      answer: 'Your privacy is guaranteed. All processing occurs locally or in temporary encrypted memory, and temporary server files are deleted automatically.'
    },
    {
      question: 'Do I need to install any software?',
      answer: 'No installation needed! DocVerse operates entirely inside your web browser on Mac, Windows, iOS, Android, and Linux.'
    }
  ];
}
