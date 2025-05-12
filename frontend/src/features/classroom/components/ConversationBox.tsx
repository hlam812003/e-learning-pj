import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Icon } from '@iconify/react'
import { cn, useGSAP, formatDate } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { conversationService } from '../services'
import { Conversation } from '../types'
import { useAnimatedBox } from '../hooks'
import { useAuthStore } from '@/stores'

import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

export interface ConversationBoxHandle {
  show: () => void
  hide: () => void
  toggle: () => void
}

interface ConversationBoxProps {
  visible?: boolean
  onVisibilityChange?: (visible: boolean) => void
}

const ConversationBox = forwardRef<ConversationBoxHandle, ConversationBoxProps>(({ 
  visible = true,
  onVisibilityChange
}, ref) => {
  const { user: authUser } = useAuthStore()

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const conversationBoxRef = useRef<HTMLDivElement>(null)
  const collapseButtonRef = useRef<HTMLButtonElement>(null)
  const collapseButtonContainerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const expandIconRef = useRef<HTMLDivElement>(null)
  
  const { data: conversations, isLoading, isError } = useQuery({
    queryKey: ['myConversations', authUser?.id],
    queryFn: conversationService.getMyConversations,
    enabled: !!authUser?.id
  })
  
  const { 
    isVisible,
    isAnimating,
    showBox: showConversationBox,
    hideBox: hideConversationBox,
    toggleBox: toggleConversationBox,
    setupVisibleState,
    setupHiddenState
  } = useAnimatedBox(
    {
      containerRef,
      boxRef: conversationBoxRef,
      expandIconRef,
      collapseButtonContainerRef,
      contentRef,
      titleRef,
      subtitleRef
    },
    {
      expandedWidth: '30rem',
      expandedHeight: '40rem',
      collapsedSize: '3.5rem',
      expandedBorderRadius: '1.25rem',
      collapsedBorderRadius: '50%'
    },
    visible,
    onVisibilityChange
  )
  
  useGSAP(() => {
    if (isVisible) {
      setupVisibleState()
    } else {
      setupHiddenState()
    }
    
    if (visible !== isVisible && !isAnimating) {
      if (visible) showConversationBox()
      else hideConversationBox()
    }
  }, { scope: containerRef, dependencies: [isVisible, visible, isAnimating] })

  useImperativeHandle(ref, () => ({
    show: showConversationBox,
    hide: hideConversationBox,
    toggle: toggleConversationBox
  }))

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation.id)
  }
  
  return (
    <div ref={containerRef} className="absolute top-1/2 -translate-y-1/2 right-[1.65rem] flex items-center justify-center z-50">
      <div 
        ref={conversationBoxRef}
        className={cn(
          'bg-white/20 backdrop-blur-[16px] border border-white/20',
          'flex items-center justify-center overflow-visible relative'
        )}
      >
        <div 
          ref={collapseButtonContainerRef} 
          className="absolute -left-[1.2rem] top-1/2 -translate-y-1/2 z-20"
        >
          <Tooltip
            content="Minimize box"
            contentClassName="text-[1.25rem] z-[60]"
            position="left"
          >
            <Button
              ref={collapseButtonRef}
              onClick={toggleConversationBox}
              variant="outline"
              className="rounded-full !p-0 bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 text-white hover:text-white size-9 drop-shadow-lg"
            >
              <Icon icon="tabler:minimize" className="text-[1.4rem] drop-shadow-lg" />
            </Button>
          </Tooltip>
        </div>
        
        <div 
          ref={expandIconRef}
          className="flex items-center justify-center size-full cursor-pointer relative" 
          onClick={showConversationBox}
        >
          <Icon icon="mdi:conversation-plus-outline" className="text-[1.75rem] text-white drop-shadow-lg" />
          
          <Tooltip 
            content="View conversations"
            className="absolute inset-0 z-[51]"
            contentClassName="text-[1.25rem] z-[60]"
            position="left"
          />
        </div>
        
        <div 
          ref={contentRef} 
          className="size-full flex flex-col justify-between px-[1.6rem] py-[1.4rem]"
        >
          <div className="flex flex-col mb-4">
            <p 
              ref={titleRef}
              className="text-[1.8rem] font-semibold text-white drop-shadow-lg -mb-[.05rem]"
            >
              Your Conversations
            </p>
            <p 
              ref={subtitleRef}
              className="text-[1.2rem] text-white/80 font-normal drop-shadow-lg"
            >
              Select a conversation to continue
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="size-10">
                  <svg viewBox="25 25 50 50" className="loading__svg">
                    <circle r="20" cy="50" cx="50" className="loading__circle !stroke-white" />
                  </svg>
                </div>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center h-full text-white/80">
                <Icon icon="lucide:alert-circle" className="text-[2rem] mb-2" />
                <p className="text-center">Cannot load conversation list</p>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline" 
                  className="mt-4 bg-white/10 hover:bg-white/20 text-white"
                >
                  Try again
                </Button>
              </div>
            ) : conversations?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/80">
                <Icon icon="lucide:message-square" className="text-[2rem] mb-2" />
                <p className="text-center">No conversations.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 bg-white/10 hover:bg-white/20 text-white"
                >
                  Create new
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {conversations?.map((conversation) => (
                  <div 
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation)}
                    className={cn(
                      'p-4 rounded-lg bg-white/10 hover:bg-white/15 cursor-pointer transition-colors',
                      'border border-white/10 hover:border-white/20',
                      selectedConversation === conversation.id && 'bg-white/20 border-white/30'
                    )}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2 bg-white/10 rounded-full">
                        <Icon icon="lucide:message-square" className="text-[1.5rem] text-white" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h3 className="text-[1.4rem] font-medium text-white truncate -mb-[.05rem]">
                          {conversation.name}
                        </h3>
                        <p className="text-[1.1rem] text-white/70">
                          {formatDate(conversation.updatedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <Button 
              variant="default"
              className="w-full bg-primary/80 hover:bg-primary text-white rounded-full h-16 text-[1.3rem]"
            >
              Create new
              <Icon icon="lucide:plus" className="text-[1.4rem]" /> 
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})

ConversationBox.displayName = 'ConversationBox'

export default ConversationBox
