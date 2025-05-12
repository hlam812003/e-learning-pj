import { useState, useEffect, Suspense, useCallback, lazy, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress, PerformanceMonitor, AdaptiveDpr, useGLTF } from '@react-three/drei'
import { Icon } from '@iconify/react'
import { cn } from '@/lib'
// import { useParams } from 'react-router-dom'

import { Tooltip } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { 
  MessageBox,
  ClassroomLoading,
  useClassroomStore, 
  useTeacherSpeech, 
  checkAzureSpeechSDK,
  GENERAL_MODE
} from '@/features/classroom'
import type { MessageBoxHandle } from '@/features/classroom/components/MessageBox'


const Scene = lazy(() => import('@/features/classroom/components/Scene'))

useGLTF.preload('/models/classroom_default.glb')
useGLTF.preload('/models/teacher.glb')
useGLTF.preload('/models/teacher_animation.glb')

export default function ClassRoomPage() {
  // const { courseId } = useParams<{ courseId: string }>()
  const { active, progress } = useProgress()
  const isThinking = useClassroomStore((state) => state.isThinking)
  const isSpeaking = useClassroomStore((state) => state.isSpeaking)
  const setIsThinking = useClassroomStore((state) => state.setIsThinking)
  const setIsSpeaking = useClassroomStore((state) => state.setIsSpeaking)
  const setCurrentMessage = useClassroomStore((state) => state.setCurrentMessage)
  const setCameraMode = useClassroomStore((state) => state.setCameraMode)
  const setTeacherMode = useClassroomStore((state) => state.setTeacherMode)
  const startThinking = useClassroomStore((state) => state.startThinking)
  const stopAll = useClassroomStore((state) => state.stopAll)
  
  const {
    speak: speakAzure,
    stop: stopAzure,
    isReady: isAzureReady,
    cleanup: cleanupAzure,
    error: azureError,
    currentMessage,
    isSpeaking: isAzureSpeaking,
    isThinking: isAzureThinking
  } = useTeacherSpeech()

  const [currentLecture, setCurrentLecture] = useState<number>(0)
  const [sdkError, setSdkError] = useState<string | null>(null)
  const [sdkLoading, setSdkLoading] = useState<boolean>(true)
  
  const [canvasLoaded, setCanvasLoaded] = useState<boolean>(false)
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false)
  const [loaderVisible, setLoaderVisible] = useState<boolean>(true)
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState<boolean>(true)

  const messageBoxRef = useRef<MessageBoxHandle>(null)

  const sampleLectures = [
    'Xin chào các em, hôm nay chúng ta sẽ học về lập trình web cơ bản.',
    'Để tạo một trang web, chúng ta cần học HTML, CSS và JavaScript.',
    'React là một thư viện JavaScript phổ biến để xây dựng giao diện người dùng.',
    'TypeScript giúp chúng ta viết code JavaScript an toàn hơn với kiểu dữ liệu tĩnh.'
  ]
  
  const handleFadeComplete = useCallback(() => {
    setLoaderVisible(false)
  }, [])
  
  useEffect(() => {
    if (progress === 100 && !active && !initialLoadComplete) {
      setInitialLoadComplete(true)
      
      setTimeout(() => {
        setCanvasLoaded(true)
      }, 500)
    }
  }, [progress, active, initialLoadComplete])
  
  useEffect(() => {
    const { isAvailable, error } = checkAzureSpeechSDK()
    setSdkLoading(false)
    
    if (!isAvailable && error) {
      console.warn('Azure Speech SDK check failed:', error)
      setSdkError(error)
    }
  }, [])
  
  useEffect(() => {
    setIsThinking(isAzureThinking)
    setIsSpeaking(isAzureSpeaking)
    
    if (isAzureThinking) {
      setCameraMode(GENERAL_MODE.THINKING)
      setTeacherMode(GENERAL_MODE.THINKING)
    } else if (isAzureSpeaking) {
      setCameraMode(GENERAL_MODE.SPEAKING) 
      setTeacherMode(GENERAL_MODE.SPEAKING)
    } else {
      setCameraMode(GENERAL_MODE.IDLE)
      setTeacherMode(GENERAL_MODE.IDLE)
    }
  }, [isAzureThinking, isAzureSpeaking, setIsThinking, setIsSpeaking, setCameraMode, setTeacherMode])
  
  useEffect(() => {
    setCurrentMessage(currentMessage)
  }, [currentMessage, setCurrentMessage])

  useEffect(() => {
    if (azureError) {
      console.warn('Azure Speech Error:', azureError)
      setSdkError(azureError)
    } else {
      setSdkError(null)
    }
  }, [azureError])

  useEffect(() => {
    return () => {
      cleanupAzure()
      stopAll()
    }
  }, [cleanupAzure, stopAll])

  const handleSpeak = async () => {
    if (isSpeaking) {
      console.log('Stopping all speech')
      stopAzure()
      stopAll()
      
      await new Promise(resolve => setTimeout(resolve, 100))
      return
    }
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const currentText = sampleLectures[currentLecture]
    console.log(`Speaking "${currentText}"`)
    
    console.log('Using Azure for speech, Ready state:', isAzureReady)
    if (!isAzureReady) {
      console.warn('Azure not ready')
      alert('Azure Speech SDK chưa sẵn sàng.')
      return
    }
    
    startThinking()
    
    try {
      console.log('Starting Azure speech synthesis...')
      const result = await speakAzure(currentText)
      console.log('Azure speech result:', result)
      
      if (!result?.success && result?.error) {
        console.error('Azure speech error:', result.error)
        
        if (result.error.includes('disposed')) {
          console.log('Disposed error detected, retrying once with new synthesizer...')
          
          await new Promise(resolve => setTimeout(resolve, 500))
          
          const retryResult = await speakAzure(currentText)
          
          if (!retryResult?.success) {
            alert(`Lỗi Azure: ${retryResult.error}`)
            stopAll()
          }
        } else {
          alert(`Lỗi Azure: ${result.error}`)
          stopAll()
        }
      }
    } catch (error) {
      console.error('Exception in Azure speech:', error)
      alert('Lỗi với Azure Speech.')
      stopAll()
    }
  }

  const handleNextLecture = () => {
    stopAzure()
    stopAll()
    
    const nextIndex = (currentLecture + 1) % sampleLectures.length
    setCurrentLecture(nextIndex)
  }

  const handleGoBack = () => {
    stopAzure()
    stopAll()
    window.location.href = '/courses'
  }

  const handleMessageBoxVisibilityChange = (visible: boolean) => {
    setIsMessageBoxVisible(visible)
  }

  return (
    <>
      {loaderVisible && (
        <ClassroomLoading 
          progress={progress} 
          sdkError={sdkError}
          sdkLoading={sdkLoading}
          isLoaded={canvasLoaded}
          onFadeComplete={handleFadeComplete}
        />
      )}
      
      <div 
        style={{ opacity: canvasLoaded ? 1 : 0, transition: 'opacity 0.5s' }}
      >
        <div className="absolute top-0 left-0 z-50">
          <div className="flex gap-2 flex-col m-4">
            <div className="flex gap-2">
              <Button
                onClick={handleSpeak}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isThinking}
              >
                {isThinking ? 'Đang tải...' : isSpeaking ? 'Dừng' : 'Nói'}
              </Button>
              <Button 
                onClick={handleNextLecture}
                className="bg-gray-600 hover:bg-gray-700 text-white"
                disabled={isThinking}
              >
                Bài tiếp theo
              </Button>
            </div>
            
            <div className="bg-gray-100 text-gray-800 text-xs p-2 rounded">
              <strong>Bài đang phát:</strong> {sampleLectures[currentLecture]}
            </div>
          </div>
        </div>

        <div className="absolute top-32 left-4.5 z-50">
          <Tooltip
            content="Back to Courses"
            contentClassName="text-[1.25rem] z-[60]"
            position='right'
          >
            <Button
              onClick={handleGoBack}
              variant="outline"
              className={cn(
                'rounded-full bg-white/20 backdrop-blur-[16px] border-white/30 hover:bg-white/30 text-white hover:text-white size-12 drop-shadow-lg',
                isThinking && 'pointer-events-none opacity-70'
              )}
            >
              <Icon icon="lucide:arrow-left" className="text-[1.5rem] drop-shadow-lg" />
            </Button>
          </Tooltip>
        </div>

        <MessageBox 
          ref={messageBoxRef}
          visible={isMessageBoxVisible} 
          onVisibilityChange={handleMessageBoxVisibilityChange}
        />
      </div>
      
      <div className="size-full" style={{ backfaceVisibility: 'hidden' }}>
        <Canvas
          camera={{ position: [0, 0, 0.0001] }}
          dpr={[1, 1.5]}
          onCreated={(state) => {
            state.gl.setClearColor('#000000')
            state.invalidate()
          }}
        >
          <PerformanceMonitor>
            <AdaptiveDpr pixelated />
            
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </PerformanceMonitor>
        </Canvas>
      </div>
    </>
  )
}