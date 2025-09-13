import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { geometricVertexShader, geometricFragmentShader } from './GeometricShaders';

interface GeometricMaterialProps {
  baseOpacity?: number;
  depth?: 'near' | 'mid' | 'far';
  timeVariant?: number;
  geometryType?: string;
}

const getColorPalette = (depth: string) => {
  switch (depth) {
    case 'near':
      return {
        primary: '#4a90e2',
        secondary: '#60a5fa',
        accent: '#3b82f6',
      };
    case 'mid':
      return {
        primary: '#8b5cf6',
        secondary: '#a855f7',
        accent: '#9333ea',
      };
    case 'far':
      return {
        primary: '#06b6d4',
        secondary: '#0ea5e9',
        accent: '#0284c7',
      };
    default:
      return {
        primary: '#4a90e2',
        secondary: '#60a5fa',
        accent: '#3b82f6',
      };
  }
};

export const GeometricMaterial = ({ 
  baseOpacity = 0.7, 
  depth = 'mid',
  timeVariant = 0,
  geometryType = 'icosahedron'
}: GeometricMaterialProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const colors = getColorPalette(depth);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTimeVariant: { value: timeVariant },
    uOpacity: { value: baseOpacity },
    uPrimaryColor: { value: new THREE.Color(colors.primary) },
    uSecondaryColor: { value: new THREE.Color(colors.secondary) },
    uAccentColor: { value: new THREE.Color(colors.accent) },
    uColorMix: { value: 0.5 },
    uFresnelPower: { value: 2.0 },
    uFresnelIntensity: { value: 0.6 },
    uNoiseScale: { value: 0.8 },
    uNoiseSpeed: { value: 0.3 },
    uWireframe: { value: depth === 'far' ? 1.0 : 0.0 },
    uGlowIntensity: { value: depth === 'near' ? 1.5 : 0.8 },
    uGeometryType: { value: geometryType === 'icosahedron' ? 1.0 : 
                            geometryType === 'octahedron' ? 2.0 :
                            geometryType === 'tetrahedron' ? 3.0 : 4.0 },
  }), [colors, baseOpacity, depth, geometryType, timeVariant]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uTimeVariant.value = timeVariant;
      
      // Dynamic color mixing for organic feel
      materialRef.current.uniforms.uColorMix.value = 
        Math.sin(state.clock.elapsedTime * 0.4 + timeVariant) * 0.5 + 0.5;
      
      // Breathing effect for glow intensity
      materialRef.current.uniforms.uGlowIntensity.value = 
        (depth === 'near' ? 1.5 : 0.8) + Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
      
      // Dynamic fresnel power based on time
      materialRef.current.uniforms.uFresnelPower.value = 
        2.0 + Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={geometricVertexShader}
      fragmentShader={geometricFragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.DoubleSide}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
};