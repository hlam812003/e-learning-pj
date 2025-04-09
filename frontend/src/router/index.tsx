import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout, MainLayout } from '@/layouts'
import { ErrorBoundary } from '@/components'

const Pages = {
  Main: {
    Home: lazy(() => import('@/pages/public/Home')),
    About: lazy(() => import('@/pages/public/About')),
    Courses: lazy(() => import('@/pages/public/Courses')),
    Contact: lazy(() => import('@/pages/public/Contact'))
  },
  Auth: {
    Login: lazy(() => import('@/pages/public/auth/Login')),
    Register: lazy(() => import('@/pages/public/auth/Register'))
  }
} 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Pages.Main.Home /> },
      { path: 'about', element: <Pages.Main.About /> },
      { path: 'courses', element: <Pages.Main.Courses /> },
      { path: 'contact', element: <Pages.Main.Contact /> }
    ],
    errorElement: <ErrorBoundary />
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Pages.Auth.Login /> },
      { path: 'signup', element: <Pages.Auth.Register /> }
    ],
    errorElement: <ErrorBoundary />
  }
])