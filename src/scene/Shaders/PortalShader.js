import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

const PortalShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#009b4d"),
    uIntensity: 1.0
  },
  // vertex shader
  `
    varying vec2 vUv;
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
    uniform float uIntensity;
    void main() {
      float dist = distance(vUv, vec2(0.5));
      float ring = sin(dist * 20.0 - uTime * 3.0) * uIntensity;
      gl_FragColor = vec4(uColor, ring * (1.0 - dist * 2.0));
    }
  `
);

export default PortalShaderMaterial;
