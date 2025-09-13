import { Canvas } from '@react-three/fiber';
import { CyberpunkNeuralMatrix } from './CyberpunkNeuralMatrix';
import { HolographicParticleField } from './HolographicParticleField';
import { VolumetricFog } from './VolumetricFog';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

const CyberpunkScene = () => {
  const [timePhase, setTimePhase] = useState(0);
  const [intensity, setIntensity] = useState(0.7);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  
  useEffect(() => {
    // Animation loop
    const interval = setInterval(() => {
      setTimePhase(prev => prev + 0.016); // ~60fps
      
      // Dynamic intensity variations
      setIntensity(0.6 + Math.sin(Date.now() * 0.001) * 0.3);
    }, 16);

    // Mouse tracking for interactivity
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: 1.0 - (event.clientY / window.innerHeight)
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Advanced lighting setup */}
      <ambientLight intensity={0.1} color="#001122" />
      
      {/* Primary directional light with cyberpunk color */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.4}
        color="#00ffff"
        castShadow={false}
      />
      
      {/* Dynamic point lights */}
      <pointLight
        position={[20, 0, 10]}
        intensity={0.6}
        color="#ff0080"
        distance={50}
      />
      
      <pointLight
        position={[-20, 10, -10]}
        intensity={0.4}
        color="#0080ff"
        distance={60}
      />
      
      <pointLight
        position={[0, -15, 20]}
        intensity={0.5}
        color="#80ff00"
        distance={40}
      />
      
      {/* Rim lighting for depth */}
      <directionalLight
        position={[-5, -5, -10]}
        intensity={0.3}
        color="#004466"
      />
      
      {/* Core Components */}
      
      {/* Volumetric Fog Layer (background) */}
      <VolumetricFog timePhase={timePhase} intensity={intensity * 0.5} />
      
      {/* Holographic Particle Field (middle) */}
      <HolographicParticleField 
        count={2500}
        timePhase={timePhase}
        intensity={intensity}
      />
      
      {/* Neural Network Matrix (foreground) */}
      <CyberpunkNeuralMatrix 
        nodeCount={150}
        timePhase={timePhase}
        mousePosition={mousePosition}
      />
      
      {/* Additional atmospheric particles */}
      <HolographicParticleField 
        count={1000}
        timePhase={timePhase * 0.7}
        intensity={intensity * 0.6}
      />
    </>
  );
};

const CyberpunkNeuralBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 30],
          fov: 75,
          near: 0.1,
          far: 200,
        }}
        style={{
          background: `
            radial-gradient(circle at 20% 80%, #001122 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #003344 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, #002233 0%, transparent 50%),
            linear-gradient(135deg, #000811 0%, #001122 25%, #002244 50%, #001133 75%, #000822 100%)
          `,
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true
        }}
        dpr={[1, 2]}
      >
        {/* Fog for atmospheric depth */}
        <fog attach="fog" args={['#000811', 60, 200]} />
        
        <CyberpunkScene />
      </Canvas>
      
      {/* Sophisticated overlay system matching design tokens */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/3 via-transparent to-background/8" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/12" />
      
      {/* Cyberpunk scan lines effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-pulse" />
      </div>
      
      {/* Holographic interference pattern */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 255, 0.03) 2px,
              rgba(0, 255, 255, 0.03) 4px
            )`
          }}
        />
      </div>
      
      {/* Subtle vignette for content focus */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-midnight/25" />
    </div>
  );
};

export default CyberpunkNeuralBackground;