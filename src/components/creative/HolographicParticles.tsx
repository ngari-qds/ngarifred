import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HolographicParticlesProps {
  count: number;
  timePhase: number;
  intensity: number;
}

const holographicVertexShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uSize;
  attribute float size;
  attribute vec3 color;
  attribute float phase;
  varying vec3 vColor;
  varying float vIntensity;
  
  void main() {
    vColor = color;
    
    vec3 pos = position;
    
    // Holographic distortion
    pos.x += sin(uTime * 2.0 + phase) * 2.0;
    pos.y += cos(uTime * 1.5 + phase * 1.3) * 1.5;
    pos.z += sin(uTime * 1.8 + phase * 0.8) * 1.0;
    
    // Data flow movement
    pos.y += uTime * 5.0 * uIntensity;
    pos = mod(pos + 50.0, 100.0) - 50.0; // Wrap particles
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size based on distance and intensity
    float distanceSize = 50.0 / -mvPosition.z;
    gl_PointSize = size * distanceSize * (1.0 + uIntensity * 2.0);
    
    vIntensity = uIntensity;
  }
`;

const holographicFragmentShader = `
  uniform float uTime;
  varying vec3 vColor;
  varying float vIntensity;
  
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float distance = length(coord);
    
    // Circular particle shape
    if (distance > 0.5) discard;
    
    // Holographic interference pattern
    float interference = sin(distance * 20.0 + uTime * 3.0) * 0.5 + 0.5;
    
    // Center glow
    float glow = 1.0 - distance * 2.0;
    glow = pow(glow, 2.0);
    
    // Holographic shimmer
    float shimmer = sin(uTime * 6.0 + distance * 10.0) * 0.3 + 0.7;
    
    vec3 color = vColor;
    color *= glow * shimmer;
    color += interference * 0.2;
    
    float alpha = glow * (0.4 + vIntensity * 0.6) * shimmer;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export const HolographicParticles = ({ count, timePhase, intensity }: HolographicParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, colors, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    const holographicColors = [
      [0.0, 1.0, 1.0], // Cyan
      [1.0, 0.0, 1.0], // Magenta
      [0.0, 1.0, 0.3], // Green
      [1.0, 0.3, 0.0], // Orange
      [0.5, 0.0, 1.0], // Purple
      [1.0, 1.0, 0.0], // Yellow
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical distribution for neural network feel
      const radius = 10 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 80;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      // Holographic color selection
      const colorIndex = Math.floor(Math.random() * holographicColors.length);
      const selectedColor = holographicColors[colorIndex];
      
      colors[i * 3] = selectedColor[0];
      colors[i * 3 + 1] = selectedColor[1];
      colors[i * 3 + 2] = selectedColor[2];

      sizes[i] = 0.5 + Math.random() * 2.0;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, sizes, phases };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: intensity },
    uSize: { value: 1.0 },
  }), [intensity]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uIntensity.value = intensity;
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
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-phase"
          count={count}
          array={phases}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={holographicVertexShader}
        fragmentShader={holographicFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
};