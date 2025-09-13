import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VolumetricFogProps {
  timePhase: number;
  intensity: number;
}

export const VolumetricFog = ({ timePhase, intensity }: VolumetricFogProps) => {
  const fogRef = useRef<THREE.Mesh>(null);

  const fogMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uColor1: { value: new THREE.Color('#001122') },
      uColor2: { value: new THREE.Color('#003344') },
      uColor3: { value: new THREE.Color('#004466') }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uIntensity;
      
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying float vDistance;
      
      void main() {
        vPosition = position;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Volumetric distortion
        pos.y += sin(uTime * 0.5 + position.x * 0.02 + position.z * 0.02) * uIntensity * 2.0;
        pos.x += cos(uTime * 0.3 + position.y * 0.02 + position.z * 0.03) * uIntensity * 1.5;
        pos.z += sin(uTime * 0.4 + position.x * 0.03 + position.y * 0.02) * uIntensity * 1.8;
        
        vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
        vDistance = length(worldPosition.xyz - cameraPosition);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uIntensity;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying float vDistance;
      
      float noise(vec3 p) {
        return sin(p.x * 1.5 + uTime * 0.2) * 
               cos(p.y * 1.2 + uTime * 0.15) * 
               sin(p.z * 1.3 + uTime * 0.25);
      }
      
      void main() {
        vec3 pos = vPosition * 0.02;
        
        // Multi-octave noise for volumetric effect
        float n1 = noise(pos) * 0.5;
        float n2 = noise(pos * 2.0) * 0.25;
        float n3 = noise(pos * 4.0) * 0.125;
        float totalNoise = (n1 + n2 + n3) * 0.5 + 0.5;
        
        // Distance-based alpha
        float alpha = smoothstep(0.0, 80.0, vDistance) * smoothstep(150.0, 100.0, vDistance);
        alpha *= totalNoise * uIntensity;
        
        // Color mixing based on position and noise
        vec3 color = mix(uColor1, uColor2, totalNoise);
        color = mix(color, uColor3, sin(uTime * 0.1 + length(vPosition) * 0.01) * 0.5 + 0.5);
        
        gl_FragColor = vec4(color, alpha * 0.15);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });

  useFrame(() => {
    if (fogRef.current) {
      fogMaterial.uniforms.uTime.value = timePhase;
      fogMaterial.uniforms.uIntensity.value = intensity;
      
      // Slow rotation for atmospheric movement
      fogRef.current.rotation.y = timePhase * 0.02;
      fogRef.current.rotation.x = Math.sin(timePhase * 0.15) * 0.05;
    }
  });

  return (
    <group>
      {/* Multiple fog layers for depth */}
      <mesh ref={fogRef} material={fogMaterial}>
        <sphereGeometry args={[80, 32, 32]} />
      </mesh>
      
      <mesh material={fogMaterial} position={[20, -10, -15]}>
        <sphereGeometry args={[60, 24, 24]} />
      </mesh>
      
      <mesh material={fogMaterial} position={[-25, 15, -20]}>
        <sphereGeometry args={[50, 20, 20]} />
      </mesh>
    </group>
  );
};