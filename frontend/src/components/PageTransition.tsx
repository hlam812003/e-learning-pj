import { ReactNode, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP } from '@/lib/gsap'

type PageTransitionProps = {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)
  const prevPathRef = useRef<string>(location.pathname)

  useGSAP(() => {
    if (prevPathRef.current !== location.pathname) {
      const tl = gsap.timeline()
      
      const mainElements = containerRef.current ? 
        Array.from(containerRef.current.querySelectorAll('section, div, h1, h2, h3, p')).filter(element => element.id !== 'home-pattern') : []
      
      tl.to(containerRef.current, {
        opacity: 0,
        duration: .25,
        ease: 'power2.inOut',
        onComplete: () => {
          prevPathRef.current = location.pathname
        }
      })
      
      .fromTo(containerRef.current, 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: .25, 
          ease: 'power2.inOut',
        }
      )
      
      if (mainElements.length > 0) {
        tl.fromTo(mainElements, 
          { 
            y: 30, 
            opacity: 0 
          },
          { 
            y: 0, 
            opacity: 1, 
            stagger: 0.05,
            duration: 0.5, 
            ease: 'back.out(1.7)',
            clearProps: 'all'
          },
          '-=0.1'
        )
      }
    }
  }, [location.pathname])

  return (
    <div ref={containerRef} className="w-full min-h-full">
      {children}
    </div>
  )
} 