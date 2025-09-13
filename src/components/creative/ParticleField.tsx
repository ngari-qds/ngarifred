import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { particleVertexShader, particleFragmentShader } from './ParticleShaders';

interface ParticleFieldProps {
  count: number;
  timeVariant: number;
}

export const ParticleField = ({ count, timeVariant }: ParticleFieldProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate particle positions and attributes
  const { positions, sizes, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    // Create spherical distribution with inner void
    for (let i = 0; i < count; i++) {
      // Spherical coordinates for natural distribution
      const radius = 20 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Varied particle sizes
      sizes[i] = 0.5 + Math.random() * 2.0;

      // Color variation - cooler tones for sophistication
      const colorVariant = Math.random();
      if (colorVariant < 0.3) {
        // Blue tones
        colors[i * 3] = 0.2 + Math.random() * 0.3; // R
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      } else if (colorVariant < 0.6) {
        // Purple tones
        colors[i * 3] = 0.5 + Math.random() * 0.3; // R
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      } else {
        // Cyan tones
        colors[i * 3] = 0.1 + Math.random() * 0.2; // R
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      }

      // Individual animation speeds
      speeds[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions, sizes, colors, speeds };
  }, [count]);

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTimeVariant: { value: timeVariant },
    uSize: { value: 1.0 },
    uOpacity: { value: 0.6 },
    uGlowIntensity: { value: 1.2 },
  }), [timeVariant]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uTimeVariant.value = timeVariant;
      
      // Breathing glow effect
      materialRef.current.uniforms.uGlowIntensity.value = 
        1.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }

    // Animate particle positions
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const speed = speeds[i];
        
        // Gentle floating motion
        const floatOffset = Math.sin(time * speed + i * 0.1) * 0.5;
        positions[i3 + 1] += floatOffset * 0.01;
        
        // Subtle orbital motion
        const orbitSpeed = speed * 0.1;
        const currentX = positions[i3];
        const currentZ = positions[i3 + 2];
        const radius = Math.sqrt(currentX * currentX + currentZ * currentZ);
        
        if (radius > 0) {
          const angle = Math.atan2(currentZ, currentX) + orbitSpeed * 0.001;
          positions[i3] = radius * Math.cos(angle);
          positions[i3 + 2] = radius * Math.sin(angle);
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
};