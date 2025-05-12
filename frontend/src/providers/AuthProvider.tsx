import { useEffect } from 'react'
import { useAuthStore } from '@/stores'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initAuth } = useAuthStore()

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return <>{children}</>
}