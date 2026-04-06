import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import LabFrame from "../components/LabFrame";

export default function Lobby({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <LabFrame title="CENTRAL CORE: LOBBY" />

      {/* Hero Header */}
      <Text position={[0, 4, -8]} fontSize={1.5} color="white" anchorX="center" anchorY="middle" letterSpacing={0.05}>
        FOLAYAN OLAMIDE
      </Text>
      <Text position={[0, 2.8, -8]} fontSize={0.5} color="#38bdf8" anchorX="center" anchorY="middle" letterSpacing={0.3} uppercase>
        SOFTWARE ENGINEER
      </Text>

      {/* Central Server Core - Centerpiece */}
      <group position={[0, 0, 0]}>
         <mesh position={[0, 5, 0]}>
            <cylinderGeometry args={[2, 2, 10, 32]} />
            <meshPhysicalMaterial color="#0a0a0a" metalness={1} roughness={0.05} transparent opacity={0.3} />
         </mesh>
         <mesh position={[0, 5, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[1.5, 1.5, 10.1, 4]} />
            <meshPhysicalMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} wireframe />
         </mesh>
      </group>

      <EntranceDoor position={[-10, 0, -5]} rotation={[0, Math.PI / 4, 0]} label="PROJECTS" onClick={() => setRoom("projects")} />
      <EntranceDoor position={[10, 0, -5]} rotation={[0, -Math.PI / 4, 0]} label="SKILLS" onClick={() => setRoom("skills")} />
      <EntranceDoor position={[0, 0, -12]} label="ABOUT" onClick={() => setRoom("about")} />
    </group>
  );
}
