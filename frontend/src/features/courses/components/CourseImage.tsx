import { OptimizeImage } from '@/components'

type CourseImageProps = {
  src?: string
  alt: string
  folder?: string
}

const CourseImage = ({ 
  src = '', 
  alt,
  folder
}: CourseImageProps) => {
  return (
    <div className="w-full h-[14.35rem] flex-shrink-0 -mb-[.5vh]">
      <OptimizeImage
        src={src}
        alt={alt}
        folder={folder}
        className="size-full"
      />
    </div>
  )
}

export default CourseImage