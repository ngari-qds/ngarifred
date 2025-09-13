import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GeometricMaterial } from './GeometricMaterial';

interface MorphingShapesProps {
  timeVariant: number;
}

export const MorphingShapes = ({ timeVariant }: MorphingShapesProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const morphingMeshRefs = useRef<THREE.Mesh[]>([]);

  // Create morphing shape instances
  const morphingInstances = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const angle = (i / 5) * Math.PI * 2;
      const radius = 40 + i * 8;
      
      return {
        initialPosition: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 20,
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotationAxis: [
          Math.random(),
          Math.random(),
          Math.random()
        ] as [number, number, number],
        morphSpeed: 0.5 + Math.random() * 1.0,
        orbitSpeed: 0.1 + Math.random() * 0.2,
        scale: 2 + Math.random() * 3,
        shapeType: i % 4, // Different shapes
      };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Animate entire group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.03) * 0.1;
    }

    // Animate individual morphing shapes
    morphingMeshRefs.current.forEach((mesh, i) => {
      if (mesh && morphingInstances[i]) {
        const instance = morphingInstances[i];
        
        // Complex orbital motion
        const orbitTime = time * instance.orbitSpeed;
        const x = instance.initialPosition[0] * Math.cos(orbitTime) - instance.initialPosition[2] * Math.sin(orbitTime);
        const z = instance.initialPosition[0] * Math.sin(orbitTime) + instance.initialPosition[2] * Math.cos(orbitTime);
        const y = instance.initialPosition[1] + Math.sin(orbitTime * 2 + i) * 8;
        
        mesh.position.set(x, y, z);
        
        // Complex rotation
        mesh.rotation.x += instance.rotationAxis[0] * 0.01;
        mesh.rotation.y += instance.rotationAxis[1] * 0.015;
        mesh.rotation.z += instance.rotationAxis[2] * 0.008;
        
        // Morphing scale effect
        const morphScale = 1 + Math.sin(time * instance.morphSpeed + timeVariant + i) * 0.3;
        const breathingScale = 1 + Math.sin(time * 0.7 + i * 0.5) * 0.1;
        
        mesh.scale.setScalar(instance.scale * morphScale * breathingScale);
        
        // Dynamic visibility based on distance and time
        const distance = mesh.position.length();
        const visibility = 0.4 + Math.sin(time * 0.3 + distance * 0.01) * 0.3;
        if (mesh.material && 'uniforms' in mesh.material) {
          const material = mesh.material as THREE.ShaderMaterial;
          if (material.uniforms.uOpacity) {
            material.uniforms.uOpacity.value = visibility;
          }
        }
      }
    });
  });

  const getShapeGeometry = (shapeType: number) => {
    switch (shapeType) {
      case 0:
        return <torusGeometry args={[1, 0.4, 16, 32]} />;
      case 1:
        return <coneGeometry args={[1, 2, 8]} />;
      case 2:
        return <cylinderGeometry args={[0.8, 1.2, 2, 12]} />;
      case 3:
        return <sphereGeometry args={[1, 16, 16]} />;
      default:
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {morphingInstances.map((instance, i) => (
        <mesh
          key={`morphing-${i}`}
          ref={(el) => {
            if (el) morphingMeshRefs.current[i] = el;
          }}
          position={instance.initialPosition}
          scale={instance.scale}
        >
          {getShapeGeometry(instance.shapeType)}
          <GeometricMaterial
            baseOpacity={0.3}
            depth="mid"
            timeVariant={timeVariant}
            geometryType="morphing"
          />
        </mesh>
      ))}
      
      {/* Central focal point */}
      <mesh position={[0, 0, 0]} scale={4}>
        <ringGeometry args={[2, 2.5, 32]} />
        <GeometricMaterial
          baseOpacity={0.2}
          depth="near"
          timeVariant={timeVariant}
          geometryType="ring"
        />
      </mesh>
    </group>
  );
};