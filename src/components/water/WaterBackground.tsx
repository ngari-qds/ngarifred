
import { Canvas } from '@react-three/fiber';
import { WaterSurface } from './WaterSurface';
import { Water3DElements } from './Water3DElements';
import { useEffect, useState } from 'react';

const WaterScene = () => {
  const [colorVariant, setColorVariant] = useState<'ocean' | 'midnight' | 'charcoal' | 'teal' | 'obsidian'>('ocean');
  
  useEffect(() => {
    const variants: ('ocean' | 'midnight' | 'charcoal' | 'teal' | 'obsidian')[] = 
      ['ocean', 'midnight', 'charcoal', 'teal', 'obsidian'];
    
    const interval = setInterval(() => {
      setColorVariant(prev => {
        const currentIndex = variants.indexOf(prev);
        return variants[(currentIndex + 1) % variants.length];
      });
    }, 12000); // Change color variant every 12 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Enhanced lighting for 3D elements */}
      <ambientLight intensity={0.3} color="#4a90e2" />
      
      {/* Main directional light */}
      <directionalLight
        position={[20, 20, 10]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
      
      {/* Dynamic point lights */}
      <pointLight
        position={[0, 10, 20]}
        intensity={0.6}
        color="#60a5fa"
        distance={100}
      />
      
      <pointLight
        position={[-30, 5, -20]}
        intensity={0.4}
        color="#3b82f6"
        distance={80}
      />
      
      <pointLight
        position={[40, 8, 30]}
        intensity={0.5}
        color="#1d4ed8"
        distance={90}
      />
      
      {/* Base water surface */}
      <WaterSurface
        size={[300, 300]}
        segments={[512, 512]}
        position={[0, -10, -20]}
        colorVariant={colorVariant}
      />
      
      {/* 3D Water Elements - Inside Out style */}
      <Water3DElements colorVariant={colorVariant} />
      
      {/* Additional layered surfaces for depth */}
      <WaterSurface
        size={[200, 200]}
        segments={[256, 256]}
        position={[50, -5, -15]}
        colorVariant={colorVariant}
      />
      
      <WaterSurface
        size={[180, 180]}
        segments={[128, 128]}
        position={[-40, -8, -12]}
        colorVariant={colorVariant}
      />
    </>
  );
};

const WaterBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <Canvas
        camera={{
          position: [0, 5, 40],
          fov: 75,
          near: 0.1,
          far: 2000,
        }}
        style={{
          background: 'linear-gradient(135deg, #0a1128 0%, #1a1a2e 50%, #16213e 100%)',
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <WaterScene />
      </Canvas>
      
      {/* Enhanced overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/5 to-background/15 backdrop-blur-[0.5px]" />
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20" />
    </div>
  );
};

export default WaterBackground;
