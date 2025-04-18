import './Loading.css'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <svg viewBox="25 25 50 50" className="loading__svg">
        <circle r="20" cy="50" cx="50" className="loading__circle" />
      </svg>
    </div>
  )
}