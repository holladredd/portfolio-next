import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useState, useEffect } from "react";
import { OrbitControls, PerspectiveCamera, Float, Stars } from "@react-three/drei";
import Effects from "./Effects";
import Particles from "./Particles";
import DreddAI from "./DreddAI";
import QuantumNodes from "./QuantumNodes";
import EnergyTrails from "./EnergyTrails";
import SpeedLines from "./SpeedLines";
import { useExperience } from "@/context/ExperienceContext";
import * as THREE from "three";

export default function QuantumCanvas() {
  const { dreddState } = useExperience();
  const [timeScale, setTimeScale] = useState(1);

  // Time Dilation Effect
  useEffect(() => {
    if (dreddState === "guide") {
       setTimeScale(0.3); // Slow down significantly when guide is active
    } else {
       setTimeScale(1.0);
    }
  }, [dreddState]);

  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: false, 
          stencil: false, 
          alpha: true, 
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
          
          {/* Ambient space light */}
          <ambientLight intensity={0.2} />
          <pointLight position={[20, 20, 20]} intensity={1.5} color="#3b82f6" />
          <pointLight position={[-20, -20, -20]} intensity={1.2} color="#009b4d" />
          
          {/* Layered Stars for Depth */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* 3D Scene Elements */}
          <Particles count={6000} />
          <DreddAI />
          <QuantumNodes />
          <EnergyTrails />
          
          {/* Cinematic Speed Lines for Navigation Feedback */}
          {dreddState === "curious" && <SpeedLines count={30} />}

          {/* Environmental Glow */}
          <mesh position={[0, 0, -30]}>
             <sphereGeometry args={[60, 32, 32]} />
             <meshBasicMaterial color="#1e3a8a" side={THREE.BackSide} transparent opacity={0.15} />
          </mesh>

          {/* Cinematic Effects Pipeline */}
          <Effects />
          
          {/* Interactive Control (Subtle) */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            rotateSpeed={0.3} 
            makeDefault 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
