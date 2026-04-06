import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import LabFrame from "../components/LabFrame";

export default function AboutRoom({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <LabFrame title="SYSTEM: PROFILE" />

      <EntranceDoor position={[0, 0, 10]} rotation={[0, Math.PI, 0]} label="BACK TO LOBBY" onClick={() => setRoom("lobby")} />
      
      <mesh position={[0, 2, -5]}>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial color="#050505" roughness={0.5} metalness={0.9} />
      </mesh>
      
      <Text 
        position={[-5.5, 4.5, -4.8]} 
        fontSize={0.3} 
        color="#ffffff" 
        anchorX="left" 
        anchorY="top" 
        maxWidth={11} 
        lineHeight={1.4} 
        font="/fonts/Anta-Regular.ttf"
      >
        {"> ARCHITECT: Folayan Olamide (Dredd)\n> ROLE: Software Engineer\n> MISSION: Building robust interfaces and scalable architectures that bridge the gap between design and functionality.\n\n> STATUS: Seeking highly motivated teams to engineer next-generation platforms.\n\n> PROTOCOLS: [React, Node.js, Next.js, 3D Web, AI Systems]\n\n> SYSTEM_ONLINE_"}
      </Text>
    </group>
  );
}
