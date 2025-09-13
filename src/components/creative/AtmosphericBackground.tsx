import { Canvas } from '@react-three/fiber';
import { VolumetricLighting } from './VolumetricLighting';
import { AtmosphericParticles } from './AtmosphericParticles';
import { DarkGeometry } from './DarkGeometry';
import { DepthField } from './DepthField';
import { useEffect, useState } from 'react';

const AtmosphericScene = () => {
  const [intensity, setIntensity] = useState(0.6);
  const [timeflow, setTimeflow] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeflow(prev => (prev + 0.008) % (Math.PI * 2));
      // Subtle intensity variations for organic feel
      setIntensity(0.5 + Math.sin(Date.now() * 0.001) * 0.2);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Ultra-sophisticated lighting system */}
      <VolumetricLighting intensity={intensity} timeflow={timeflow} />
      
      {/* Atmospheric depth particles - minimal but impactful */}
      <AtmosphericParticles 
        count={1200}
        timeflow={timeflow}
        intensity={intensity}
      />
      
      {/* Dark geometric elements - financial tech aesthetic */}
      <DarkGeometry 
        timeflow={timeflow}
        intensity={intensity}
      />
      
      {/* Depth field for atmospheric perspective */}
      <DepthField timeflow={timeflow} />
    </>
  );
};

const AtmosphericBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <Canvas
        camera={{
          position: [0, 2, 25],
          fov: 60,
          near: 0.1,
          far: 200,
        }}
        style={{
          background: 'linear-gradient(180deg, hsl(210 40% 3%) 0%, hsl(215 28% 8%) 30%, hsl(220 30% 12%) 60%, hsl(210 40% 8%) 100%)',
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
        <AtmosphericScene />
      </Canvas>
      
      {/* Ultra-sophisticated overlay using design system */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/2 via-transparent to-background/8" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/15" />
      
      {/* Subtle atmospheric glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-accent/5 to-transparent" />
      </div>
      
      {/* Ultra-minimal vignette for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-midnight/20" />
    </div>
  );
};

export default AtmosphericBackground;