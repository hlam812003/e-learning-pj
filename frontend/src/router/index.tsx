import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout, MainLayout } from '@/layouts'
import { ErrorBoundary } from '@/components'

const HomePage = lazy(() => import('@/pages/public/Home'))
const AboutPage = lazy(() => import('@/pages/public/About'))
const LoginPage = lazy(() => import('@/pages/public/auth/Login'))
const RegisterPage = lazy(() => import('@/pages/public/auth/Register'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
    errorElement: <ErrorBoundary />
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <RegisterPage /> }
    ],
    errorElement: <ErrorBoundary />
  }
])