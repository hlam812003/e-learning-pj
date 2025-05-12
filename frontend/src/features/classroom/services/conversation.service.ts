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
  }
}
