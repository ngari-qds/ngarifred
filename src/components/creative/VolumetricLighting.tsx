import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VolumetricLightingProps {
  intensity: number;
  timeflow: number;
}

export const VolumetricLighting = ({ intensity, timeflow }: VolumetricLightingProps) => {
  const mainLightRef = useRef<THREE.DirectionalLight>(null);
  const volumeLight1Ref = useRef<THREE.SpotLight>(null);
  const volumeLight2Ref = useRef<THREE.SpotLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const atmosphericLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Ultra-smooth main directional light
    if (mainLightRef.current) {
      mainLightRef.current.position.set(
        Math.sin(time * 0.05) * 40,
        30 + Math.sin(time * 0.03) * 8,
        Math.cos(time * 0.05) * 40
      );
      mainLightRef.current.intensity = 0.4 + intensity * 0.3;
    }

    // Volumetric spotlight 1 - creates atmospheric beams
    if (volumeLight1Ref.current) {
      const radius = 60;
      volumeLight1Ref.current.position.set(
        Math.cos(time * 0.08 + timeflow) * radius,
        40 + Math.sin(time * 0.06) * 15,
        Math.sin(time * 0.08 + timeflow) * radius
      );
      volumeLight1Ref.current.target.position.set(0, 0, 0);
      volumeLight1Ref.current.intensity = 0.8 + intensity * 0.4;
    }

    // Volumetric spotlight 2 - counter-rotating for depth
    if (volumeLight2Ref.current) {
      const radius = 45;
      volumeLight2Ref.current.position.set(
        Math.cos(time * -0.06 + timeflow * 1.5) * radius,
        35 + Math.sin(time * 0.04 + Math.PI) * 12,
        Math.sin(time * -0.06 + timeflow * 1.5) * radius
      );
      volumeLight2Ref.current.target.position.set(0, -5, 0);
      volumeLight2Ref.current.intensity = 0.6 + intensity * 0.3;
    }

    // Rim lighting for sophisticated edge definition
    if (rimLightRef.current) {
      rimLightRef.current.position.set(
        -50 + Math.sin(time * 0.04) * 20,
        20,
        30 + Math.cos(time * 0.04) * 15
      );
      rimLightRef.current.intensity = 0.3 + intensity * 0.2;
    }

    // Atmospheric point light for volumetric effects
    if (atmosphericLightRef.current) {
      atmosphericLightRef.current.position.set(
        Math.sin(time * 0.07) * 30,
        25 + Math.sin(time * 0.05) * 10,
        Math.cos(time * 0.07) * 30
      );
      atmosphericLightRef.current.intensity = 0.4 + intensity * 0.3;
    }
  });

  return (
    <>
      {/* Ultra-minimal ambient lighting for depth */}
      <ambientLight intensity={0.05} color="#0a0f1a" />
      
      {/* Main directional light - sophisticated and clean */}
      <directionalLight
        ref={mainLightRef}
        position={[40, 30, 20]}
        intensity={0.4}
        color="#f1f5f9"
        castShadow={false}
      />
      
      {/* Volumetric spotlight 1 - creates atmospheric beams */}
      <spotLight
        ref={volumeLight1Ref}
        position={[60, 40, 60]}
        intensity={0.8}
        color="#64748b"
        angle={Math.PI / 12}
        penumbra={0.8}
        distance={120}
        decay={1.5}
        castShadow={false}
      />
      
      {/* Volumetric spotlight 2 - depth and atmosphere */}
      <spotLight
        ref={volumeLight2Ref}
        position={[-45, 35, -45]}
        intensity={0.6}
        color="#475569"
        angle={Math.PI / 10}
        penumbra={0.9}
        distance={100}
        decay={1.8}
        castShadow={false}
      />
      
      {/* Rim lighting for sophisticated edge definition */}
      <directionalLight
        ref={rimLightRef}
        position={[-50, 20, 30]}
        intensity={0.3}
        color="#334155"
        castShadow={false}
      />
      
      {/* Atmospheric point light for volumetric effects */}
      <pointLight
        ref={atmosphericLightRef}
        position={[0, 25, 0]}
        intensity={0.4}
        color="#1e293b"
        distance={80}
        decay={2}
      />
      
      {/* Ultra-sophisticated hemisphere light for natural feel */}
      <hemisphereLight
        color="#1e293b"
        groundColor="#0f172a"
        intensity={0.15}
      />
    </>
  );
};