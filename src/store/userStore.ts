import { create } from 'zustand';
import { authClient } from '../../lib/auth-client';
import { User } from 'better-auth';


interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user }),
  
  setLoading: (isLoading) => set({ isLoading }),

  initializeAuth: async () => {
    try {
      set({ isLoading: true });
      const session = await authClient.getSession();
      set({ user: session.data?.user || null });
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await authClient.signOut();
      set({ user: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));
