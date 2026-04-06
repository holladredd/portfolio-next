import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import SolidRoom from "../components/SolidRoom";
import Exhibit from "../components/Exhibit";

const connections = [
  { name: "FACEBOOK", link: "https://web.facebook.com/folayan.olamide.1" },
  { name: "INSTAGRAM", link: "https://www.instagram.com/dev_dredd" },
  { name: "WHATSAPP", link: "https://wa.me/+2348160630642" },
  { name: "GITHUB", link: "https://github.com/holladredd" },
  { name: "X (TWITTER)", link: "https://x.com/Holla_Dredd" }
];

export default function ContactRoom({ position }) {
  const { setRoom } = useStore();

  return (
    <group position={position} rotation={[0, Math.PI, 0]}>
      <SolidRoom title="UPLINK: CONTACT" size={[20, 12, 20]} />
      <EntranceDoor position={[0, 0, 9.8]} rotation={[0, Math.PI, 0]} label="RETURN TO LOBBY" onClick={(pos) => setRoom("lobby", pos)} />
      <group position={[0, 2, 0]}>
        {connections.map((c, i) => (
           <Exhibit key={c.name} position={[(-4 + i * 2), 0, -5]} data={c} type="node" />
        ))}
        <Text position={[0, -1.5, -5]} fontSize={0.2} color="#38bdf8" uppercase font="/fonts/Anta-Regular.ttf">
          SELECT PROTOCOL TO INITIATE UPLINK
        </Text>
      </group>
    </group>
  );
}
