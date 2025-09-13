import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphericParticlesProps {
  count: number;
  timeflow: number;
  intensity: number;
}

export const AtmosphericParticles = ({ count, timeflow, intensity }: AtmosphericParticlesProps) => {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create atmospheric distribution - more particles in distance
      const depth = Math.random();
      const radius = (20 + depth * 80) * (0.3 + Math.random() * 0.7);
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 60 * (1 + depth);

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Subtle drift velocities for organic movement
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Vary sizes for atmospheric perspective
      sizes[i] = (0.5 + Math.random() * 2) * (1 - depth * 0.7);
      opacities[i] = (0.1 + Math.random() * 0.4) * (1 - depth * 0.8);
    }

    return { positions, velocities, sizes, opacities };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(particles.sizes, 1));
    geo.setAttribute('opacity', new THREE.BufferAttribute(particles.opacities, 1));
    return geo;
  }, [particles]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Ultra-smooth atmospheric drift
      positions[i3] += Math.sin(time * 0.1 + i * 0.01) * 0.005;
      positions[i3 + 1] += Math.cos(time * 0.08 + i * 0.015) * 0.003;
      positions[i3 + 2] += Math.sin(time * 0.12 + i * 0.008) * 0.004;

      // Subtle flow influence from timeflow
      positions[i3] += Math.sin(timeflow + i * 0.1) * 0.002;
      positions[i3 + 2] += Math.cos(timeflow + i * 0.1) * 0.002;

      // Reset particles that drift too far
      const distance = Math.sqrt(
        positions[i3] * positions[i3] + 
        positions[i3 + 2] * positions[i3 + 2]
      );
      
      if (distance > 100) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 30;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 2] = Math.sin(angle) * radius;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate entire particle system for subtle dynamics
    meshRef.current.rotation.y = time * 0.005;
    meshRef.current.rotation.x = Math.sin(time * 0.003) * 0.05;

    // Update material opacity based on intensity
    if (materialRef.current) {
      materialRef.current.opacity = (0.4 + intensity * 0.6) * 0.8;
    }
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        size={1.2}
        color="#64748b"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
      />
    </points>
  );
};