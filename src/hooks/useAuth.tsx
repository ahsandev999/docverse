import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { User } from '../types';
import { getUser, setUser, clearUser, generateId } from '../lib/storage';
import { isClerkEnabled } from '../lib/auth-config';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  isClerkEnabled: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Fallback auth provider used when Clerk is not configured.
 * Stores user in localStorage — NOT production-secure.
 * When Clerk keys are set, the ClerkProvider in main.tsx handles real auth.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => getUser());
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    if (password) { /* no-op for mock auth */ }
    await new Promise(r => setTimeout(r, 800));
    const u: User = {
      id: generateId(),
      name: email.split('@')[0],
      email,
      plan: 'free',
    };
    setUser(u);
    setUserState(u);
    setIsLoading(false);
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    if (password) { /* no-op for mock auth */ }
    await new Promise(r => setTimeout(r, 800));
    const u: User = {
      id: generateId(),
      name,
      email,
      plan: 'free',
    };
    setUser(u);
    setUserState(u);
    setIsLoading(false);
  }, []);

  const signOut = useCallback(() => {
    clearUser();
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading, isClerkEnabled }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
