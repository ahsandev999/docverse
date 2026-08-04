import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function setOrUpdateMeta(
  selector: string,
  attr: string,
  value: string,
  createTag?: () => HTMLElement
) {
  let el = document.querySelector(selector);
  if (!el && createTag) {
    el = createTag();
    document.head.appendChild(el);
  }
  if (el) {
    el.setAttribute(attr, value);
  }
}

/**
 * Technical SEO Hook: Dynamically updates Document Title, Meta Description,
 * Canonical URL, Open Graph (og:title, og:description, og:url), and Twitter Card tags per page route.
 */
export function useDocumentTitle(title?: string, description?: string) {
  const baseTitle = 'DocVerse';
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${baseTitle}`
      : `${baseTitle} - 100% Free Online PDF Tools & Document Converter`;

    const fullDesc =
      description ||
      'DocVerse is a 100% free online document platform. Convert, compress, merge, split, rotate, and edit PDFs, Word, Excel, and PowerPoint files online with zero cost and complete privacy.';

    const rawPath = location.pathname.endsWith('/') && location.pathname.length > 1
      ? location.pathname.slice(0, -1)
      : location.pathname;

    const canonicalUrl = `https://docverse.cloud${rawPath === '/' ? '' : rawPath}`;

    // 1. Update Document Title
    document.title = fullTitle;

    // 2. Update Meta Description
    setOrUpdateMeta('meta[name="description"]', 'content', fullDesc, () => {
      const m = document.createElement('meta');
      m.name = 'description';
      return m;
    });

    // 3. Update Canonical URL
    setOrUpdateMeta('link[rel="canonical"]', 'href', canonicalUrl, () => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      return l;
    });

    // 4. Update Open Graph Meta Tags
    setOrUpdateMeta('meta[property="og:title"]', 'content', fullTitle, () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:title');
      return m;
    });

    setOrUpdateMeta('meta[property="og:description"]', 'content', fullDesc, () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:description');
      return m;
    });

    setOrUpdateMeta('meta[property="og:url"]', 'content', canonicalUrl, () => {
      const m = document.createElement('meta');
      m.setAttribute('property', 'og:url');
      return m;
    });

    // 5. Update Twitter Cards
    setOrUpdateMeta('meta[name="twitter:title"]', 'content', fullTitle, () => {
      const m = document.createElement('meta');
      m.name = 'twitter:title';
      return m;
    });

    setOrUpdateMeta('meta[name="twitter:description"]', 'content', fullDesc, () => {
      const m = document.createElement('meta');
      m.name = 'twitter:description';
      return m;
    });

    setOrUpdateMeta('meta[name="twitter:url"]', 'content', canonicalUrl, () => {
      const m = document.createElement('meta');
      m.name = 'twitter:url';
      return m;
    });
  }, [title, description, location.pathname]);
}
