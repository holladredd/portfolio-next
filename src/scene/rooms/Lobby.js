import { Text, Float } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import SolidRoom from "../components/SolidRoom";

export default function Lobby({ position }) {
  const { startTransition } = useStore();

  return (
    <group position={position}>
      <SolidRoom title="MUSEUM CORE: LOBBY" size={[32, 14, 32]} />
      
      {/* Central Power Pillar & Information Hub */}
      <group position={[0, 0, 0]}>
         <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[4, 0.8, 4]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
         </mesh>
         <mesh position={[0, 5, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 9, 32]} />
            <meshPhysicalMaterial color="#0a0a0a" metalness={1} roughness={0.05} transparent opacity={0.4} />
         </mesh>
         <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
           <mesh position={[0, 5, 0]} rotation={[0, Math.PI / 4, 0]}>
              <cylinderGeometry args={[1.2, 1.2, 9.1, 4]} />
              <meshPhysicalMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.8} wireframe />
           </mesh>
         </Float>
      </group>

      {/* Museum Benches */}
      <MuseumBench position={[-8, 0, 8]} rotation={[0, Math.PI / 4, 0]} />
      <MuseumBench position={[8, 0, 8]} rotation={[0, -Math.PI / 4, 0]} />

      {/* Main Wall Inscription */}
      <group position={[0, 4.5, -15.5]}>
        <Text fontSize={1.5} color="#ffffff" anchorX="center" anchorY="middle" font="/fonts/Anta-Regular.ttf" uppercase>
          FOLAYAN OLAMIDE
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.4} color="#38bdf8" uppercase letterSpacing={0.4} font="/fonts/Anta-Regular.ttf">
          SOFTWARE ENGINEER
        </Text>
      </group>

      {/* Navigation Portals */}
      <EntranceDoor position={[-15.8, 0, -5]} rotation={[0, Math.PI / 2, 0]} label="PROJECTS" onClick="projects" />
      <EntranceDoor position={[15.8, 0, -5]} rotation={[0, -Math.PI / 2, 0]} label="SKILLS" onClick="skills" />
      <EntranceDoor position={[0, 0, -15.8]} label="ABOUT" onClick="about" />
      <EntranceDoor position={[0, 0, 15.8]} rotation={[0, Math.PI, 0]} label="CONTACT" onClick="contact" />
    </group>
  );
}

function MuseumBench({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[4, 0.8, 1.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[4, 0.1, 1.5]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.2} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
