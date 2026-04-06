import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, Sparkles } from "@react-three/drei";
import useStore from "@/store/useStore";
import * as THREE from "three";

const EclipseMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#ffffff"),
    uIntensity: 1.0,
    uSurge: 0.0,
  },
  // vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uIntensity;
    uniform float uSurge;

    void main() {
      float dist = distance(vUv, vec2(0.5));
      
      // The Eclipse Rim Effect
      float ring = smoothstep(0.4, 0.5, dist) * (1.0 - smoothstep(0.5, 0.52, dist));
      
      // Organic distortion
      float noise = sin(vUv.y * 10.0 + uTime * 2.0) * cos(vUv.x * 10.0 + uTime * 3.0) * 0.05;
      float distortedRing = smoothstep(0.38 + noise, 0.5 + noise, dist) * (1.0 - smoothstep(0.5 + noise, 0.55 + noise, dist));
      
      float alpha = distortedRing * (uIntensity + uSurge * 2.0);
      vec3 finalColor = uColor * (1.0 + uSurge * 3.0);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

THREE.ColorManagement.enabled = true;
import { extend } from "@react-three/fiber";
extend({ EclipseMaterial });

export default function Dredd() {
  const meshRef = useRef();
  const materialRef = useRef();
  const { camera } = useThree();
  const { theme, isInteracting, setIsInteracting, isSpeaking } = useStore();
  const [hovered, setHovered] = useState(false);
  
  const targetPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    
    // Follow Camera Logic: AI Companion behavior
    // Stay at a soft distance in front of the camera
    const cameraDir = new THREE.Vector3(0, 0, -1);
    cameraDir.applyQuaternion(camera.quaternion);
    targetPos.current.copy(camera.position).add(cameraDir.multiplyScalar(6));
    meshRef.current.position.lerp(targetPos.current, 0.05);

    // Face the user
    meshRef.current.lookAt(camera.position);

    if (materialRef.current) {
      materialRef.current.uTime = time;
      materialRef.current.uIntensity = isSpeaking ? (2.0 + Math.sin(time * 5) * 0.5) : (1.0 + Math.sin(time) * 0.2);
      // Subtle surge lerp
      materialRef.current.uSurge = THREE.MathUtils.lerp(materialRef.current.uSurge, isInteracting ? 1.0 : 0.0, 0.1);
    }
    
    meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(isInteracting ? 1.5 : 1), 0.1);
  });

  return (
    <group>
      {/* Dark Void Core */}
      <mesh ref={meshRef} 
            onClick={(e) => { e.stopPropagation(); setIsInteracting(true); setTimeout(() => setIsInteracting(false), 2000); }}
            onPointerOver={() => setHovered(true)} 
            onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
        
        {/* Eclipse Rim Shader */}
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[4, 4]} />
          <eclipseMaterial ref={materialRef} transparent blending={THREE.AdditiveBlending} />
        </mesh>
        
        <Sparkles count={isInteracting ? 200 : 50} scale={4} size={isInteracting ? 4 : 2} color="#ffffff" speed={isInteracting ? 2 : 0.5} />
      </mesh>
    </group>
  );
}
