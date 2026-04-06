import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import useStore from "../../store/useStore";
import * as THREE from "three";

export default function Dredd() {
  const meshRef = useRef();
  const lightRef = useRef();
  
  const { theme, mode } = useStore();
  const [hovered, setHovered] = useState(false);
  
  const activeColor = theme === "dark" ? "#009b4d" : "#3b82f6";

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Smooth floating oscillation
    meshRef.current.position.y += Math.sin(time) * 0.005;
    meshRef.current.rotation.y = time * 0.5;
    
    // Light pulse sync
    if (lightRef.current) {
       lightRef.current.intensity = 1.5 + Math.sin(time * 2) * 0.5 + (hovered ? 2 : 0);
    }
  });

  return (
    <group position={[0, 0, 8]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshDistortMaterial
            color={activeColor}
            speed={hovered ? 4 : 2}
            distort={hovered ? 0.6 : 0.4}
            radius={1}
            emissive={activeColor}
            emissiveIntensity={hovered ? 2 : 1}
            transparent
            opacity={0.9}
          />
          <pointLight 
            ref={lightRef} 
            distance={15} 
            color={activeColor} 
          />
          <Sparkles 
            count={50} 
            scale={3} 
            size={2} 
            color={activeColor} 
            speed={1.5} 
          />
        </mesh>
      </Float>
    </group>
  );
}
