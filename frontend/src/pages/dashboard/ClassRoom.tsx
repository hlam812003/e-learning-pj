import { Canvas } from '@react-three/fiber'

import { Scene } from '@/features/classroom'

export default function ClassRoomPage() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 0.0001]
      }}
    >
      <Scene />
    </Canvas>
  )
}