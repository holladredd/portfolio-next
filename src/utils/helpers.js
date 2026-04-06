import * as THREE from "three";

/**
 * Enhanced Linear Interpolation for R3F
 */
export const lerp = (start, end, amt) => {
  return (1 - amt) * start + amt * end;
};

/**
 * Random range generator
 */
export const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * Map value from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Smooth vector lerping helper
 */
export const smoothVector = (current, target, factor = 0.1) => {
  current.x = lerp(current.x, target.x, factor);
  current.y = lerp(current.y, target.y, factor);
  current.z = lerp(current.z, target.z, factor);
};

/**
 * Shake / Jitter effect helper
 */
export const jitter = (intensity = 0.1) => {
  return (Math.random() - 0.5) * intensity;
};

/**
 * Placeholder for future GLSL shader codes
 */
export const defaultShaders = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragment: `
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(vUv, 1.0, 1.0);
    }
  `
};
