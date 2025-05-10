import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useCoursesStore } from '@/stores/courses.store'
import { Skeleton } from '@/components/ui/skeleton'
import CourseImage from '@/features/courses/components/CourseImage'
import { Badge } from '@/components/ui/badge'

import { ICourse } from '@/types'

import { OptimizeImage } from '@/components'

export default function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { getCourseById, getLessonsByCourseId, lessons, isLoading } = useCoursesStore()
  const [course, setCourse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) {
        setError('Course ID is missing')
        setIsInitialLoad(false)
        return
      }

      try {
        const courseData = await getCourseById(courseId)
        if (!courseData) {
          setError('Course not found')
          return
        }
        setCourse(courseData)
        // Fetch lessons for this course
        await getLessonsByCourseId(courseId)
      } catch (err) {
        setError('Failed to load course details')
      } finally {
        setIsInitialLoad(false)
      }
    }

    fetchCourseDetails()
  }, [courseId, getCourseById, getLessonsByCourseId])

  if (isInitialLoad || isLoading) {
    return (
      <div className="w-full px-24 py-10">
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    )
  }

  if (error && !course) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center">
        <Icon icon="ph:warning-circle" className="text-[6rem] text-zinc-500 mb-4" />
        <h2 className="text-[2rem] font-bold text-zinc-800 mb-2">Course Not Found</h2>
        <p className="text-[1.25rem] text-zinc-600 mb-6">
          {error}
        </p>
        <button 
          onClick={() => navigate('/courses')}
          className="rounded-full bg-black text-white px-8 py-3 text-[1.25rem] inline-flex items-center gap-2 hover:bg-zinc-800 transition-colors"
        >
          <Icon icon="ph:arrow-left" />
          Go Back
        </button>
      </div>
    )
  }

  const { 
    courseName, 
    abstract, 
    instructor, 
    level, 
    duration, 
    rating, 
    students, 
    price, 
    category,
    image 
  } = course

  const learningItems = [
    'Master Flutter framework fundamentals and Dart programming',
    'Build beautiful, responsive UIs with Flutter widgets',
    'Implement state management with Provider and Riverpod',
    'Connect to REST APIs and Firebase backends',
    'Deploy apps to Google Play Store and Apple App Store',
    'Create animations and custom UI components'
  ]
  
  const courseIncludes = [
    { icon: 'ph:video-fill', text: '20 hours on-demand video' },
    { icon: 'ph:file-text-fill', text: '15 downloadable resources' },
    { icon: 'ph:infinity-fill', text: 'Full lifetime access' },
    { icon: 'ph:device-mobile-fill', text: 'Access on mobile and TV' },
    { icon: 'ph:medal-fill', text: 'Certificate of completion' }
  ]

  return (
    <div className="w-full bg-white text-zinc-900">
      <div className="bg-[#1d1d1d] py-16 relative">
        <div className="w-full flex flex-col md:flex-row items-center px-6 sm:px-12 md:px-24">
          <div className="w-full md:w-[55%] mb-10 md:mb-0">
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge variant="default" className="rounded-full bg-zinc-700 hover:bg-zinc-600 text-white text-[1.2rem] px-6 py-2 transition-all shadow-sm">
                {category}
              </Badge>
              <Badge variant="outline" className="rounded-full text-zinc-300 border-zinc-600 bg-zinc-800/40 hover:bg-zinc-800 text-[1.2rem] px-6 py-2 transition-all">
                {level}
              </Badge>
            </div>
            
            <h1 className="text-[3rem] md:text-[4rem] font-bold text-white mb-8 leading-tight">
              {courseName}
            </h1>
            
            <p className="text-[1.6rem] text-zinc-300 mb-10 leading-relaxed max-w-3xl">
              {abstract}
            </p>
            
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center">
                <Icon icon="ph:user-circle-fill" className="text-[3.5rem] text-zinc-400" />
              </div>
              <div>
                <h3 className="text-[1.5rem] font-semibold text-white">{instructor}</h3>
                <p className="text-[1.2rem] text-zinc-400">Course Instructor</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-10 mb-10">
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon 
                      key={star}
                      icon={star <= Math.round(rating || 0) ? 'ph:star-fill' : 'ph:star'} 
                      className="text-[1.7rem] text-yellow-400 filter drop-shadow-sm transition-all hover:scale-110" 
                    />
                  ))}
                </div>
                <span className="text-[1.4rem] font-bold text-white">
                  {rating?.toFixed(1)} ({students?.toLocaleString()} students)
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-zinc-300">
                <Icon icon="ph:clock-fill" className="text-[1.7rem]" />
                <span className="text-[1.4rem]">{duration}</span>
              </div>
            </div>

            <div className="flex gap-5 md:hidden">
              <button className="flex-1 py-4 rounded-full text-[1.25rem] font-semibold
                bg-white text-black hover:bg-zinc-100 transition-colors
                flex items-center justify-center gap-3"
              >
                Enroll Now
                <Icon icon="ph:arrow-right" className="text-[1.4rem]" />
              </button>
              
              <button className="flex-1 py-4 rounded-full text-[1.25rem] font-semibold
                border border-zinc-700 text-white hover:bg-zinc-800 transition-colors
                flex items-center justify-center gap-3"
              >
                <Icon icon="ph:shopping-cart" className="text-[1.4rem]" />
                Add to Cart
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-[45%]">
            <div className="aspect-video rounded-lg overflow-hidden bg-zinc-800 shadow-xl relative">
              {image && (
                <CourseImage 
                  src={image.name}
                  alt={courseName}
                  folder={image.folder}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-xl hover:bg-zinc-100 transition-colors duration-300">
                  <Icon icon="ph:play-fill" className="text-black text-[1.8rem] ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-24 py-14">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-8/12">
            <div className="bg-white rounded-lg border border-zinc-200 p-10 mb-12">
              <h2 className="text-[2.5rem] font-bold text-zinc-900 mb-8 flex items-center gap-4">
                <Icon icon="ph:graduation-cap-fill" className="text-zinc-800 text-[2.5rem]" />
                What You'll Learn
              </h2>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <Icon icon="ph:check-circle-fill" className="text-[1.6rem] text-zinc-800 mt-0.5 flex-shrink-0" />
                    <span className="text-[1.35rem] text-zinc-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Course Curriculum */}
            <div className="bg-white rounded-lg border border-zinc-200 p-10 mb-12">
              <h2 className="text-[2.5rem] font-bold text-zinc-900 mb-8 flex items-center gap-4">
                <Icon icon="ph:path-fill" className="text-zinc-800 text-[2.5rem]" />
                Course Curriculum
              </h2>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-zinc-200"></div>
                
                {/* Lessons */}
                <div className="space-y-8">
                  {lessons.length > 0 ? (
                    lessons.map((lesson, index) => (
                      <div key={lesson.id} className="relative flex items-start gap-6">
                        <div className="z-10 flex-shrink-0 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-[1.4rem] font-bold border-4 border-white shadow-md">
                          {index + 1}
                        </div>
                        <div className="bg-gradient-to-r from-zinc-50 to-white border border-zinc-200 rounded-lg p-6 w-full shadow-sm">
                          <h3 className="text-[1.6rem] font-semibold text-zinc-800 mb-3">{lesson.lessonName}</h3>
                          <div className="relative">
                            <p className="text-[1.3rem] text-zinc-600 mb-4 whitespace-pre-line">
                              {lesson.abstract || 'No description available for this lesson.'}
                            </p>
                            {lesson.abstract && lesson.abstract.length > 150 && (
                              <button 
                                onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
                                className="text-primary hover:text-primary/80 text-[1.2rem] font-medium"
                              >
                                Read More
                              </button>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-zinc-500">
                              <Icon icon="ph:clock-fill" className="text-[1.4rem]" />
                              <span className="text-[1.2rem]">
                                {new Date(lesson.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <button 
                              onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
                              className="bg-black text-white rounded-full px-6 py-2.5 text-[1.1rem] inline-flex items-center gap-2 hover:bg-zinc-800 transition-colors"
                            >
                              Start Lesson
                              <Icon icon="ph:arrow-right" className="text-[1.2rem]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Icon icon="ph:book-open" className="text-[4rem] text-zinc-400 mx-auto mb-4" />
                      <p className="text-[1.4rem] text-zinc-600">No lessons available for this course yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-4/12">
            <div className="sticky top-6">
              <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-8 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[2.75rem] font-bold text-zinc-900">${price?.toFixed(2)}</span>
                    <Badge variant="outline" className="text-[1.1rem] rounded-full bg-zinc-100 text-zinc-800 border-zinc-300 px-4 py-1.5">
                      {category}
                    </Badge>
                  </div>
                  
                  <button className="w-full py-4 rounded-full text-[1.35rem] font-semibold 
                    bg-black text-white hover:bg-zinc-800 transition-all
                    flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                  >
                    Enroll Now
                    <Icon icon="ph:arrow-right" className="text-[1.5rem]" />
                  </button>
                </div>
                
                <div className="p-8">
                  <h3 className="text-[1.8rem] font-bold text-zinc-900 mb-5">This Course Includes</h3>
                  <ul className="space-y-5">
                    {courseIncludes.map((item, index) => (
                      <li key={index} className="flex items-center gap-4">
                        <Icon icon={item.icon} className="text-[1.4rem] text-zinc-700" />
                        <span className="text-[1.35rem] text-zinc-700">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}