// Modern geometric shaders for sophisticated 3D backgrounds
export const geometricVertexShader = `
  uniform float uTime;
  uniform float uTimeVariant;
  uniform float uNoiseScale;
  uniform float uNoiseSpeed;
  uniform float uGeometryType;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vNoise;
  varying float vFresnel;
  
  // Sophisticated 3D noise functions
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
  
  // Fractal noise for complex surface detail
  float fractalNoise(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 4; i++) {
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
    
    // Create dynamic surface displacement based on geometry type
    vec3 worldPos = vWorldPosition;
    float time = uTime * uNoiseSpeed;
    
    // Different displacement patterns for different geometries
    float displacement = 0.0;
    if (uGeometryType == 1.0) { // Icosahedron - flowing waves
      displacement = fractalNoise(worldPos * uNoiseScale + vec3(time * 0.5, time * 0.3, time * 0.7)) * 0.3;
    } else if (uGeometryType == 2.0) { // Octahedron - pulsing expansion
      displacement = sin(length(worldPos) * 0.5 + time * 2.0) * 0.2;
      displacement += fractalNoise(worldPos * uNoiseScale * 0.5 + vec3(time)) * 0.1;
    } else if (uGeometryType == 3.0) { // Tetrahedron - crystal facets
      displacement = fractalNoise(worldPos * uNoiseScale * 2.0 + vec3(0.0, time, 0.0)) * 0.15;
      displacement += sin(worldPos.x * 3.0 + time) * sin(worldPos.y * 3.0 + time) * 0.1;
    } else { // Dodecahedron - complex morphing
      displacement = fractalNoise(worldPos * uNoiseScale + vec3(time * 0.2, time * 0.4, time * 0.6)) * 0.25;
      displacement += sin(uTimeVariant + length(worldPos) * 0.3) * 0.15;
    }
    
    // Apply displacement along normal
    vec3 newPosition = position + normal * displacement;
    
    // Calculate new normal for proper lighting
    float offset = 0.01;
    vec3 tangent1 = vec3(offset, 0.0, 0.0);
    vec3 tangent2 = vec3(0.0, offset, 0.0);
    
    float disp1 = fractalNoise((worldPos + tangent1) * uNoiseScale + vec3(time)) * displacement;
    float disp2 = fractalNoise((worldPos + tangent2) * uNoiseScale + vec3(time)) * displacement;
    
    vec3 newNormal = normalize(cross(
      tangent1 + normal * disp1,
      tangent2 + normal * disp2
    ));
    
    vNormal = newNormal;
    vNoise = displacement;
    
    // Calculate fresnel for rim lighting
    vec3 worldNormal = normalize((modelMatrix * vec4(newNormal, 0.0)).xyz);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vFresnel = 1.0 - max(dot(viewDirection, worldNormal), 0.0);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const geometricFragmentShader = `
  uniform float uTime;
  uniform float uTimeVariant;
  uniform float uOpacity;
  uniform vec3 uPrimaryColor;
  uniform vec3 uSecondaryColor;
  uniform vec3 uAccentColor;
  uniform float uColorMix;
  uniform float uFresnelPower;
  uniform float uFresnelIntensity;
  uniform float uWireframe;
  uniform float uGlowIntensity;
  uniform float uGeometryType;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vNoise;
  varying float vFresnel;
  
  void main() {
    vec3 worldPos = vWorldPosition;
    float time = uTime * 0.5;
    
    // Dynamic color blending based on noise and time
    vec3 color1 = mix(uPrimaryColor, uSecondaryColor, uColorMix);
    vec3 color2 = mix(uSecondaryColor, uAccentColor, sin(time + uTimeVariant) * 0.5 + 0.5);
    
    // Color varies with geometry type and world position
    float colorFactor = 0.5;
    if (uGeometryType == 1.0) {
      colorFactor = sin(worldPos.x * 0.1 + time) * cos(worldPos.z * 0.08 + time) * 0.5 + 0.5;
    } else if (uGeometryType == 2.0) {
      colorFactor = length(vPosition) * 0.3 + sin(time * 2.0) * 0.2 + 0.5;
    } else if (uGeometryType == 3.0) {
      colorFactor = abs(sin(worldPos.y * 0.2 + time)) * 0.6 + 0.4;
    } else {
      colorFactor = (vNoise + 1.0) * 0.5;
    }
    
    vec3 finalColor = mix(color1, color2, colorFactor);
    
    // Enhanced fresnel effect for sophisticated rim lighting
    float fresnel = pow(vFresnel, uFresnelPower);
    finalColor = mix(finalColor, finalColor * 2.0, fresnel * uFresnelIntensity);
    
    // Add depth-based color variation
    float depth = (vWorldPosition.z + 50.0) / 100.0;
    finalColor = mix(finalColor * 0.7, finalColor, clamp(depth, 0.0, 1.0));
    
    // Wireframe effect for far geometry
    if (uWireframe > 0.5) {
      vec3 wireColor = uAccentColor * 1.5;
      float wire = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
      wire = smoothstep(0.0, 0.02, wire);
      finalColor = mix(wireColor, finalColor * 0.3, wire);
    }
    
    // Glow effect based on noise
    float glow = smoothstep(-0.2, 0.8, vNoise) * uGlowIntensity;
    finalColor += finalColor * glow * 0.4;
    
    // Sophisticated alpha calculation
    float alpha = uOpacity;
    alpha *= (0.6 + fresnel * 0.4);
    alpha *= (0.8 + glow * 0.2);
    
    // Distance-based fade for depth
    float distance = length(vWorldPosition - cameraPosition);
    alpha *= smoothstep(80.0, 20.0, distance);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;