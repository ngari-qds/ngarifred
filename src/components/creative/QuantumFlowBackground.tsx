import { Canvas } from '@react-three/fiber';
import { AlgorithmicFlow } from './AlgorithmicFlow';
import { MarketDataParticles } from './MarketDataParticles';
import { FinancialGeometry } from './FinancialGeometry';
import { QuantumLighting } from './QuantumLighting';
import { useEffect, useState } from 'react';

const QuantumScene = () => {
  const [marketActivity, setMarketActivity] = useState(0.5);
  const [timeFlow, setTimeFlow] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeFlow(prev => (prev + 0.02) % (Math.PI * 4));
      // Simulate market activity fluctuations
      setMarketActivity(prev => 0.3 + Math.sin(prev * 3) * 0.4 + Math.random() * 0.1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <QuantumLighting timeFlow={timeFlow} marketActivity={marketActivity} />
      
      {/* Algorithmic flow lines - representing trading algorithms */}
      <AlgorithmicFlow 
        complexity={3}
        timeFlow={timeFlow}
        marketActivity={marketActivity}
      />
      
      {/* Financial geometric structures */}
      <FinancialGeometry 
        timeFlow={timeFlow}
        structures={['icosahedron', 'dodecahedron', 'octahedron']}
      />
      
      {/* Market data particles - elegant and subtle */}
      <MarketDataParticles 
        count={800}
        timeFlow={timeFlow}
        marketActivity={marketActivity}
      />
    </>
  );
};

const QuantumFlowBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <Canvas
        camera={{
          position: [0, 0, 40],
          fov: 65,
          near: 0.1,
          far: 1000,
        }}
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 25%, #1e293b 50%, #334155 75%, #475569 100%)',
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
      >
        <QuantumScene />
      </Canvas>
      
      {/* Sophisticated glass overlay matching design system */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/5 via-transparent to-background/8" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/12" />
      
      {/* Subtle quantitative data overlay effect */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default QuantumFlowBackground;