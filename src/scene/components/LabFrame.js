import { Text } from "@react-three/drei";

export default function LabFrame({ position, title }) {
  return (
    <group position={position}>
      {/* Structural Pillars */}
      <Column position={[-15, 0, -15]} />
      <Column position={[15, 0, -15]} />
      <Column position={[-15, 0, 15]} />
      <Column position={[15, 0, 15]} />

      {/* Ceiling Joists & Cable Trays */}
      <Beam position={[0, 10, -15]} rotation={[0, 0, 0]} length={30} />
      <Beam position={[0, 10, 15]} rotation={[0, 0, 0]} length={30} />
      <Beam position={[-15, 10, 0]} rotation={[0, Math.PI / 2, 0]} length={30} />
      <Beam position={[15, 10, 0]} rotation={[0, Math.PI / 2, 0]} length={30} />
      
      {/* Internal Grid Support */}
      <Beam position={[0, 10, 0]} rotation={[0, 0, 0]} length={30} opacity={0.3} />
      <Beam position={[0, 10, 0]} rotation={[0, Math.PI / 2, 0]} length={30} opacity={0.3} />

      {/* Lab Spotlight - High Contrast */}
      <spotLight 
        position={[0, 12, 0]} 
        angle={0.6} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color="#ffffff"
        target-position={[0, 0, 0]}
      />

      {/* Room Neon Header - Terminal Style */}
      <group position={[0, 9, -15]}>
        <mesh>
          <planeGeometry args={[10, 2]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        <Text 
          position={[0, 0, 0.1]} 
          fontSize={0.8} 
          color="#ffffff" 
          font="/fonts/Anta-Regular.ttf" 
          letterSpacing={0.2} 
          uppercase
        >
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
      <meshStandardMaterial color="#111111" metalness={1} roughness={0.05} />
    </mesh>
  );
}

function Beam({ position, rotation, length, opacity = 1 }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[length, 0.4, 0.4]} />
        <meshPhysicalMaterial color="#111111" metalness={1} roughness={0.05} />
      </mesh>
      {/* Architectural Light Strip underneath */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[length, 0.05, 0.15]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8 * opacity} />
      </mesh>
    </group>
  );
}
