import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

const NebulaMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color("#000000"),
    uColor2: new THREE.Color("#0a0a2a"),
    uColor3: new THREE.Color("#009b4d"), // Theme Green
    uColor4: new THREE.Color("#3b82f6"), // Theme Blue
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;

    // Simple noise-like function
    float hash(vec2 p) {
      return fract(sin(dot(p, vec3(127.1, 311.7, 74.7).xy)) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i + vec2(0, 0)), hash(i + vec2(1, 0)), f.x),
                 mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
    }

    void main() {
      vec2 uv = vUv;
      float n = noise(uv * 3.0 + uTime * 0.05);
      float n2 = noise(uv * 6.0 - uTime * 0.03);
      
      vec3 color = mix(uColor1, uColor2, n);
      color = mix(color, uColor3, n2 * 0.1);
      color = mix(color, uColor4, noise(uv * 10.0 + uTime * 0.1) * 0.05);
      
      // Add subtle "Galaxy" highlights
      float glow = pow(0.8 - distance(uv, vec2(0.5, 0.5)), 3.0);
      color += uColor4 * glow * 0.2;

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ NebulaMaterial });

export default function NebulaBackground() {
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <nebulaMaterial ref={materialRef} depthWrite={false} />
    </mesh>
  );
}
