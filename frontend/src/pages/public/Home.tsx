import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'

export default function HomePage() {
  return (
    <>
      <section className="w-full h-[58rem] flex items-center justify-center">
        <div className="w-1/2 h-full flex flex-col justify-center gap-5">
          <p className="text-[4rem] font-bold w-[90%] leading-[5rem]">Unlock Your Potential with Immersive E-Learning guided by our 3D AI Teacher</p>
          <p className="text-[1.75rem] font-normal w-[85%] mb-7">Discover expert-led courses with personalized guidance from our interactive 3D AI Teacher.</p>
          <div className="flex items-center gap-10">
            <Link to="/courses" className="rounded-full bg-primary text-white px-9 py-5 border border-primary font-medium flex items-center gap-5">
              <span className="text-[1.5rem]">Explore Courses</span>
              <Icon icon="ri:arrow-right-long-line" className="text-[2rem]" />
            </Link>
            <Link to="/about" className="bg-white text-primary text-[1.5rem] font-medium relative group"> 
              <span>Learn More</span>
              <span className="absolute opacity-0 left-0 right-0 bottom-0 h-[.15rem] bg-primary group-hover:opacity-100 transition-all duration-300" />
            </Link>
          </div>
        </div>
        <div className="w-1/2 h-full"></div>
      </section>
    </>
  )
}
