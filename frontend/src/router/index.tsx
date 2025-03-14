import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import { HomePage, AboutPage } from '@/pages/public'
import ErrorBoundary from '@/components/ErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> }
    ],
    errorElement: <ErrorBoundary />
  }
])