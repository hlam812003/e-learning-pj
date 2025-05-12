import { apiConfig } from '@/configs'

export const messageService = {
  createMessage: async (
    content: string | null, 
    conversationId: string | undefined, 
    courseId: string | undefined, 
    lessonId: string | undefined
  ) => {
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
    console.log(response.data.data.createMessage)
    return response.data.data.createMessage
  }
}