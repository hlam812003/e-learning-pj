import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { cn } from '@/lib'
import CourseImage from './CourseImage'

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card'

interface Course {
  id: string
  courseName: string
  abstract: string
  createdAt: string
  updatedAt: string
}

interface CourseCardProps {
  course: Course
  className?: string
}

export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <Card className={cn(
      'overflow-hidden rounded-xl border border-slate-200 hover:border-primary transition-all duration-(--duration-main) py-0 hover:shadow-xl bg-white relative group h-full',
      className
    )}>

      <CourseImage
        courseName={course.courseName}
        alt={course.courseName}
      />
      
      <CardContent className="px-5 pb-[1.75rem] flex flex-col flex-grow">
        <CardHeader className="p-0 mb-3.5">
          <CardTitle className="text-[1.4rem] font-bold text-slate-800 line-clamp-2 leading-tight">
            {course.courseName}
          </CardTitle>
          <CardDescription className="text-[1rem] text-slate-600 line-clamp-2 mt-2">
            {course.abstract}
          </CardDescription>
        </CardHeader>
        
        <div className="flex items-center gap-2 mb-3.5">
          <Icon icon="ph:clock" className="text-[1.75rem] text-slate-500" />
          <span className="text-[1rem] font-medium text-slate-700">
            {new Date(course.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <CardFooter className="p-0 mt-auto">
          <Link 
            to={`/courses/${course.id}`} 
            className="w-full py-3.5 rounded-full text-[1.2rem] font-semibold text-center transition-all
              border-2 border-black text-black
              flex items-center justify-center gap-3
              hover:bg-black hover:text-white"
          >
            View Course
            <Icon icon="carbon:view-filled" className="text-[1.5rem]" />
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  )
} 