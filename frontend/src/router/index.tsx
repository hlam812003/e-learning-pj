import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import { HomePage, AboutPage, LoginPage, RegisterPage } from '@/pages/public'
import ErrorBoundary from '@/components/ErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <RegisterPage /> }
    ],
    errorElement: <ErrorBoundary />
  }
])