import api from '@/lib/api'

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
  }
}
