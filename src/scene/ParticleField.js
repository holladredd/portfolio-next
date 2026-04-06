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
       temp.push({ x, y, z, s });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { mouse } = state;
    
    particles.forEach((p, i) => {
       const { x, y, z, s } = p;
       
       // Calculate cursor repulsion (The Ripple Effect)
       const mousePos = new THREE.Vector3(mouse.x * 30, mouse.y * 20, 0);
       const dist = new THREE.Vector3(x, y, 0).distanceTo(mousePos);
       const force = Math.max(0, 4 - dist) * 0.1;

       // Static background: no automatic movement
       const xOff = (x - mousePos.x) * force;
       const yOff = (y - mousePos.y) * force;
       
       dummy.position.set(x + xOff, y + yOff, z);
       dummy.scale.set(s, s, s);
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
        opacity={0.2} 
        blending={THREE.AdditiveBlending} 
      />
    </instancedMesh>
  );
}
