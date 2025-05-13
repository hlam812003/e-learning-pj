import { Icon } from '@iconify/react'
import { cn, formatDate } from '@/lib'
import { Conversation } from '../types'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface ConversationItemProps {
  conversation: Conversation
  isSelected: boolean
  onClick: (conversation: Conversation) => void
  onDelete?: (conversation: Conversation) => void
  isDeleteLoading?: boolean
}

const ConversationItem = ({ 
  conversation, 
  isSelected, 
  onClick,
  onDelete,
  isDeleteLoading = false
}: ConversationItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false)
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteConfirm(true)
  }
  
  const handleConfirmDelete = () => {
    onDelete?.(conversation)
  }
  
  return (
    <>
      <div 
        id={`conversation-${conversation.id}`}
        onClick={() => onClick(conversation)}
        className={cn(
          'p-4 rounded-lg bg-white/10 hover:bg-white/15 cursor-pointer transition-colors drop-shadow-lg',
          'border border-white/20 hover:border-white/20 group',
          isSelected && 'bg-white/20 border-white/30'
        )}
      >
        <div className="flex items-start justify-between gap-3.5">
          <div className="flex-1 overflow-hidden">
            <h3 className="text-[1.4rem] font-medium text-white truncate -mb-[.05rem] drop-shadow-lg">
              {conversation.name}
            </h3>
            <p className="text-[1.1rem] text-white/70 drop-shadow-lg">
              {formatDate(conversation.updatedAt)}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {onDelete && (
              <Button 
                onClick={handleDeleteClick}
                disabled={isDeleteLoading}
                className={cn(
                  'flex items-center justify-center !p-0 size-7 bg-white/10 hover:bg-black rounded-full drop-shadow-lg transition-colors',
                  (isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100')
                )}
              >
                {isDeleteLoading ? (
                  <svg viewBox="25 25 50 50" className="size-4">
                    <circle r="20" cy="50" cx="50" className="loading__circle !stroke-white" />
                  </svg>
                ) : (
                  <Icon icon="lucide:trash-2" className="text-[0.9rem] text-white" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="bg-white/20 backdrop-blur-[16px] border border-white/20 rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[1.6rem] font-semibold text-white drop-shadow-lg">
              Delete Conversation
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/80 text-[1.25rem] drop-shadow-lg">
              Are you sure you want to delete the conversation <span className="font-medium text-white uppercase">{conversation.name}</span> ? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-4">
            <AlertDialogCancel 
              className="flex-1 h-14 bg-white/10 hover:bg-white/20 rounded-full text-white hover:text-white border-white/20 text-[1.3rem] drop-shadow-lg"
              disabled={isDeleteLoading}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="flex-1 h-14 bg-black hover:bg-black/80 rounded-full text-white text-[1.3rem] drop-shadow-lg"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ConversationItem