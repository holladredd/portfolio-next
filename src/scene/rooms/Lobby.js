import { Text, Float } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import SolidRoom from "../components/SolidRoom";
import MuseumBench from "../components/MuseumBench";

export default function Lobby({ position }) {
  return (
    <group position={position}>
      <SolidRoom title="MUSEUM CORE: LOBBY" size={[40, 14, 40]} />
      
      <group position={[0, 0, 0]}>
         <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[4, 1.2, 2]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.05} metalness={1} />
         </mesh>
         <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[4, 0.05, 2.1]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
         </mesh>
         <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
           <group position={[0, 3, 0]}>
             <Text fontSize={0.6} color="#38bdf8" font="/fonts/Anta-Regular.ttf" letterSpacing={0.4} uppercase>
               DREDD
             </Text>
             <mesh rotation={[0, Math.PI / 4, 0]}>
                <torusGeometry args={[1.5, 0.01, 16, 100]} />
                <meshBasicMaterial color="#38bdf8" />
             </mesh>
           </group>
         </Float>
      </group>

      <MuseumBench position={[-12, 0, 12]} rotation={[0, Math.PI / 4, 0]} />
      <MuseumBench position={[12, 0, 12]} rotation={[0, -Math.PI / 4, 0]} />

      <group position={[0, 5, -19.5]}>
        <Text fontSize={1.8} color="#ffffff" anchorX="center" anchorY="middle" font="/fonts/Anta-Regular.ttf" uppercase opacity={0.8} transparent>
          FOLAYAN OLAMIDE
        </Text>
        <Text position={[0, -1.4, 0]} fontSize={0.4} color="#38bdf8" uppercase letterSpacing={0.4} font="/fonts/Anta-Regular.ttf">
          SOFTWARE ENGINEER
        </Text>
      </group>

      <EntranceDoor position={[-19.8, 0, 0]} rotation={[0, Math.PI / 2, 0]} label="PROJECTS" onClick="projects" />
      <EntranceDoor position={[19.8, 0, 0]} rotation={[0, -Math.PI / 2, 0]} label="SKILLS" onClick="skills" />
      <EntranceDoor position={[0, 0, -19.8]} label="ABOUT" onClick="about" />
      <EntranceDoor position={[0, 0, 19.8]} rotation={[0, Math.PI, 0]} label="CONTACT" onClick="contact" />
    </group>
  );
}
