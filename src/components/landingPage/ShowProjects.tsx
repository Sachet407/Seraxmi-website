import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three'

// Rotating Cylinder Component
const RotatingCylinder = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/Frame.png', (loadedTexture) => {
      loadedTexture.wrapS = THREE.RepeatWrapping
      loadedTexture.wrapT = THREE.RepeatWrapping
      loadedTexture.anisotropy = 16 // Improves texture quality
      setTexture(loadedTexture)
    })
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group>
      {/* Main Cylinder - Smoother with more segments */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[4.5, 4.5, 5, 128, 128, true]} /> {/* Increased segments */}
        <meshStandardMaterial
          color="white"
          side={THREE.DoubleSide}
          map={texture}
          transparent
          roughness={0.5}
          metalness={0.05}
        />
      </mesh>
    </group>
  )
}

const ShowProjects = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)


    return () => {

      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  return (
    <div className="w-[90vw] md:w-[80vw] bg-gray-900 relative mx-auto rounded-3xl overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <div
          className={`text-center mb-6 md:mb-8 lg:mb-12 transition-all duration-1200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
        >
          <div className="inline-flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 md:w-12 h-px bg-white opacity-50" />
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <div className="w-8 md:w-12 h-px bg-white opacity-50" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Our Best Works
            <span className="block text-white relative">
              <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-0.5 bg-white opacity-50" />
            </span>
          </h1>
        </div>

        {/* 3D Canvas */}
        <div
          className={`relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-3 lg:mb-12 transition-all duration-1200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '300ms' }}
        >
          <Canvas
            camera={{
              fov: isMobile ? 30 : 39,
              position: [0, 0, isMobile ? 15 : 12],
              near: 0.1,
              far: 100
            }}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              alpha: true
            }}
            dpr={[1, 2]}
          >
            {/* Balanced Lighting Setup */}
            <ambientLight intensity={0.3} color="#ffffff" />
            <directionalLight
              position={[3, 3, 3]}
              intensity={0.5}
              color="#ffffff"
            />
            <directionalLight
              position={[-3, -3, 3]}
              intensity={0.3}
              color="#ffffff"
            />
            <hemisphereLight
              intensity={0.2}
              groundColor="#404040"
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              dampingFactor={0.05}
              enableDamping={true}
              rotateSpeed={isMobile ? 0.5 : 0.8}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI - Math.PI / 6}
            />

            <RotatingCylinder />

            <EffectComposer multisampling={8}>
              <Bloom
                intensity={2}
                kernelSize={1}
                luminanceThreshold={0}
                luminanceSmoothing={0}
              />
            </EffectComposer>
          </Canvas>

          {/* 3D Interaction Hint */}
          {!isMobile && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
              <span className="text-lg text-white/80">3D Drag to rotate</span>
            </div>
          )}

          {/* Corner Accents */}
          <div className="absolute top-2 md:top-4 left-2 md:left-4 w-4 md:w-6 h-4 md:h-6 border-l-2 border-t-2 border-white/50" />
          <div className="absolute top-2 md:top-4 right-2 md:right-4 w-4 md:w-6 h-4 md:h-6 border-r-2 border-t-2 border-white/50" />
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 w-4 md:w-6 h-4 md:h-6 border-l-2 border-b-2 border-white/50" />
          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 w-4 md:w-6 h-4 md:h-6 border-r-2 border-b-2 border-white/50" />
        </div>

        {/* Call to Action */}
        <div
          className={`text-center transition-all duration-1200 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '600ms' }}
        >
          <button className="group relative px-6 py-3 md:px-8 md:py-4 lg:px-12 lg:py-5 bg-white text-black rounded-xl md:rounded-2xl font-semibold text-base md:text-lg overflow-hidden hover:shadow-2xl hover:shadow-white/25 transition-all duration-500 hover:scale-105">
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
              Explore More
              <svg
                className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>

            <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Button Glow */}
            <div className="absolute -inset-0.5 bg-white rounded-xl md:rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500" />
          </button>


        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  )
}

export default ShowProjects