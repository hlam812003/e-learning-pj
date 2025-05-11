interface Message {
  id: string
  content: string | null
  senderType: string
  conversationId: string
  timestamp: string
}

interface MessageStore {
  messages: Message[]
  error: string | null
  
  createMessage: (content: string | null) => Promise<Message | null>
  setMessages: (messages: Message[]) => void
  clearMessages: () => void
}

export type { Message, MessageStore }