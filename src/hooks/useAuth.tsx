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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [localUser, setLocalUserState] = useState<User | null>(() => getUser());
  const [isLoading, setIsLoading] = useState(false);

  // If Clerk is enabled, use Clerk's real state
  let clerkUser: ReturnType<typeof useUser>['user'] = null;
  let clerkIsLoaded = true;
  let clerkSignOut: (() => Promise<void>) | null = null;

  if (isClerkEnabled) {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { user: cUser, isLoaded } = useUser();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { signOut: cSignOut } = useClerk();
      clerkUser = cUser;
      clerkIsLoaded = isLoaded;
      clerkSignOut = cSignOut;
    } catch {
      // Fallback if rendered outside ClerkProvider
    }
  }

  const activeUser: User | null = isClerkEnabled
    ? clerkUser
      ? {
          id: clerkUser.id,
          name: clerkUser.fullName || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
          avatar: clerkUser.imageUrl,
          avatarUrl: clerkUser.imageUrl,
          plan: 'free',
        }
      : null
    : localUser;

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
    if (isClerkEnabled && clerkSignOut) {
      clerkSignOut();
    }
    clearUser();
    setLocalUserState(null);
  }, [clerkSignOut]);

  return (
    <AuthContext.Provider
      value={{
        user: activeUser,
        signIn,
        signUp,
        signOut,
        isLoading: isClerkEnabled ? !clerkIsLoaded : isLoading,
        isClerkEnabled,
      }}
    >
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
