import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";
import * as THREE from "three";

export default function Node({ id, position, text }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const { mouse } = useThree();
  const { focusedNode, setFocusedNode, theme } = useStore();
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const isFocused = focusedNode === id;
  const activeColor = theme === "dark" ? "#009b4d" : "#3b82f6";

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    
    // Proximity logic for glow/scale
    const nodePos = new THREE.Vector3(...position);
    const mousePos = new THREE.Vector3(mouse.x * 20, mouse.y * 15, 0);
    const proximity = Math.max(0, 1 - nodePos.distanceTo(mousePos) / 5);

    const s = (hovered || isFocused ? 1.4 : 1.0) + (proximity * 0.3);
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);

    if (materialRef.current) {
      materialRef.current.uTime = time;
      materialRef.current.uDistortion = (hovered || isFocused ? 0.6 : 0.1) + proximity * 0.2;
    }
  });

  const handleNodeClick = (e) => {
    e.stopPropagation();
    setFocusedNode(id);
    
    // Stealth Navigation: Info revealed then Jump
    // Assuming node text might map to routes (e.g., 'about' -> '/about')
    const path = id === "home" ? "/" : "/" + id;
    router.push(path);
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleNodeClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <quantumDistortionMaterial
          ref={materialRef}
          uColor={new THREE.Color(hovered || isFocused ? "#ffffff" : "#4b5563")}
          transparent
          opacity={0.8}
        />
        {/* Stealth Mode: Only show text when focused/clicked */}
        {(hovered || isFocused) && (
          <Text
            position={[0, 1.2, 0]}
            fontSize={0.3}
            color="white"
            font="/fonts/Anta-Regular.ttf"
            anchorX="center"
            anchorY="middle"
          >
            {text}
          </Text>
        )}
      </mesh>
    </group>
  );
}
