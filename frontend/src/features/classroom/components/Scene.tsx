import { Gltf, Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

export const Scene = () => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.8} color="pink" />
      {/* <OrbitControls 
        enableZoom={true}
        minDistance={1}
        maxDistance={5}
        target={[0, 0, 0]}
      /> */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="sunset" />
      <Gltf
        src="/models/classroom_default.glb"
        position={[.2, -.55, 2.5]} // Seat: 5, row 2, coloumn 2, student 5
      />
    </Suspense>
  )
}

useGLTF.preload('/models/classroom_default.glb')