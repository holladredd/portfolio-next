import useStore from "@/store/useStore";
import * as THREE from "three";

export default function EntranceDoor({ position, rotation = [0, 0, 0], label, onClick }) {
  const { transitionPhase, startTransition } = useStore();
  const isTransitioning = transitionPhase !== "IDLE";

  return (
    <group position={position} rotation={rotation}>
      {/* SOLID HITBOX: Large, invisible volume for reliable interaction */}
      <mesh 
        position={[0, 3, 0]} 
        onPointerDown={(e) => { 
          e.stopPropagation(); 
          if (!isTransitioning) {
            const worldPos = new THREE.Vector3();
            e.object.getWorldPosition(worldPos);
            // Initiate the Kinetic sequence
            startTransition(onClick, worldPos.toArray()); 
          }
        }}
        onPointerOver={() => {
          if (!isTransitioning) document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
         <boxGeometry args={[5, 7, 0.5]} />
         <meshBasicMaterial transparent opacity={0} color="#38bdf8" />
      </mesh>
      
      {/* Architectural Entrance Frame (Trim) */}
      <mesh position={[0, 3, 0.05]}>
         <boxGeometry args={[4.4, 6.4, 0.1]} />
         <meshStandardMaterial color="#000000" metalness={0} roughness={1} />
      </mesh>
      
      {/* The Hallway Void (Simulating depth leading to next room) */}
      <mesh position={[0, 3, 0.1]}>
        <boxGeometry args={[4, 6, 0.15]} />
        {/* Extremely dark material so it looks like an unlit hallway */}
        <meshBasicMaterial color="#010101" />
      </mesh>
    </group>
  );
}
