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
    const response = await api.post('', {
      query: `
        mutation Register($email: String!, $password: String!) {
          register(data: { email: $email, password: $password }) {
            success
            message
            token
          }
        }
      `,
      variables: { email, password }
    })
    return response.data.data.register
  }
}
