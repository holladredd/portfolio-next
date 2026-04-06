import * as THREE from "three";
const DistortionShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#009b4d") },
    uDistortion: { value: 0.2 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vDistortion;
    uniform float uTime;
    void main() {
      vUv = uv;
      float d = sin(position.x * 2.0 + uTime) * sin(position.y * 2.0 + uTime);
      vDistortion = d;
      vec3 newPos = position + normal * d * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vDistortion;
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(uColor + vDistortion * 0.2, 0.9);
    }
  `
};
export default DistortionShader;
