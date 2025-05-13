import { GeneralMode } from './general.type'
import { SpeechMessage } from '../hooks'

interface ClassroomState {
  teacherMode: GeneralMode
  currentMessage: SpeechMessage | null
  isSpeaking: boolean
  isThinking: boolean
  cameraMode: GeneralMode
  selectedConversationId: string | null
  
  setTeacherMode: (mode: GeneralMode) => void
  setCurrentMessage: (message: SpeechMessage | null) => void
  setIsSpeaking: (isSpeaking: boolean) => void
  setIsThinking: (isThinking: boolean) => void
  setCameraMode: (mode: GeneralMode) => void
  setSelectedConversationId: (id: string | null) => void

  startThinking: () => void
  stopAll: () => void
}

export type { ClassroomState }