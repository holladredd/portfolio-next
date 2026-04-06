import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PointLight, Sparkles } from "@react-three/drei";
import { createNoise3D } from "simplex-noise";
import { useExperience } from "@/context/ExperienceContext";
import * as THREE from "three";

export default function DreddAI() {
  const meshRef = useRef();
  const lightRef = useRef();
  const noise3D = useMemo(() => createNoise3D(), []);
  const { dreddState, showSubtitles } = useExperience();
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(0);

  // Advanced Personality Colors
  const colors = {
    idle: "#3b82f6",
    curious: "#009b4d",
    glitch: "#ef4444",
    guide: "#fde047"
  };

  const activeColor = hovered ? "#009b4d" : colors[dreddState] || colors.idle;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    // Organic Floating Motion
    const speed = dreddState === "glitch" ? 4 : (hovered ? 2 : 0.5);
    const nX = noise3D(time * speed, 0, 0) * 0.4;
    const nY = noise3D(0, time * speed, 0) * 0.4;
    const nZ = noise3D(0, 0, time * speed) * 0.4;
    meshRef.current.position.set(nX, nY, nZ + 8);
    
    // Smooth Look-At or Rotation
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.1;
    
    // Voice Pulse Sync (Heightened when subtitles are visible)
    const voiceFactor = showSubtitles ? Math.sin(time * 15) * 0.2 : 0;
    const pulseFactor = Math.sin(time * 2) * 0.3 + 0.5 + voiceFactor;
    setPulse(pulseFactor);

    if (lightRef.current) {
       lightRef.current.intensity = (hovered ? 3 : 1) + pulseFactor;
    }

    // Glitch Shiver
    if (dreddState === "glitch") {
       meshRef.current.position.x += Math.random() * 0.1 - 0.05;
       meshRef.current.position.y += Math.random() * 0.1 - 0.05;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1.5, 64, 64]} />
        <MeshDistortMaterial
          color={activeColor}
          speed={hovered ? 4 : (dreddState === "glitch" ? 10 : 2)}
          distort={hovered ? 0.6 : (dreddState === "glitch" ? 0.8 : 0.3)}
          radius={1}
          emissive={activeColor}
          emissiveIntensity={pulse * 1.5}
          opacity={0.9}
          transparent
        />
        <PointLight 
          ref={lightRef}
          distance={15} 
          color={activeColor} 
        />
        {showSubtitles && (
           <Sparkles count={50} scale={3} size={2} color={activeColor} speed={1} />
        )}
      </mesh>
    </group>
  );
}
