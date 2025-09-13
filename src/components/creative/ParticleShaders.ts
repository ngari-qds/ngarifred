// Sophisticated particle shaders for atmospheric depth
export const particleVertexShader = `
  uniform float uTime;
  uniform float uTimeVariant;
  uniform float uSize;
  
  attribute float size;
  attribute vec3 color;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDistance;
  
  void main() {
    vColor = color;
    
    // Calculate distance for depth-based effects
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vDistance = length(worldPosition.xyz - cameraPosition);
    
    // Dynamic size based on time and distance
    float dynamicSize = size * uSize;
    dynamicSize *= (1.0 + sin(uTime + position.x * 0.1 + position.y * 0.1) * 0.2);
    
    // Distance-based size scaling
    dynamicSize *= smoothstep(80.0, 20.0, vDistance);
    
    // Alpha based on distance and time
    vAlpha = smoothstep(100.0, 10.0, vDistance);
    vAlpha *= (0.6 + sin(uTime * 0.5 + uTimeVariant + length(position) * 0.1) * 0.4);
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = dynamicSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const particleFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uGlowIntensity;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDistance;
  
  void main() {
    // Create circular particle shape
    vec2 center = gl_PointCoord - vec2(0.5);
    float distance = length(center);
    
    // Soft circular falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
    
    // Add glow effect
    float glow = exp(-distance * 4.0) * uGlowIntensity;
    
    // Enhanced color with glow
    vec3 finalColor = vColor + (vColor * glow * 0.5);
    
    // Final alpha combining all factors
    float finalAlpha = alpha * vAlpha * uOpacity;
    finalAlpha += glow * 0.1; // Subtle glow halo
    
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;