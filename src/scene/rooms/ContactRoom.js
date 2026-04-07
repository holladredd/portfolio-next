import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import Exhibit from "../components/Exhibit";
import SolidRoom from "../components/SolidRoom";
import MuseumBench from "../components/MuseumBench";
import { contact } from "@/data/content";

export default function ContactRoom({ position }) {
  const { previousRoom } = useStore();
  const label = (previousRoom || "lobby").toUpperCase();

  return (
    <group position={position}>
      <SolidRoom title="UPLINK: CONTACT" size={[30, 12, 30]} />
      <EntranceDoor 
        position={[0, 0, 15.2]} 
        rotation={[0, Math.PI, 0]} 
        label={`RETURN TO ${label}`} 
        onClick={previousRoom || "lobby"} 
      />
      
      <MuseumBench position={[0, 0, 0]} rotation={[0, 0, 0]} />

      {contact.map((c, i) => {
         const x = -8 + i * 8;
         return (
            <Exhibit key={c.platform} position={[x, 1, -10]} data={c} type="node" />
         );
      })}
    </group>
  );
}
