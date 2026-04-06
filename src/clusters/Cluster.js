import { useRef, useState, useMemo } from "react"; 
import { useFrame } from "@react-three/fiber"; 
import { Text, MeshDistortMaterial, Float, Sparkles } from "@react-three/drei"; 
import useStore from "@/store/useStore"; 
import Node from "./Node"; 
import * as THREE from "three";

export default function Cluster({ id, position, text, childrenData = [] }) {
  const meshRef = useRef(); 
  const { focusedCluster, setFocusedCluster, unlockedClusters, theme } = useStore(); 
  const [hovered, setHovered] = useState(false); 

  const isFocused = focusedCluster === id; 
  const isUnlocked = unlockedClusters.includes(id); 
  const activeColor = theme === "dark" ? "#009b4d" : "#3b82f6; 

  useFrame((state) => {
    const time = state.clock.getElapsedTime(); 
    if (!meshRef.current) return; 

    // Pulse effect
    const s = hovered && isUnlocked ? 1.2 : 1.0; 
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1); 
    
    // Rotation logic
    meshRef.current.rotation.y = time * 0.3; 
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1; 

    // Emissive intensity pulsing
    if (meshRef.current.material) {
       meshRef.current.material.emissiveIntensity = isUnlocked ? (2 + Math.sin(time * 2) * 0.5) : 0.2; 
    }
  }); 

  const handleClick = (e) => {
    e.stopPropagation(); 
    if (isUnlocked) {
       setFocusedCluster(id); 
    }
  }; 

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[2, 64, 64]} />
          <MeshDistortMaterial
            color={!isUnlocked ? "#1f2937" : (hovered ? activeColor : (theme === "dark" ? "#1e40af" : "#2563eb"))}
            speed={isUnlocked ? 4 : 0.5}
            distort={isUnlocked ? 0.3 : 0.05}
            radius={1}
            emissive={!isUnlocked ? "#000000" : (hovered ? activeColor : "#1e40af")}
            emissiveIntensity={isUnlocked ? 2 : 0}
            transparent
            opacity={isUnlocked ? 0.95 : 0.3}
          />
          
          {isUnlocked && <Sparkles count={30} scale={3} size={2} color={activeColor} speed={0.4} />}

          <Text
            position={[0, 3, 0]}
            fontSize={0.6}
            color={!isUnlocked ? "#4b5563" : "white"}
            font="/fonts/Anta-Regular.ttf"
            anchorX="center"
            anchorY="middle"
          >
            {text} {!isUnlocked && "(LOCKED)"}
          </Text>
        </mesh>
      </Float>

      {/* Render Child Nodes if Unlocked */}
      {isUnlocked && childrenData.map((node, i) => (
         <Node 
           key={node.id} 
           id={node.id} 
           position={node.offset} 
           text={node.text} 
         />
      ))}
    </group>
  ); 
}
