import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";
import EntranceDoor from "../components/EntranceDoor";
import SolidRoom from "../components/SolidRoom";
import MuseumBench from "../components/MuseumBench";

export default function AboutRoom({ position }) {
  const { previousRoom } = useStore();
  const safeReturn = (previousRoom || "lobby").toUpperCase();

  return (
    <group position={position}>
      <SolidRoom title="FACILITY: ABOUT" size={[30, 12, 30]} />
      <EntranceDoor 
        position={[0, 0, 15.2]} 
        rotation={[0, Math.PI, 0]} 
        label={`RETURN TO ${safeReturn}`} 
        onClick={previousRoom || "lobby"} 
      />
      <MuseumBench position={[-8, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      
      <group position={[0, 4, -14.8]}>
        <Text fontSize={0.8} color="#38bdf8" font="/fonts/Anta-Regular.ttf">
          {"> ARCHITECT: Folayan Olamide (Dredd)\n> ROLE: Software Engineer\n> MISSION: Building Immersive Digital Environments"}
        </Text>
      </group>
    </group>
  );
}
