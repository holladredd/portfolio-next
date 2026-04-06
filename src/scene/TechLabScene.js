import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { Environment, Grid } from "@react-three/drei";
import CameraController from "./CameraController";
import Lobby from "./rooms/Lobby";
import ProjectsRoom from "./rooms/ProjectsRoom";
import SkillsRoom from "./rooms/SkillsRoom";
import AboutRoom from "./rooms/AboutRoom";

export default function TechLabScene() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 2, 10], fov: 60 }}
      >
        <color attach="background" args={["#080808"]} />
        <fog attach="fog" args={["#080808", 10, 50]} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#444444" />
          
          <Grid
            infiniteGrid
            fadeDistance={50}
            fadeStrength={5}
            cellSize={1}
            sectionSize={5}
            sectionColor="#1a1a1a"
            cellColor="#0d0d0d"
          />

          <CameraController />

          <group>
            <Lobby position={[0, 0, 0]} />
            <ProjectsRoom position={[-30, 0, -30]} />
            <SkillsRoom position={[30, 0, -30]} />
            <AboutRoom position={[0, 0, -50]} />
          </group>

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.8} radius={0.5} />
            <Noise opacity={0.02} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
