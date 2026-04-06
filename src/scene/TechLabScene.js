import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
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
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 2, 10], fov: 60 }}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 5, 40]} />

        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

          <CameraController />

          <group>
            <Lobby position={[0, 0, 0]} />
            <ProjectsRoom position={[-20, 0, -20]} />
            <SkillsRoom position={[20, 0, -20]} />
            <AboutRoom position={[0, 0, -30]} />
          </group>

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} radius={0.6} />
            <Noise opacity={0.03} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
