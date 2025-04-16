import { useState, useMemo, ChangeEvent } from 'react'
import { Icon } from '@iconify/react'

import { CourseCard } from '@/features/courses'
import { MainDropdown } from '@/components'
import { courses, categories, levels, sortOptions } from '@/mocks'

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories')
  const [selectedLevel, setSelectedLevel] = useState<string>('All Levels')
  const [sortBy, setSortBy] = useState<string>('popular')
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredCourses = useMemo(() => {
    return courses
      .filter(course => {
        const matchesSearch = 
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          false

        const matchesCategory = 
          selectedCategory === 'All Categories' || 
          course.category === selectedCategory

        const matchesLevel = 
          selectedLevel === 'All Levels' || 
          course.level === selectedLevel

        return matchesSearch && matchesCategory && matchesLevel
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return (b.students || 0) - (a.students || 0)
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          case 'price-asc':
            return (a.price || 0) - (b.price || 0)
          case 'price-desc':
            return (b.price || 0) - (a.price || 0)
          case 'rating':
            return (b.rating || 0) - (a.rating || 0)
          default:
            return 0
        }
      })
  }, [searchTerm, selectedCategory, selectedLevel, sortBy])

  return (
    <div className="w-full py-10">
      <h1 className="element-animation text-[2.5rem] font-bold mb-3.5">Explore Our Courses</h1>
      
      <section className="w-full mb-8">
        <div className="flex flex-col space-y-6 mb-8 border-b-[.125rem] border-gray-300 pb-9">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="element-animation relative w-[28rem]">
                <input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3.5 text-[1.25rem] border border-slate-200 rounded-full focus:outline-none focus:border-primary/50 transition-colors"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                  <Icon icon="ph:magnifying-glass" className="text-2xl" />
                </div>
              </div>
              
              <MainDropdown
                value={selectedCategory}
                options={categories}
                onChange={setSelectedCategory}
                placeholder="All Categories"
                minWidth="200px"
              />
              
              <MainDropdown
                value={selectedLevel}
                options={levels}
                onChange={setSelectedLevel}
                placeholder="All Levels"
                minWidth="160px"
              />
              
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
              {selectedCategory !== 'All Categories' || selectedLevel !== 'All Levels' || searchTerm ? (
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
        
        {filteredCourses.length > 0 ? (
          <div className="element-animation grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {filteredCourses.slice(0, itemsPerPage).map(course => (
              <CourseCard 
                key={course.id} 
                course={course}
              />
            ))}
          </div>
        ) : (
          <div className="element-animation flex flex-col items-center justify-center py-20 text-center">
            <Icon icon="ph:magnifying-glass-duotone" className="text-9xl text-slate-300 mb-6" />
            <h3 className="text-3xl font-bold text-slate-700 mb-3">No courses found</h3>
            <p className="text-[1.25rem] text-slate-500 max-w-xl">
              We couldn't find any courses matching your current filters. Try changing your search terms or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All Categories')
                setSelectedLevel('All Levels')
              }}
              className="mt-6 rounded-full bg-primary text-white px-8.5 py-3.5 text-[1.45rem] border border-primary font-medium hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}