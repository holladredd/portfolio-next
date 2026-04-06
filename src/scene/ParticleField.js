import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useStore from "@/store/useStore";

export default function ParticleField({ count = 5000 }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { mode } = useStore();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
       const x = (Math.random() - 0.5) * 100;
       const y = (Math.random() - 0.5) * 100;
       const z = (Math.random() - 0.5) * 50;
       const s = Math.random() * 0.1;
       const t = Math.random() * 100;
       temp.push({ x, y, z, s, t });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
       const { x, y, z, s, t } = p;
       const pulse = Math.sin(time * 0.5 + z * 0.1) * 0.1;
       const slowMotion = mode === "intro" ? 0.2 : 1;
       const xOff = Math.sin(t + time * slowMotion) * 0.5;
       const yOff = Math.cos(t + time * slowMotion) * 0.5;
       dummy.position.set(x + xOff, y + yOff, z);
       dummy.scale.set(s + pulse, s + pulse, s + pulse);
       dummy.updateMatrix();
       meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.3} 
        blending={THREE.AdditiveBlending} 
      />
    </instancedMesh>
  );
}
