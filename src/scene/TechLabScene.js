import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Sky, Stars, Environment } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, ChromaticAberration } from "@react-three/postprocessing";
import CameraController from "./CameraController";
import Lobby from "./rooms/Lobby";
import ProjectsRoom from "./rooms/ProjectsRoom";
import SkillsRoom from "./rooms/SkillsRoom";
import AboutRoom from "./rooms/AboutRoom";
import ContactRoom from "./rooms/ContactRoom";
import GraphicsRoom from "./rooms/GraphicsRoom";

export default function TechLabScene() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas 
        shadows 
        camera={{ position: [0, 2, 12], fov: 75 }}
        gl={{ antialias: true, stencil: false, depth: true }}
        dpr={[1, 2]} 
      >
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 5, 100]} />
        
        <Suspense fallback={null}>
          <Environment preset="night" environmentIntensity={1.5} />
          <Sky distance={450000} sunPosition={[0, -1, 0]} inclination={0} azimuth={0.25} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ambientLight intensity={0.8} />
          
          {/* Global Spotlights for Texture Depth */}
          <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
          <pointLight position={[0, 10, 0]} intensity={2} color="#38bdf8" />

          <CameraController />

          <group>
            {/* Museum HUB (Lobby) */}
            <Lobby position={[0, 0, 0]} />
            <ProjectsRoom position={[-30, 0, 0]} />       
            <SkillsRoom position={[35, 0, 0]} />         
            <AboutRoom position={[0, 0, -35]} />         
            <ContactRoom position={[0, 0, 35]} />        
            <GraphicsRoom position={[-30, 0, -35]} />    
          </group>

          <EffectComposer>
            <Bloom intensity={0.8} luminanceThreshold={0.9} luminanceSmoothing={0.025} />
            <Noise opacity={0.03} />
            <ChromaticAberration offset={[0.0008, 0.0008]} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
