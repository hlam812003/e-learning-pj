import { create } from 'zustand'
import { authService } from '@/features/auth/services/auth.service'

type AuthStore = {
  user: null | { email: string; username: string };
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: async (email, password) => {
    const user = await authService.login(email, password)
    set({ user })
  },
  register: async (email, password) => {
    const user = await authService.register(email, password)
    set({ user })
    return user
  },
  
  logout: () => set({ user: null }),
}))