import { Canvas, extend } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, ChromaticAberration } from "@react-three/postprocessing";
import useStore from "@/store/useStore";
import { projects } from "@/data/content";

// Modular Component Imports
import ParticleField from "./ParticleField";
import CameraController from "./CameraController";
import Cluster from "@/clusters/Cluster";
import EnergyLinks from "@/clusters/EnergyLinks";
import Dredd from "@/dredd/Dredd";
import DreddAI from "@/dredd/DreddAI";
import NebulaBackground from "./NebulaBackground";

// Shader Imports
import EnergyFlowMaterial from "@/scene/Shaders/EnergyFlowShader";
import PortalShaderMaterial from "@/scene/Shaders/PortalShader";
import QuantumDistortionMaterial from "@/scene/Shaders/DistortionShader";

extend({ EnergyFlowMaterial, PortalShaderMaterial, QuantumDistortionMaterial });

export default function QuantumScene() {
  const { theme, mode } = useStore();
  const spaceColor = theme === "dark" ? "#000000" : "#0f172a";

  const clusters = useMemo(() => {
    // Basic cluster positions
    const base = [
      { id: "about", position: [-15, 8, -20], text: "ABOUT", childrenData: [] },
      { id: "skills", position: [-8, -15, -20], text: "SKILLS", childrenData: [] }
    ];

    // Project cluster with dynamic child nodes (sphere arrangement)
    const projectCenter = [15, -8, -20];
    const projectNodes = projects.map((p, i) => {
      const angle = (i / projects.length) * Math.PI * 2;
      const r = 5;
      return {
        id: p.id,
        text: p.name,
        offset: [Math.cos(angle) * r, Math.sin(angle) * r, (Math.random() - 0.5) * 4]
      };
    });

    return [
      ...base,
      { id: "projects", position: projectCenter, text: "PROJECTS", childrenData: projectNodes }
    ];
  }, []);

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
          
          <ambientLight intensity={0.5} />
          <pointLight position={[20, 20, 20]} intensity={2.5} color="#3b82f6" />
          <pointLight position={[-20, -20, -20]} intensity={2.5} color="#009b4d" />
          
          <NebulaBackground />

          <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={60} />
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
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.4} />
            <Noise opacity={0.05} />
            <ChromaticAberration offset={[0.001, 0.001]} opacity={mode === "intro" ? 0.3 : 0.05} />
          </EffectComposer>

          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            minDistance={4}
            maxDistance={100}
            rotateSpeed={0.4} 
            enableDamping={true}
            dampingFactor={0.05}
            makeDefault 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
