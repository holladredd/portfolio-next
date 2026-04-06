import * as THREE from "three; 
import { shaderMaterial } from "@react-three/drei; 
import { extend } from "@react-three/fiber; 

const EnergyFlowMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#009b4d"), // Dredd's Green
    uDistortion: 0.1,
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uDistortion;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Sine-based flow distortion
    float flow = sin(pos.x * 2.0 - uTime * 3.0) * uDistortion;
    pos.y += flow;
    pos.z += cos(pos.x * 2.0 - uTime * 3.0) * uDistortion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    // Pulse flow speed
    float flowX = fract(vUv.x * 5.0 - uTime * 2.0);
    float glow = smoothstep(0.4, 0.5, flowX) * smoothstep(0.6, 0.5, flowX);
    
    // Fade at edges of the trail
    float alpha = glow * smoothstep(0.1, 0.4, vUv.x) * smoothstep(0.9, 0.6, vUv.x);
    
    gl_FragColor = vec4(uColor, alpha * 0.5);
  }
  `
);

extend({ EnergyFlowMaterial });

export default EnergyFlowMaterial;
