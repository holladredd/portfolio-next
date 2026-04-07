import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function AmbientDust() {
  const ref = useRef();
  
  // High-performance native random point distribution
  const points = useMemo(() => {
    const p = new Float32Array(3000);
    for (let i = 0; i < 3000; i++) {
      p[i] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#38bdf8"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
        />
      </Points>
    </group>
  );
}
