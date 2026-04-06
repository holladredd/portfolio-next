import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import useStore from "@/store/useStore";

export default function Exhibit({ position, rotation = [0, 0, 0], data, type = "panel" }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { setExhibit } = useStore();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.05;
      
      const s = hovered ? 1.08 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
      
      if (type === "node") {
        groupRef.current.rotation.y += 0.005;
        groupRef.current.rotation.z += 0.003;
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setExhibit(data);
  };

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      {type === "panel" && (
        <>
          <mesh castShadow>
            <boxGeometry args={[3, 4, 0.1]} />
            <meshPhysicalMaterial 
              color="#111111" 
              metalness={0.9} 
              roughness={0.1} 
              clearcoat={1} 
              clearcoatRoughness={0.1}
              emissive={hovered ? "#333333" : "#000000"}
            />
          </mesh>
          {/* Border Glow */}
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[3.1, 4.1, 0.05]} />
            <meshBasicMaterial color={hovered ? "#ffffff" : "#222222"} transparent opacity={hovered ? 0.3 : 0.1} />
          </mesh>
        </>
      )}
      
      {type === "node" && (
        <mesh castShadow>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshPhysicalMaterial 
            color="#222222" 
            metalness={1} 
            roughness={0} 
            clearcoat={1}
            emissive={hovered ? "#ffffff" : "#111111"}
            emissiveIntensity={hovered ? 0.5 : 0.1}
          />
        </mesh>
      )}

      {/* Exhibit Label */}
      <group position={[0, type === "panel" ? -2.4 : -1.5, 0.1]}>
        <Text 
          fontSize={0.2} 
          color={hovered ? "white" : "#666666"} 
          anchorX="center" 
          anchorY="top"
          font="/fonts/Anta-Regular.ttf"
          letterSpacing={0.1}
          uppercase
        >
          {data.name || data.title}
        </Text>
      </group>
    </group>
  );
}
