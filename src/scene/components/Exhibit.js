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
          <mesh castShadow receiveShadow>
            <boxGeometry args={[3, 4, 0.1]} />
            <meshPhysicalMaterial 
              color="#111111" 
              metalness={0.9} 
              roughness={0.05} 
              clearcoat={1} 
              emissive={hovered ? "#38bdf8" : "#000000"}
              emissiveIntensity={hovered ? 0.2 : 0}
            />
          </mesh>
          {/* Cyan Glow Border */}
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[3.08, 4.08, 0.05]} />
            <meshBasicMaterial color={hovered ? "#38bdf8" : "#222222"} transparent opacity={hovered ? 0.3 : 0.05} />
          </mesh>
          {/* Holographic Bitstream Overlay */}
          <Text 
            position={[1.6, 1.8, 0.1]} 
            fontSize={0.12} 
            color="#38bdf8" 
            anchorX="left" 
            anchorY="top" 
            opacity={hovered ? 1 : 0.4}
            font="/fonts/Anta-Regular.ttf"
          >
            {"01\n11\n00\n10"}
          </Text>
        </>
      )}
      
      {type === "node" && (
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshPhysicalMaterial 
            color="#222222" 
            metalness={1} 
            roughness={0} 
            clearcoat={1}
            emissive={hovered ? "#38bdf8" : "#111111"}
            emissiveIntensity={hovered ? 2 : 0.2}
          />
        </mesh>
      )}

      {/* Label - System Font Style */}
      <group position={[0, type === "panel" ? -2.4 : -1.5, 0.1]}>
        <Text 
          fontSize={0.2} 
          color={hovered ? "white" : "#666666"} 
          anchorX="center" 
          anchorY="top"
          font="/fonts/Anta-Regular.ttf"
          letterSpacing={0.15}
          uppercase
        >
          {data.name || data.title}
        </Text>
      </group>
    </group>
  );
}
