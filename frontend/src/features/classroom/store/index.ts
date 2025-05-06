import { create } from 'zustand'
import { SpeechMessage } from '../hooks'

type TeacherMode = 'idle' | 'thinking' | 'talking'
type CameraMode = 'default' | 'thinking' | 'talking'

interface ClassroomState {
  teacherMode: TeacherMode
  currentMessage: SpeechMessage | null
  isSpeaking: boolean
  isLoading: boolean
  cameraMode: CameraMode

  setTeacherMode: (mode: TeacherMode) => void
  setCurrentMessage: (message: SpeechMessage | null) => void
  setIsSpeaking: (isSpeaking: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setCameraMode: (mode: CameraMode) => void

  startThinking: () => void
  stopAll: () => void
}

export const useClassroomStore = create<ClassroomState>((set) => ({
  teacherMode: 'idle',
  currentMessage: null,
  isSpeaking: false,
  isLoading: false,
  cameraMode: 'default',

  setTeacherMode: (mode) => set({ teacherMode: mode }),
  setCurrentMessage: (message) => set({ currentMessage: message }),
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setCameraMode: (mode) => set({ cameraMode: mode }),

  startThinking: () => set({
    teacherMode: 'thinking',
    isSpeaking: false,
    isLoading: true,
    cameraMode: 'thinking'
  }),
  
  stopAll: () => set({
    teacherMode: 'idle',
    currentMessage: null,
    isSpeaking: false,
    isLoading: false,
    cameraMode: 'default'
  })
}))
