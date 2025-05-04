/* eslint-disable react-hooks/exhaustive-deps */
import { CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export const CameraManager = () => {
  const { camera } = useThree()
  const controlsRef = useRef<CameraControls>(null)
  
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    if (controlsRef.current) {
      const zoomAmount = e.deltaY > 0 ? -camera.zoom / 4 : camera.zoom / 4
      controlsRef.current.zoom(zoomAmount, true)
    }
  }

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false })
    }
  }, [camera.zoom])
  
  return (
    <CameraControls
      ref={controlsRef}
      camera={camera}
      enabled={true}
      minZoom={1}
      maxZoom={3}
      polarRotateSpeed={-.3}
      azimuthRotateSpeed={-.3}
      mouseButtons={{
        left: 1, // ROTATE
        middle: 1, // ROTATE
        right: 1, // ROTATE
        wheel: 0
      }}
      touches={{
        one: 32,
        two: 512,
        three: 0
      }}
    />
  )
}