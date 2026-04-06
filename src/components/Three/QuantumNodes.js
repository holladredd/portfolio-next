import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial, Sparkles, Ring } from "@react-three/drei";
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
  const auraRef = useRef();
  const router = useRouter();
  const { mouse } = useThree();
  const { unlockedNodes, visitedNodes, discoveryPoints } = useExperience();
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(0);
  
  const isUnlocked = unlockedNodes.includes(data.id);
  const isVisited = visitedNodes.includes(data.id.replace("/", ""));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Pulse based on hover
    setPulse(THREE.MathUtils.lerp(pulse, hovered ? 1 : 0, 0.1));

    // Magnetic Pull toward mouse
    const factor = isUnlocked ? 0.08 : 0.01;
    const targetX = data.position[0] + (hovered ? mouse.x * 4 : mouse.x * 1);
    const targetY = data.position[1] + (hovered ? mouse.y * 4 : mouse.y * 1);

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, factor);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, factor);
    
    // Discovery Scale Effect
    const s = (hovered && isUnlocked ? 1.3 : 1.0) + (isVisited ? 0.1 : 0);
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);

    if (auraRef.current) {
       auraRef.current.rotation.z += 0.02;
       auraRef.current.scale.setScalar(1.5 + Math.sin(time * 3) * 0.1 + pulse * 0.4);
    }
  });

  const handleNavigate = () => {
    if (isUnlocked) {
       router.push(data.path);
    }
  };

  return (
    <group>
      {/* Focus Aura Ring */}
      {hovered && isUnlocked && (
        <Ring 
          ref={auraRef} 
          args={[1.8, 2, 64]} 
          position={data.position}
        >
          <meshBasicMaterial color="#009b4d" transparent opacity={0.4} />
        </Ring>
      )}

      <mesh
        ref={meshRef}
        position={data.position}
        onClick={handleNavigate}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshDistortMaterial
          color={!isUnlocked ? "#111827" : (hovered ? "#009b4d" : (isVisited ? "#3b82f6" : "#60a5fa"))}
          speed={isUnlocked ? 4 : 0.5}
          distort={isUnlocked ? 0.4 : 0.05}
          radius={1}
          emissive={!isUnlocked ? "#000000" : (hovered ? "#052e16" : (isVisited ? "#1e3a8a" : "#1e40af"))}
          emissiveIntensity={isUnlocked ? 3 : 0}
          transparent
          opacity={isUnlocked ? 0.95 : 0.2}
        />
        
        {/* Discovery Burst (Persistent Sparkle) */}
        {isUnlocked && <Sparkles count={isVisited ? 40 : 20} scale={2.5} size={2} speed={0.6} color={hovered ? "#009b4d" : "#3b82f6"} />}

        <Text
          position={[0, 3, 0]}
          fontSize={0.5}
          color={!isUnlocked ? "#374151" : "white"}
          font="/fonts/Anta-Regular.ttf"
          anchorX="center"
          anchorY="middle"
          fillOpacity={isUnlocked ? (hovered ? 1 : 0.7) : 0.3}
        >
          {data.text} {!isUnlocked && " [ENTANGLED]"}
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
