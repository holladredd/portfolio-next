import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, PointLight } from "@react-three/drei";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

export default function DreddAI() {
  const meshRef = useRef();
  const lightRef = useRef();
  const noise3D = useMemo(() => createNoise3D(), []);
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Noise-based floating motion (Organic)
    const nX = noise3D(time * 0.5, 0, 0) * 0.5;
    const nY = noise3D(0, time * 0.5, 0) * 0.5;
    const nZ = noise3D(0, 0, time * 0.5) * 0.5;

    if (meshRef.current) {
      meshRef.current.position.set(nX, nY, nZ);
      
      // Floating Rotation
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      meshRef.current.rotation.y = Math.cos(time * 0.3) * 0.1;
    }

    // Voice/Pulse Sync (Simulated for Now)
    const pulseFactor = Math.sin(time * 2) * 0.5 + 0.5;
    setPulse(pulseFactor);
    if (lightRef.current) {
       lightRef.current.intensity = hovered ? 2 : 0.5 + pulseFactor;
    }
  });

  return (
    <group position={[0, 0, 8]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            color={hovered ? "#009b4d" : "#3b82f6"}
            speed={2}
            distort={0.4}
            radius={1}
            emissive={hovered ? "#009b4d" : "#3b82f6"}
            emissiveIntensity={0.5 + pulse}
            opacity={0.8}
            transparent
          />
          <pointLight 
            ref={lightRef}
            distance={10} 
            color={hovered ? "#009b4d" : "#3b82f6"} 
          />
        </mesh>
      </Float>
    </group>
  );
}
