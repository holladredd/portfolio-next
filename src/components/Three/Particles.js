import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({ count }) {
  const meshRef = useRef();
  const { viewport, mouse } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 50;
      const s = Math.random() * 0.1;
      const t = Math.random() * 100; // time offset
      temp.push({ x, y, z, s, t });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((p, i) => {
      let { x, y, z, s, t } = p;
      t += 0.01;
      
      // Floating motion
      const xOff = Math.sin(t) * 0.2;
      const yOff = Math.cos(t) * 0.2;
      
      // Cursor interaction (Subtle Parallax)
      const xParallax = mouse.x * (z / 50) * 2;
      const yParallax = mouse.y * (z / 50) * 2;

      dummy.position.set(x + xOff + xParallax, y + yOff + yParallax, z);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
    </instancedMesh>
  );
}
