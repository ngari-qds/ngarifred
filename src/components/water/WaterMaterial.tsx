
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { waterVertexShader, waterFragmentShader } from './WaterShaders';

interface WaterMaterialProps {
  color1?: string;
  color2?: string;
  color3?: string;
  waveStrength?: number;
  waveSpeed?: number;
  opacity?: number;
  flowDirection?: [number, number, number];
}

export const WaterMaterial = ({
  color1 = '#0a1128',
  color2 = '#1a1a2e',
  color3 = '#16213e',
  waveStrength = 0.3,
  waveSpeed = 0.5,
  opacity = 0.8,
  flowDirection = [1, 0, 0.5],
}: WaterMaterialProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uWaveStrength: { value: waveStrength },
    uWaveSpeed: { value: waveSpeed },
    uOpacity: { value: opacity },
    uColor1: { value: new THREE.Color(color1) },
    uColor2: { value: new THREE.Color(color2) },
    uColor3: { value: new THREE.Color(color3) },
    uColorMix: { value: 0.5 },
    uFlowDirection: { value: new THREE.Vector3(...flowDirection) },
  }), [color1, color2, color3, waveStrength, waveSpeed, opacity, flowDirection]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Dynamic color mixing for flowing effect
      materialRef.current.uniforms.uColorMix.value = 
        Math.sin(state.clock.elapsedTime * 0.3) * 0.5 + 0.5;
      
      // Animate flow direction for realistic movement
      const time = state.clock.elapsedTime * 0.1;
      materialRef.current.uniforms.uFlowDirection.value.set(
        Math.sin(time) * 0.5 + 0.5,
        Math.cos(time * 0.7) * 0.3,
        Math.sin(time * 1.2) * 0.5 + 0.5
      );
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={waterVertexShader}
      fragmentShader={waterFragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.DoubleSide}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
};
