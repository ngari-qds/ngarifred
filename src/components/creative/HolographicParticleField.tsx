import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HolographicParticleFieldProps {
  count?: number;
  timePhase: number;
  intensity: number;
}

export const HolographicParticleField = ({ 
  count = 3000, 
  timePhase, 
  intensity 
}: HolographicParticleFieldProps) => {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positionsArray = new Float32Array(count * 3);
    const velocitiesArray = new Float32Array(count * 3);
    const colorsArray = new Float32Array(count * 3);
    const sizesArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute particles in a large sphere
      const radius = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positionsArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positionsArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positionsArray[i * 3 + 2] = radius * Math.cos(phi) - 30;

      // Random velocities for organic movement
      velocitiesArray[i * 3] = (Math.random() - 0.5) * 0.02;
      velocitiesArray[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocitiesArray[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      // Holographic color palette
      const colorVariant = Math.random();
      let color: THREE.Color;
      
      if (colorVariant < 0.3) {
        color = new THREE.Color('#00ffff'); // Cyan
      } else if (colorVariant < 0.6) {
        color = new THREE.Color('#ff0080'); // Magenta
      } else if (colorVariant < 0.8) {
        color = new THREE.Color('#0080ff'); // Blue
      } else {
        color = new THREE.Color('#80ff00'); // Lime
      }

      colorsArray[i * 3] = color.r;
      colorsArray[i * 3 + 1] = color.g;
      colorsArray[i * 3 + 2] = color.b;

      sizesArray[i] = Math.random() * 2 + 0.5;
    }

    return {
      positions: positionsArray,
      velocities: velocitiesArray,
      colors: colorsArray,
      sizes: sizesArray
    };
  }, [count]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uOpacity: { value: 0.8 }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uIntensity;
        
        attribute float size;
        attribute vec3 color;
        
        varying vec3 vColor;
        varying float vAlpha;
        varying float vDistance;
        
        void main() {
          vColor = color;
          
          vec3 pos = position;
          
          // Holographic distortion
          pos.x += sin(uTime * 2.0 + position.y * 0.1 + position.z * 0.05) * uIntensity * 0.5;
          pos.y += cos(uTime * 1.5 + position.x * 0.1 + position.z * 0.08) * uIntensity * 0.3;
          pos.z += sin(uTime * 1.8 + position.x * 0.05 + position.y * 0.1) * uIntensity * 0.4;
          
          // Calculate distance for depth-based effects
          vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
          vDistance = length(worldPosition.xyz - cameraPosition);
          
          // Dynamic size with holographic flickering
          float dynamicSize = size * (1.0 + sin(uTime * 5.0 + length(position)) * 0.3);
          dynamicSize *= smoothstep(100.0, 20.0, vDistance);
          
          // Alpha based on distance and time for holographic effect
          vAlpha = smoothstep(120.0, 10.0, vDistance);
          vAlpha *= (0.4 + sin(uTime * 3.0 + length(position) * 0.1) * 0.6);
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = dynamicSize * (400.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uOpacity;
        
        varying vec3 vColor;
        varying float vAlpha;
        varying float vDistance;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float distance = length(center);
          
          // Holographic particle shape with interference patterns
          float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
          
          // Add holographic interference effect
          float interference = sin(distance * 20.0 + uTime * 10.0) * 0.5 + 0.5;
          alpha *= interference * 0.3 + 0.7;
          
          // Intense glow effect
          float glow = exp(-distance * 6.0);
          
          // Holographic color shift
          vec3 finalColor = vColor;
          finalColor += vec3(0.2, 0.1, 0.3) * glow;
          finalColor *= (1.0 + glow);
          
          float finalAlpha = alpha * vAlpha * uOpacity;
          finalAlpha += glow * 0.15; // Subtle glow halo
          
          gl_FragColor = vec4(finalColor, finalAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      material.uniforms.uTime.value = timePhase;
      material.uniforms.uIntensity.value = intensity;
      
      // Gentle rotation for dynamic effect
      meshRef.current.rotation.y = timePhase * 0.05;
      meshRef.current.rotation.x = Math.sin(timePhase * 0.3) * 0.1;
      
      // Update particle positions for flowing movement
      const positions = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Organic floating movement
        positions.array[i3] += velocities[i3] * intensity;
        positions.array[i3 + 1] += velocities[i3 + 1] * intensity;
        positions.array[i3 + 2] += velocities[i3 + 2] * intensity;
        
        // Boundary wrapping for continuous effect
        if (Math.abs(positions.array[i3]) > 70) velocities[i3] *= -0.8;
        if (Math.abs(positions.array[i3 + 1]) > 70) velocities[i3 + 1] *= -0.8;
        if (Math.abs(positions.array[i3 + 2]) > 50) velocities[i3 + 2] *= -0.8;
      }
      
      positions.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={sizes.length}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={material} />
    </points>
  );
};