import { Canvas } from '@react-three/fiber';
import { FloatingGeometry } from './FloatingGeometry';
import { ParticleField } from './ParticleField';
import { MorphingShapes } from './MorphingShapes';
import { DynamicLighting } from './DynamicLighting';
import { useEffect, useState } from 'react';

const GeometricScene = () => {
  const [timeVariant, setTimeVariant] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeVariant(prev => (prev + 0.1) % (Math.PI * 2));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DynamicLighting timeVariant={timeVariant} />
      
      {/* Floating geometric shapes at different depths */}
      <FloatingGeometry 
        count={12} 
        depth="far" 
        timeVariant={timeVariant}
        geometry="icosahedron"
      />
      
      <FloatingGeometry 
        count={8} 
        depth="mid" 
        timeVariant={timeVariant}
        geometry="octahedron"
      />
      
      <FloatingGeometry 
        count={6} 
        depth="near" 
        timeVariant={timeVariant}
        geometry="tetrahedron"
      />
      
      {/* Morphing abstract shapes */}
      <MorphingShapes timeVariant={timeVariant} />
      
      {/* Particle field for atmospheric depth */}
      <ParticleField count={2000} timeVariant={timeVariant} />
    </>
  );
};

const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 30],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a1128 100%)',
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <GeometricScene />
      </Canvas>
      
      {/* Sophisticated overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-transparent to-background/10" />
      
      {/* Subtle depth enhancement */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/15" />
    </div>
  );
};

export default GeometricBackground;