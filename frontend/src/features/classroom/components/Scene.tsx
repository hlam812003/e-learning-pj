import { lazy, useState, useEffect } from 'react'
import { Gltf, Environment, Float } from '@react-three/drei'
import { degToRad } from 'three/src/math/MathUtils.js'
import { Leva } from 'leva'

import CameraManager from './CameraManager'

const Teacher = lazy(() => import('./Teacher'))

const Scene = () => {
  const [envPreset, setEnvPreset] = useState<'warehouse' | 'sunset'>('warehouse')

  function checkTimeForEnvironment() {
    const currentHour = new Date().getHours()
    
    if (currentHour >= 15 && currentHour < 19) {
      setEnvPreset('sunset')
    } else {
      setEnvPreset('warehouse')
    }
  }

  useEffect(() => {
    checkTimeForEnvironment()
    
    const hourlyInterval = setInterval(checkTimeForEnvironment, 60 * 60 * 1000)
    
    return () => clearInterval(hourlyInterval)
  }, [])

  const lightColor = envPreset === 'sunset' ? 'orange' : 'pink'
  const lightIntensity = envPreset === 'sunset' ? 0.8 : 1

  return (
    <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
      <ambientLight intensity={0.8} color={lightColor} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={lightIntensity} 
      />
      <Environment preset={envPreset} />
      <Leva hidden />
      <CameraManager />
      <Teacher
        position={[-1.1, -1.75, -3.2]}
        scale={1.425}
        rotation-y={degToRad(205)}
      />
      <Gltf
        src="/models/classroom_default.glb"
        position={[.2, -1.75, -2]} // Seat: 5, row 2, column 2, student 5
      />
    </Float>
  )
}

export default Scene