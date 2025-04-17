import { Canvas } from '@react-three/fiber'

import { Scene } from '@/features/classroom'

export default function ClassRoomPage() {
  return (
    <Canvas
      camera={{
        position: [0, 1, 5],
        fov: 50
      }}
    >
      <Scene />
    </Canvas>
  )
}