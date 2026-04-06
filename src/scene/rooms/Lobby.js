import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import SolidRoom from "../components/SolidRoom";

export default function Lobby({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      {/* Museum Hall Foundation */}
      <SolidRoom title="MUSEUM CORE: LOBBY" size={[32, 14, 32]} />

      {/* Hero Header - Museum Wall Inscription */}
      <group position={[0, 4.5, -15.5]}>
        <Text 
          position={[0, 0, 0]} 
          fontSize={1.5} 
          color="#ffffff" 
          anchorX="center" 
          anchorY="middle" 
          letterSpacing={0.15} 
          font="/fonts/Anta-Regular.ttf"
          uppercase
        >
          FOLAYAN OLAMIDE
        </Text>
        <Text 
          position={[0, -1.2, 0]} 
          fontSize={0.4} 
          color="#38bdf8" 
          anchorX="center" 
          anchorY="middle" 
          letterSpacing={0.4} 
          uppercase
          font="/fonts/Anta-Regular.ttf"
        >
          SOFTWARE ENGINEER
        </Text>
      </group>

      {/* Central Server Exhibit - Pedestal Piece */}
      <group position={[0, 0, 0]}>
         {/* Pedestal */}
         <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[4, 0.8, 4]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
         </mesh>
         {/* Core */}
         <mesh position={[0, 5, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 9, 32]} />
            <meshPhysicalMaterial color="#0a0a0a" metalness={1} roughness={0.05} transparent opacity={0.4} />
         </mesh>
         <mesh position={[0, 5, 0]} rotation={[0, Math.PI / 4, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 9.1, 4]} />
            <meshPhysicalMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} wireframe />
         </mesh>
      </group>

      {/* Integrated Entry Portals */}
      <EntranceDoor position={[-12.15, 0, -5]} rotation={[0, Math.PI / 2, 0]} label="PROJECTS" onClick={() => setRoom("projects")} />
      <EntranceDoor position={[12.15, 0, -5]} rotation={[0, -Math.PI / 2, 0]} label="SKILLS" onClick={() => setRoom("skills")} />
      <EntranceDoor position={[0, 0, -13.5]} label="ABOUT" onClick={() => setRoom("about")} />
    </group>
  );
}
