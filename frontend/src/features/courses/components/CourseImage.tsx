import nestjsGraphql from '@/assets/CourseImage/NestJSGraphQL.jpg'
import nhapMonLapTrinhNhapMonLapTrinh from '@/assets/CourseImage/NhapMonLapTrinh.png'
import cauTrucDuLieucauTrucDuLieu from '@/assets/CourseImage/CauTrucDuLieuGiaiThuat.jpg'

const imageMap: Record<string, string> = {
  'NestJS GraphQL': nestjsGraphql,
  'Nhập môn lập trình': nhapMonLapTrinhNhapMonLapTrinh,
  'Cấu trúc dữ liệu và giải thuật': cauTrucDuLieucauTrucDuLieu,
}

type CourseImageProps = {
  courseName: string
  alt: string
}

const CourseImage = ({ courseName, alt }: CourseImageProps) => {
  const src = imageMap[courseName] || ''
  return (
    <div className="w-full h-full">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
    </div>
  )
}

export default CourseImage