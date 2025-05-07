import './Loading.css'

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col gap-3 items-center justify-center">
      <svg viewBox="25 25 50 50" className="loading__svg">
        <circle r="20" cy="50" cx="50" className="loading__circle" />
      </svg>
      <span className="text-black text-[1.15rem] font-medium">Loading...</span>
    </div>
  )
}