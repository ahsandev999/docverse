import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

// Also export as component for backward compat
export default function ScrollToTop() {
  useScrollToTop();
  return null;
}
