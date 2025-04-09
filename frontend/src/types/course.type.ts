type Level = 'Beginner' | 'Intermediate' | 'Advanced'

export interface ICourse {
  id: string
  courseName: string
  abstract: string
  createdAt: string
  updatedAt: string
  instructor?: string
  level?: Level
  duration?: string
  rating?: number
  students?: number
  price?: number
  category?: string
  image?: {
    name: string
    folder: string
  }
}