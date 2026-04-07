import { Text, useTexture } from "@react-three/drei";
import useStore from "@/store/useStore";
import * as THREE from "three";

export default function SolidRoom({ title, size = [20, 12, 20] }) {
  const { setCustomLook, transitionPhase } = useStore();
  const [w, h, d] = size;

  const texture = useTexture("/textures/light_abstract_pattern.png");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  texture.anisotropy = 16;
  // Tile scale: 1 patterns per 10 units
  const repeatX = w / 10;
  const repeatY = h / 10;
  const repeatZ = d / 10;

  const handleRoomClick = (e) => {
    if (transitionPhase === "IDLE") {
      e.stopPropagation();
      setCustomLook([e.point.x, e.point.y, e.point.z]);
    }
  };

  return (
    <group onClick={handleRoomClick}>
      {/* Floor - High Gloss Matte Slate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Ceiling - Patterned */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, h, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial
          map={texture}
          map-repeat={[repeatX, repeatZ]}
          color="#ffffff"
          roughness={0.8}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, h / 2, -d / 2]}>
        <boxGeometry args={[w, h, 0.2]} />
        <meshStandardMaterial
          map={texture}
          map-repeat={[repeatX, repeatY]}
          color="#ffffff"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {/* Front Wall (Portals) */}
      <mesh position={[0, h / 2, d / 2]}>
        <boxGeometry args={[w, h, 0.2]} />
        <meshStandardMaterial
          map={texture}
          map-repeat={[repeatX, repeatY]}
          color="#ffffff"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-w / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[d, h, 0.2]} />
        <meshStandardMaterial
          map={texture}
          map-repeat={[repeatZ, repeatY]}
          color="#ffffff"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {/* Right Wall */}
      <mesh position={[w / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[d, h, 0.2]} />
        <meshStandardMaterial
          map={texture}
          map-repeat={[repeatZ, repeatY]}
          color="#ffffff"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {/* Raised Room Title Inscription */}
      <group position={[0, h - 0.8, -d / 2 + 0.2]}>
        <Text
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          font="/fonts/Anta-Regular.ttf"
          letterSpacing={0.1}
          uppercase
          opacity={0.2}
          transparent
        >
          {title}
        </Text>
      </group>

      {/* Corner Enlightenment: Static Point Lights */}
      {[
        [-w / 2 + 1, 1, -d / 2 + 1],
        [w / 2 - 1, 1, -d / 2 + 1],
        [-w / 2 + 1, h - 1, -d / 2 + 1],
        [w / 2 - 1, h - 1, -d / 2 + 1],
      ].map((coord, i) => (
        <pointLight
          key={i}
          position={coord}
          intensity={0.5}
          distance={15}
          color="#38bdf8"
        />
      ))}

      {/* Aesthetic Accents: Emissive Pillars */}
      <mesh position={[-w / 2 + 0.1, h / 2, -d / 2 + 0.1]}>
        <boxGeometry args={[0.2, h, 0.2]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1}
        />
      </mesh>
      <mesh position={[w / 2 - 0.1, h / 2, -d / 2 + 0.1]}>
        <boxGeometry args={[0.2, h, 0.2]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );
}
