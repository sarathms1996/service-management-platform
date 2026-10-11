import { create } from 'zustand';
import type { AuthSession, User } from '@/types/user';

interface AuthState {
  session: AuthSession | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
  hydrate: () => void;
}

const storageKey = 'smop_session';
const userKey = 'smop_user';

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isAuthenticated: false,
  login: (session) => {
    localStorage.setItem(storageKey, JSON.stringify(session));
    localStorage.setItem(userKey, JSON.stringify(session.user));
    set({ session, user: session.user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(userKey);
    set({ session: null, user: null, isAuthenticated: false });
  },
  hydrate: () => {
    const rawSession = localStorage.getItem(storageKey);
    const rawUser = localStorage.getItem(userKey);
    if (rawSession && rawUser) {
      try {
        const session = JSON.parse(rawSession) as AuthSession;
        const user = JSON.parse(rawUser) as User;
        set({ session, user, isAuthenticated: true });
      } catch {
        localStorage.removeItem(storageKey);
        localStorage.removeItem(userKey);
        set({ session: null, user: null, isAuthenticated: false });
      }
    }
  },
}));
