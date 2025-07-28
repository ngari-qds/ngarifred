
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WaterMaterial } from './WaterMaterial';

interface WaterSurfaceProps {
  size?: [number, number];
  segments?: [number, number];
  position?: [number, number, number];
  colorVariant?: 'ocean' | 'midnight' | 'charcoal' | 'teal' | 'obsidian';
}

const colorVariants = {
  ocean: {
    color1: '#0a1128',
    color2: '#1a1a2e',
    color3: '#16213e',
  },
  midnight: {
    color1: '#1a1a2e',
    color2: '#0f3460',
    color3: '#0a1128',
  },
  charcoal: {
    color1: '#16213e',
    color2: '#0d1117',
    color3: '#1a1a2e',
  },
  teal: {
    color1: '#0f3460',
    color2: '#16213e',
    color3: '#0a1128',
  },
  obsidian: {
    color1: '#0d1117',
    color2: '#16213e',
    color3: '#1a1a2e',
  },
};

export const WaterSurface = ({
  size = [100, 100],
  segments = [128, 128],
  position = [0, 0, 0],
  colorVariant = 'ocean',
}: WaterSurfaceProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const colors = colorVariants[colorVariant];

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation for dynamic flow
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[size[0], size[1], segments[0], segments[1]]} />
      <WaterMaterial
        color1={colors.color1}
        color2={colors.color2}
        color3={colors.color3}
        waveStrength={0.4}
        waveSpeed={0.6}
        opacity={0.9}
      />
    </mesh>
  );
};
