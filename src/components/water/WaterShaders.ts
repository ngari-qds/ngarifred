
// Enhanced water shaders for 3D geometry with realistic flowing effects
export const waterVertexShader = `
  uniform float uTime;
  uniform float uWaveStrength;
  uniform float uWaveSpeed;
  uniform vec3 uFlowDirection;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vWave;
  varying vec3 vWorldPosition;
  
  // Enhanced noise functions for 3D space
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  // Fractal noise for complex 3D patterns
  float fractalNoise(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    
    return value;
  }
  
  void main() {
    vUv = uv;
    vPosition = position;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    
    // Create complex 3D wave patterns
    vec3 worldPos = vWorldPosition;
    float time = uTime * uWaveSpeed;
    
    // Multiple wave layers with different frequencies
    float wave1 = sin(worldPos.x * 0.05 + time) * cos(worldPos.z * 0.03 + time * 0.7);
    float wave2 = sin(worldPos.y * 0.08 + time * 1.2) * cos(worldPos.x * 0.04 + time * 0.5);
    float wave3 = sin((worldPos.x + worldPos.z) * 0.06 + time * 0.9) * cos(worldPos.y * 0.02 + time * 1.5);
    
    // Add 3D noise for organic flow
    float noise3D = fractalNoise(worldPos * 0.02 + uFlowDirection * time * 0.1);
    
    // Combine waves with flow direction
    vec3 flowOffset = uFlowDirection * time * 0.05;
    float flowNoise = fractalNoise(worldPos * 0.015 + flowOffset);
    
    // Calculate displacement with enhanced 3D movement
    float displacement = (wave1 + wave2 + wave3) * 0.3 + noise3D * 0.6 + flowNoise * 0.4;
    displacement *= uWaveStrength;
    
    // Apply displacement to create 3D flowing effect
    vec3 newPosition = position + normal * displacement;
    
    // Calculate new normal for realistic lighting
    float offset = 0.01;
    vec3 tangentX = vec3(offset, 0.0, 0.0);
    vec3 tangentZ = vec3(0.0, 0.0, offset);
    
    float dispX = fractalNoise((worldPos + tangentX) * 0.02 + flowOffset) * uWaveStrength;
    float dispZ = fractalNoise((worldPos + tangentZ) * 0.02 + flowOffset) * uWaveStrength;
    
    vec3 newNormal = normalize(cross(
      tangentX + normal * dispX,
      tangentZ + normal * dispZ
    ));
    
    vNormal = newNormal;
    vWave = displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const waterFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uColorMix;
  uniform vec3 uFlowDirection;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vWave;
  varying vec3 vWorldPosition;
  
  void main() {
    vec3 worldPos = vWorldPosition;
    float time = uTime * 0.5;
    
    // Create flowing patterns in 3D space
    float flow1 = sin(worldPos.x * 0.1 + time) * cos(worldPos.z * 0.08 + time * 0.7);
    float flow2 = sin(worldPos.y * 0.12 + time * 1.3) * cos(worldPos.x * 0.06 + time * 0.9);
    float flow3 = sin((worldPos.x + worldPos.y + worldPos.z) * 0.04 + time * 1.1);
    
    // Enhanced color mixing with flow direction influence
    vec3 flowInfluence = normalize(uFlowDirection + vec3(flow1, flow2, flow3) * 0.5);
    float flowIntensity = dot(flowInfluence, vNormal) * 0.5 + 0.5;
    
    // Multi-layer color blending
    vec3 color = mix(uColor1, uColor2, flowIntensity);
    color = mix(color, uColor3, (flow2 + flow3) * 0.5 + 0.5);
    
    // Add depth and volume effects
    float depth = smoothstep(-1.0, 1.0, vWave);
    color = mix(color * 0.4, color, depth);
    
    // Enhanced foam and bubble effects
    float foam = smoothstep(0.4, 0.8, vWave);
    float bubbles = sin(worldPos.x * 0.5 + time * 2.0) * cos(worldPos.z * 0.3 + time * 1.5);
    bubbles = smoothstep(0.3, 0.7, bubbles) * foam;
    
    color = mix(color, vec3(0.9, 0.95, 1.0), bubbles * 0.15);
    
    // Advanced fresnel effect for 3D realism
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 3.0);
    
    // Rim lighting for 3D volume
    float rim = 1.0 - dot(viewDirection, vNormal);
    rim = pow(rim, 2.0);
    color += rim * vec3(0.2, 0.4, 0.8) * 0.3;
    
    // Final alpha with enhanced transparency
    float alpha = uOpacity * (0.6 + fresnel * 0.4);
    alpha = mix(alpha, alpha * 0.3, rim);
    
    gl_FragColor = vec4(color, alpha);
  }
`;
