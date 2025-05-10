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

interface Lesson {
  id: string
  lessonName: string
  abstract: string
  courseId: string
  createdAt: string
  updatedAt: string
}

interface CoursesStore {
  courses: Course[]
  lessons: Lesson[]
  isLoading: boolean
  error: string | null
  fetchCourses: () => Promise<void>
  getCourseById: (id: string) => Promise<Course | null>
  getLessonsByCourseId: (courseId: string) => Promise<void>
}

const useCoursesStore = create<CoursesStore>((set, get) => ({
  courses: [],
  lessons: [],
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
  },

  getLessonsByCourseId: async (courseId: string) => {
    try {
      set({ isLoading: true, error: null })
      const lessons = await coursesService.getLessonsByCourseId(courseId)
      set({ lessons, isLoading: false })
    } catch (error) {
      console.error('Error fetching lessons:', error)
      set({ 
        error: 'Failed to fetch lessons. Please try again later.',
        isLoading: false 
      })
      toast.error('Failed to fetch lessons')
    }
  }
}))

export { useCoursesStore } 