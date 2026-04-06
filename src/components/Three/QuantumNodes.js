import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial } from "@react-three/drei";
import { useRouter } from "next/router";
import * as THREE from "three";

const nodesData = [
  { id: "home", position: [0, 0, 0], text: "HOME", path: "/" },
  { id: "about", position: [-5, 3, -5], text: "ABOUT", path: "/about" },
  { id: "project", position: [5, -3, -5], text: "PROJECTS", path: "/project" },
  { id: "contact", position: [-3, -5, -5], text: "CONTACT", path: "/contact" },
];

function Node({ data }) {
  const meshRef = useRef();
  const textRef = useRef();
  const router = useRouter();
  const { mouse, viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Magnetic Pull toward mouse
    const targetX = data.position[0] + mouse.x * 2;
    const targetY = data.position[1] + mouse.y * 2;

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    
    // Orbital Motion
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.rotation.x = Math.sin(time) * 0.2;
    
    // Text follow
    if (textRef.current) {
       textRef.current.position.y = Math.sin(time * 2) * 0.1 + 2;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={data.position}
        onClick={() => router.push(data.path)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        className="cursor-pointer"
      >
        <torusGeometry args={[1, 0.2, 16, 64]} />
        <MeshDistortMaterial
          color={hovered ? "#009b4d" : "#3b82f6"}
          speed={3}
          distort={0.3}
          radius={1}
          emissive={hovered ? "#009b4d" : "#3b82f6"}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
        
        <Text
          ref={textRef}
          position={[0, 2, 0]}
          fontSize={0.5}
          color={hovered ? "#009b4d" : "white"}
          font="/fonts/Anta-Regular.ttf"
          anchorX="center"
          anchorY="middle"
        >
          {data.text}
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
