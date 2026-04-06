import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const QuantumDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#3b82f6"),
    uResolution: new THREE.Vector2(),
    uMouse: new THREE.Vector2(),
    uDistortion: 0.2, // Shimmer intensity
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  varying vec3 vNormal;
  uniform float uTime;
  uniform float uDistortion;
  uniform vec2 uMouse;

  // Simple 2D Noise
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    
    vec3 pos = position;
    
    // Distort vertices based on noise and time
    float noiseVal = noise(pos.xy * 2.0 + uTime * 0.5);
    pos.z += noiseVal * uDistortion;
    
    // Wave ripple from mouse
    float dist = distance(pos.xy, uMouse * 5.0);
    pos.z += sin(dist * 10.0 - uTime * 3.0) * 0.1;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // Shimmering color based on normal and noise
    float shimmer = dot(vNormal, vec3(0.0, 0.0, 1.0)) * 0.5 + 0.5;
    vec3 color = mix(uColor, vec3(1.0), shimmer * 0.2);
    
    // Pulsing alpha
    float glow = sin(uTime * 2.0) * 0.1 + 0.9;
    
    gl_FragColor = vec4(color, glow * 0.7);
  }
  `
);

extend({ QuantumDistortionMaterial });

export default QuantumDistortionMaterial;
