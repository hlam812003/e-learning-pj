import { create } from 'zustand'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { authService } from '@/features/auth'

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
  initAuth: () => void
}

const setCookie = (name: string, value: string, days: number = 7) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure`
}

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Strict; Secure`
}

const useAuthStore = create<AuthStore>(
  (set): AuthStore => ({
    user: null,
    login: async (email: string, password: string): Promise<any> => {
      const loginResult = await authService.login(email, password)
      if (loginResult.success && loginResult.token) {
        const decoded: DecodedToken = jwtDecode(loginResult.token)
        set({ user: { ...decoded, token: loginResult.token } })
        setCookie('token', loginResult.token, 7)
        return loginResult
      }
      throw new Error(loginResult.message || 'Login failed')
    },
    register: async (email: string, password: string): Promise<any> => {
      const registerResult = await authService.register(email, password)
      if (registerResult.success && registerResult.token) {
        const decoded: DecodedToken = jwtDecode(registerResult.token)
        set({ user: { ...decoded, token: registerResult.token } })
        setCookie('token', registerResult.token, 7)
        return registerResult
      }
      throw new Error(registerResult.message || 'Registration failed')
    },
    logout: (): void => {
      set({ user: null })
      deleteCookie('token')
    },
    initAuth: (): void => {
      const token = getCookie('token')
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token)
          
          const currentTime = Date.now() / 1000
          if (decoded.exp && decoded.exp > currentTime) {
            set({ user: { ...decoded, token } })
          } else {
            deleteCookie('token')
          }
        } catch (error) {
          console.error('Error decoding token:', error)
          deleteCookie('token')
        }
      }
    }
  })
)

export {
  useAuthStore,
  getCookie
}