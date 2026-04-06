import { Text } from "@react-three/drei";

export default function EntranceDoor({ position, rotation = [0, 0, 0], label, onClick }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => document.body.style.cursor = "pointer"}
        onPointerOut={() => document.body.style.cursor = "default"}
        position={[0, 2, 0]}
      >
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial color="#111111" emissive="#ffffff" emissiveIntensity={0.05} roughness={0.4} metalness={0.8} />
      </mesh>
      <Text position={[0, 4.5, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="bottom">
        {label}
      </Text>
    </group>
  );
}
