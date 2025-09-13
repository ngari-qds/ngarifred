import { Canvas } from '@react-three/fiber';
import { NeuralNetwork } from './NeuralNetwork';
import { HolographicParticles } from './HolographicParticles';
import { VolumetricLighting } from './VolumetricLighting';
import { DataVisualization } from './DataVisualization';
import { useEffect, useState } from 'react';

const NeuralScene = () => {
  const [timePhase, setTimePhase] = useState(0);
  const [dataFlowIntensity, setDataFlowIntensity] = useState(0.5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimePhase(prev => (prev + 0.05) % (Math.PI * 4));
      setDataFlowIntensity(prev => 0.3 + Math.sin(prev * 2) * 0.4);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <VolumetricLighting intensity={dataFlowIntensity} timeflow={timePhase} />
      
      {/* Main neural network structure */}
      <NeuralNetwork 
        layers={[64, 128, 256, 128, 64, 32]} 
        timePhase={timePhase}
        dataFlowIntensity={dataFlowIntensity}
      />
      
      {/* Holographic particle effects */}
      <HolographicParticles 
        count={1500} 
        timePhase={timePhase}
        intensity={dataFlowIntensity}
      />
      
      {/* Financial data visualization elements */}
      <DataVisualization 
        timePhase={timePhase}
        style="quantum"
      />
    </>
  );
};

const NeuralNetworkBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 50],
          fov: 60,
          near: 0.1,
          far: 2000,
        }}
        style={{
          background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000814 35%, #001d3d 70%, #003566 100%)',
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
      >
        <NeuralScene />
      </Canvas>
      
      {/* Sophisticated overlay system */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/8 via-transparent to-background/12" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20" />
      
      {/* Holographic scan lines effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default NeuralNetworkBackground;