import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import SolidRoom from "../components/SolidRoom";

export default function AboutRoom({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <SolidRoom title="SYSTEM: PROFILE" size={[20, 12, 20]} />

      <EntranceDoor position={[0, 0, 9.8]} rotation={[0, Math.PI, 0]} label="BACK TO LOBBY" onClick={() => setRoom("lobby")} />
      
      <mesh position={[0, 4, -9.8]}>
        <boxGeometry args={[14, 8, 0.2]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
      </mesh>
      
      <Text 
        position={[-6.5, 7.5, -9.6]} 
        fontSize={0.35} 
        color="#ffffff" 
        anchorX="left" 
        anchorY="top" 
        maxWidth={13} 
        lineHeight={1.4} 
        font="/fonts/Anta-Regular.ttf"
      >
        {"> ARCHITECT: Folayan Olamide (Dredd)\n> ROLE: Software Engineer\n> MISSION: Building robust interfaces and scalable architectures that bridge the gap between design and functionality.\n\n> STATUS: Seeking highly motivated teams to engineer next-generation platforms.\n\n> PROTOCOLS: [React, Node.js, Next.js, 3D Web, AI Systems]\n\n> SYSTEM_ONLINE_"}
      </Text>
    </group>
  );
}
