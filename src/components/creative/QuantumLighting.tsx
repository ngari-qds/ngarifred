import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface QuantumLightingProps {
  timeFlow: number;
  marketActivity: number;
}

export const QuantumLighting = ({ timeFlow, marketActivity }: QuantumLightingProps) => {
  const mainLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);
  const pointLight3Ref = useRef<THREE.PointLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Main directional light - sophisticated and subtle
    if (mainLightRef.current) {
      mainLightRef.current.position.set(
        Math.sin(time * 0.1) * 30,
        25 + Math.sin(time * 0.08) * 5,
        Math.cos(time * 0.1) * 30
      );
      mainLightRef.current.intensity = 0.8 + marketActivity * 0.3;
    }

    // Point lights representing market data centers
    if (pointLight1Ref.current) {
      const radius = 25;
      pointLight1Ref.current.position.set(
        Math.cos(time * 0.2 + timeFlow) * radius,
        Math.sin(time * 0.15) * 10,
        Math.sin(time * 0.2 + timeFlow) * radius
      );
      pointLight1Ref.current.intensity = 0.6 + marketActivity * 0.4;
    }

    if (pointLight2Ref.current) {
      const radius = 35;
      pointLight2Ref.current.position.set(
        Math.cos(time * 0.15 + Math.PI * 0.7 + timeFlow) * radius,
        Math.sin(time * 0.25 + Math.PI * 0.3) * 8,
        Math.sin(time * 0.15 + Math.PI * 0.7 + timeFlow) * radius
      );
      pointLight2Ref.current.intensity = 0.4 + marketActivity * 0.3;
    }

    if (pointLight3Ref.current) {
      const radius = 20;
      pointLight3Ref.current.position.set(
        Math.cos(time * 0.25 + Math.PI * 1.3 + timeFlow) * radius,
        Math.sin(time * 0.35 + Math.PI * 0.8) * 6,
        Math.sin(time * 0.25 + Math.PI * 1.3 + timeFlow) * radius
      );
      pointLight3Ref.current.intensity = 0.5 + marketActivity * 0.2;
    }

    // Spot light for focused illumination
    if (spotLightRef.current) {
      spotLightRef.current.position.set(
        Math.sin(time * 0.12) * 40,
        30,
        Math.cos(time * 0.12) * 40
      );
      spotLightRef.current.target.position.set(0, 0, 0);
      spotLightRef.current.intensity = 0.5 + marketActivity * 0.3;
    }
  });

  return (
    <>
      {/* Subtle ambient lighting for sophisticated feel */}
      <ambientLight intensity={0.1} color="#1e293b" />
      
      {/* Main directional light - clean and professional */}
      <directionalLight
        ref={mainLightRef}
        position={[30, 25, 20]}
        intensity={0.8}
        color="#f8fafc"
        castShadow={false}
      />
      
      {/* Point lights representing financial data flow */}
      <pointLight
        ref={pointLight1Ref}
        position={[25, 10, 25]}
        intensity={0.6}
        color="#4a90e2"
        distance={50}
        decay={2}
      />
      
      <pointLight
        ref={pointLight2Ref}
        position={[-35, 8, -35]}
        intensity={0.4}
        color="#8b5cf6"
        distance={60}
        decay={2}
      />
      
      <pointLight
        ref={pointLight3Ref}
        position={[20, -5, -25]}
        intensity={0.5}
        color="#06b6d4"
        distance={40}
        decay={2}
      />
      
      {/* Focused spot light for depth */}
      <spotLight
        ref={spotLightRef}
        position={[40, 30, 40]}
        intensity={0.5}
        color="#e2e8f0"
        angle={Math.PI / 8}
        penumbra={0.6}
        distance={100}
        decay={2}
      />
      
      {/* Hemisphere light for natural ambient lighting */}
      <hemisphereLight
        color="#334155"
        groundColor="#1e293b"
        intensity={0.2}
      />
    </>
  );
};