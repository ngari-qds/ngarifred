import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DynamicLightingProps {
  timeVariant: number;
}

export const DynamicLighting = ({ timeVariant }: DynamicLightingProps) => {
  const mainLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);
  const pointLight3Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Animate main directional light
    if (mainLightRef.current) {
      mainLightRef.current.position.set(
        Math.sin(time * 0.1) * 30,
        20 + Math.sin(time * 0.05) * 10,
        Math.cos(time * 0.1) * 30
      );
      mainLightRef.current.intensity = 0.8 + Math.sin(time * 0.3) * 0.2;
    }

    // Animate point lights in orbital patterns
    if (pointLight1Ref.current) {
      const radius = 25;
      pointLight1Ref.current.position.set(
        Math.cos(time * 0.3 + timeVariant) * radius,
        Math.sin(time * 0.2) * 15,
        Math.sin(time * 0.3 + timeVariant) * radius
      );
      pointLight1Ref.current.intensity = 0.6 + Math.sin(time * 0.7) * 0.3;
    }

    if (pointLight2Ref.current) {
      const radius = 35;
      pointLight2Ref.current.position.set(
        Math.cos(time * 0.2 + Math.PI + timeVariant) * radius,
        Math.sin(time * 0.15 + Math.PI) * 12,
        Math.sin(time * 0.2 + Math.PI + timeVariant) * radius
      );
      pointLight2Ref.current.intensity = 0.5 + Math.sin(time * 0.5 + Math.PI) * 0.2;
    }

    if (pointLight3Ref.current) {
      const radius = 20;
      pointLight3Ref.current.position.set(
        Math.cos(time * 0.4 + Math.PI * 0.5 + timeVariant) * radius,
        Math.sin(time * 0.25 + Math.PI * 0.5) * 8,
        Math.sin(time * 0.4 + Math.PI * 0.5 + timeVariant) * radius
      );
      pointLight3Ref.current.intensity = 0.4 + Math.sin(time * 0.6 + Math.PI * 0.5) * 0.2;
    }
  });

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} color="#1a1a2e" />
      
      {/* Main directional light */}
      <directionalLight
        ref={mainLightRef}
        position={[20, 20, 10]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
      
      {/* Dynamic point lights for atmospheric lighting */}
      <pointLight
        ref={pointLight1Ref}
        position={[25, 10, 25]}
        intensity={0.6}
        color="#4a90e2"
        distance={80}
        decay={2}
      />
      
      <pointLight
        ref={pointLight2Ref}
        position={[-35, 8, -35]}
        intensity={0.5}
        color="#8b5cf6"
        distance={70}
        decay={2}
      />
      
      <pointLight
        ref={pointLight3Ref}
        position={[20, -5, -30]}
        intensity={0.4}
        color="#06b6d4"
        distance={60}
        decay={2}
      />
      
      {/* Subtle hemisphere light for natural feel */}
      <hemisphereLight
        color="#16213e"
        groundColor="#0a1128"
        intensity={0.2}
      />
    </>
  );
};