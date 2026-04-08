/**
 * TechLabScene Component
 *
 * The primary 3D environment container. Held persistently in _app.js,
 * it houses the R3F Canvas, atmospheric lighting, post-processing effects,
 * and perfectly aligns all 6 museum wings into a single contiguous 3D coordinate space.
 */
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Sky, Stars, Environment } from "@react-three/drei";
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
      {/* 
        ========================================================
        1. R3F CANVAS CONTAINER
        ========================================================
        The primary WebGL renderer context. Configured with shadow maps,
        a 75 FOV camera, and dual Device Pixel Ratios (1-2) for high-res mobile rendering.
      */}
      <Canvas
        shadows
        camera={{ position: [0, 2, 12], fov: 75 }}
        gl={{ antialias: true, stencil: false, depth: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 5, 100]} />

        <Suspense fallback={null}>
          {/* 
            ========================================================
            2. ATMOSPHERE & LIGHTING ENGINE
            ========================================================
            Handles the Skybox, Stars, and HDR Environment map ('night').
            This provides the realistic reflections on all metal materials.
          */}
          <Environment preset="night" environmentIntensity={1.5} />
          <Sky
            distance={450000}
            sunPosition={[0, -1, 0]}
            inclination={0}
            azimuth={0.25}
          />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <ambientLight intensity={0.8} />

          {/* Global Spotlights for Texture Depth */}
          <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
          <pointLight position={[0, 10, 0]} intensity={2} color="#38bdf8" />

          <CameraController />

          {/* 
            ========================================================
            3. MUSEUM ARCHITECTURE (GLOBAL WING MAPPING)
            ========================================================
            All museum rooms are loaded into memory simultaneously here.
            They are positioned strictly against the Lobby coordinates 
            so there are no gaps between the hallways.
          */}
          <group>
            {/* Museum HUB (Lobby) */}
            <Lobby position={[0, 0, 0]} />
            <ProjectsRoom position={[-60, 0, 0]} />
            <SkillsRoom position={[60, 0, 0]} />
            <AboutRoom position={[0, 0, -60]} />
            <ContactRoom position={[0, 0, 60]} />
            <GraphicsRoom position={[-60, 0, -60]} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
