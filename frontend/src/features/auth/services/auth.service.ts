import api from '@/lib/api'

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/login', { email, password })
    return response.data
  },
  register: async (email: string, password: string) => {
    const response = await api.post('/register', { email, password })
    return response.data
  }
  
}