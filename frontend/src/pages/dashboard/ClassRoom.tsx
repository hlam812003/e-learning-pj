import { Canvas } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Scene, 
  useClassroomStore, 
  useTeacherSpeech, 
  checkAzureSpeechSDK,
  GENERAL_MODE
} from '@/features/classroom'

const sampleLectures = [
  'Xin chào các em, hôm nay chúng ta sẽ học về lập trình web cơ bản.',
  'Để tạo một trang web, chúng ta cần học HTML, CSS và JavaScript.',
  'React là một thư viện JavaScript phổ biến để xây dựng giao diện người dùng.',
  'TypeScript giúp chúng ta viết code JavaScript an toàn hơn với kiểu dữ liệu tĩnh.'
]

export default function ClassRoomPage() {
  const [currentLecture, setCurrentLecture] = useState(0)
  const [sdkError, setSdkError] = useState<string | null>(null)
  const [sdkLoading, setSdkLoading] = useState(true)
  
  const isThinking = useClassroomStore((state) => state.isThinking)
  const isSpeaking = useClassroomStore((state) => state.isSpeaking)
  const setIsThinking = useClassroomStore((state) => state.setIsThinking)
  const setIsSpeaking = useClassroomStore((state) => state.setIsSpeaking)
  const setCurrentMessage = useClassroomStore((state) => state.setCurrentMessage)
  const setCameraMode = useClassroomStore((state) => state.setCameraMode)
  const setTeacherMode = useClassroomStore((state) => state.setTeacherMode)
  const startThinking = useClassroomStore((state) => state.startThinking)
  const stopAll = useClassroomStore((state) => state.stopAll)
  
  useEffect(() => {
    const { isAvailable, error } = checkAzureSpeechSDK()
    setSdkLoading(false)
    
    if (!isAvailable && error) {
      console.warn('Azure Speech SDK check failed:', error)
      setSdkError(error)
    }
  }, [])
  
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

  return (
    <>
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
          {sdkLoading && (
            <div className="bg-blue-100 text-blue-800 text-xs p-2 rounded flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang tải Azure Speech SDK...
            </div>
          )}
          {sdkError && !sdkLoading && (
            <div className="bg-red-100 text-red-800 text-xs p-2 rounded">
              <strong>Lỗi Azure SDK:</strong> {sdkError}
            </div>
          )}
          <div className="bg-gray-100 text-gray-800 text-xs p-2 rounded">
            <strong>Bài đang phát:</strong> {sampleLectures[currentLecture]}
          </div>
        </div>
      </div>
      
      <Canvas
        camera={{
          position: [0, 0, 0.0001]
        }}
      >
        <Scene />
      </Canvas>
    </>
  )
}