import { useEffect } from 'react'
import { useAuthStore } from '@/stores'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initAuth, user: authUser, getUserInfo } = useAuthStore()
  const queryClient = useQueryClient()
  
  const { data } = useQuery({
    queryKey: ['currentUser', authUser?.id],
    queryFn: getUserInfo,
    enabled: !!authUser
  })

  useEffect(() => {
    if (data && authUser?.id) {
      queryClient.setQueryData(['currentUser', authUser.id], data)
    }
  }, [data, authUser?.id, queryClient])

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return <>{children}</>
}