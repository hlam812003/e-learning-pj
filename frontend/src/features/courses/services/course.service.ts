import { apiConfig } from '@/configs'

export const courseService = {
  getAllCourses: async () => {
    const response = await apiConfig.post('', {
      query: `
        query GetAllCourses {
          getAllCourses {
            id
            courseName
            abstract
            createdAt
            updatedAt
          }
        }
      `
    })
    return response.data.data.getAllCourses
  },
  getCourseById: async (id: string) => {
    const response = await apiConfig.post('', {
      query: `
        query GetCourseById($id: String!) {
          getCourseById(id: $id) {
            id
            courseName
            abstract
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id }
    })
    return response.data.data.getCourseById
  }
}