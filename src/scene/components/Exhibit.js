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
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      
      const s = hovered ? 1.05 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
      
      if (type === "node") {
        groupRef.current.rotation.y += 0.01;
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
        <mesh>
          <boxGeometry args={[3, 4, 0.1]} />
          <meshStandardMaterial 
            color="#222222" 
            emissive={hovered ? "#444444" : "#000000"} 
            roughness={0.2} 
            metalness={0.8} 
          />
        </mesh>
      )}
      
      {type === "node" && (
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#333333" 
            emissive={hovered ? "#6b7280" : "#111111"} 
            wireframe={hovered} 
          />
        </mesh>
      )}

      {/* Label */}
      <Text 
        position={[0, type === "panel" ? -2.3 : -1.5, 0.1]} 
        fontSize={0.25} 
        color={hovered ? "white" : "#888888"} 
        anchorX="center" 
        anchorY="top"
      >
        {data.name || data.title}
      </Text>
    </group>
  );
}
