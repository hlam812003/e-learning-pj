import { api } from '@/lib'
import { jwtDecode } from 'jwt-decode'
import { getCookie } from '@/stores'

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('', {
      query: `
        mutation Login($data: LoginInput!) {
          login(data: $data) {
            success
            message
            token
          }
        }
      `,
      variables: { 
        data: { 
          email, 
          password 
        } 
      }
    })
    return response.data.data.login
  },
  
  register: async (email: string, password: string) => {
    const response = await api.post('', {
      query: `
        mutation Register($data: RegisterInput!) {
          register(data: $data) {
            success
            message
          }
        }
      `,
      variables: { 
        data: { 
          email, 
          password 
        } 
      }
    })
    return response.data.data.register
  },
  
  loginWithGoogle: async (googleId: string, email: string) => {
    const response = await api.post('', {
      query: `
        mutation GoogleLogin($data: GoogleLoginInput!) {
          googleLogin(data: $data) {
            success
            message
            token
          }
        }
      `,
      variables: {   
        data: { 
          googleId, 
          email
        } 
      }
    })
    return response.data.data.googleLogin
  },
  
  getCurrentUser: async () => {
    const token = getCookie('token')
    if (!token) throw new Error('No token found')
    const decoded: any = jwtDecode(token)
    const userId = decoded.id || decoded.userId || decoded.sub
    if (!userId) throw new Error('No user id in token')
    const response = await api.post('', {
      query: `
        query User($id: String!) {
          user(id: $id) {
            id
            username
            email
            phoneNumber
            role
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id: userId }
    })
    return response.data.data.user
  }
}