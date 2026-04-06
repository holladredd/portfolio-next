import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import useStore from "@/store/useStore";
import * as THREE from "three";

export default function Dredd() {
  const meshRef = useRef();
  const lightRef = useRef();
  const { theme } = useStore();
  const [hovered, setHovered] = useState(false);
  const activeColor = theme === "dark" ? "#009b4d" : "#3b82f6";

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    
    // Subtle float and rotation
    meshRef.current.position.y = 2 + Math.sin(time) * 0.1;
    meshRef.current.rotation.y = time * 0.5;

    if (lightRef.current) {
       lightRef.current.intensity = 2.0 + Math.sin(time * 2) * 0.5 + (hovered ? 3 : 0);
    }
  });

  return (
    <group position={[0, 0, 5]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={activeColor}
            speed={hovered ? 4 : 2}
            distort={hovered ? 0.6 : 0.4}
            radius={1}
            emissive={activeColor}
            emissiveIntensity={hovered ? 4 : 2}
            transparent
            opacity={1.0}
          />
          <pointLight ref={lightRef} distance={20} color={activeColor} intensity={2} />
          <Sparkles count={80} scale={4} size={3} color={activeColor} speed={1.5} />
        </mesh>
      </Float>
    </group>
  );
}
