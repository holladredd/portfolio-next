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
      
      {/* Visual Door Frame */}
      <mesh position={[0, 3, 0]}>
         <boxGeometry args={[4.2, 6.2, 0.2]} />
         <meshStandardMaterial 
           color="#38bdf8" 
           emissive="#38bdf8" 
           emissiveIntensity={isTransitioning ? 2 : 0.5} 
           wireframe 
         />
      </mesh>
      
      {/* Dark Portal Surface */}
      <mesh position={[0, 3, 0.1]}>
        <boxGeometry args={[4, 6, 0.1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}
