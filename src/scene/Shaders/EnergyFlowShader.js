import * as THREE from "three";
const EnergyFlowShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#009b4d") }
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    void main() {
      float flow = sin(vUv.x * 10.0 - uTime * 5.0) * 0.5 + 0.5;
      gl_FragColor = vec4(uColor, flow * 0.5);
    }
  `
};
export default EnergyFlowShader;
