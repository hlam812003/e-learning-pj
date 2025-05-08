import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from '@/components/ui/sonner'
import { Loading } from '@/components'

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Toaster position="bottom-right" richColors closeButton />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </Suspense>
  )
}