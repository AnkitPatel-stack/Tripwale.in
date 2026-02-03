import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float, Text3D, Center } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const Globe = () => {
  const meshRef = useRef()
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} rotation={[0, 0, 0.2]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#2A5C82"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI * 2 * i) / 8]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#FF7E36" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </Float>
  )
}

const HeroAnimation = () => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 8], fov: 50 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0)
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      <Globe />
      <Stars radius={100} depth={50} count={5000} factor={4} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}

export default HeroAnimation