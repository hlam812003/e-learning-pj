import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error)) {
    return <div>Lỗi: {error.status} - {error.statusText}</div>
  }
  
  return <div>Đã xảy ra lỗi không mong muốn</div>
}