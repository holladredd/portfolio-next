import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { Environment, MeshReflectorMaterial } from "@react-three/drei";
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
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 15, 60]} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" castShadow />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#1e293b" />
          
          {/* Deep Mirror Reflector Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
          </mesh>

          <CameraController />

          <group>
            <Lobby position={[0, 0, 0]} />
            <ProjectsRoom position={[-30, 0, -30]} />
            <SkillsRoom position={[30, 0, -30]} />
            <AboutRoom position={[0, 0, -60]} />
          </group>

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.9} mipmapBlur intensity={1} radius={0.4} />
            <Noise opacity={0.015} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
