import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NeuralNodeMaterial } from './NeuralNodeMaterial';
import { NeuralConnectionMaterial } from './NeuralConnectionMaterial';

interface NeuralNetworkProps {
  layers: number[];
  timePhase: number;
  dataFlowIntensity: number;
}

interface NeuralNode {
  position: THREE.Vector3;
  layerIndex: number;
  nodeIndex: number;
  activation: number;
  connections: number[];
}

export const NeuralNetwork = ({ layers, timePhase, dataFlowIntensity }: NeuralNetworkProps) => {
  const networkGroupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<THREE.Mesh[]>([]);
  const connectionRefs = useRef<THREE.Line[]>([]);

  // Generate neural network structure
  const { nodes, connections } = useMemo(() => {
    const nodes: NeuralNode[] = [];
    const connections: Array<{ from: number; to: number; weight: number }> = [];
    
    const layerSpacing = 25;
    const maxNodesInLayer = Math.max(...layers);
    
    let nodeIndex = 0;
    
    // Create nodes for each layer
    layers.forEach((nodeCount, layerIndex) => {
      const layerOffset = (layerIndex - layers.length / 2) * layerSpacing;
      const nodeSpacing = (maxNodesInLayer - 1) * 3;
      
      for (let i = 0; i < nodeCount; i++) {
        const nodeOffset = (i - (nodeCount - 1) / 2) * (nodeSpacing / Math.max(nodeCount - 1, 1));
        
        nodes.push({
          position: new THREE.Vector3(
            layerOffset,
            nodeOffset + (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 8
          ),
          layerIndex,
          nodeIndex: i,
          activation: Math.random(),
          connections: []
        });
        
        nodeIndex++;
      }
    });
    
    // Create connections between adjacent layers
    let currentNodeIndex = 0;
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
      const currentLayerSize = layers[layerIndex];
      const nextLayerSize = layers[layerIndex + 1];
      
      for (let i = 0; i < currentLayerSize; i++) {
        const fromIndex = currentNodeIndex + i;
        
        // Connect to nodes in next layer with varying probability
        for (let j = 0; j < nextLayerSize; j++) {
          const toIndex = currentNodeIndex + currentLayerSize + j;
          
          if (Math.random() > 0.3) { // 70% connection probability
            connections.push({
              from: fromIndex,
              to: toIndex,
              weight: (Math.random() - 0.5) * 2
            });
            
            nodes[fromIndex].connections.push(toIndex);
          }
        }
      }
      currentNodeIndex += currentLayerSize;
    }
    
    return { nodes, connections };
  }, [layers]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate network rotation
    if (networkGroupRef.current) {
      networkGroupRef.current.rotation.y = timePhase * 0.1;
      networkGroupRef.current.rotation.x = Math.sin(timePhase * 0.7) * 0.05;
      networkGroupRef.current.rotation.z = Math.cos(timePhase * 0.3) * 0.02;
    }
    
    // Animate individual nodes
    nodeRefs.current.forEach((node, index) => {
      if (node && nodes[index]) {
        const nodeData = nodes[index];
        
        // Pulsing activation effect
        const activation = 0.5 + Math.sin(time * 2 + index * 0.1 + timePhase) * 0.5;
        const scale = 0.8 + activation * 0.4 + dataFlowIntensity * 0.3;
        
        node.scale.setScalar(scale);
        
        // Update node material uniforms
        if (node.material && 'uniforms' in node.material) {
          const material = node.material as THREE.ShaderMaterial;
          if (material.uniforms.uActivation) {
            material.uniforms.uActivation.value = activation;
          }
          if (material.uniforms.uTime) {
            material.uniforms.uTime.value = time;
          }
          if (material.uniforms.uDataFlow) {
            material.uniforms.uDataFlow.value = dataFlowIntensity;
          }
        }
        
        // Subtle floating motion
        const floatY = Math.sin(time * 0.5 + index * 0.2) * 0.5;
        const floatZ = Math.cos(time * 0.3 + index * 0.15) * 0.3;
        
        node.position.copy(nodeData.position);
        node.position.y += floatY;
        node.position.z += floatZ;
      }
    });
    
    // Animate connections
    connectionRefs.current.forEach((connection, index) => {
      if (connection && connection.material && 'uniforms' in connection.material) {
        const material = connection.material as THREE.ShaderMaterial;
        if (material.uniforms.uTime) {
          material.uniforms.uTime.value = time;
        }
        if (material.uniforms.uDataFlow) {
          material.uniforms.uDataFlow.value = dataFlowIntensity;
        }
        if (material.uniforms.uPhase) {
          material.uniforms.uPhase.value = timePhase + index * 0.1;
        }
      }
    });
  });

  return (
    <group ref={networkGroupRef}>
      {/* Neural nodes */}
      {nodes.map((node, index) => (
        <mesh
          key={`node-${index}`}
          ref={(el) => {
            if (el) nodeRefs.current[index] = el;
          }}
          position={node.position}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <NeuralNodeMaterial
            layerIndex={node.layerIndex}
            totalLayers={layers.length}
            activation={node.activation}
          />
        </mesh>
      ))}
      
      {/* Neural connections */}
      {connections.map((connection, index) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array([
          nodes[connection.from].position.x,
          nodes[connection.from].position.y,
          nodes[connection.from].position.z,
          nodes[connection.to].position.x,
          nodes[connection.to].position.y,
          nodes[connection.to].position.z,
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        return (
          <primitive
            key={`connection-${index}`}
            object={new THREE.Line(geometry)}
            ref={(el: THREE.Line) => {
              if (el) {
                connectionRefs.current[index] = el;
                // Apply material
                el.material = new THREE.ShaderMaterial({
                  vertexShader: `
                    uniform float uTime;
                    uniform float uDataFlow;
                    uniform float uPhase;
                    varying float vProgress;
                    varying float vIntensity;
                    
                    void main() {
                      vProgress = position.x; // Use x-coordinate as progress
                      
                      float flowProgress = mod(uTime * 2.0 + uPhase, 1.0);
                      vIntensity = smoothstep(0.0, 0.1, 1.0 - abs(vProgress - flowProgress)) * uDataFlow;
                      
                      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                  `,
                  fragmentShader: `
                    uniform float uTime;
                    uniform float uWeight;
                    uniform float uDataFlow;
                    uniform vec3 uPositiveColor;
                    uniform vec3 uNegativeColor;
                    
                    varying float vProgress;
                    varying float vIntensity;
                    
                    void main() {
                      vec3 color = mix(uNegativeColor, uPositiveColor, step(0.0, uWeight));
                      
                      float flowGlow = vIntensity * 2.0;
                      color += flowGlow;
                      
                      float strength = abs(uWeight) * 0.5 + 0.2;
                      float pulse = sin(uTime * 4.0 + vProgress * 10.0) * 0.3 + 0.7;
                      
                      float alpha = strength * pulse * (0.3 + uDataFlow * 0.7);
                      
                      gl_FragColor = vec4(color, alpha);
                    }
                  `,
                  uniforms: {
                    uTime: { value: 0 },
                    uWeight: { value: connection.weight },
                    uDataFlow: { value: 0.5 },
                    uPhase: { value: Math.random() * Math.PI * 2 },
                    uPositiveColor: { value: new THREE.Color('#00ff41') },
                    uNegativeColor: { value: new THREE.Color('#ff073a') },
                  },
                  transparent: true,
                  depthWrite: false,
                  blending: THREE.AdditiveBlending
                });
              }
            }}
          />
        );
      })}
    </group>
  );
};