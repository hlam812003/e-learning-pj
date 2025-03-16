import { Link, Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full">
      <header className="w-full py-5 px-24 border-b-[.2rem] border-border flex items-center">
        <div className="w-1/3">
          <Link to="/">
            <h1 className="text-[3rem] font-bold">Learnify.</h1>
          </Link>
        </div>
        <div className="w-1/3">
          <nav className="flex items-center justify-center gap-9">
            <Link to="/" className="text-[1.5rem] relative group">
              <span>Home</span>
              <span className="absolute left-0 right-0 bottom-0 h-[.15rem] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-center" />
            </Link>
            <Link to="/about" className="text-[1.5rem] relative group">
              <span>About</span>
              <span className="absolute left-0 right-0 bottom-0 h-[.15rem] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-center" />
            </Link>
            <Link to="/courses" className="text-[1.5rem] relative group">
              <span>Courses</span>
              <span className="absolute left-0 right-0 bottom-0 h-[.15rem] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-center" />
            </Link>
            <Link to="/contact" className="text-[1.5rem] relative group">
              <span>Contact</span>
              <span className="absolute left-0 right-0 bottom-0 h-[.15rem] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-center" />
            </Link>
          </nav>
        </div>
        <div className="w-1/3 flex items-center justify-end gap-9">
          <Link to="/login" className="text-black text-[1.45rem] relative group">
            <span>Log in</span>
            <span className="absolute left-0 right-0 bottom-0 h-[.15rem] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-center" />
          </Link>
          <Link to="/signup" className="rounded-full bg-primary text-white px-8.5 py-3.5 text-[1.45rem] border border-primary font-medium">
            Sign Up
          </Link>
        </div>
      </header>
      <main className="w-full px-24">
        <Outlet />
      </main>
      {/* <footer>Footer chung</footer> */}
    </div>
  )
}