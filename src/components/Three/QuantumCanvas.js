import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Effects from "./Effects";
import Particles from "./Particles";
import DreddAI from "./DreddAI";
import QuantumNodes from "./QuantumNodes";

export default function QuantumCanvas() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: false, stencil: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
          
          {/* Ambient space light */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#009b4d" />

          {/* 3D Scene Elements */}
          <Particles count={5000} />
          <DreddAI />
          <QuantumNodes />

          {/* Cinematic Effects */}
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
