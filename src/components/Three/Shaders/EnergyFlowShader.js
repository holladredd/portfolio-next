import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const EnergyFlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#009b4d"), // Dredd's Green
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
  varying vec2 vUv;

  void main() {
    // Moving Sin pulse for flow
    float flow = sin(vUv.x * 20.0 - uTime * 5.0) * 0.5 + 0.5;
    float alpha = flow * smoothstep(0.1, 0.5, vUv.y) * smoothstep(0.9, 0.5, vUv.y);
    
    gl_FragColor = vec4(uColor, alpha * 0.3);
  }
  `
);

extend({ EnergyFlowMaterial });

export default EnergyFlowMaterial;
