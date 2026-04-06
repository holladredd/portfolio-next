import { Canvas, extend } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { Stars, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, ChromaticAberration } from "@react-three/postprocessing";
import useStore from "@/store/useStore";

// Modular Component Imports
import ParticleField from "./ParticleField";
import CameraController from "./CameraController";
import Cluster from "@/clusters/Cluster";
import EnergyLinks from "@/clusters/EnergyLinks";
import Dredd from "@/dredd/Dredd";
import DreddAI from "@/dredd/DreddAI";

// Shader Imports
import EnergyFlowMaterial from "@/scene/Shaders/EnergyFlowShader";
import PortalShaderMaterial from "@/scene/Shaders/PortalShader";
import QuantumDistortionMaterial from "@/scene/Shaders/DistortionShader";

extend({ EnergyFlowMaterial, PortalShaderMaterial, QuantumDistortionMaterial });

const clusters = [
  { id: "about", position: [-8, 4, -10], text: "ABOUT" },
  { id: "projects", position: [8, -4, -10], text: "PROJECTS" },
  { id: "skills", position: [-4, -8, -10], text: "SKILLS" }
];

export default function QuantumScene() {
  const { theme, mode } = useStore();
  const spaceColor = theme === "dark" ? "#000000" : "#0f172a";

  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={[spaceColor]} />
          
          <ambientLight intensity={0.4} />
          <pointLight position={[20, 20, 20]} intensity={2} color="#3b82f6" />
          <pointLight position={[-20, -20, -20]} intensity={2} color="#009b4d" />
          
          <Stars radius={100} depth={50} count={5000} factor={6} saturation={0} fade speed={1.5} />

          <CameraController />
          <ParticleField count={4500} />
          <EnergyLinks />
          
          <group>
            {clusters.map((c) => (
              <Cluster key={c.id} {...c} />
            ))}
          </group>

          <Dredd />
          <DreddAI />

          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0.2} 
              mipmapBlur 
              intensity={1.2} 
              radius={0.4} 
            />
            <Noise opacity={0.05} />
            <ChromaticAberration 
              offset={[0.001, 0.001]} 
              opacity={mode === "intro" ? 0.3 : 0.05} 
            />
          </EffectComposer>

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
