import { create } from 'zustand'
import {jwtDecode, JwtPayload} from 'jwt-decode'
import { authService } from '@/features/auth/services/auth.service'

interface DecodedToken extends JwtPayload {
  email?: string
  username?: string
  [key: string]: any
}

interface AuthUser {
  email?: string
  username?: string
  token: string
  [key: string]: any
}

interface AuthStore {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<any>
  register: (email: string, password: string) => Promise<any>
  logout: () => void
}

export const useAuthStore = create<AuthStore>(
  (set: (partial: Partial<AuthStore>) => void): AuthStore => ({
    user: null,
    login: async (email: string, password: string): Promise<any> => {
      const loginResult = await authService.login(email, password)
      if (loginResult.token) {
        const decoded: DecodedToken = jwtDecode(loginResult.token)
        set({ user: { ...decoded, token: loginResult.token } })
        localStorage.setItem('token', loginResult.token) // Lưu token vào localStorage
      }
      return loginResult
    },
    register: async (email: string, password: string): Promise<any> => {
      const registerResult = await authService.register(email, password)
      if (registerResult.token) {
        const decoded: DecodedToken = jwtDecode(registerResult.token)
        set({ user: { ...decoded, token: registerResult.token } })
        localStorage.setItem('token', registerResult.token) // Lưu token vào localStorage
      }
      return registerResult
    },
    logout: (): void => {
      set({ user: null })
      localStorage.removeItem('token') // Xóa token khi logout
    },
  })
)