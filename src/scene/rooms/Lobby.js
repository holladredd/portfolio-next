import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";

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
      
      {/* Minimal Lab Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -5]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}

function EntranceDoor({ position, rotation = [0, 0, 0], label, onClick }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => document.body.style.cursor = "pointer"}
        onPointerOut={() => document.body.style.cursor = "default"}
        position={[0, 3, 0]}
      >
        <boxGeometry args={[4, 6, 0.5]} />
        <meshStandardMaterial color="#111111" emissive="#ffffff" emissiveIntensity={0.05} roughness={0.4} metalness={0.8} />
      </mesh>
      <Text position={[0, 6.5, 0]} fontSize={0.4} color="white" anchorX="center" anchorY="bottom">
        {label}
      </Text>
      {/* Light Strip */}
      <mesh position={[0, 0.1, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
