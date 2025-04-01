import { Link, Outlet, useLocation } from 'react-router-dom'
import { JSX } from 'react'
import { PageTransition } from '@/components'

export default function MainLayout() {
  const location = useLocation()

  const navItems = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'About',
      path: '/about'
    },
    {
      title: 'Courses',
      path: '/courses'
    },
    {
      title: 'Contact',
      path: '/contact'
    }
  ]

  const MainNav = (): JSX.Element => {
    return (
      <header className="w-full py-5 px-24 border-b-[.2rem] border-border flex items-center">
        <div className="w-1/3">
          <Link to="/">
            <h1 className="text-[3rem] font-bold">Learnify.</h1>
          </Link>
        </div>
        <div className="w-1/3">
          <nav className="flex items-center justify-center gap-9">
            {navItems.map((item, index) => {
              return (
                <Link key={index} to={item.path} className="relative group">
                  <span className="text-[1.5rem]">{item.title}</span>
                  <span 
                    className={`
                      absolute left-0 right-0 bottom-0 h-[.15rem] bg-primary group-hover:scale-x-100 transition-transform duration-250 origin-center
                      ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0'}
                    `} />
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="w-1/3 flex items-center justify-end gap-9">
          <Link to="/auth/login" className="text-black text-[1.45rem] relative group">
            <span>Log in</span>
            <span className="absolute left-0 right-0 bottom-0 h-[.15rem] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-center" />
          </Link>
          <Link to="/auth/signup" className="rounded-full bg-primary text-white px-8.5 py-3.5 text-[1.45rem] border border-primary font-medium">
            Sign Up
          </Link>
        </div>
      </header>
    )
  }

  return (
    <div className="min-h-screen w-full">
      <MainNav />
      <main className="px-24">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  )
}