import { create } from 'zustand';
import api from '@/lib/api';

type AuthStore = {
  user: null | { email: string; username: string };
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: async (email, password) => {
    const response = await api.post('/login', { email, password });
    set({ user: response.data.user });
  },
  register: async (email, username, password) => {
    const response = await api.post('/register', { email, username, password });
    set({ user: response.data.user });
  },
  logout: () => set({ user: null }),
}));