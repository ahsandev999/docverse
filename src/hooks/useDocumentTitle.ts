import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useDocumentTitle(title?: string) {
  const baseTitle = 'DocVerse';
  const location = useLocation();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    if (title) {
      document.title = `${title} · ${baseTitle}`;
    } else {
      document.title = `${baseTitle} - Transform Your Documents with Precision`;
    }
    return () => {
      document.title = `${baseTitle} - Transform Your Documents with Precision`;
    };
  }, [title, location.pathname]);
}
