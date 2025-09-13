import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNodeMaterialProps {
  layerIndex: number;
  totalLayers: number;
  activation: number;
}

const neuralNodeVertexShader = `
  uniform float uTime;
  uniform float uActivation;
  uniform float uDataFlow;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vActivation;
  
  void main() {
    vPosition = position;
    vNormal = normal;
    vActivation = uActivation;
    
    vec3 pos = position;
    
    // Pulsing effect based on activation
    pos *= 1.0 + uActivation * 0.2 + sin(uTime * 3.0) * 0.05;
    
    // Data flow distortion
    pos += normal * sin(uTime * 2.0 + position.y * 0.1) * 0.02 * uDataFlow;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const neuralNodeFragmentShader = `
  uniform float uTime;
  uniform float uActivation;
  uniform float uDataFlow;
  uniform float uLayerProgress;
  uniform vec3 uPrimaryColor;
  uniform vec3 uSecondaryColor;
  
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vActivation;
  
  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    vec3 normal = normalize(vNormal);
    
    // Fresnel effect for holographic look
    float fresnel = dot(viewDirection, normal);
    fresnel = 1.0 - fresnel;
    fresnel = pow(fresnel, 2.0);
    
    // Activation glow
    float glow = vActivation * (1.0 + sin(uTime * 4.0) * 0.3);
    
    // Layer-based color mixing
    vec3 layerColor = mix(uPrimaryColor, uSecondaryColor, uLayerProgress);
    
    // Data flow effects
    float dataPattern = sin(uTime * 6.0 + vPosition.y * 2.0) * 0.5 + 0.5;
    dataPattern *= uDataFlow;
    
    // Combine effects
    vec3 color = layerColor;
    color += fresnel * 0.8;
    color += glow * 0.6;
    color += dataPattern * 0.4;
    
    // Holographic interference patterns
    float interference = sin(vPosition.x * 20.0 + uTime * 2.0) * 
                        sin(vPosition.y * 20.0 + uTime * 1.5) * 
                        sin(vPosition.z * 20.0 + uTime * 2.5);
    color += interference * 0.1;
    
    float alpha = 0.7 + fresnel * 0.3 + glow * 0.2;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export const NeuralNodeMaterial = ({ 
  layerIndex, 
  totalLayers, 
  activation 
}: NeuralNodeMaterialProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uActivation: { value: activation },
    uDataFlow: { value: 0.5 },
    uLayerProgress: { value: layerIndex / (totalLayers - 1) },
    uPrimaryColor: { value: new THREE.Color('#00f5ff') }, // Cyan
    uSecondaryColor: { value: new THREE.Color('#ff006e') }, // Magenta
  }), [layerIndex, totalLayers, activation]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={neuralNodeVertexShader}
      fragmentShader={neuralNodeFragmentShader}
      uniforms={uniforms}
      transparent
      side={THREE.DoubleSide}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
};