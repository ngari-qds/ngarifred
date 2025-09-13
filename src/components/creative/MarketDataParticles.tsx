import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MarketDataParticlesProps {
  count: number;
  timeFlow: number;
  marketActivity: number;
}

// Elegant particle shader for market data points
const dataVertexShader = `
  uniform float uTime;
  uniform float uTimeFlow;
  uniform float uMarketActivity;
  uniform float uSize;
  
  attribute float size;
  attribute vec3 color;
  attribute float volatility;
  attribute float trend;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlow;
  
  void main() {
    vColor = color;
    
    vec3 pos = position;
    
    // Market-driven motion
    float marketMotion = sin(uTime * 2.0 + volatility * 10.0) * uMarketActivity;
    pos.y += marketMotion * 2.0;
    pos.x += cos(uTime * 1.5 + trend * 5.0) * uMarketActivity * 1.5;
    
    // Gentle orbital motion
    float angle = uTime * 0.3 + length(position) * 0.1;
    pos.x += sin(angle) * 0.5;
    pos.z += cos(angle) * 0.5;
    
    // Size based on market activity and volatility
    float dynamicSize = size * uSize * (0.8 + uMarketActivity * 0.4 + volatility * 0.3);
    
    // Distance-based alpha
    float distance = length(pos);
    vAlpha = smoothstep(60.0, 20.0, distance) * (0.4 + uMarketActivity * 0.6);
    
    // Glow effect for high volatility particles
    vGlow = volatility * uMarketActivity;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = dynamicSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const dataFragmentShader = `
  uniform float uTime;
  uniform float uMarketActivity;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vGlow;
  
  void main() {
    // Create circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float distance = length(center);
    
    // Soft circular falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
    
    // Market glow effect
    float glow = exp(-distance * 3.0) * vGlow;
    
    // Enhanced color with market activity
    vec3 finalColor = vColor + (vColor * glow * 0.6);
    finalColor += vec3(0.1, 0.15, 0.2) * uMarketActivity * sin(uTime * 3.0);
    
    // Final alpha
    float finalAlpha = alpha * vAlpha;
    finalAlpha += glow * 0.2; // Subtle glow halo
    
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

export const MarketDataParticles = ({ count, timeFlow, marketActivity }: MarketDataParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate market data particles
  const { positions, sizes, colors, volatilities, trends } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const volatilities = new Float32Array(count);
    const trends = new Float32Array(count);

    // Create realistic distribution mimicking market data
    for (let i = 0; i < count; i++) {
      // Distribute in layers representing different market sectors
      const sector = Math.floor(Math.random() * 4);
      const radius = 25 + sector * 8 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Particle size representing data importance
      sizes[i] = 0.8 + Math.random() * 1.5;

      // Market volatility and trend
      volatilities[i] = Math.random();
      trends[i] = Math.random() * 2 - 1; // -1 to 1 for bearish to bullish

      // Color based on market sector and trend
      if (sector === 0) {
        // Tech sector - blue tones
        colors[i * 3] = 0.2 + Math.random() * 0.3;     // R
        colors[i * 3 + 1] = 0.5 + Math.random() * 0.3; // G  
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      } else if (sector === 1) {
        // Finance sector - green/red based on trend
        if (trends[i] > 0) {
          colors[i * 3] = 0.1 + Math.random() * 0.2;     // R
          colors[i * 3 + 1] = 0.6 + Math.random() * 0.3; // G
          colors[i * 3 + 2] = 0.3 + Math.random() * 0.2; // B
        } else {
          colors[i * 3] = 0.7 + Math.random() * 0.2;     // R
          colors[i * 3 + 1] = 0.2 + Math.random() * 0.2; // G
          colors[i * 3 + 2] = 0.2 + Math.random() * 0.2; // B
        }
      } else if (sector === 2) {
        // Energy sector - amber tones
        colors[i * 3] = 0.8 + Math.random() * 0.2;     // R
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.2 + Math.random() * 0.2; // B
      } else {
        // Healthcare sector - purple tones
        colors[i * 3] = 0.6 + Math.random() * 0.3;     // R
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      }
    }

    return { positions, sizes, colors, volatilities, trends };
  }, [count]);

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTimeFlow: { value: timeFlow },
    uMarketActivity: { value: marketActivity },
    uSize: { value: 1.0 },
  }), [timeFlow, marketActivity]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uTimeFlow.value = timeFlow;
      materialRef.current.uniforms.uMarketActivity.value = marketActivity;
      
      // Breathing size effect
      materialRef.current.uniforms.uSize.value = 
        1.0 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }

    // Subtle position updates for market movement
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const vol = volatilities[i];
        const trend = trends[i];
        
        // Market-driven micro-movements
        const marketNoise = (Math.sin(time * 2 + i * 0.1) * vol * marketActivity) * 0.05;
        positions[i3 + 1] += marketNoise;
        
        // Trend-based drift
        positions[i3] += trend * 0.001 * marketActivity;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-volatility"
          count={count}
          array={volatilities}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-trend"
          count={count}
          array={trends}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={dataVertexShader}
        fragmentShader={dataFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
};