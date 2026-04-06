import { useFrame, useThree } from "@react-three/fiber";
import useStore from "../../store/useStore";
import * as THREE from "three";
import { useRef, useEffect } from "react";

export default function CameraController() {
  const { camera } = useThree();
  const { focusedCluster, mode } = useStore();
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 15));
  const lookAtPos = useRef(new THREE.Vector3(0, 0, 0));

  // Sync target with focused cluster
  useEffect(() => {
    if (focusedCluster === "about") {
       targetPos.current.set(-5, 2, 5);
       lookAtPos.current.set(-8, 4, -10);
    } else if (focusedCluster === "projects") {
       targetPos.current.set(5, -2, 5);
       lookAtPos.current.set(8, -4, -10);
    } else if (focusedCluster === "skills") {
       targetPos.current.set(-2, -5, 5);
       lookAtPos.current.set(-4, -8, -10);
    } else {
       // Default HOME / Intro
       targetPos.current.set(0, 0, 15);
       lookAtPos.current.set(0, 0, 0);
    }
  }, [focusedCluster]);

  useFrame((state) => {
    // Smoother interpolation (lerping)
    camera.position.lerp(targetPos.current, 0.05);
    
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    // camera.lookAt(lookAtPos.current); 
    // Manual lookAt lerp is more complex; simple camera.lookAt for now
    camera.lookAt(lookAtPos.current);
  });

  return null;
}
