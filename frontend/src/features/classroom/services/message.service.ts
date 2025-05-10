import { apiConfig } from '@/configs'

export const messageService = {
  createMessage: async (content: string | null, conversationId: string, courseId: string, lessonId: string) => {
    const response = await apiConfig.post('', {
      query: `
        mutation CreateMessage($data: CreateMessageInput!) {
          createMessage(data: $data) {
            id
            content
            senderType
            conversationId
            timestamp
          }
        }
      `,
      variables: {
        data: {
          content,
          conversationId,
          courseId,
          lessonId
        }
      }
    })
    return response.data.data.createMessage
  }
}