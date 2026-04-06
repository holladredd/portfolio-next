import * as THREE from "three; 
import { shaderMaterial } from "@react-three/drei; 
import { extend } from "@react-three/fiber; 

const PortalShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#3b82f6"),
    uResolution: new THREE.Vector2(),
    uMouse: new THREE.Vector2(),
    uIntensity: 0.5,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float dist = length(uv);
    
    // Rotating Noise Ring
    float angle = atan(uv.y, uv.x);
    float noise = sin(angle * 10.0 + uTime * 5.0) * 0.1;
    float ring = smoothstep(0.4 + noise, 0.41 + noise, dist) * smoothstep(0.6 + noise, 0.59 + noise, dist);
    
    // Core Glow
    float core = smoothstep(0.3, 0.0, dist);
    
    vec3 color = mix(uColor, vec3(1.0), ring + core);
    float alpha = (ring + core * 0.5) * uIntensity;
    
    gl_FragColor = vec4(color, alpha);
  }
  `
);

extend({ PortalShaderMaterial });

export default PortalShaderMaterial;
