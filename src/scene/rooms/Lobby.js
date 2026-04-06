import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";

export default function Lobby({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <Text position={[0, 4, -5]} fontSize={1.5} color="white" anchorX="center" anchorY="middle" letterSpacing={0.05}>
        FOLAYAN OLAMIDE
      </Text>
      <Text position={[0, 2.5, -5]} fontSize={0.5} color="#888888" anchorX="center" anchorY="middle" letterSpacing={0.2}>
        SOFTWARE ENGINEER
      </Text>

      <EntranceDoor position={[-8, 0, -2]} rotation={[0, Math.PI / 4, 0]} label="PROJECTS" onClick={() => setRoom("projects")} />
      <EntranceDoor position={[8, 0, -2]} rotation={[0, -Math.PI / 4, 0]} label="SKILLS" onClick={() => setRoom("skills")} />
      <EntranceDoor position={[0, 0, -10]} label="ABOUT" onClick={() => setRoom("about")} />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -5]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}
