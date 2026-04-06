import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import Exhibit from "../components/Exhibit";
import { projects } from "@/data/content";

export default function ProjectsRoom({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <Text position={[0, 6, -6]} fontSize={1} color="white" anchorX="center" anchorY="middle" letterSpacing={0.1}>
        DATA LAB: PROJECTS
      </Text>

      <EntranceDoor position={[0, 0, 2]} rotation={[0, Math.PI, 0]} label="BACK TO LOBBY" onClick={() => setRoom("lobby")} />
      
      {projects.map((p, i) => {
        const angle = (i / (projects.length - 1)) * Math.PI; 
        const radius = 10;
        const x = Math.cos(angle) * radius;
        const z = -Math.sin(angle) * radius;
        return (
          <Exhibit 
            key={p.id} 
            position={[x, 1.5, z]} 
            rotation={[0, -angle + Math.PI / 2, 0]} 
            data={p} 
            type="panel" 
          />
        );
      })}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[35, 35]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}
