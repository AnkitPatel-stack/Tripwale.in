import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float } from '@react-three/drei'
import { useRef } from 'react'

const DestinationModel = () => {
  const groupRef = useRef()

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <group ref={groupRef}>
        {/* Pyramid */}
        <mesh position={[-3, 0, 0]}>
          <coneGeometry args={[1, 2, 4]} />
          <meshStandardMaterial color="#FF9E65" />
        </mesh>

        {/* Eiffel Tower-like structure */}
        <mesh position={[3, 0, 0]}>
          <boxGeometry args={[0.5, 3, 0.5]} />
          <meshStandardMaterial color="#4A7C9C" />
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[2, 0.2, 2]} />
            <meshStandardMaterial color="#2A5C82" />
          </mesh>
        </mesh>

        {/* Sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial 
            color="#2A5C82"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  )
}

const Destination3D = () => {
  return (
    <Canvas
      style={{ width: '100%', height: '400px', borderRadius: '16px' }}
      camera={{ position: [0, 0, 10], fov: 50 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      <DestinationModel />
      <Environment preset="city" />
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  )
}

export default Destination3D