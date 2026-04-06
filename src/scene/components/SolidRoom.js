import { Text } from "@react-three/drei";

export default function SolidRoom({ position, title, size = [30, 12, 30] }) {
  const [w, h, d] = size;

  return (
    <group position={position}>
      {/* Museum Floor - Polished Slate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          roughness={0.45} 
          metalness={0.1} 
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, h, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Walls - Solid Matte Slate */}
      <mesh position={[0, h / 2, -d / 2]} receiveShadow>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh position={[0, h / 2, d / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh position={[-w / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.05} />
      </mesh>
      <mesh position={[w / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[d, h]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Cove Lighting */}
      <CoveLight position={[0, h - 0.15, -d / 2 + 0.15]} rotation={[Math.PI / 2, 0, 0]} length={w} />
      <CoveLight position={[0, h - 0.15, d / 2 - 0.15]} rotation={[Math.PI / 2, 0, 0]} length={w} />

      {/* Exhibit Title */}
      <group position={[0, h - 2.5, -d / 2 + 0.1]}>
        <Text fontSize={0.8} color="#ffffff" font="/fonts/Anta-Regular.ttf" letterSpacing={0.2} uppercase>
          {title}
        </Text>
      </group>
    </group>
  );
}

function CoveLight({ position, rotation, length }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[length, 0.1, 0.1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
    </mesh>
  );
}
