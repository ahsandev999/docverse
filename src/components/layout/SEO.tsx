import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  toolSlug?: string;
}

export default function SEO({
  title = 'DocVerse — Free Online PDF Converter & Document Tools',
  description = 'Convert, compress, merge, split, rotate, and manage PDF documents online for 100% free with DocVerse. Fast, secure, and privacy-focused.',
  canonicalUrl,
  toolSlug,
}: SEOProps) {
  const fullTitle = title.includes('DocVerse') ? title : `${title} | DocVerse`;

  useEffect(() => {
    document.title = fullTitle;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Set Open Graph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', fullTitle);

    // Set Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // Add JSON-LD Structured Data Schema for SoftwareApplication
    const schemaId = 'docverse-software-schema';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: fullTitle,
      operatingSystem: 'All',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description,
      ...(toolSlug ? { url: `https://docverse.app/tools/${toolSlug}` } : {}),
    };

    scriptTag.text = JSON.stringify(schemaData);
  }, [fullTitle, description, canonicalUrl, toolSlug]);

  return null;
}
