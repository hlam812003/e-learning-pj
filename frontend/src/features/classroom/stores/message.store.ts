import { create } from 'zustand'
import { messageService } from '../services'
import { toast } from 'sonner'
import { MessageStore } from '../types'

const TEST_CONVERSATION_ID = 'b4696dad-d103-497f-bf96-ca56fa992b2a'
const TEST_COURSE_ID = '4d17dad2-a34f-46ae-83a7-abb7826d047b'
const TEST_LESSON_ID = '475cf84c-326b-4c9f-a6cd-9e9cd881cf59'

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  error: null,
  
  createMessage: async (content) => {
    try {
      set({ error: null })
      
      const message = await messageService.createMessage(
        content, 
        TEST_CONVERSATION_ID, 
        TEST_COURSE_ID,
        TEST_LESSON_ID
      )
      
      set(state => ({ 
        messages: [...state.messages, message]
      }))
      
      return message
    } catch (error: any) {
      toast.error(error.message || 'Cannot send message')
      set({ error: error.message || 'Cannot send message' })
      return null
    }
  },
  
  setMessages: (messages) => {
    set({ messages })
  },
  
  clearMessages: () => {
    set({ messages: [] })
  }
}))