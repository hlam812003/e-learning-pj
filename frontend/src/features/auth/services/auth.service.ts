import api from '@/lib/api'
import { jwtDecode } from 'jwt-decode'

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('', {
      query: `
        mutation Login($email: String!, $password: String!) {
          login(data: { email: $email, password: $password }) {
            success
            message
            token
          }
        }
      `,
      variables: { email, password }
    })
    return response.data.data.login
  },
  
  register: async (email: string, password: string) => {
    const mutation = `
      mutation Register($data: RegisterInput!) {
        register(data: $data) {
          success
          message
          token
        }
      }
    `
    const variables = {
      data: { email, password } 
    }
    const response = await api.post('', {
      query: mutation,
      variables
    })
    return response.data.data.register
  },
  
  getCurrentUser: async () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token found')
    const decoded: any = jwtDecode(token)
    const userId = decoded.id || decoded.userId || decoded.sub // tuỳ vào backend encode gì
    if (!userId) throw new Error('No user id in token')
    const query = `
      query GetUser($id: String!) {
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
    `
    const variables = { id: userId }
    const response = await api.post('', { query, variables })
    return response.data.data.user
  }
}
