import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AlgorithmicFlowProps {
  complexity: number;
  timeFlow: number;
  marketActivity: number;
}

// Sophisticated shader for algorithmic flow lines
const flowVertexShader = `
  uniform float uTime;
  uniform float uTimeFlow;
  uniform float uMarketActivity;
  uniform float uFlowSpeed;
  
  attribute float progress;
  attribute vec3 direction;
  
  varying vec3 vPosition;
  varying float vProgress;
  varying float vAlpha;
  
  void main() {
    vPosition = position;
    vProgress = progress;
    
    vec3 pos = position;
    
    // Create flowing motion along the path
    float flow = sin(uTime * uFlowSpeed + progress * 10.0 + uTimeFlow) * 0.1;
    pos += direction * flow * uMarketActivity;
    
    // Gentle undulation
    pos.y += sin(uTime * 0.5 + position.x * 0.1) * 0.2;
    pos.x += cos(uTime * 0.3 + position.z * 0.1) * 0.15;
    
    // Alpha based on market activity and position
    vAlpha = (0.3 + uMarketActivity * 0.7) * (1.0 - abs(progress - 0.5) * 2.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const flowFragmentShader = `
  uniform float uTime;
  uniform float uMarketActivity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  
  varying vec3 vPosition;
  varying float vProgress;
  varying float vAlpha;
  
  void main() {
    // Create gradient along the flow
    vec3 color1 = mix(uColor1, uColor2, vProgress);
    vec3 color2 = mix(uColor2, uColor3, vProgress);
    vec3 finalColor = mix(color1, color2, sin(uTime * 0.5) * 0.5 + 0.5);
    
    // Add market activity pulsing
    finalColor += vec3(0.1) * uMarketActivity * sin(uTime * 2.0);
    
    // Distance-based fade
    float distanceFade = 1.0 - length(vPosition) / 50.0;
    
    gl_FragColor = vec4(finalColor, vAlpha * distanceFade * 0.8);
  }
`;

export const AlgorithmicFlow = ({ complexity, timeFlow, marketActivity }: AlgorithmicFlowProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const materialRefs = useRef<THREE.ShaderMaterial[]>([]);

  // Generate flowing paths representing algorithms
  const flowPaths = useMemo(() => {
    const paths = [];
    
    for (let i = 0; i < complexity; i++) {
      const points = [];
      const attributes = {
        positions: [] as number[],
        progress: [] as number[],
        directions: [] as number[],
      };
      
      // Create curved algorithmic paths
      const segments = 64;
      const radius = 15 + i * 8;
      const height = 20;
      
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const angle = t * Math.PI * 4 + i * Math.PI * 0.7;
        
        // Create flowing helical paths
        const x = Math.cos(angle) * radius * (0.8 + Math.sin(t * Math.PI * 2) * 0.2);
        const y = (t - 0.5) * height + Math.sin(angle * 2) * 3;
        const z = Math.sin(angle) * radius * (0.8 + Math.cos(t * Math.PI * 2) * 0.2);
        
        points.push(new THREE.Vector3(x, y, z));
        attributes.positions.push(x, y, z);
        attributes.progress.push(t);
        
        // Calculate direction for flow effect
        if (j > 0) {
          const dir = points[j].clone().sub(points[j - 1]).normalize();
          attributes.directions.push(dir.x, dir.y, dir.z);
        } else {
          attributes.directions.push(1, 0, 0);
        }
      }
      
      paths.push({
        positions: new Float32Array(attributes.positions),
        progress: new Float32Array(attributes.progress),
        directions: new Float32Array(attributes.directions),
        color: i % 3,
      });
    }
    
    return paths;
  }, [complexity]);

  // Create materials for each path
  const materials = useMemo(() => {
    return flowPaths.map((path, i) => {
      const colors = [
        { color1: '#4a90e2', color2: '#60a5fa', color3: '#3b82f6' }, // Blue
        { color1: '#8b5cf6', color2: '#a855f7', color3: '#9333ea' }, // Purple  
        { color1: '#06b6d4', color2: '#0ea5e9', color3: '#0284c7' }, // Cyan
      ][path.color];
      
      return new THREE.ShaderMaterial({
        vertexShader: flowVertexShader,
        fragmentShader: flowFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uTimeFlow: { value: timeFlow },
          uMarketActivity: { value: marketActivity },
          uFlowSpeed: { value: 1.0 + i * 0.3 },
          uColor1: { value: new THREE.Color(colors.color1) },
          uColor2: { value: new THREE.Color(colors.color2) },
          uColor3: { value: new THREE.Color(colors.color3) },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
    });
  }, [flowPaths, timeFlow, marketActivity]);

  useFrame((state) => {
    materials.forEach((material, i) => {
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uTimeFlow.value = timeFlow;
      material.uniforms.uMarketActivity.value = marketActivity;
    });
  });

  return (
    <group ref={groupRef}>
      {flowPaths.map((path, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={path.positions.length / 3}
              array={path.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-progress"
              count={path.progress.length}
              array={path.progress}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-direction"
              count={path.directions.length / 3}
              array={path.directions}
              itemSize={3}
            />
          </bufferGeometry>
          <primitive object={materials[i]} />
        </line>
      ))}
    </group>
  );
};