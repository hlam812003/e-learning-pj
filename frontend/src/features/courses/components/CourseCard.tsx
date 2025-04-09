import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { ICourse } from '@/types'
import { cn } from '@/lib/utils'

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter,
  CardAction 
} from '@/components/ui/card'
import CourseImage from './CourseImage'

type CourseCardProps = {
  course: ICourse
  className?: string
}

const CourseCard = ({ course, className }: CourseCardProps) => {
  const {
    id,
    courseName,
    abstract,
    instructor,
    level,
    duration,
    rating,
    students,
    price,
    category,
    image,
  } = course

  const formattedRating = rating?.toFixed(1)
  
  return (
    <Card className={cn(
      'overflow-hidden rounded-xl border border-slate-200 hover:border-primary transition-all duration-(--duration-main) py-0 hover:shadow-xl bg-white relative group h-full',
      className
    )}>
      <CardAction className="absolute top-5 right-4 z-10">
        <div className="bg-black text-white px-4 py-1.5 text-[1.1rem] rounded-full font-semibold shadow-xl">
          ${price?.toFixed(2)}
        </div>
      </CardAction>
      
      <CourseImage
        src={image?.name}
        alt={courseName} 
        folder={image?.folder}
      />
      
      <CardContent className="px-5 pb-[1.75rem] flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4.5">
          <span className="text-[1rem] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-[0.9rem] font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            {level}
          </span>
        </div>
        
        <CardHeader className="p-0 mb-3">
          <CardTitle className="text-[1.4rem] font-bold text-slate-800 line-clamp-2 leading-tight">
            {courseName}
          </CardTitle>
          <CardDescription className="text-[1rem] text-slate-600 line-clamp-2 mt-2">
            {abstract}
          </CardDescription>
        </CardHeader>
        
        <div className="flex items-center gap-2 mb-3">
          <Icon icon="ph:user-circle-fill" className="text-[1.75rem] text-slate-500" />
          <span className="text-[1rem] font-medium text-slate-700">{instructor}</span>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex items-center gap-1 text-amber-500">
            <Icon icon="solar:star-bold" className="text-xl" />
            <span className="text-[1.1rem] font-bold">{formattedRating}</span>
          </div>
          <span className="text-[.95rem] text-slate-500">({students?.toLocaleString()} students)</span>
          <div className="ml-auto flex items-center gap-1 text-slate-600">
            <Icon icon="ph:clock-fill" className="text-lg" />
            <span className="text-[0.95rem]">{duration}</span>
          </div>
        </div>
        
        <div className="flex-grow min-h-[10px]"></div>
        
        <CardFooter className="p-0 mt-auto">
          <Link 
            to={`/courses/${id}`} 
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

export default CourseCard