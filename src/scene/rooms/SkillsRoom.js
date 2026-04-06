import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import Exhibit from "../components/Exhibit";
import LabFrame from "../components/LabFrame";
import { skills } from "@/data/content";

export default function SkillsRoom({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position}>
      <LabFrame title="CORE: SKILLS" />

      <EntranceDoor position={[0, 0, 10]} rotation={[0, Math.PI, 0]} label="BACK TO LOBBY" onClick={() => setRoom("lobby")} />
      
      {/* Central Pedestal Arrangement */}
      {skills.map((s, i) => {
        const angle = (i / skills.length) * Math.PI * 2; 
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
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
    </group>
  );
}
