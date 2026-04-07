import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import useStore from "@/store/useStore";

export default function Exhibit({ position, rotation, data, type = "panel" }) {
  const [hovered, setHovered] = useState(false);
  const { setExhibit } = useStore();

  return (
    <group position={position} rotation={rotation}>
      {/* Focus Spotlight */}
      <spotLight 
        position={[0, 4, 3]} 
        target-position={[0, 0, 0]} 
        intensity={hovered ? 2 : 1} 
        angle={0.3} 
        penumbra={1} 
        distance={8}
        color={hovered ? "#38bdf8" : "#ffffff"}
      />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group onClick={() => setExhibit(data)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          {type === "panel" ? (
            <mesh>
              <boxGeometry args={[4, 2.5, 0.1]} />
              <meshPhysicalMaterial color={hovered ? "#111111" : "#050505"} metalness={1} roughness={0.05} clearcoat={1} />
              <lineSegments>
                 <edgesGeometry args={[new THREE.BoxGeometry(4, 2.5, 0.1)]} />
                 <lineBasicMaterial color={hovered ? "#38bdf8" : "#334155"} />
              </lineSegments>
            </mesh>
          ) : (
            <group>
               <mesh>
                 <sphereGeometry args={[0.5, 32, 32]} />
                 <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.05} emissive={hovered ? "#38bdf8" : "#000000"} />
               </mesh>
               <mesh rotation={[0, 0, Math.PI / 4]}>
                 <torusGeometry args={[0.7, 0.02, 16, 100]} />
                 <meshBasicMaterial color={hovered ? "#38bdf8" : "#475569"} />
               </mesh>
            </group>
          )}

          <Text position={[0, type === "panel" ? -1.8 : -1.2, 0.1]} fontSize={0.25} color="white" font="/fonts/Anta-Regular.ttf" uppercase>
            {data?.name}
          </Text>
        </group>
      </Float>
    </group>
  );
}
