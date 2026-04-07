import React from "react";

export default function MuseumBench({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[4, 0.8, 1.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[4, 0.1, 1.5]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.2} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
