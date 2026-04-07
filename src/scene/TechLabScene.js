import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { Environment, MeshReflectorMaterial } from "@react-three/drei";
import CameraController from "./CameraController";
import Lobby from "./rooms/Lobby";
import ProjectsRoom from "./rooms/ProjectsRoom";
import SkillsRoom from "./rooms/SkillsRoom";
import AboutRoom from "./rooms/AboutRoom";
import ContactRoom from "./rooms/ContactRoom";
import GraphicsRoom from "./rooms/GraphicsRoom";
import AmbientDust from "./components/AmbientDust";

export default function TechLabScene() {
  return (
    <div className="fixed inset-0 bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 2, 10], fov: 60 }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 40]} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.15} />
          
          <AmbientDust />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={20}
              roughness={1}
              depthScale={1}
              minDepthThreshold={0.5}
              maxDepthThreshold={1}
              color="#050505"
              metalness={0.5}
            />
          </mesh>

          <CameraController />

          <group>
            <Lobby position={[0, 0, 0]} />
            <ProjectsRoom position={[-25, 0, -5]} />
            <SkillsRoom position={[25, 0, -5]} />
            <AboutRoom position={[0, 0, -26]} />
            <ContactRoom position={[0, 0, 26]} />
            <GraphicsRoom position={[-25, 0, -42]} />
          </group>

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.9} mipmapBlur intensity={0.5} radius={0.3} />
            <Noise opacity={0.015} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
