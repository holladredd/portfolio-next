import { useFrame, useThree } from "@react-three/fiber";
import useStore from "@/store/useStore";
import * as THREE from "three";
import { useRef, useEffect } from "react";

export default function CameraController() {
  const { camera } = useThree();
  const { focusedCluster } = useStore();
  const targetPos = useRef(new THREE.Vector3(0, 0, 15));
  const lookAtPos = useRef(new THREE.Vector3(0, 0, 0));

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
       targetPos.current.set(0, 0, 15);
       lookAtPos.current.set(0, 0, 0);
    }
  }, [focusedCluster]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(lookAtPos.current);
  });
  return null;
}
