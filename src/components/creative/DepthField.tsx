import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DepthFieldProps {
  timeflow: number;
}

export const DepthField = ({ timeflow }: DepthFieldProps) => {
  const nearFieldRef = useRef<THREE.Mesh>(null);
  const midFieldRef = useRef<THREE.Mesh>(null);
  const farFieldRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Ultra-subtle depth field movement
    if (nearFieldRef.current) {
      nearFieldRef.current.rotation.z = time * 0.008 + timeflow * 0.1;
      (nearFieldRef.current.material as THREE.MeshBasicMaterial).opacity = 0.02 + Math.sin(time * 0.005) * 0.005;
    }

    if (midFieldRef.current) {
      midFieldRef.current.rotation.z = time * -0.005 + timeflow * 0.05;
      (midFieldRef.current.material as THREE.MeshBasicMaterial).opacity = 0.015 + Math.sin(time * 0.003 + Math.PI) * 0.003;
    }

    if (farFieldRef.current) {
      farFieldRef.current.rotation.z = time * 0.003 + timeflow * 0.02;
      (farFieldRef.current.material as THREE.MeshBasicMaterial).opacity = 0.01 + Math.sin(time * 0.002) * 0.002;
    }
  });

  return (
    <>
      {/* Near depth field - subtle atmospheric plane */}
      <mesh ref={nearFieldRef} position={[0, 0, 10]}>
        <planeGeometry args={[200, 200, 1, 1]} />
        <meshBasicMaterial
          color="#1e293b"
          transparent
          opacity={0.02}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Mid depth field - atmospheric layer */}
      <mesh ref={midFieldRef} position={[0, 0, -20]}>
        <planeGeometry args={[300, 300, 1, 1]} />
        <meshBasicMaterial
          color="#334155"
          transparent
          opacity={0.015}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Far depth field - deepest atmospheric layer */}
      <mesh ref={farFieldRef} position={[0, 0, -60]}>
        <planeGeometry args={[400, 400, 1, 1]} />
        <meshBasicMaterial
          color="#0f172a"
          transparent
          opacity={0.01}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
};