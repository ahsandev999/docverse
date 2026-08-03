import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
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

function ClerkAuthProviderImpl({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut: clerkSignOut } = useClerk();

  const activeUser: User | null = clerkUser
    ? {
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        avatar: clerkUser.imageUrl,
        avatarUrl: clerkUser.imageUrl,
        plan: 'free',
      }
    : null;

  const signIn = useCallback(async () => {}, []);
  const signUp = useCallback(async () => {}, []);
  const signOut = useCallback(() => {
    clerkSignOut();
    clearUser();
  }, [clerkSignOut]);

  return (
    <AuthContext.Provider
      value={{
        user: activeUser,
        signIn,
        signUp,
        signOut,
        isLoading: !isLoaded,
        isClerkEnabled: true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function LocalAuthProviderImpl({ children }: { children: ReactNode }) {
  const [localUser, setLocalUserState] = useState<User | null>(() => getUser());
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
    setLocalUserState(u);
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
    setLocalUserState(u);
    setIsLoading(false);
  }, []);

  const signOut = useCallback(() => {
    clearUser();
    setLocalUserState(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: localUser,
        signIn,
        signUp,
        signOut,
        isLoading,
        isClerkEnabled: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  if (isClerkEnabled) {
    return <ClerkAuthProviderImpl>{children}</ClerkAuthProviderImpl>;
  }
  return <LocalAuthProviderImpl>{children}</LocalAuthProviderImpl>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
