import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import Exhibit from "../components/Exhibit";
import LabFrame from "../components/LabFrame";
import { projects } from "@/data/content";

export default function ProjectsRoom({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <LabFrame title="DATA LAB: PROJECTS" />

      <EntranceDoor position={[0, 0, 10]} rotation={[0, Math.PI, 0]} label="BACK TO LOBBY" onClick={() => setRoom("lobby")} />
      
      {/* Gallery Rails - Left and Right Rows */}
      {projects.map((p, i) => {
        const row = i % 2 === 0 ? -6 : 6;
        const z = -10 + Math.floor(i / 2) * 5;
        const rot = i % 2 === 0 ? Math.PI / 2 : -Math.PI / 2;
        return (
          <Exhibit 
            key={p.id} 
            position={[row, 1.5, z]} 
            rotation={[0, rot, 0]} 
            data={p} 
            type="panel" 
          />
        );
      })}
    </group>
  );
}
