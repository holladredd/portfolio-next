import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import useStore from "@/store/useStore";

const clusterPositions = {
  home: [0, 0, 25],
  about: [-15, 8, -20],
  projects: [15, -8, -20],
  skills: [-8, -15, -20],
};

export default function CameraController() {
  const { camera } = useThree();
  const { focusedCluster, mode, setFocusedCluster } = useStore();
  
  const targetPos = useRef(new THREE.Vector3(0, 0, 80));
  const lookAtPos = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (mode === "intro") {
      targetPos.current.set(0, 0, 30);
    } else if (focusedCluster && clusterPositions[focusedCluster]) {
      const [x, y, z] = clusterPositions[focusedCluster];
      targetPos.current.set(x, y, z + 12);
      lookAtPos.current.set(x, y, z);
    }
  }, [focusedCluster, mode]);

  useFrame((state) => {
    // 1. Smooth Camera Movement (Auto-travel or Manual framing support)
    if (focusedCluster && mode !== "intro") {
       camera.position.lerp(targetPos.current, 0.03);
       camera.lookAt(lookAtPos.current);
    }

    // 2. Proximity Trigger for Manual Exploration
    // If zoom gets very close to a cluster, focus it to trigger narration
    if (!focusedCluster && mode === "explore") {
        Object.entries(clusterPositions).forEach(([id, pos]) => {
           const clusterPos = new THREE.Vector3(...pos);
           if (camera.position.distanceTo(clusterPos) < 20) {
              setFocusedCluster(id);
           }
        });
    }

    // Subtle breathing effect
    camera.position.y += Math.sin(state.clock.getElapsedTime()) * 0.005;
  });

  return null;
}
