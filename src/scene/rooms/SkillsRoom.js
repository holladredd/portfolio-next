import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import Exhibit from "../components/Exhibit";
import SolidRoom from "../components/SolidRoom";
import MuseumBench from "../components/MuseumBench";
import { skills } from "@/data/content";

export default function SkillsRoom({ position }) {
  const { previousRoom } = useStore();
  const safeReturn = (previousRoom || "lobby").toUpperCase();

  return (
    <group position={position}>
      <SolidRoom title="CORE: SKILLS" size={[30, 12, 30]} />
      <EntranceDoor 
        position={[0, 0, 14.7]} 
        rotation={[0, Math.PI, 0]} 
        label={`RETURN TO ${safeReturn}`} 
        onClick={previousRoom || "lobby"} 
      />
      <MuseumBench position={[-8, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <MuseumBench position={[8, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      
      {skills.map((s, i) => {
        const angle = (i / skills.length) * Math.PI * 2; 
        const radius = 6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <Exhibit key={s.name} position={[x, 1, z]} rotation={[0, -angle, 0]} data={s} type="node" />
        );
      })}
    </group>
  );
}
