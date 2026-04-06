import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import Exhibit from "../components/Exhibit";
import SolidRoom from "../components/SolidRoom";
import { graphics } from "@/data/content";

export default function GraphicsRoom({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <SolidRoom title="CREATIVE ANNEX: GRAPHICS" size={[20, 12, 30]} />
      <EntranceDoor position={[0, 0, 14.8]} rotation={[0, Math.PI, 0]} label="RETURN TO PROJECTS" onClick={(pos) => setRoom("projects", pos)} />
      {graphics.map((g, i) => {
        const row = i % 2 === 0 ? -8 : 8;
        const z = -10 + Math.floor(i / 2) * 8;
        const rot = i % 2 === 0 ? Math.PI / 2 : -Math.PI / 2;
        return (
          <Exhibit key={g.id} position={[row, 2, z]} rotation={[0, rot, 0]} data={g} type="panel" />
        );
      })}
    </group>
  );
}
