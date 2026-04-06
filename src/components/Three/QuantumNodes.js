import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRouter } from "next/router";
import { useExperience } from "@/context/ExperienceContext";
import * as THREE from "three";

const nodesData = [
  { id: "home", position: [0, 0, 0], text: "HOME", path: "/" },
  { id: "about", position: [-8, 4, -10], text: "ABOUT", path: "/about" },
  { id: "project", position: [8, -4, -10], text: "PROJECTS", path: "/project" },
  { id: "contact", position: [-4, -8, -10], text: "CONTACT", path: "/contact" },
];

function Node({ data }) {
  const meshRef = useRef();
  const textRef = useRef();
  const router = useRouter();
  const { mouse } = useThree();
  const { unlockedNodes, visitedNodes } = useExperience();
  const [hovered, setHovered] = useState(false);
  
  const isUnlocked = unlockedNodes.includes(data.id);
  const isVisited = visitedNodes.includes(data.id.replace("/", ""));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Magnetic Pull toward mouse (Only if unlocked)
    const factor = isUnlocked ? 0.05 : 0.01;
    const targetX = data.position[0] + (hovered ? mouse.x * 3 : mouse.x * 1);
    const targetY = data.position[1] + (hovered ? mouse.y * 3 : mouse.y * 1);

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, factor);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, factor);
    
    // Orbital Motion 
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    
    // Focus Scaling
    const s = hovered && isUnlocked ? 1.2 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
  });

  const handleNavigate = () => {
    if (isUnlocked) {
       router.push(data.path);
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={data.position}
        onClick={handleNavigate}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshDistortMaterial
          color={!isUnlocked ? "#1f2937" : (hovered ? "#009b4d" : "#3b82f6")}
          speed={isUnlocked ? 4 : 1}
          distort={isUnlocked ? 0.3 : 0.05}
          radius={1}
          emissive={!isUnlocked ? "#000000" : (hovered ? "#009b4d" : "#1e40af")}
          emissiveIntensity={isUnlocked ? 2 : 0}
          transparent
          opacity={isUnlocked ? 0.9 : 0.3}
        />
        
        {/* Particle Burst on Unlock / Presence */}
        {isUnlocked && <Sparkles count={20} scale={2} size={2} speed={0.4} color={hovered ? "#009b4d" : "#3b82f6"} />}

        <Text
          ref={textRef}
          position={[0, 2.5, 0]}
          fontSize={0.6}
          color={!isUnlocked ? "#4b5563" : (hovered ? "#009b4d" : "white")}
          font="/fonts/Anta-Regular.ttf"
          anchorX="center"
          anchorY="middle"
          fillOpacity={isUnlocked ? 1 : 0.5}
        >
          {data.text} {!isUnlocked && " (LOCKED)"}
        </Text>
      </mesh>
    </group>
  );
}

export default function QuantumNodes() {
  return (
    <group>
      {nodesData.map((node) => (
        <Node key={node.id} data={node} />
      ))}
    </group>
  );
}
