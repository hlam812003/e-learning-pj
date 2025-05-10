import { useState, useMemo, ChangeEvent, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useCoursesStore } from '@/stores/courses.store'
import { CourseCard } from '@/features/courses'
import { MainDropdown } from '@/components'
import { sortOptions } from '@/mocks'
import { Skeleton } from '@/components/ui/skeleton'

export default function CoursesPage() {
  const { courses, isLoading, error, fetchCourses } = useCoursesStore()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('popular')
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredCourses = useMemo(() => {
    return courses
      .filter(course => {
        const matchesSearch = 
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.abstract.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesSearch
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          default:
            return 0
        }
      })
  }, [courses, searchTerm, sortBy])

  const handleClearFilters = () => {
    setSearchTerm('')
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-[10rem]">
        <Icon icon="ph:warning-circle" className="text-[5.5rem] text-red-500 mb-6" />
        <h3 className="text-3xl font-bold text-slate-700 mb-3">Error loading courses</h3>
        <p className="text-[1.25rem] text-slate-500 max-w-xl mb-6">
          {error}
        </p>
        <button
          onClick={() => fetchCourses()}
          className="rounded-full bg-primary text-white px-8.5 py-3.5 text-[1.45rem] border border-primary font-medium cursor-pointer"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="w-full px-24 py-10">
      <h1 className="element-animation text-[2.5rem] font-bold mb-3.5">Explore Our Courses</h1>
      
      <section className="w-full mb-8">
        <div className="flex flex-col space-y-6 mb-8 border-b-[.125rem] border-gray-300 pb-9">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="element-animation relative w-[28rem]">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3.5 text-[1.25rem] border border-slate-200 rounded-full focus:outline-none focus:border-primary/50 transition-colors"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                  <Icon icon="ph:magnifying-glass" className="text-2xl" />
                </div>
              </div>
              
              <MainDropdown
                value={sortBy}
                options={sortOptions}
                onChange={setSortBy}
                placeholder="Sort by"
                minWidth="140px"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="element-animation">
            <h2 className="text-[1.8rem] font-bold text-slate-800">All Courses ({filteredCourses.length})</h2>
            <div className="mt-1">
              {searchTerm ? (
                <p className="text-[1.25rem] text-slate-600">Showing filtered results</p>
              ) : (
                <p className="text-[1.25rem] text-slate-600">Browse our collection of high-quality courses</p>
              )}
            </div>
          </div>
          
          <MainDropdown
            value={itemsPerPage}
            options={[10, 20, 50, 100]}
            onChange={setItemsPerPage}
            placeholder="Show items"
            minWidth="140px"
          />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="element-animation grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {filteredCourses.slice(0, itemsPerPage).map(course => (
              <CourseCard 
                key={course.id} 
                course={course}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-[10rem]">
            <Icon icon="ph:magnifying-glass-light" className="text-[5.5rem] text-[#2b2b2b] mb-6" />
            <h3 className="text-3xl font-bold text-slate-700 mb-3">No courses found...</h3>
            <p className="text-[1.25rem] text-slate-500 max-w-xl">
              We couldn't find any courses matching your current filters. Try changing your search terms.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-6 rounded-full bg-primary text-white px-8.5 py-3.5 text-[1.45rem] border border-primary font-medium cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}