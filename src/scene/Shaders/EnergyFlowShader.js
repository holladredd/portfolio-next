import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

const EnergyFlowShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#009b4d")
  },
  // vertex shader
  `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    void main() {
      float flow = sin(vUv.x * 10.0 - uTime * 5.0) * 0.5 + 0.5;
      gl_FragColor = vec4(uColor, flow * 0.5);
    }
  `
);

export default EnergyFlowShaderMaterial;
