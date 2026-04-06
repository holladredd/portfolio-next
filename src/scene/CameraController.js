import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import useStore from "@/store/useStore";

const clusterPositions = {
  home: [0, 0, 15],
  about: [-8, 4, -2],
  projects: [8, -4, -2],
  skills: [-4, -8, -2],
};

export default function CameraController() {
  const { camera } = useThree();
  const { focusedCluster, mode } = useStore();
  
  // Start from a "Long Shot" cinematic position
  const targetPos = useRef(new THREE.Vector3(0, 0, 80));
  const lookAtPos = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (mode === "intro") {
      // Awakening intro: slowly move from far into the realm
      targetPos.current.set(0, 0, 25);
    } else if (focusedCluster && clusterPositions[focusedCluster]) {
      const [x, y, z] = clusterPositions[focusedCluster];
      targetPos.current.set(x, y, z + 8);
      lookAtPos.current.set(x, y, z);
    } else {
      targetPos.current.set(0, 0, 15);
      lookAtPos.current.set(0, 0, 0);
    }
  }, [focusedCluster, mode]);

  useFrame((state) => {
    // Smooth interpolation for cinematic movement
    camera.position.lerp(targetPos.current, 0.03);
    
    camera.lookAt(lookAtPos.current);
    
    // Subtle breathing effect
    camera.position.y += Math.sin(state.clock.getElapsedTime()) * 0.005;
  });

  return null;
}
