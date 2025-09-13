import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GeometricMaterial } from './GeometricMaterial';

interface FloatingGeometryProps {
  count: number;
  depth: 'near' | 'mid' | 'far';
  timeVariant: number;
  geometry: 'icosahedron' | 'octahedron' | 'tetrahedron' | 'dodecahedron';
}

const getGeometry = (type: string) => {
  switch (type) {
    case 'icosahedron':
      return <icosahedronGeometry args={[1, 0]} />;
    case 'octahedron':
      return <octahedronGeometry args={[1, 0]} />;
    case 'tetrahedron':
      return <tetrahedronGeometry args={[1, 0]} />;
    case 'dodecahedron':
      return <dodecahedronGeometry args={[1, 0]} />;
    default:
      return <icosahedronGeometry args={[1, 0]} />;
  }
};

const getDepthSettings = (depth: string) => {
  switch (depth) {
    case 'near':
      return { 
        zRange: [-10, 10], 
        scale: [0.8, 1.5], 
        speed: 0.3, 
        opacity: 0.8,
        spread: 25
      };
    case 'mid':
      return { 
        zRange: [-30, -15], 
        scale: [1.2, 2.2], 
        speed: 0.2, 
        opacity: 0.6,
        spread: 40
      };
    case 'far':
      return { 
        zRange: [-60, -35], 
        scale: [1.8, 3.5], 
        speed: 0.1, 
        opacity: 0.4,
        spread: 60
      };
    default:
      return { 
        zRange: [-20, 0], 
        scale: [1, 2], 
        speed: 0.25, 
        opacity: 0.7,
        spread: 35
      };
  }
};

export const FloatingGeometry = ({ count, depth, timeVariant, geometry }: FloatingGeometryProps) => {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const settings = getDepthSettings(depth);

  // Generate instances with sophisticated distribution
  const instances = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const phi = Math.acos(1 - 2 * Math.random());
      const theta = 2 * Math.PI * Math.random();
      
      return {
        position: [
          settings.spread * Math.sin(phi) * Math.cos(theta),
          settings.spread * Math.sin(phi) * Math.sin(theta),
          settings.zRange[0] + Math.random() * (settings.zRange[1] - settings.zRange[0])
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number],
        scale: settings.scale[0] + Math.random() * (settings.scale[1] - settings.scale[0]),
        rotationSpeed: [
          (Math.random() - 0.5) * settings.speed,
          (Math.random() - 0.5) * settings.speed,
          (Math.random() - 0.5) * settings.speed
        ] as [number, number, number],
        floatSpeed: 0.5 + Math.random() * 1.5,
        floatAmplitude: 2 + Math.random() * 4,
        phaseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 1 + Math.random() * 2,
      };
    });
  }, [count, settings]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    meshRefs.current.forEach((mesh, i) => {
      if (mesh && instances[i]) {
        const instance = instances[i];
        
        // Sophisticated floating motion
        const floatY = Math.sin(time * instance.floatSpeed + instance.phaseOffset) * instance.floatAmplitude;
        const floatX = Math.cos(time * instance.floatSpeed * 0.7 + instance.phaseOffset) * (instance.floatAmplitude * 0.5);
        const floatZ = Math.sin(time * instance.floatSpeed * 0.3 + instance.phaseOffset) * (instance.floatAmplitude * 0.3);
        
        mesh.position.set(
          instance.position[0] + floatX,
          instance.position[1] + floatY,
          instance.position[2] + floatZ
        );
        
        // Organic rotation
        mesh.rotation.x += instance.rotationSpeed[0];
        mesh.rotation.y += instance.rotationSpeed[1];
        mesh.rotation.z += instance.rotationSpeed[2];
        
        // Dynamic scaling based on time and position
        const pulse = 1 + Math.sin(time * instance.pulseSpeed + timeVariant) * 0.1;
        const distanceScale = 1 + (Math.abs(mesh.position.z) / 100) * 0.5;
        mesh.scale.setScalar(instance.scale * pulse * distanceScale);
      }
    });
  });

  return (
    <group>
      {instances.map((instance, i) => (
        <mesh
          key={`${geometry}-${depth}-${i}`}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          position={instance.position}
          rotation={instance.rotation}
          scale={instance.scale}
        >
          {getGeometry(geometry)}
          <GeometricMaterial
            baseOpacity={settings.opacity}
            depth={depth}
            timeVariant={timeVariant}
            geometryType={geometry}
          />
        </mesh>
      ))}
    </group>
  );
};