import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import EnergyFlowMaterial from "./Shaders/EnergyFlowShader";

const nodePositions = [
  { from: [0, 0, 0], to: [-8, 4, -10] }, // home to about
  { from: [-8, 4, -10], to: [8, -4, -10] }, // about to project
  { from: [8, -4, -10], to: [-4, -8, -10] }, // project to contact
];

function Trail({ from, to }) {
  const meshRef = useRef();
  const materialRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(...from),
      new THREE.Vector3((from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + 2, (from[2] + to[2]) / 2),
      new THREE.Vector3(...to),
    ]);
  }, [from, to]);

  useFrame((state) => {
    if (materialRef.current) {
       materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 64, 0.05, 8, false]} />
      <energyFlowMaterial ref={materialRef} transparent opacity={0.5} />
    </mesh>
  );
}

export default function EnergyTrails() {
  return (
    <group opacity={0.2}>
      {nodePositions.map((pos, i) => (
        <Trail key={i} from={pos.from} to={pos.to} />
      ))}
    </group>
  );
}
