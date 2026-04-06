import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import Exhibit from "../components/Exhibit";
import SolidRoom from "../components/SolidRoom";
import { projects } from "@/data/content";

export default function ProjectsRoom({ position }) {
  const { setRoom, previousRoom } = useStore();
  const returnLabel = previousRoom === "graphics" ? "BACK TO GALLERY" : "RETURN TO LOBBY";

  return (
    <group position={position}>
      <SolidRoom title="DATA LAB: PROJECTS" size={[20, 12, 40]} />
      <EntranceDoor position={[0, 0, 19.8]} rotation={[0, Math.PI, 0]} label={returnLabel} onClick={(pos) => setRoom("lobby", pos)} />
      {projects.map((p, i) => {
        const row = i % 2 === 0 ? -8 : 8;
        const z = -15 + Math.floor(i / 2) * 6;
        const rot = i % 2 === 0 ? Math.PI / 2 : -Math.PI / 2;
        return (
          <Exhibit key={p.id} position={[row, 1.5, z]} rotation={[0, rot, 0]} data={p} type="panel" />
        );
      })}
      <EntranceDoor position={[0, 0, -19.8]} label="GRAPHICS ANNEX" onClick={(pos) => setRoom("graphics", pos)} />
    </group>
  );
}
