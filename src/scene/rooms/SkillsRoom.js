import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import Exhibit from "../components/Exhibit";
import { skills } from "@/data/content";

export default function SkillsRoom({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <Text position={[0, 6, -6]} fontSize={1} color="white" anchorX="center" anchorY="middle" letterSpacing={0.1}>
        CORE: SKILLS
      </Text>

      <EntranceDoor position={[0, 0, 2]} rotation={[0, Math.PI, 0]} label="BACK TO LOBBY" onClick={() => setRoom("lobby")} />
      
      {skills.map((s, i) => {
        const angle = (i / skills.length) * Math.PI * 2; 
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = -Math.sin(angle) * radius;
        return (
          <Exhibit 
            key={s.name} 
            position={[x, 1, z]} 
            rotation={[0, -angle, 0]} 
            data={s} 
            type="node" 
          />
        );
      })}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}
