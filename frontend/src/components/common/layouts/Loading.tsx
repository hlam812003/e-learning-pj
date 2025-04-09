import './Loading.css'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg viewBox="25 25 50 50" className="loading__svg">
        <circle r="20" cy="50" cx="50" className="loading__circle" />
      </svg>
    </div>
  )
}