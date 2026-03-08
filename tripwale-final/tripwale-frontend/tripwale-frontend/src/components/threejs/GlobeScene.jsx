import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Sphere, Float } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

const GlobeScene = () => {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < 10; i++) {
      pts.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
        color: i % 2 === 0 ? '#FF7E36' : '#2A5C82',
      })
    }
    return pts
  }, [])

  return (
    <Canvas
      style={{ width: '100%', height: '500px' }}
      camera={{ position: [0, 0, 15], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[4, 32, 32]}>
          <meshStandardMaterial
            color="#2A5C82"
            roughness={0.4}
            metalness={0.7}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {points.map((point, i) => (
        <Float key={i} speed={2} rotationIntensity={0} floatIntensity={2}>
          <mesh position={point.position}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={point.color} />
          </mesh>
        </Float>
      ))}

      <Stars radius={100} depth={50} count={2000} factor={4} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}

export default GlobeScene