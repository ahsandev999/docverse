// Detect if Clerk is configured
const CLERK_KEY = typeof import.meta !== 'undefined'
  ? (import.meta as Record<string, unknown>).env
    ? (import.meta.env as Record<string, string | undefined>).VITE_CLERK_PUBLISHABLE_KEY
    : undefined
  : undefined;

export const isClerkEnabled = !!(CLERK_KEY && !CLERK_KEY.startsWith('pk_test_XXXX'));
