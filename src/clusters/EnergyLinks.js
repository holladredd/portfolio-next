import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useStore from "../../store/useStore";
// Importing the shader material we previously established
import EnergyFlowMaterial from "../Three/Shaders/EnergyFlowShader";

const connections = [
  { from: [0, 0, 0], to: [-8, 4, -10], label: "about" },
  { from: [-8, 4, -10], to: [8, -4, -10], label: "projects" },
  { from: [8, -4, -10], to: [-4, -8, -10], label: "skills" }
];

export default function EnergyLinks() {
  const { unlockedClusters, theme } = useStore();
  const activeColor = theme === "dark" ? "#009b4d" : "#3b82f6";

  const lines = useMemo(() => {
    return connections.map((conn, i) => {
       const start = new THREE.Vector3(...conn.from);
       const end = new THREE.Vector3(...conn.to);
       const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
       mid.y += 2; // Offset for arc
       const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
       const points = curve.getPoints(50);
       const geometry = new THREE.BufferGeometry().setFromPoints(points);
       return { geometry, id: conn.label };
    });
  }, []);

  return (
    <group>
      {lines.map((line, i) => {
        const isUnlocked = unlockedClusters.includes(line.id);
        if (!isUnlocked) return null;

        return (
          <mesh key={i}>
            <tubeGeometry args={[new THREE.CatmullRomCurve3(line.geometry.vertices), 20, 0.05, 8, false]} />
            <energyFlowMaterial 
              uColor={new THREE.Color(activeColor)} 
              uDistortion={0.2}
              transparent
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Helper to use useMemo in component
function useMemo(factory, deps) {
  const ref = useRef();
  if (!ref.current || !deps.every((dep, i) => dep === ref.current.deps[i])) {
    ref.current = { value: factory(), deps };
  }
  return ref.current.value;
}
