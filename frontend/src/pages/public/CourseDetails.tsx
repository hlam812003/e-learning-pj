import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'

import { courses } from '@/mocks'
import { ICourse } from '@/types'

import { OptimizeImage } from '@/components'
import { Badge } from '@/components/ui/badge'

export default function CourseDetails() {
  const { courseId } = useParams<{ courseId: string }>()
  const [course, setCourse] = useState<ICourse | null>(null)

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === courseId)
    setCourse(foundCourse || null)
  }, [courseId])

  if (!course) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center">
        <Icon icon="ph:warning-circle" className="text-[6rem] text-zinc-500 mb-4" />
        <h2 className="text-[2rem] font-bold text-zinc-800 mb-2">Course Not Found</h2>
        <p className="text-[1.25rem] text-zinc-600 mb-6">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <button 
          onClick={() => window.history.back()}
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
          
          <div className="w-[45%]">
            <div className="aspect-video rounded-lg overflow-hidden bg-zinc-800 shadow-xl relative">
              {image && (
                <OptimizeImage 
                  src={image.name}
                  alt={courseName}
                  folder={image.folder}
                  className="size-full object-cover"
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
            
            {/* Course Curriculum Section */}
            <div className="bg-white rounded-lg border border-zinc-200 p-10 mb-12">
              <h2 className="text-[2.5rem] font-bold text-zinc-900 mb-8 flex items-center gap-4">
                <Icon icon="ph:path-fill" className="text-zinc-800 text-[2.5rem]" />
                Learning Path
              </h2>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[27px] top-0 bottom-0 w-1 bg-zinc-200"></div>
                
                {/* Path items */}
                <div className="space-y-8">
                  <div className="relative flex items-start gap-6">
                    <div className="z-10 flex-shrink-0 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-[1.4rem] font-bold border-4 border-white shadow-md">
                      1
                    </div>
                    <div className="bg-gradient-to-r from-zinc-50 to-white border border-zinc-200 rounded-lg p-6 w-full shadow-sm">
                      <h3 className="text-[1.6rem] font-semibold text-zinc-800 mb-3">Master Path</h3>
                      <p className="text-[1.3rem] text-zinc-600 mb-4">Duration: 12 months</p>
                      <div className="mb-4">
                        <h4 className="text-[1.3rem] font-medium text-zinc-700 mb-2">Learning Objectives:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-[1.2rem] text-zinc-600">Become a Full-Stack Master</li>
                          <li className="text-[1.2rem] text-zinc-600">Optimize application performance</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[1.3rem] font-medium text-zinc-700 mb-2">Topics:</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[0.95rem]">Advanced React</span>
                          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[0.95rem]">GraphQL</span>
                          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[0.95rem]">DevOps</span>
                        </div>
                      </div>
                      <button className="mt-5 bg-black text-white rounded-full px-6 py-2.5 text-[1.1rem] inline-flex items-center gap-2 hover:bg-zinc-800 transition-colors">
                        Choose this path
                        <Icon icon="ph:arrow-right" className="text-[1.2rem]" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start gap-6">
                    <div className="z-10 flex-shrink-0 w-14 h-14 rounded-full bg-zinc-700 text-white flex items-center justify-center text-[1.4rem] font-bold border-4 border-white shadow-md">
                      2
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-lg p-6 w-full shadow-sm">
                      <h3 className="text-[1.6rem] font-semibold text-zinc-800 mb-3">Basic Path</h3>
                      <p className="text-[1.3rem] text-zinc-600 mb-4">Duration: 3 months</p>
                      <div className="mb-4">
                        <h4 className="text-[1.3rem] font-medium text-zinc-700 mb-2">Learning Objectives:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-[1.2rem] text-zinc-600">Understand basic concepts</li>
                          <li className="text-[1.2rem] text-zinc-600">Build a solid foundation</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[1.3rem] font-medium text-zinc-700 mb-2">Topics:</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[0.95rem]">HTML</span>
                          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[0.95rem]">CSS</span>
                          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[0.95rem]">Basic JavaScript</span>
                        </div>
                      </div>
                      <button className="mt-5 bg-zinc-200 text-zinc-700 rounded-full px-6 py-2.5 text-[1.1rem] inline-flex items-center gap-2 hover:bg-zinc-300 transition-colors">
                        Choose this path
                        <Icon icon="ph:arrow-right" className="text-[1.2rem]" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start gap-6">
                    <div className="z-10 flex-shrink-0 w-14 h-14 rounded-full bg-zinc-500 text-white flex items-center justify-center text-[1.4rem] font-bold border-4 border-white shadow-md">
                      3
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-lg p-6 w-full shadow-sm">
                      <h3 className="text-[1.6rem] font-semibold text-zinc-800 mb-3">Advanced Path</h3>
                      <p className="text-[1.3rem] text-zinc-600 mb-4">Duration: 6 months</p>
                      <div className="mb-4">
                        <h4 className="text-[1.3rem] font-medium text-zinc-700 mb-2">Learning Objectives:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-[1.2rem] text-zinc-600">Develop advanced skills</li>
                          <li className="text-[1.2rem] text-zinc-600">Build real-world projects</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[1.3rem] font-medium text-zinc-700 mb-2">Topics:</h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[0.95rem]">React</span>
                          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[0.95rem]">Node.js</span>
                          <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-[0.95rem]">Database Design</span>
                        </div>
                      </div>
                      <button className="mt-5 bg-zinc-200 text-zinc-700 rounded-full px-6 py-2.5 text-[1.1rem] inline-flex items-center gap-2 hover:bg-zinc-300 transition-colors">
                        Choose this path
                        <Icon icon="ph:arrow-right" className="text-[1.2rem]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Student Reviews */}
            <div className="bg-white rounded-lg border border-zinc-200 p-10 mb-12">
              <h2 className="text-[2.5rem] font-bold text-zinc-900 mb-8 flex items-center gap-4">
                <Icon icon="ph:chat-fill" className="text-zinc-800 text-[2.5rem]" />
                Student Reviews
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Review Card 1 */}
                <div className="border border-zinc-200 rounded-md p-7 hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center">
                        <Icon icon="ph:user-circle-fill" className="text-[3rem] text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="text-[1.5rem] font-semibold text-zinc-800">Alex Johnson</h4>
                        <p className="text-[1.2rem] text-zinc-500">2 months ago</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon key={star} icon="ph:star-fill" className="text-[1.4rem] text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[1.35rem] text-zinc-700 leading-relaxed">
                    This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I was able to build my first Flutter app within a week of starting the course.
                  </p>
                </div>
                
                {/* Review Card 2 */}
                <div className="border border-zinc-200 rounded-md p-7 hover:border-zinc-300 transition-colors">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center">
                        <Icon icon="ph:user-circle-fill" className="text-[3rem] text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="text-[1.5rem] font-semibold text-zinc-800">Sarah Miller</h4>
                        <p className="text-[1.2rem] text-zinc-500">1 month ago</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Icon key={star} icon="ph:star-fill" className="text-[1.4rem] text-yellow-400" />
                      ))}
                      <Icon icon="ph:star" className="text-[1.4rem] text-yellow-400" />
                    </div>
                  </div>
                  <p className="text-[1.35rem] text-zinc-700 leading-relaxed">
                    Great course with practical examples. The section on state management was particularly helpful. I would have liked more content on testing Flutter applications, but overall it's a solid course.
                  </p>
                </div>
              </div>
              
              {/* Rating Breakdown */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-10 p-8 bg-zinc-50 rounded-md">
                <div className="text-center">
                  <div className="text-[3rem] font-bold text-zinc-900">4.7</div>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon key={star} icon="ph:star-fill" className="text-[1.4rem] text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[1.1rem] text-zinc-500">1,543 ratings</p>
                </div>
                
                <div className="flex-1">
                  {/* 5 stars */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[1.1rem] font-medium text-zinc-700 w-4">5</span>
                    <Icon icon="ph:star-fill" className="text-[1.1rem] text-yellow-400" />
                    <div className="flex-1 h-4 bg-zinc-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-[1.1rem] text-zinc-500 w-14 text-right">78%</span>
                  </div>
                  
                  {/* 4 stars */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[1.1rem] font-medium text-zinc-700 w-4">4</span>
                    <Icon icon="ph:star-fill" className="text-[1.1rem] text-yellow-400" />
                    <div className="flex-1 h-4 bg-zinc-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-[1.1rem] text-zinc-500 w-14 text-right">15%</span>
                  </div>
                  
                  {/* 3 stars */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[1.1rem] font-medium text-zinc-700 w-4">3</span>
                    <Icon icon="ph:star-fill" className="text-[1.1rem] text-yellow-400" />
                    <div className="flex-1 h-4 bg-zinc-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <span className="text-[1.1rem] text-zinc-500 w-14 text-right">5%</span>
                  </div>
                  
                  {/* 2 stars */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[1.1rem] font-medium text-zinc-700 w-4">2</span>
                    <Icon icon="ph:star-fill" className="text-[1.1rem] text-yellow-400" />
                    <div className="flex-1 h-4 bg-zinc-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                    <span className="text-[1.1rem] text-zinc-500 w-14 text-right">1%</span>
                  </div>
                  
                  {/* 1 star */}
                  <div className="flex items-center gap-3">
                    <span className="text-[1.1rem] font-medium text-zinc-700 w-4">1</span>
                    <Icon icon="ph:star-fill" className="text-[1.1rem] text-yellow-400" />
                    <div className="flex-1 h-4 bg-zinc-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                    <span className="text-[1.1rem] text-zinc-500 w-14 text-right">1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-4/12">
            <div className="sticky top-6">
              <div className="md:hidden mb-8 aspect-video rounded-md overflow-hidden bg-zinc-100 relative shadow-md">
                {image && (
                  <OptimizeImage 
                    src={image.name}
                    alt={courseName}
                    folder={image.folder}
                    className="size-full object-cover"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-zinc-100 transition-colors duration-300">
                    <Icon icon="ph:play-fill" className="text-black text-[1.5rem] ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow mb-10">
                <div className="p-8 border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[2.75rem] font-bold text-zinc-900">${price?.toFixed(2)}</span>
                    <Badge variant="outline" className="text-[1.1rem] rounded-full bg-zinc-100 text-zinc-800 border-zinc-300 px-4 py-1.5">
                      {category}
                    </Badge>
                  </div>
                  
                  <button className="w-full py-4 rounded-full text-[1.35rem] font-semibold 
                    bg-black text-white hover:bg-zinc-800 transition-all
                    flex items-center justify-center gap-3 mb-5 shadow-sm hover:shadow-md"
                  >
                    Enroll Now
                    <Icon icon="ph:arrow-right" className="text-[1.5rem]" />
                  </button>
                  
                  <button className="w-full py-4 rounded-full text-[1.35rem] font-semibold
                    border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-all
                    flex items-center justify-center gap-3"
                  >
                    <Icon icon="ph:shopping-cart" className="text-[1.5rem]" />
                    Add to Cart
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
                
                <div className="p-8 border-t border-zinc-200 bg-gradient-to-r from-zinc-50 to-white">
                  <h3 className="text-[1.8rem] font-bold text-zinc-900 mb-5">Share This Course</h3>
                  <div className="flex items-center gap-4">
                    <button className="bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-800 p-4 rounded-full hover:scale-105">
                      <Icon icon="ph:facebook-logo-fill" className="text-[1.4rem]" />
                    </button>
                    <button className="bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-800 p-4 rounded-full hover:scale-105">
                      <Icon icon="ph:twitter-logo-fill" className="text-[1.4rem]" />
                    </button>
                    <button className="bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-800 p-4 rounded-full hover:scale-105">
                      <Icon icon="ph:instagram-logo-fill" className="text-[1.4rem]" />
                    </button>
                    <button className="bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-800 p-4 rounded-full hover:scale-105">
                      <Icon icon="ph:linkedin-logo-fill" className="text-[1.4rem]" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-8">
                  <h3 className="text-[1.8rem] font-bold text-zinc-900 mb-5 flex items-center gap-3">
                    <Icon icon="ph:robot-fill" className="text-zinc-800 text-[1.8rem]" />
                    AI Instructor
                  </h3>
                  
                  <div className="flex items-center gap-5 mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Icon icon="ph:robot-fill" className="text-[2.5rem] text-white" />
                    </div>
                    <div>
                      <h4 className="text-[1.5rem] font-semibold text-zinc-800">AI Assistant</h4>
                      <p className="text-[1.2rem] text-zinc-500">Virtual Teaching Environment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 mb-5 text-[1.1rem] text-zinc-600">
                    <div className="flex items-center gap-2">
                      <Icon icon="ph:star-fill" className="text-yellow-400 text-[1.25rem]" />
                      <span>4.9 System Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon icon="ph:users-three-fill" className="text-[1.25rem]" />
                      <span>24,650+ Students</span>
                    </div>
                  </div>
                  
                  <p className="text-[1.35rem] text-zinc-700 leading-relaxed">
                    Our advanced AI teaching system creates personalized learning experiences in an immersive 3D environment. 
                    The course adapts to your learning pace and provides real-time feedback to optimize your progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}