import { apiConfig } from '@/configs'
import { Conversation } from '../types'

export const conversationService = {
  getMyConversations: async (): Promise<Conversation[]> => {
    const response = await apiConfig.post('', {
      query: `
        query MyConversations {
          myConversations {
            id
            name
            creatorId
            createdAt
            updatedAt
          }
        }
      `
    })
    
    return response.data.data.myConversations
  },
  
  createConversation: async (name: string, creatorId: string): Promise<Conversation> => {
    const response = await apiConfig.post('', {
      query: `
        mutation CreateConversation($data: CreateConversationInput!) {
          createConversation(data: $data) {
            id
            name
            creatorId
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        data: {
          name,
          creatorId
        }
      }
    })    
    return response.data.data.createConversation
  },

  deleteConversation: async (id: string): Promise<Conversation> => {
    const response = await apiConfig.post('', {
      query: `
        mutation DeleteConversation($id: String!) {
          deleteConversation(id: $id) {
            id
            name
            creatorId
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id
      }
    })
    return response.data.data.deleteConversation
  }
}
