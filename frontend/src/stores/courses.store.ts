import { create } from 'zustand'
import { coursesService } from '@/features/courses/services/courses.service'
import { toast } from 'sonner'

interface Course {
  id: string
  courseName: string
  abstract: string
  createdAt: string
  updatedAt: string
}

interface CoursesStore {
  courses: Course[]
  isLoading: boolean
  error: string | null
  fetchCourses: () => Promise<void>
  getCourseById: (id: string) => Promise<Course | null>
}

const useCoursesStore = create<CoursesStore>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    try {
      set({ isLoading: true, error: null })
      const courses = await coursesService.getAllCourses()
      set({ courses, isLoading: false })
    } catch (error) {
      console.error('Error fetching courses:', error)
      set({ 
        error: 'Failed to fetch courses. Please try again later.',
        isLoading: false 
      })
      toast.error('Failed to fetch courses')
    }
  },

  getCourseById: async (id: string) => {
    try {
      const course = await coursesService.getCourseById(id)
      return course
    } catch (error) {
      console.error('Error fetching course:', error)
      toast.error('Failed to fetch course details')
      return null
    }
  }
}))

export { useCoursesStore } 