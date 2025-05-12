import { apiConfig } from '@/configs'
import { Lesson } from '../types'

export const lessonService = {
  getAllLessons: async () => {
    const response = await apiConfig.post('', {
      query: `
        query GetAllLessons {
          getAllLessons {
            id
            lessonName
            abstract
            courseId
            createdAt
            updatedAt
          }
        }
      `
    })
    return response.data.data.getAllLessons
  },
  getLessonsByCourseId: async (id: string): Promise<Lesson[]> => {
    const response = await apiConfig.post('', {
      query: `
        query GetLessonsByCourseId($id: String!) {
          getLessonsByCourseId(id: $id) {
            id
            lessonName
            abstract
            courseId
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id }
    })
    return response.data.data.getLessonsByCourseId
  },
  getLessonById: async (id: string): Promise<Lesson> => {
    const response = await apiConfig.post('', {
      query: `
        query GetLessonById($id: String!) {
          getLessonById(id: $id) {
            id
            lessonName
            abstract
            courseId
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id }
    })
    return response.data.data.getLessonById
  }
}