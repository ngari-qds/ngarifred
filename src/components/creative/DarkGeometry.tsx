import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DarkGeometryProps {
  timeflow: number;
  intensity: number;
}

export const DarkGeometry = ({ timeflow, intensity }: DarkGeometryProps) => {
  const group1Ref = useRef<THREE.Group>(null);
  const group2Ref = useRef<THREE.Group>(null);
  const group3Ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Ultra-smooth group rotations for sophisticated movement
    if (group1Ref.current) {
      group1Ref.current.rotation.y = time * 0.02 + timeflow * 0.5;
      group1Ref.current.rotation.x = Math.sin(time * 0.015) * 0.1;
      group1Ref.current.rotation.z = Math.cos(time * 0.018) * 0.05;
      
      // Subtle scaling based on intensity
      const scale = 0.8 + intensity * 0.3;
      group1Ref.current.scale.setScalar(scale);
    }

    if (group2Ref.current) {
      group2Ref.current.rotation.y = time * -0.015 + timeflow * 0.3;
      group2Ref.current.rotation.x = Math.cos(time * 0.012) * 0.08;
      group2Ref.current.position.y = Math.sin(time * 0.008) * 2;
    }

    if (group3Ref.current) {
      group3Ref.current.rotation.z = time * 0.01 + timeflow * 0.2;
      group3Ref.current.rotation.y = Math.sin(time * 0.01) * 0.15;
      group3Ref.current.position.x = Math.cos(time * 0.006) * 3;
    }
  });

  return (
    <>
      {/* Primary geometric group - sophisticated wireframes */}
      <group ref={group1Ref} position={[0, 0, -40]}>
        {/* Icosahedron wireframe - financial/tech aesthetic */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[8, 0]} />
          <meshBasicMaterial 
            color="#334155"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
        
        {/* Nested octahedron for depth */}
        <mesh position={[0, 0, 0]} scale={0.6}>
          <octahedronGeometry args={[6, 0]} />
          <meshBasicMaterial 
            color="#475569"
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      </group>

      {/* Secondary group - atmospheric geometry */}
      <group ref={group2Ref} position={[25, -15, -60]}>
        {/* Dodecahedron - subtle and elegant */}
        <mesh>
          <dodecahedronGeometry args={[6, 0]} />
          <meshBasicMaterial 
            color="#1e293b"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
        
        {/* Ring geometry for sophistication */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <ringGeometry args={[8, 10, 16]} />
          <meshBasicMaterial 
            color="#64748b"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Tertiary group - minimal accent geometry */}
      <group ref={group3Ref} position={[-20, 10, -50]}>
        {/* Tetrahedron - clean and minimal */}
        <mesh>
          <tetrahedronGeometry args={[5, 0]} />
          <meshBasicMaterial 
            color="#475569"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
        
        {/* Cylinder outline for structure */}
        <mesh rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.1]}>
          <cylinderGeometry args={[7, 7, 1, 12, 1, true]} />
          <meshBasicMaterial 
            color="#334155"
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>
      </group>

      {/* Ultra-minimal floating elements */}
      <mesh position={[40, 20, -80]} rotation={[0, 0, Math.PI / 6]}>
        <planeGeometry args={[15, 0.1]} />
        <meshBasicMaterial 
          color="#64748b"
          transparent
          opacity={0.08}
        />
      </mesh>
      
      <mesh position={[-35, -25, -70]} rotation={[Math.PI / 3, 0, 0]}>
        <planeGeometry args={[0.1, 20]} />
        <meshBasicMaterial 
          color="#475569"
          transparent
          opacity={0.06}
        />
      </mesh>
    </>
  );
};