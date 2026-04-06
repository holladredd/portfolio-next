import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SpeedLines({ count = 50 }) {
  const meshRef = useRef();
  
  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
       const z = Math.random() * -50;
       const radius = 5 + Math.random() * 10;
       const angle = Math.random() * Math.PI * 2;
       const x = Math.cos(angle) * radius;
       const y = Math.sin(angle) * radius;
       const length = 2 + Math.random() * 5;
       temp.push({ x, y, z, length });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    lines.forEach((line, i) => {
       line.z += 1.5; // Fast movement
       if (line.z > 15) line.z = -50;
       
       dummy.position.set(line.x, line.y, line.z);
       dummy.scale.set(0.02, 0.02, line.length);
       dummy.updateMatrix();
       meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
    </instancedMesh>
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
