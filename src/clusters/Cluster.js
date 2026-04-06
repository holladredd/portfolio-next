import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Float, Sparkles } from "@react-three/drei";
import useStore from "@/store/useStore";
import Node from "./Node";
import * as THREE from "three";

export default function Cluster({ id, position, text, childrenData = [] }) {
  const meshRef = useRef();
  const portalRef = useRef();
  const { mouse } = useThree();
  const { focusedCluster, setFocusedCluster, unlockedClusters, theme } = useStore();
  const [hovered, setHovered] = useState(false);

  const isUnlocked = unlockedClusters.includes(id);
  const activeColor = theme === "dark" ? "#009b4d" : "#3b82f6";

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    
    // Calculate cursor proximity in 3D-ish space
    const clusterPos = new THREE.Vector3(...position);
    const mousePos = new THREE.Vector3(mouse.x * 20, mouse.y * 15, 0);
    const proximity = Math.max(0, 1 - clusterPos.distanceTo(mousePos) / 10);

    const s = (hovered && isUnlocked ? 1.2 : 1.0) + (isUnlocked ? proximity * 0.2 : 0);
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    meshRef.current.rotation.y = time * 0.3;

    if (portalRef.current) {
      portalRef.current.uTime = time;
      portalRef.current.uIntensity = (hovered ? 2.0 : 1.0) + proximity;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (isUnlocked) setFocusedCluster(id);
  };

  return (
    <group position={position}>
      {/* Background Portal Effect */}
      {isUnlocked && (
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[6, 6]} />
          <portalShaderMaterial 
            ref={portalRef}
            uColor={new THREE.Color(activeColor)}
            transparent
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            color={!isUnlocked ? "#1f2937" : (hovered ? activeColor : (theme === "dark" ? "#1e40af" : "#2563eb"))}
            emissive={!isUnlocked ? "#000000" : (hovered ? activeColor : "#1e40af")}
            emissiveIntensity={isUnlocked ? 2 : 0}
            transparent
            opacity={isUnlocked ? 0.95 : 0.3}
          />
          {isUnlocked && <Sparkles count={30} scale={3} size={2} color={activeColor} speed={0.4} />}
          <Text position={[0, 3, 0]} fontSize={0.6} color={!isUnlocked ? "#4b5563" : "white"} font="/fonts/Anta-Regular.ttf" anchorX="center" anchorY="middle">
            {text} {!isUnlocked && "(LOCKED)"}
          </Text>
        </mesh>
      </Float>
      {isUnlocked && childrenData.map((node, i) => (
         <Node key={node.id} id={node.id} position={node.offset} text={node.text} />
      ))}
    </group>
  );
}
