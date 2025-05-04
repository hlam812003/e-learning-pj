import { Gltf, Environment, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import { CameraManager } from './CameraManager'

export const Scene = () => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.8} color="pink" />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="sunset" />
      <CameraManager />
      <Gltf
        src="/models/classroom_default.glb"
        position={[.2, -1.75, -2]} // Seat: 5, row 2, coloumn 2, student 5
      />
    </Suspense>
  )
}

useGLTF.preload('/models/classroom_default.glb')