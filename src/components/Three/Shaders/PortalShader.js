import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#3b82f6"),
    uResolution: new THREE.Vector2(),
    uMouse: new THREE.Vector2(),
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
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p);
    
    // Quantum Wave Distortion
    float noise = sin(d * 10.0 - uTime * 3.0) * 0.1;
    float circ = smoothstep(0.4, 0.41, d + noise);
    
    // Chromatic Aberration Simulation (Subtle)
    vec3 color = uColor;
    color.r += sin(uTime) * 0.05;
    color.b += cos(uTime) * 0.05;
    
    float alpha = 1.0 - circ;
    gl_FragColor = vec4(color, alpha * 0.5);
  }
  `
);

extend({ PortalMaterial });

export default PortalMaterial;
