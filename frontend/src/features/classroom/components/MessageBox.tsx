import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Icon } from '@iconify/react'
import { cn, gsap, useGSAP } from '@/lib'
import { useClassroomStore } from '../stores'
import { messageService } from '../services'
import { useTeacherSpeech } from '../hooks'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

export interface MessageBoxHandle {
  show: () => void
  hide: () => void
  toggle: () => void
}

interface MessageBoxProps {
  visible?: boolean
  onVisibilityChange?: (visible: boolean) => void
}

const MessageBox = forwardRef<MessageBoxHandle, MessageBoxProps>(({ 
  visible = true,
  onVisibilityChange
}, ref) => {
  const { courseId, lessonId } = useParams()

  const { speak: speakAzure, isReady: isAzureReady } = useTeacherSpeech()
  const startThinking = useClassroomStore((state) => state.startThinking)
  const stopAll = useClassroomStore((state) => state.stopAll)

  const [message, setMessage] = useState<string>('')
  const [isVisible, setIsVisible] = useState(visible)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  
  
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const messageBoxRef = useRef<HTMLDivElement>(null)
  const collapseButtonRef = useRef<HTMLButtonElement>(null)
  const collapseButtonContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const expandIconRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    if (messageBoxRef.current) {
      if (isVisible) {
        gsap.set(messageBoxRef.current, {
          width: '53rem',
          height: '13.5rem',
          borderRadius: '1.25rem',
          opacity: 1
        })

        if (contentRef.current) {
          gsap.set(contentRef.current, { opacity: 1, display: 'flex' })
        }

        if (controlsRef.current) {
          gsap.set(controlsRef.current, { opacity: 1, display: 'flex' })
        }

        if (collapseButtonContainerRef.current) {
          gsap.set(collapseButtonContainerRef.current, { 
            opacity: 1,
            display: 'block'
          })
        }

        if (expandIconRef.current) {
          gsap.set(expandIconRef.current, { 
            opacity: 0,
            display: 'none' 
          })
        }
      } else {
        gsap.set(messageBoxRef.current, {
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          opacity: 1
        })
        
        if (contentRef.current) {
          gsap.set(contentRef.current, { opacity: 0, display: 'none' })
        }

        if (controlsRef.current) {
          gsap.set(controlsRef.current, { opacity: 0, display: 'none' })
        }

        if (collapseButtonContainerRef.current) {
          gsap.set(collapseButtonContainerRef.current, { 
            opacity: 0,
            display: 'none'
          })
        }
        
        if (expandIconRef.current) {
          gsap.set(expandIconRef.current, { 
            opacity: 1,
            display: 'flex' 
          })
        }
      }
    }
    
    if (visible !== isVisible && !isAnimating) {
      if (visible) showMessageBox()
      else hideMessageBox()
    }
  }, { scope: containerRef, dependencies: [isVisible, visible, isAnimating] })

  const showMessageBox = () => {
    if (isAnimating || isVisible) return
    
    setIsAnimating(true)
    
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        if (inputRef.current) inputRef.current.focus()
      }
    })
    
    if (messageBoxRef.current) {
      messageBoxRef.current.style.pointerEvents = 'auto'
      
      if (expandIconRef.current) {
        tl.to(expandIconRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.15,
          ease: 'power1.in',
          onComplete: () => {
            if (expandIconRef.current) {
              expandIconRef.current.style.display = 'none'
            }
          }
        })
      }
      
      tl.to(messageBoxRef.current, {
        width: '53rem',
        height: '13.5rem',
        borderRadius: '1.25rem',
        duration: 0.35,
        ease: 'back.out(1.2)',
      }, '-=0.1')
      
      if (collapseButtonContainerRef.current) {
        tl.set(collapseButtonContainerRef.current, {
          display: 'block',
          opacity: 0
        }, '-=0.25')
        .to(collapseButtonContainerRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: 'power1.out'
        }, '-=0.2')
      }
      
      if (contentRef.current) {
        tl.set(contentRef.current, { 
          display: 'flex',
          opacity: 0,
          y: 10
        }, '-=0.15')
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out'
        }, '-=0.1')
      }
      
      if (titleRef.current && subtitleRef.current) {
        tl.fromTo([titleRef.current, subtitleRef.current], 
          { y: 10, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.2,
            stagger: 0.05,
            ease: 'power2.out' 
          },
          '-=0.1'
        )
      }
      
      if (controlsRef.current) {
        tl.set(controlsRef.current, { 
          display: 'flex',
          opacity: 0,
          y: 10
        }, '-=0.1')
        .to(controlsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out'
        }, '-=0.1')
      }
    }
    
    tl.call(() => {
      setIsVisible(true)
      onVisibilityChange?.(true)
    })
  }

  const hideMessageBox = () => {
    if (isAnimating || !isVisible) return
    
    setIsAnimating(true)
    
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
      }
    })
    
    if (messageBoxRef.current) {
      if (controlsRef.current) {
        tl.to(controlsRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            if (controlsRef.current) controlsRef.current.style.display = 'none'
          }
        })
      }
      
      if (contentRef.current) {
        tl.to(contentRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: 'power2.in',
          onComplete: () => {
            if (contentRef.current) contentRef.current.style.display = 'none'
          }
        }, '-=0.1')
      }
      
      if (collapseButtonContainerRef.current) {
        tl.to(collapseButtonContainerRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power1.in',
          onComplete: () => {
            if (collapseButtonContainerRef.current) {
              collapseButtonContainerRef.current.style.display = 'none'
            }
          }
        }, '-=0.1')
      }
      
      tl.to(messageBoxRef.current, {
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        duration: 0.4,
        ease: 'back.in(1.2)'
      }, '-=0.2')
      
      if (expandIconRef.current) {
        tl.set(expandIconRef.current, {
          display: 'flex',
          opacity: 0,
          scale: 0.8
        }, '-=0.2')
        .to(expandIconRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: 'back.out(1.7)'
        }, '-=0.1')
      }
    }
    
    tl.call(() => {
      setIsVisible(false)
      onVisibilityChange?.(false)
    })
  }

  const toggleMessageBox = () => {
    if (isAnimating) return
    
    if (isVisible) {
      hideMessageBox()
    } else {
      showMessageBox()
    }
  }

  useImperativeHandle(ref, () => ({
    show: showMessageBox,
    hide: hideMessageBox,
    toggle: toggleMessageBox
  }))

  const messageMutation = useMutation({
    mutationFn: (content: string | null) => messageService.createMessage(
      content,
      'b4696dad-d103-497f-bf96-ca56fa992b2a', // TEST_CONVERSATION_ID
      courseId || '1',
      lessonId || '1'
    ),
    onSuccess: async (result) => {
      if (result) {
        setMessage('')
        
        if (result.content) {
          try {
            startThinking()
            
            if (!isAzureReady) return
            
            const speakResult = await speakAzure(result.content)
            
            if (!speakResult?.success && speakResult?.error) {
              stopAll()
              
              if (speakResult.error.includes('disposed')) {
                await new Promise(resolve => setTimeout(resolve, 500))
                const retryResult = await speakAzure(result.content)
                
                if (!retryResult?.success) {
                  toast.error(`Lỗi khi phát âm: ${retryResult.error}`)
                  stopAll()
                }
              } else {
                toast.error(`Lỗi khi phát âm: ${speakResult.error}`)
                stopAll()
              }
            }
          } catch (error: any) {
            stopAll()
            toast.error(error?.message || 'Không thể kích hoạt giọng nói cho AI Teacher')
          }
        }
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Không thể gửi tin nhắn')
    }
  })

  const handleSubmit = () => {
    if (message.trim()) {
      messageMutation.mutate(message)
    } else if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleVoiceInput = () => {
    console.log('Voice input activated')
  }
  
  return (
    <div ref={containerRef} className="absolute bottom-[1.65rem] left-1/2 -translate-x-1/2 flex items-center justify-center z-50">
      <div 
        ref={messageBoxRef}
        className={cn(
          'bg-white/20 backdrop-blur-[16px] border border-white/20',
          'flex items-center justify-center overflow-visible relative'
        )}
      >
        <div 
          ref={collapseButtonContainerRef} 
          className="absolute -top-[1.2rem] left-1/2 -translate-x-1/2 z-20"
        >
          {!messageMutation.isPending ? (
            <Tooltip
              content="Minimize box"
              contentClassName="text-[1.25rem] z-[60]"
            >
              <Button
                ref={collapseButtonRef}
                onClick={toggleMessageBox}
                variant="outline"
                className="rounded-full !p-0 bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 text-white hover:text-white size-9 drop-shadow-lg"
              >
                <Icon icon="tabler:minimize" className="text-[1.4rem] drop-shadow-lg" />
              </Button>
            </Tooltip>
          ) : (
            <Button
              variant="outline"
              className="rounded-full !p-0 bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 text-white hover:text-white size-9 drop-shadow-lg cursor-not-allowed opacity-70"
              disabled
            >
              <Icon icon="tabler:minimize" className="text-[1.4rem] drop-shadow-lg" />
            </Button>
          )}
        </div>
        <div 
          ref={expandIconRef}
          className="flex items-center justify-center size-full cursor-pointer relative" 
          onClick={showMessageBox}
        >
          <Icon icon="fluent:chat-28-regular" className="text-[1.75rem] text-white drop-shadow-lg" />
          
          <Tooltip 
            content="Ask your teacher"
            className="absolute inset-0 z-[51]"
            contentClassName="text-[1.25rem] z-[60]"
          />
        </div>
        <div 
          ref={contentRef} 
          className="size-full flex flex-col justify-between px-[1.6rem] py-[1.4rem]"
        >
          <div className="flex flex-col">
            <p 
              ref={titleRef}
              className="text-[1.8rem] font-semibold text-white drop-shadow-lg -mb-[.05rem]"
            >
              Ask a question about today's lesson
            </p>
            <p 
              ref={subtitleRef}
              className="text-[1.2rem] text-white/80 font-normal drop-shadow-lg"
            >
              Type your question here! Be specific and clear.
            </p>
          </div>
          
          <div ref={controlsRef} className="flex items-center gap-5">
            <div className="flex-1 relative">
              <Input 
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={cn(
                  'w-full h-12 bg-transparent border-t-0 border-l-0 border-r-0 rounded-none border-b-[.1rem] border-b-white text-white placeholder:text-white/80 !text-[1.4rem] focus:outline-none drop-shadow-lg',
                  messageMutation.isPending && 'pointer-events-none'
                )}
                placeholder="Ask something..."
                onKeyDown={(e) => e.key === 'Enter' && !messageMutation.isPending && handleSubmit()}
              />
            </div>
            
            <div className="flex gap-3.5">
              {!messageMutation.isPending ? (
                <Tooltip
                  content="Voice Chat"
                  contentClassName="text-[1.25rem] z-[60]"
                >
                  <Button 
                    onClick={handleVoiceInput}
                    variant="outline" 
                    className="rounded-full bg-white/10 border-white/30 hover:bg-white/20 text-white hover:text-white size-14 drop-shadow-lg"
                  >
                    <Icon icon="si:mic-line" className="text-[1.4rem] drop-shadow-lg" />
                  </Button>
                </Tooltip>
              ) : (
                <Button 
                  variant="outline" 
                  className="rounded-full bg-white/10 border-white/30 text-white size-14 drop-shadow-lg cursor-not-allowed opacity-70"
                  disabled
                >
                  <Icon icon="si:mic-line" className="text-[1.4rem] drop-shadow-lg" />
                </Button>
              )}

              <Button 
                onClick={handleSubmit}
                variant="default" 
                className={cn(
                  'rounded-full bg-primary/80 hover:bg-primary size-14 drop-shadow-lg',
                  messageMutation.isPending && 'pointer-events-none'
                )}
              >
                {messageMutation.isPending ? (
                  <svg viewBox="25 25 50 50" className="loading__svg !w-[1.75rem]">
                    <circle r="20" cy="50" cx="50" className="loading__circle !stroke-white" />
                  </svg>
                ) : (
                  <Icon icon="akar-icons:send" className="text-[1.4rem] drop-shadow-lg" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

MessageBox.displayName = 'MessageBox'

export default MessageBox