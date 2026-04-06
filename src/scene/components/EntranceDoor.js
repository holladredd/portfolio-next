import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import * as THREE from "three";

export default function EntranceDoor({ position, rotation = [0, 0, 0], label, onClick }) {
  const { isTransitioning } = useStore();

  return (
    <group position={position} rotation={rotation}>
      {/* Archway Portal - Gateway Pulse */}
      <mesh 
        position={[0, 3, 0]} 
        onClick={(e) => { 
          e.stopPropagation(); 
          if (!isTransitioning) {
            // Capture world position for cinematic facing
            const worldPos = new THREE.Vector3();
            e.eventObject.getWorldPosition(worldPos);
            onClick([worldPos.x, worldPos.y, worldPos.z]); 
          }
        }}
        onPointerOver={() => {
          if (!isTransitioning) document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
         <boxGeometry args={[4.2, 6.2, 0.2]} />
         <meshStandardMaterial 
           color="#38bdf8" 
           emissive="#38bdf8" 
           emissiveIntensity={isTransitioning ? 2 : 0.5} 
           wireframe 
         />
      </mesh>
      
      {/* Solid Door Frame */}
      <mesh position={[0, 3, 0.1]}>
        <boxGeometry args={[4, 6, 0.1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>

      <Text position={[0, 6.6, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="bottom" font="/fonts/Anta-Regular.ttf" letterSpacing={0.1} uppercase>
        {label}
      </Text>
    </group>
  );
}
