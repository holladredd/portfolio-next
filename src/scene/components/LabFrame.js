import { Text } from "@react-three/drei";

export default function LabFrame({ position, title }) {
  return (
    <group position={position}>
      {/* Corner Columns */}
      <Column position={[-15, 0, -15]} />
      <Column position={[15, 0, -15]} />
      <Column position={[-15, 0, 15]} />
      <Column position={[15, 0, 15]} />

      {/* Ceiling Beams */}
      <Beam position={[0, 10, -15]} rotation={[0, 0, 0]} length={30} />
      <Beam position={[0, 10, 15]} rotation={[0, 0, 0]} length={30} />
      <Beam position={[-15, 10, 0]} rotation={[0, Math.PI / 2, 0]} length={30} />
      <Beam position={[15, 10, 0]} rotation={[0, Math.PI / 2, 0]} length={30} />

      {/* Room Label - Neon Sign */}
      <group position={[0, 8, -14.8]}>
        <mesh>
          <planeGeometry args={[10, 2]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        <Text position={[0, 0, 0.1]} fontSize={0.8} color="white" font="/fonts/Anta-Regular.ttf" letterSpacing={0.2} uppercase>
          {title}
        </Text>
      </group>
    </group>
  );
}

function Column({ position }) {
  return (
    <mesh position={[position[0], 5, position[2]]}>
      <boxGeometry args={[0.5, 10, 0.5]} />
      <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

function Beam({ position, rotation, length }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[length, 0.3, 0.3]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Light Strip underneath */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[length, 0.05, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
