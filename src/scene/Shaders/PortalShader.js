import * as THREE from "three";
const PortalShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#009b4d") },
    uIntensity: { value: 1.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uIntensity;
    void main() {
      float dist = distance(vUv, vec2(0.5));
      float ring = sin(dist * 20.0 - uTime * 3.0) * uIntensity;
      gl_FragColor = vec4(uColor, ring * (1.0 - dist * 2.0));
    }
  `
};
export default PortalShader;
