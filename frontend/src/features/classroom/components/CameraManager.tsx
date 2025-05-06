/* eslint-disable react-hooks/exhaustive-deps */
import { CameraControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useControls, button } from 'leva'
import { Vector3 } from 'three'
import { useClassroomStore } from '../store'
import { CAMERA_POSITIONS, CAMERA_ZOOMS } from '../constants'

export const CameraManager = () => {
  const { camera } = useThree()
  const controlsRef = useRef<CameraControls>(null)
  
  const cameraMode = useClassroomStore((state) => state.cameraMode)
  
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    if (controlsRef.current) {
      const zoomAmount = e.deltaY > 0 ? -camera.zoom / 4 : camera.zoom / 4
      controlsRef.current.zoom(zoomAmount, true)
    }
  }

  useEffect(() => {
    if (controlsRef.current) {
      console.log(`Camera mode changed to: ${cameraMode}`)
      
      controlsRef.current.setPosition(
        CAMERA_POSITIONS[cameraMode][0],
        CAMERA_POSITIONS[cameraMode][1],
        CAMERA_POSITIONS[cameraMode][2],
        true
      )
      controlsRef.current.zoomTo(CAMERA_ZOOMS[cameraMode], true)
    }
  }, [cameraMode])

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false })
    }
    
    return () => {
      if (canvas) {
        canvas.removeEventListener('wheel', handleWheel)
      }
    }
  }, [camera.zoom])

  useControls('Helper', {
    getCameraPosition: button(() => {
      if (controlsRef.current) {
        const position = new Vector3()
        controlsRef.current.getPosition(position)
        const zoom = controlsRef.current.camera.zoom
        
        console.log(position.toArray(), zoom)
      }
    }),
  })
  
  return (
    <CameraControls
      ref={controlsRef}
      camera={camera}
      enabled={true}
      minZoom={1.75}
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