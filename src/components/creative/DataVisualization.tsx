import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataVisualizationProps {
  timePhase: number;
  style: 'quantum' | 'financial' | 'neural';
}

export const DataVisualization = ({ timePhase, style }: DataVisualizationProps) => {
  const dataGroupRef = useRef<THREE.Group>(null);
  const waveformRefs = useRef<THREE.Mesh[]>([]);
  const orbitingDataRefs = useRef<THREE.Mesh[]>([]);

  // Generate quantum financial data patterns
  const { waveforms, orbitingData } = useMemo(() => {
    const waveforms = [];
    const orbitingData = [];

    // Create multiple waveform rings representing financial data
    for (let i = 0; i < 5; i++) {
      const radius = 15 + i * 8;
      const segments = 64;
      const points = [];
      
      for (let j = 0; j < segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const wave = Math.sin(angle * 8 + i) * 2;
        
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          wave,
          Math.sin(angle) * radius
        ));
      }
      
      waveforms.push({
        points,
        radius,
        frequency: 2 + i * 0.5,
        phase: i * Math.PI * 0.4
      });
    }

    // Create orbiting data points
    for (let i = 0; i < 20; i++) {
      const radius = 20 + Math.random() * 30;
      const height = (Math.random() - 0.5) * 40;
      
      orbitingData.push({
        radius,
        height,
        speed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        size: 0.2 + Math.random() * 0.6
      });
    }

    return { waveforms, orbitingData };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Animate main group
    if (dataGroupRef.current) {
      dataGroupRef.current.rotation.y = timePhase * 0.2;
      dataGroupRef.current.position.y = Math.sin(timePhase * 0.5) * 2;
    }

    // Animate waveforms
    waveformRefs.current.forEach((mesh, index) => {
      if (mesh && waveforms[index]) {
        const waveform = waveforms[index];
        const geometry = mesh.geometry as THREE.BufferGeometry;
        const positions = geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < waveform.points.length; i++) {
          const angle = (i / waveform.points.length) * Math.PI * 2;
          const wave = Math.sin(angle * 8 + time * waveform.frequency + waveform.phase) * 2;
          const financialData = Math.sin(angle * 3 + time * 0.5) * 1.5; // Financial volatility
          
          positions[i * 3 + 1] = wave + financialData;
        }
        
        geometry.attributes.position.needsUpdate = true;
        
        // Update material uniforms
        if (mesh.material && 'uniforms' in mesh.material) {
          const material = mesh.material as THREE.ShaderMaterial;
          if (material.uniforms.uTime) {
            material.uniforms.uTime.value = time;
          }
        }
      }
    });

    // Animate orbiting data points
    orbitingDataRefs.current.forEach((mesh, index) => {
      if (mesh && orbitingData[index]) {
        const data = orbitingData[index];
        const orbitTime = time * data.speed + data.phase;
        
        mesh.position.set(
          Math.cos(orbitTime) * data.radius,
          data.height + Math.sin(orbitTime * 2) * 3,
          Math.sin(orbitTime) * data.radius
        );
        
        // Pulsing scale based on "data intensity"
        const pulse = 1 + Math.sin(time * 3 + index) * 0.3;
        mesh.scale.setScalar(data.size * pulse);
      }
    });
  });

  return (
    <group ref={dataGroupRef}>
      {/* Financial waveform rings */}
      {waveforms.map((waveform, index) => (
        <mesh
          key={`waveform-${index}`}
          ref={(el) => {
            if (el) waveformRefs.current[index] = el;
          }}
        >
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={waveform.points.length}
              array={new Float32Array(
                waveform.points.flatMap(p => [p.x, p.y, p.z])
              )}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={`hsl(${180 + index * 30}, 80%, 60%)`}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      
      {/* Orbiting data points */}
      {orbitingData.map((data, index) => (
        <mesh
          key={`data-${index}`}
          ref={(el) => {
            if (el) orbitingDataRefs.current[index] = el;
          }}
        >
          <octahedronGeometry args={[data.size]} />
          <meshPhongMaterial
            color={`hsl(${index * 18}, 100%, 70%)`}
            transparent
            opacity={0.8}
            emissive={`hsl(${index * 18}, 50%, 30%)`}
          />
        </mesh>
      ))}
      
      {/* Central quantum core */}
      <mesh>
        <torusGeometry args={[8, 1, 8, 32]} />
        <meshPhongMaterial
          color="#00f5ff"
          transparent
          opacity={0.4}
          emissive="#003566"
        />
      </mesh>
      
      {/* Data flow streams */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.1, 60, 8]} />
        <meshPhongMaterial
          color="#ff006e"
          transparent
          opacity={0.3}
          emissive="#8338ec"
        />
      </mesh>
    </group>
  );
};