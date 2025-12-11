'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, ContactShadows, Lightformer, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const AbstractShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1.5} floatIntensity={2}>
      {/* Responsive positioning: Center on mobile, Right side on desktop */}
      <mesh
        ref={meshRef}
        scale={isMobile ? 0.8 : 1.2}
        position={isMobile ? [0, 0, 0] : [viewport.width / 4, 0, 0]}
      >
        {/* Switched to Icosahedron for a more organic, blob-like shape */}
        <icosahedronGeometry args={[1, 4]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={1}
          anisotropy={0.5}
          color="#c084fc"
          resolution={512} // Optimized: Reduced from 1024
          samples={6}      // Optimized: Reduced samples
          distortion={0.8} // Increased for more "quirky" liquid effect
          distortionScale={0.5}
          temporalDistortion={0.2}
        />
      </mesh>
    </Float>
  );
};

const Scene3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      {/* Optimized: Cap DPR to 1.5 to prevent performance issues on high-res screens */}
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#000000']} />

        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#22d3ee" />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="#e879f9" />

        <AbstractShape />

        {/* Added Sparkles for extra visual interest */}
        <Sparkles count={50} scale={5} size={4} speed={0.4} opacity={0.5} color="#c084fc" />

        <Environment resolution={256}> {/* Optimized: Reduced resolution */}
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#c084fc" />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} color="#22d3ee" />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#f472b6" />
        </Environment>

        {/* <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={3} far={4} color="#c084fc" resolution={256} /> */}
      </Canvas>
    </div>
  );
};

export default Scene3D;