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
       const z = (Math.random() - 0.5) * 40;
       const s = Math.random() * 0.15 + 0.05;
       const speed = Math.random() * 0.02 + 0.005;
       const t = Math.random() * 100; // time offset
       temp.push({ x, y, z, s, t, speed });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mousePos = new THREE.Vector3(mouse.x * 20, mouse.y * 10, 0);

    particles.forEach((p, i) => {
       let { x, y, z, s, t, speed } = p;
       t += speed;
       
       // Environment Pulse (Breathing)
       const pulse = Math.sin(time * 0.5 + z * 0.1) * 0.2;
       
       // Floating & Parallax
       const xOff = Math.sin(t) * 1.5;
       const yOff = Math.cos(t) * 1.5;
       
       // Dynamic Position
       const currentPos = new THREE.Vector3(x + xOff, y + yOff, z);
       const distToMouse = currentPos.distanceTo(mousePos);
       
       // REPLLUSION Logic
       if (distToMouse < 4) {
          const repelDir = currentPos.clone().sub(mousePos).normalize();
          const pFactor = (4 - distToMouse) * 0.5;
          currentPos.add(repelDir.multiplyScalar(pFactor));
       }

       dummy.position.copy(currentPos);
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
