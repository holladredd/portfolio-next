import { Text } from "@react-three/drei";
import useStore from "@/store/useStore";

export default function SolidRoom({ title, size = [20, 12, 20] }) {
  const { setCustomLook, transitionPhase } = useStore();
  const [w, h, d] = size;

  const handleRoomClick = (e) => {
    // Only allow manual look-at when not in a transition
    if (transitionPhase === "IDLE") {
      e.stopPropagation();
      setCustomLook([e.point.x, e.point.y, e.point.z]);
    }
  };

  return (
    <group onClick={handleRoomClick}>
      {/* Floor - Matte Slate Mirror */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#050505" roughness={0.4} metalness={0.8} />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, h, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, h / 2, -d / 2]}>
        <boxGeometry args={[w, h, 0.2]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>
      
      {/* Front Wall (Portals reside here) */}
      <mesh position={[0, h / 2, d / 2]}>
        <boxGeometry args={[w, h, 0.2]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-w / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[d, h, 0.2]} />
        <meshStandardMaterial color="#080808" roughness={0.8} />
      </mesh>
      
      {/* Right Wall */}
      <mesh position={[w / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[d, h, 0.2]} />
        <meshStandardMaterial color="#080808" roughness={0.8} />
      </mesh>

      {/* Raised Room Title Inscription */}
      <group position={[0, h - 0.8, -d / 2 + 0.2]}>
        <Text fontSize={0.8} color="#ffffff" anchorX="center" anchorY="top" font="/fonts/Anta-Regular.ttf" letterSpacing={0.1} uppercase opacity={0.2} transparent>
          {title}
        </Text>
      </group>

      {/* Architectural Accents: Cove Lighting Pillars */}
      <mesh position={[-w / 2 + 0.1, h / 2, -d / 2 + 0.1]}>
        <boxGeometry args={[0.2, h, 0.2]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[w / 2 - 0.1, h / 2, -d / 2 + 0.1]}>
        <boxGeometry args={[0.2, h, 0.2]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
