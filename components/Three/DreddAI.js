import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { createNoise3D } from "simplex-noise";
import { useExperience } from "@/context/ExperienceContext";
import * as THREE from "three";

export default function DreddAI() {
  const meshRef = useRef();
  const lightRef = useRef();
  const noise3D = useMemo(() => createNoise3D(), []);
  const { mouse } = useThree();
  const { dreddState, setDreddState, personalityVector, updatePersonality, showSubtitles } = useExperience();
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [glitchFactor, setGlitchFactor] = useState(0);

  // Advanced Personality Colors
  const colors = {
    idle: "#3b82f6",
    curious: "#009b4d",
    glitch: "#ef4444",
    guide: "#fde047",
    defensive: "#f97316"
  };

  const activeColor = hovered ? "#009b4d" : colors[dreddState] || colors.idle;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (!meshRef.current) return;

    const mousePos = new THREE.Vector3(mouse.x * 10, mouse.y * 10, 8);
    const distanceToMouse = meshRef.current.position.distanceTo(mousePos);

    // Personality Logic: Defensive vs Curious
    if (distanceToMouse < 2 && !hovered) {
       setDreddState("defensive");
       updatePersonality({ c: -0.01, s: -0.01 }); // Losing stability when chased
    }

    // Movement Logic based on state
    let targetPos = new THREE.Vector3();
    const speed = dreddState === "glitch" ? 5 : (dreddState === "defensive" ? 3 : 0.8);
    
    if (dreddState === "defensive") {
       // Escape from mouse
       const directAway = meshRef.current.position.clone().sub(mousePos).normalize().multiplyScalar(4);
       targetPos.copy(meshRef.current.position).add(directAway);
    } else if (dreddState === "curious") {
       // Follow mouse gently
       targetPos.copy(mousePos).add(new THREE.Vector3(2, 2, 0));
    } else {
       // Idle floating
       const nX = noise3D(time * speed, 0, 0) * 2;
       const nY = noise3D(0, time * speed, 0) * 2;
       const nZ = noise3D(0, 0, time * speed) * 1;
       targetPos.set(nX, nY, nZ + 8);
    }

    meshRef.current.position.lerp(targetPos, 0.05);

    // Glitch Shiver logic
    if (Math.random() > 0.995) {
       setGlitchFactor(1);
       setTimeout(() => setGlitchFactor(0), 150);
    }

    if (glitchFactor > 0) {
       meshRef.current.position.x += Math.random() * 0.4 - 0.2;
       meshRef.current.position.y += Math.random() * 0.4 - 0.2;
    }

    // Voice Pulse Sync
    const voiceFactor = showSubtitles ? Math.sin(time * 20) * 0.3 : 0;
    const pulseFactor = Math.sin(time * 2) * 0.3 + 0.5 + voiceFactor;
    setPulse(pulseFactor);

    if (lightRef.current) {
       lightRef.current.intensity = (hovered ? 3 : 1) + pulseFactor;
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
          speed={hovered ? 5 : (dreddState === "glitch" || glitchFactor > 0 ? 15 : 3)}
          distort={hovered ? 0.7 : (glitchFactor > 0 ? 1.2 : 0.4)}
          radius={1}
          emissive={activeColor}
          emissiveIntensity={pulse * 2}
          opacity={0.9}
          transparent
        />
        <pointLight 
          ref={lightRef}
          distance={15} 
          color={activeColor} 
        />
        {(showSubtitles || dreddState === "guide") && (
           <Sparkles count={80} scale={4} size={3} color={activeColor} speed={1.5} />
        )}
      </mesh>
    </group>
  );
}
