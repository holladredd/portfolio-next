import * as THREE from "three";

export const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
export const randomRange = (min, max) => Math.random() * (max - min) + min;
export const mapRange = (value, inMin, inMax, outMin, outMax) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
export const smoothVector = (current, target, factor = 0.1) => {
  current.x = lerp(current.x, target.x, factor);
  current.y = lerp(current.y, target.y, factor);
  current.z = lerp(current.z, target.z, factor);
};
export const jitter = (intensity = 0.1) => (Math.random() - 0.5) * intensity;
export const defaultShaders = {
  vertex: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  fragment: "varying vec2 vUv; void main() { gl_FragColor = vec4(vUv, 1.0, 1.0); }"
};
