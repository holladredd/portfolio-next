/**
 * SolidRoom Component
 * 
 * The fundamental architectural block for the 3D museum wings.
 * It renders the symmetrical walls, multi-surface textures (modern ceiling, terrazzo floor),
 * and handles click-to-focus gaze raycasting when the user explores a room.
 */
import { Text, useTexture } from "@react-three/drei";
import useStore from "@/store/useStore";
import * as THREE from "three";

export default function SolidRoom({ title, size = [20, 12, 20] }) {
  const { setCustomLook, transitionPhase } = useStore();
  const [w, h, d] = size;

  // Load the Multi-Surface architectural textures
  const textures = useTexture({
    wall: "/textures/light_abstract_pattern.png",
    ceil: "/textures/ceiling_pattern.png",
    floor: "/textures/floor_pattern.png"
  });

  // Calibrate all textures for perfect stability and symmetry
  Object.values(textures).forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 16;
  });

  // Tile scale: 1 pattern per 10 units
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
      {/* 
        ===================================================================
        SECTION 1: STRUCTURAL PLANES (FLOOR & CEILING)
        ===================================================================
        Renders the top and bottom geometric bounds. Assigned with specific
        tileable textures tailored for floor and ceiling aesthetics.
      */}
      {/* Floor - Premium Terrazzo / Smooth Concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial 
          map={textures.floor}
          map-repeat={[repeatX, repeatZ]}
          color="#ffffff" 
          roughness={0.8} 
          metalness={0.1} 
        />
      </mesh>
      
      {/* Ceiling - Modern POP Blueprint */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, h, 0]}>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial 
          map={textures.ceil} 
          map-repeat={[repeatX, repeatZ]}
          color="#ffffff" 
          roughness={0.8} 
        />
      </mesh>

      {/* 
        ===================================================================
        SECTION 2: BOUNDING WALLS
        ===================================================================
        Contains the Back, Front, Left, and Right walls. The Front Wall
        acts as the mount point for EntranceDoor portals. Textured with the 
        light abstract pattern to form a minimalist gallery setting.
      */}
      {/* Back Wall (Light Abstract Fluid) */}
      <mesh position={[0, h / 2, -d / 2]}>
        <boxGeometry args={[w, h, 0.2]} />
        <meshStandardMaterial 
          map={textures.wall}
          map-repeat={[repeatX, repeatY]}
          color="#ffffff" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Front Wall (Portals) */}
      <mesh position={[0, h / 2, d / 2]}>
        <boxGeometry args={[w, h, 0.2]} />
        <meshStandardMaterial 
          map={textures.wall}
          map-repeat={[repeatX, repeatY]}
          color="#ffffff" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-w / 2, h / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[d, h, 0.2]} />
        <meshStandardMaterial 
          map={textures.wall}
          map-repeat={[repeatZ, repeatY]}
          color="#ffffff" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Right Wall */}
      <mesh position={[w / 2, h / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[d, h, 0.2]} />
        <meshStandardMaterial 
          map={textures.wall}
          map-repeat={[repeatZ, repeatY]}
          color="#ffffff" 
          roughness={0.6} 
          metalness={0.1}
        />
      </mesh>

      {/* Raised Room Title Inscription */}
      <group position={[0, h - 0.8, -d / 2 + 0.2]}>
        <Text fontSize={0.8} color="#ffffff" anchorX="center" anchorY="top" font="/fonts/Anta-Regular.ttf" letterSpacing={0.1} uppercase opacity={0.2} transparent>
          {title}
        </Text>
      </group>

      {/* 
        ===================================================================
        SECTION 3: ARCHITECTURAL ENLIGHTENMENT
        ===================================================================
        Positions glowing point lights and solid emissive pillars in the 4 interior 
        corners of the room. This provides critical ambient depth and dramatic 
        reflections against the mapped textures.
      */}
      {/* Corner Enlightenment: Static Point Lights */}
      {[[-w/2+1, 1, -d/2+1], [w/2-1, 1, -d/2+1], [-w/2+1, h-1, -d/2+1], [w/2-1, h-1, -d/2+1]].map((coord, i) => (
        <pointLight key={i} position={coord} intensity={0.5} distance={15} color="#38bdf8" />
      ))}

      {/* Aesthetic Accents: Emissive Pillars */}
      <mesh position={[-w / 2 + 0.1, h / 2, -d / 2 + 0.1]}>
        <boxGeometry args={[0.2, h, 0.2]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
      </mesh>
      <mesh position={[w / 2 - 0.1, h / 2, -d / 2 + 0.1]}>
        <boxGeometry args={[0.2, h, 0.2]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}
