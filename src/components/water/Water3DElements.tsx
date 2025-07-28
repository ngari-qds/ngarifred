
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WaterMaterial } from './WaterMaterial';

interface Water3DElementsProps {
  colorVariant?: 'ocean' | 'midnight' | 'charcoal' | 'teal' | 'obsidian';
}

const colorVariants = {
  ocean: {
    color1: '#0a1128',
    color2: '#1a1a2e',
    color3: '#16213e',
  },
  midnight: {
    color1: '#1a1a2e',
    color2: '#0f3460',
    color3: '#0a1128',
  },
  charcoal: {
    color1: '#16213e',
    color2: '#0d1117',
    color3: '#1a1a2e',
  },
  teal: {
    color1: '#0f3460',
    color2: '#16213e',
    color3: '#0a1128',
  },
  obsidian: {
    color1: '#0d1117',
    color2: '#16213e',
    color3: '#1a1a2e',
  },
};

export const Water3DElements = ({ colorVariant = 'ocean' }: Water3DElementsProps) => {
  const cylinderRefs = useRef<THREE.Mesh[]>([]);
  const waveformRefs = useRef<THREE.Mesh[]>([]);
  const colors = colorVariants[colorVariant];

  // Create cylinder instances
  const cylinderData = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 100,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: 0.5 + Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.5,
      axis: Math.random() < 0.5 ? 'x' : 'z',
    }));
  }, []);

  // Create waveform instances
  const waveformData = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 80,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: 1 + Math.random() * 2,
      speed: 0.1 + Math.random() * 0.3,
      flow: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Animate cylinders with Inside Out-style movement
    cylinderRefs.current.forEach((cylinder, i) => {
      if (cylinder) {
        const data = cylinderData[i];
        
        // Flowing motion like Inside Out memory orbs
        if (data.axis === 'x') {
          cylinder.position.x += Math.sin(time * data.speed) * 0.02;
          cylinder.position.y += Math.cos(time * data.speed * 0.7) * 0.015;
        } else {
          cylinder.position.z += Math.sin(time * data.speed) * 0.02;
          cylinder.position.y += Math.cos(time * data.speed * 0.8) * 0.01;
        }
        
        // Gentle rotation
        cylinder.rotation.x += 0.005 * data.speed;
        cylinder.rotation.y += 0.003 * data.speed;
        
        // Pulsing scale effect
        const pulse = 1 + Math.sin(time * data.speed * 2) * 0.1;
        cylinder.scale.setScalar(data.scale * pulse);
      }
    });

    // Animate waveforms with fluid motion
    waveformRefs.current.forEach((waveform, i) => {
      if (waveform) {
        const data = waveformData[i];
        
        // Complex flowing patterns
        waveform.position.x += Math.sin(time * data.speed + data.flow) * 0.01;
        waveform.position.z += Math.cos(time * data.speed * 0.6 + data.flow) * 0.015;
        waveform.position.y += Math.sin(time * data.speed * 1.2 + data.flow) * 0.008;
        
        // Organic rotation
        waveform.rotation.x += 0.002 * data.speed;
        waveform.rotation.y += 0.004 * data.speed;
        waveform.rotation.z += 0.001 * data.speed;
        
        // Morphing effect
        const morph = 1 + Math.sin(time * data.speed * 1.5 + data.flow) * 0.2;
        waveform.scale.set(data.scale * morph, data.scale, data.scale * morph);
      }
    });
  });

  return (
    <group>
      {/* Flowing Water Cylinders */}
      {cylinderData.map((data, i) => (
        <mesh
          key={`cylinder-${i}`}
          ref={(el) => {
            if (el) cylinderRefs.current[i] = el;
          }}
          position={data.position}
          rotation={data.rotation}
          scale={data.scale}
        >
          <cylinderGeometry args={[1, 1.5, 8, 32, 1, true]} />
          <WaterMaterial
            color1={colors.color1}
            color2={colors.color2}
            color3={colors.color3}
            waveStrength={0.6}
            waveSpeed={0.8}
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* 3D Waveforms */}
      {waveformData.map((data, i) => (
        <mesh
          key={`waveform-${i}`}
          ref={(el) => {
            if (el) waveformRefs.current[i] = el;
          }}
          position={data.position}
          rotation={data.rotation}
          scale={data.scale}
        >
          <torusGeometry args={[3, 0.8, 16, 32]} />
          <WaterMaterial
            color1={colors.color1}
            color2={colors.color2}
            color3={colors.color3}
            waveStrength={0.4}
            waveSpeed={1.2}
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Floating Spheres for depth */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={`sphere-${i}`}
          position={[
            (Math.random() - 0.5) * 120,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 120,
          ]}
          scale={0.3 + Math.random() * 0.8}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <WaterMaterial
            color1={colors.color1}
            color2={colors.color2}
            color3={colors.color3}
            waveStrength={0.2}
            waveSpeed={0.4}
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};
