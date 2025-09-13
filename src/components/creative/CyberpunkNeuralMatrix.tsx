import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNode {
  position: THREE.Vector3;
  connections: number[];
  activity: number;
  type: 'core' | 'data' | 'processing';
}

interface CyberpunkNeuralMatrixProps {
  nodeCount?: number;
  timePhase: number;
  mousePosition: { x: number; y: number };
}

export const CyberpunkNeuralMatrix = ({ 
  nodeCount = 120, 
  timePhase,
  mousePosition 
}: CyberpunkNeuralMatrixProps) => {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { camera } = useThree();

  // Generate neural network structure
  const { nodes, connections, positions, colors, sizes } = useMemo(() => {
    const nodeArray: NeuralNode[] = [];
    const positionsArray = new Float32Array(nodeCount * 3);
    const colorsArray = new Float32Array(nodeCount * 3);
    const sizesArray = new Float32Array(nodeCount);
    const connectionLines: number[] = [];

    // Create nodes in 3D space
    for (let i = 0; i < nodeCount; i++) {
      const radius = 15 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.6; // Flatten Y slightly
      const z = radius * Math.cos(phi) - 20;

      const nodeType: 'core' | 'data' | 'processing' = 
        Math.random() < 0.1 ? 'core' : Math.random() < 0.3 ? 'processing' : 'data';

      nodeArray.push({
        position: new THREE.Vector3(x, y, z),
        connections: [],
        activity: Math.random(),
        type: nodeType
      });

      positionsArray[i * 3] = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;

      // Color based on node type
      let color: THREE.Color;
      switch (nodeType) {
        case 'core':
          color = new THREE.Color('#00ffff'); // Cyan
          sizesArray[i] = 3.0 + Math.random() * 2.0;
          break;
        case 'processing':
          color = new THREE.Color('#ff0080'); // Magenta
          sizesArray[i] = 2.0 + Math.random() * 1.5;
          break;
        default:
          color = new THREE.Color('#0080ff'); // Blue
          sizesArray[i] = 1.0 + Math.random() * 1.0;
      }

      colorsArray[i * 3] = color.r;
      colorsArray[i * 3 + 1] = color.g;
      colorsArray[i * 3 + 2] = color.b;
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      const node = nodeArray[i];
      let connectionCount = 0;
      const maxConnections = node.type === 'core' ? 8 : node.type === 'processing' ? 5 : 3;

      for (let j = 0; j < nodeCount && connectionCount < maxConnections; j++) {
        if (i !== j) {
          const distance = node.position.distanceTo(nodeArray[j].position);
          if (distance < 12 && Math.random() > 0.6) {
            node.connections.push(j);
            connectionLines.push(
              positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2],
              positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]
            );
            connectionCount++;
          }
        }
      }
    }

    return {
      nodes: nodeArray,
      connections: new Float32Array(connectionLines),
      positions: positionsArray,
      colors: colorsArray,
      sizes: sizesArray
    };
  }, [nodeCount]);

  // Neural node vertex shader
  const nodeVertexShader = `
    uniform float uTime;
    uniform float uMouseInfluence;
    uniform vec2 uMousePosition;
    
    attribute float size;
    attribute vec3 color;
    
    varying vec3 vColor;
    varying float vActivity;
    
    void main() {
      vColor = color;
      
      vec3 pos = position;
      
      // Mouse interaction
      vec2 mouseInfluence = (uMousePosition - 0.5) * uMouseInfluence;
      pos.x += sin(uTime + position.y * 0.1) * mouseInfluence.x * 0.5;
      pos.y += cos(uTime + position.x * 0.1) * mouseInfluence.y * 0.5;
      
      // Pulsing activity
      float activity = 0.5 + sin(uTime * 2.0 + length(position) * 0.1) * 0.5;
      vActivity = activity;
      
      vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_Position = projectionMatrix * viewPosition;
      
      gl_PointSize = size * (1.0 + activity * 0.5) * (300.0 / -viewPosition.z);
    }
  `;

  // Neural node fragment shader
  const nodeFragmentShader = `
    varying vec3 vColor;
    varying float vActivity;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float distance = length(center);
      
      // Create glowing orb effect
      float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
      float glow = exp(-distance * 8.0) * vActivity;
      
      vec3 finalColor = vColor + (vColor * glow * 2.0);
      float finalAlpha = alpha * (0.7 + vActivity * 0.3);
      
      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `;

  // Connection line material
  const connectionMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 0.3 }
      },
      vertexShader: `
        uniform float uTime;
        varying float vDistance;
        
        void main() {
          vDistance = length(position);
          vec3 pos = position;
          
          // Subtle wave motion
          pos += sin(uTime + length(position) * 0.1) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uOpacity;
        varying float vDistance;
        
        void main() {
          float pulse = 0.5 + sin(uTime * 3.0 + vDistance * 0.1) * 0.5;
          vec3 color = mix(vec3(0.0, 0.5, 1.0), vec3(0.0, 1.0, 1.0), pulse);
          
          gl_FragColor = vec4(color, uOpacity * pulse);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, []);

  // Node material
  const nodeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouseInfluence: { value: 0 },
        uMousePosition: { value: new THREE.Vector2(0.5, 0.5) }
      },
      vertexShader: nodeVertexShader,
      fragmentShader: nodeFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && linesRef.current) {
      // Update node material uniforms
      nodeMaterial.uniforms.uTime.value = timePhase;
      nodeMaterial.uniforms.uMouseInfluence.value = 
        Math.sqrt(mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y) * 2;
      nodeMaterial.uniforms.uMousePosition.value.set(mousePosition.x, mousePosition.y);
      
      // Update connection material
      connectionMaterial.uniforms.uTime.value = timePhase;
      
      // Rotate the entire matrix slowly
      meshRef.current.rotation.y = timePhase * 0.1;
      linesRef.current.rotation.y = timePhase * 0.1;
      
      // Gentle floating motion
      meshRef.current.position.y = Math.sin(timePhase * 0.5) * 0.5;
      linesRef.current.position.y = Math.sin(timePhase * 0.5) * 0.5;
    }
  });

  return (
    <group>
      {/* Neural Nodes */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colors}
            count={colors.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            array={sizes}
            count={sizes.length}
            itemSize={1}
          />
        </bufferGeometry>
        <primitive object={nodeMaterial} />
      </points>
      
      {/* Neural Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={connections}
            count={connections.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={connectionMaterial} />
      </lineSegments>
    </group>
  );
};