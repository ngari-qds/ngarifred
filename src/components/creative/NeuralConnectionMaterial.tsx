import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralConnectionMaterialProps {
  weight: number;
}

const neuralConnectionVertexShader = `
  uniform float uTime;
  uniform float uDataFlow;
  uniform float uPhase;
  attribute float position;
  varying float vProgress;
  varying float vIntensity;
  
  void main() {
    vProgress = position;
    
    // Data flow animation
    float flowProgress = mod(uTime * 2.0 + uPhase, 1.0);
    vIntensity = smoothstep(0.0, 0.1, 1.0 - abs(vProgress - flowProgress)) * uDataFlow;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const neuralConnectionFragmentShader = `
  uniform float uTime;
  uniform float uWeight;
  uniform float uDataFlow;
  uniform vec3 uPositiveColor;
  uniform vec3 uNegativeColor;
  
  varying float vProgress;
  varying float vIntensity;
  
  void main() {
    // Weight-based coloring
    vec3 color = mix(uNegativeColor, uPositiveColor, step(0.0, uWeight));
    
    // Data flow effect
    float flowGlow = vIntensity * 2.0;
    color += flowGlow;
    
    // Connection strength based on weight
    float strength = abs(uWeight) * 0.5 + 0.2;
    
    // Pulsing effect
    float pulse = sin(uTime * 4.0 + vProgress * 10.0) * 0.3 + 0.7;
    
    float alpha = strength * pulse * (0.3 + uDataFlow * 0.7);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export const NeuralConnectionMaterial = ({ weight }: NeuralConnectionMaterialProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uWeight: { value: weight },
    uDataFlow: { value: 0.5 },
    uPhase: { value: Math.random() * Math.PI * 2 },
    uPositiveColor: { value: new THREE.Color('#00ff41') }, // Matrix green
    uNegativeColor: { value: new THREE.Color('#ff073a') }, // Red
  }), [weight]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={neuralConnectionVertexShader}
      fragmentShader={neuralConnectionFragmentShader}
      uniforms={uniforms}
      transparent
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
};