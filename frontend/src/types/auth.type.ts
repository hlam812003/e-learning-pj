import { JwtPayload } from 'jwt-decode'

interface DecodedToken extends JwtPayload {
  email?: string
  username?: string
  [key: string]: any
}

interface GoogleUserInfo {
  name?: string
  given_name?: string
  email?: string
  picture?: string
  sub?: string
}

interface AuthUser {
  email?: string
  username?: string
  token: string
  [key: string]: any
}

interface AuthStore {
  user: AuthUser | null
  googleInfo: GoogleUserInfo | null
  login: (email: string, password: string) => Promise<any>
  register: (email: string, password: string) => Promise<any>
  loginWithGoogle: (googleId: string, email: string, googleInfo?: GoogleUserInfo) => Promise<any>
  logout: () => void
  initAuth: () => void
  setGoogleInfo: (info: GoogleUserInfo) => void
  clearGoogleInfo: () => void
}

export type { DecodedToken, GoogleUserInfo, AuthUser, AuthStore }