import { Gltf, Environment, Float } from '@react-three/drei'
import { degToRad } from 'three/src/math/MathUtils.js'
import { Leva } from 'leva'

import { Teacher } from './Teacher'
import { CameraManager } from './CameraManager'

export const Scene = () => {
  return (
    <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
      <ambientLight intensity={0.8} color="pink" />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="warehouse" />
      <Leva hidden />
      <CameraManager />
      <Teacher
        position={[-1.1, -1.75, -3.2]}
        scale={1.425}
        rotation-y={degToRad(25)}
      />
      <Gltf
        src="/models/classroom_default.glb"
        position={[.2, -1.75, -2]} // Seat: 5, row 2, column 2, student 5
      />
    </Float>
  )
}