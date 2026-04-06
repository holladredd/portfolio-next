import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";

export default function AboutRoom({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <Text position={[0, 6, -4]} fontSize={1} color="white" anchorX="center" anchorY="middle" letterSpacing={0.1}>
        SYSTEM: PROFILE
      </Text>

      <EntranceDoor position={[0, 0, 5]} rotation={[0, Math.PI, 0]} label="BACK TO LOBBY" onClick={() => setRoom("lobby")} />
      
      <mesh position={[0, 2, -4]}>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.5} />
      </mesh>
      
      <Text position={[-4.5, 4, -3.8]} fontSize={0.25} color="#4ade80" anchorX="left" anchorY="top" maxWidth={9} lineHeight={1.5} font="/fonts/Anta-Regular.ttf">
        {"> ARCHITECT: Folayan Olamide (Dredd)\n> ROLE: Software Engineer\n> MISSION: Building robust interfaces and scalable architectures that bridge the gap between design and intricate functionality.\n\n> STATUS: Seeking highly motivated teams to engineer next-generation platforms.\n\n> _"}
      </Text>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}
