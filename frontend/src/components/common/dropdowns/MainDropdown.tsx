import { useRef, useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

type Option = {
  label: string
  value: string | number
}

type DropdownProps<T extends string | number> = {
  value: T
  options: Option[] | (string | number)[]
  onChange: (value: T) => void
  placeholder?: string
  className?: string
  minWidth?: string
}

const MainDropdown = <T extends string | number>({ 
  value, 
  options, 
  onChange, 
  placeholder = 'Select option',
  className,
  minWidth = '140px'
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const normalizedOptions = options.map(option => 
    typeof option === 'object' 
      ? option 
      : { label: String(option), value: option }
  )

  const selectedLabel = normalizedOptions.find(opt => opt.value === value)?.label || placeholder

  return (
    <div ref={dropdownRef} className={cn('element-animation relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-5 py-3.5 text-[1.25rem] border border-slate-200',
          'rounded-full bg-white hover:border-primary/50 transition-colors focus:outline-none',
          'cursor-pointer justify-between'
        )}
        style={{ minWidth }}
      >
        <span>{selectedLabel}</span>
        <Icon 
          icon="ph:caret-down" 
          className={cn('text-xl transition-transform', isOpen && 'rotate-180')} 
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-full py-2 rounded-xl bg-white shadow-lg border border-slate-200 z-50"
            style={{ minWidth }}
          >
            <div className="py-1 max-h-[300px] overflow-y-auto">
              {normalizedOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value as T)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'flex items-center w-full px-4 py-2.5 text-left hover:bg-slate-50',
                    'transition-colors text-[1.1rem]',
                    option.value === value && 'bg-slate-50/80'
                  )}
                >
                  <span>{option.label}</span>
                  {option.value === value && (
                    <Icon icon="lucide:check" className="ml-auto text-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainDropdown