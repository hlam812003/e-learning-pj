import { create } from 'zustand'
import { SpeechMessage } from '../hooks'
import { GeneralMode } from '../type'
import { GENERAL_MODE } from '../constants'

interface ClassroomState {
  teacherMode: GeneralMode
  currentMessage: SpeechMessage | null
  isSpeaking: boolean
  isThinking: boolean
  cameraMode: GeneralMode

  setTeacherMode: (mode: GeneralMode) => void
  setCurrentMessage: (message: SpeechMessage | null) => void
  setIsSpeaking: (isSpeaking: boolean) => void
  setIsThinking: (isThinking: boolean) => void
  setCameraMode: (mode: GeneralMode) => void

  startThinking: () => void
  stopAll: () => void
}

export const useClassroomStore = create<ClassroomState>((set) => ({
  teacherMode: GENERAL_MODE.IDLE,
  currentMessage: null,
  isSpeaking: false,
  isThinking: false,
  cameraMode: GENERAL_MODE.IDLE,

  setTeacherMode: (mode) => set({ teacherMode: mode }),
  setCurrentMessage: (message) => set({ currentMessage: message }),
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),
  setIsThinking: (isThinking) => set({ isThinking }),
  setCameraMode: (mode) => set({ cameraMode: mode }),

  startThinking: () => set({
    teacherMode: GENERAL_MODE.THINKING,
    isSpeaking: false,
    isThinking: true,
    cameraMode: GENERAL_MODE.THINKING
  }),
  
  stopAll: () => set({
    teacherMode: GENERAL_MODE.IDLE,
    currentMessage: null,
    isSpeaking: false,
    isThinking: false,
    cameraMode: GENERAL_MODE.IDLE
  })
}))
