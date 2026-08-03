import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { isClerkEnabled } from './lib/auth-config.ts';

async function bootstrap() {
  const root = document.getElementById('root')!;

  if (isClerkEnabled) {
    try {
      const { ClerkProvider } = await import('@clerk/clerk-react');
      const PUBLISHABLE_KEY = (import.meta as Record<string, unknown>).env
        ? (import.meta.env as Record<string, string | undefined>).VITE_CLERK_PUBLISHABLE_KEY
        : undefined;

      if (!PUBLISHABLE_KEY) {
        throw new Error('VITE_CLERK_PUBLISHABLE_KEY is missing');
      }

      createRoot(root).render(
        <StrictMode>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <App />
          </ClerkProvider>
        </StrictMode>
      );
      return;
    } catch (err) {
      console.warn('[DocVerse] Clerk initialization failed, falling back to local auth:', err);
    }
  }

  // Fallback: no Clerk
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

bootstrap();
