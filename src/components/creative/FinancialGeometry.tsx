import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FinancialGeometryProps {
  timeFlow: number;
  structures: string[];
}

// Sophisticated shader for financial geometric structures
const geometryVertexShader = `
  uniform float uTime;
  uniform float uTimeFlow;
  uniform float uStructureType;
  uniform vec3 uPosition;
  
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDepth;
  
  void main() {
    vPosition = position;
    vNormal = normal;
    
    vec3 pos = position;
    
    // Different animation based on structure type
    if (uStructureType < 1.5) {
      // Icosahedron - representing complex derivatives
      pos *= 1.0 + sin(uTime * 0.8 + length(position) * 0.5) * 0.1;
      pos += normal * sin(uTime * 1.2 + uTimeFlow) * 0.05;
    } else if (uStructureType < 2.5) {
      // Dodecahedron - representing portfolio structures  
      float angle = uTime * 0.6 + length(position) * 0.3;
      pos += vec3(sin(angle), cos(angle * 1.1), sin(angle * 0.7)) * 0.1;
    } else {
      // Octahedron - representing risk metrics
      pos *= 1.0 + sin(uTime * 1.0 + dot(position, vec3(1.0, 1.0, 1.0)) * 0.8) * 0.08;
    }
    
    // Apply global position
    pos += uPosition;
    
    vDepth = length(pos);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const geometryFragmentShader = `
  uniform float uTime;
  uniform float uTimeFlow;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uOpacity;
  
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDepth;
  
  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    vec3 normal = normalize(vNormal);
    
    // Fresnel effect for financial sophistication
    float fresnel = dot(viewDirection, normal);
    fresnel = 1.0 - fresnel;
    fresnel = pow(fresnel, 1.5);
    
    // Distance-based color mixing
    float colorMix = sin(uTime * 0.3 + vDepth * 0.1) * 0.5 + 0.5;
    vec3 color = mix(uColor1, uColor2, colorMix);
    
    // Add fresnel glow
    color += fresnel * 0.4;
    
    // Subtle financial data pattern overlay
    float pattern = sin(vPosition.x * 8.0 + uTime) * 
                   sin(vPosition.y * 6.0 + uTime * 0.7) * 
                   sin(vPosition.z * 10.0 + uTime * 0.5);
    color += pattern * 0.05;
    
    // Distance-based alpha
    float alpha = smoothstep(80.0, 20.0, vDepth) * uOpacity;
    alpha += fresnel * 0.3;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

export const FinancialGeometry = ({ timeFlow, structures }: FinancialGeometryProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);

  // Create geometric structures representing financial concepts
  const geometries = useMemo(() => {
    return structures.map((structure, i) => {
      let geometry;
      let position = new THREE.Vector3();
      let scale = 1;
      
      switch (structure) {
        case 'icosahedron':
          geometry = new THREE.IcosahedronGeometry(2.5, 1);
          position.set(-20 + i * 15, 10 - i * 5, -15 + i * 8);
          scale = 0.8;
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry(2.2, 0);
          position.set(10 - i * 12, -8 + i * 6, 20 - i * 10);
          scale = 0.9;
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(2.8, 1);
          position.set(25 - i * 20, 15 - i * 8, -25 + i * 12);
          scale = 0.7;
          break;
        default:
          geometry = new THREE.IcosahedronGeometry(2.5, 1);
          position.set(0, 0, 0);
      }

      const colors = [
        { color1: '#4a90e2bb', color2: '#60a5faaa' }, // Blue - representing stability
        { color1: '#8b5cf6bb', color2: '#a855f7aa' }, // Purple - representing innovation  
        { color1: '#06b6d4bb', color2: '#0ea5e9aa' }, // Cyan - representing liquidity
      ][i % 3];

      const material = new THREE.ShaderMaterial({
        vertexShader: geometryVertexShader,
        fragmentShader: geometryFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uTimeFlow: { value: timeFlow },
          uStructureType: { value: i + 1 },
          uPosition: { value: position },
          uColor1: { value: new THREE.Color(colors.color1) },
          uColor2: { value: new THREE.Color(colors.color2) },
          uOpacity: { value: 0.6 },
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      return {
        geometry,
        material,
        position,
        scale,
        rotationSpeed: 0.2 + i * 0.15,
      };
    });
  }, [structures, timeFlow]);

  useFrame((state) => {
    geometries.forEach((geom, i) => {
      geom.material.uniforms.uTime.value = state.clock.elapsedTime;
      geom.material.uniforms.uTimeFlow.value = timeFlow;
      
      // Gentle rotation representing market cycles
      if (meshRefs.current[i]) {
        meshRefs.current[i].rotation.x += geom.rotationSpeed * 0.01;
        meshRefs.current[i].rotation.y += geom.rotationSpeed * 0.008;
        meshRefs.current[i].rotation.z += geom.rotationSpeed * 0.005;
        
        // Subtle floating motion
        meshRefs.current[i].position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.01;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {geometries.map((geom, i) => (
        <mesh
          key={i}
          ref={(ref) => {
            if (ref) meshRefs.current[i] = ref;
          }}
          geometry={geom.geometry}
          material={geom.material}
          position={geom.position}
          scale={geom.scale}
        />
      ))}
    </group>
  );
};