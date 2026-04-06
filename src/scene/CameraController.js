import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import useStore from "@/store/useStore";

const roomCoordinates = {
  lobby: { pos: [0, 2, 10], lookAt: [0, 1, 0] },
  projects: { pos: [-25, 2, 5], lookAt: [-25, 1, -5] },
  graphics: { pos: [-25, 2, -32], lookAt: [-25, 1, -42] },
  skills: { pos: [25, 2, 5], lookAt: [25, 1, -5] },
  about: { pos: [0, 2, -16], lookAt: [0, 1, -26] },
  contact: { pos: [0, 2, 16], lookAt: [0, 1, 26] }
};

export default function CameraController() {
  const { camera } = useThree();
  const { currentRoom, isTransitioning, transitionTarget, finishTransition } = useStore();
  
  const targetPos = useRef(new THREE.Vector3(...roomCoordinates.lobby.pos));
  const targetLook = useRef(new THREE.Vector3(...roomCoordinates.lobby.lookAt));
  const currentLook = useRef(new THREE.Vector3(...roomCoordinates.lobby.lookAt));

  useEffect(() => {
    if (roomCoordinates[currentRoom]) {
      targetPos.current.set(...roomCoordinates[currentRoom].pos);
      targetLook.current.set(...roomCoordinates[currentRoom].lookAt);
    }
  }, [currentRoom]);

  useFrame((state, delta) => {
    if (isTransitioning) {
      // First person walkthrough: Lerp towards Door first
      const lookAtTarget = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0));
      currentLook.current.lerp(lookAtTarget, 0.1);
      camera.lookAt(currentLook.current);
      
      camera.position.lerp(targetPos.current, 0.05);
      
      if (camera.position.distanceTo(targetPos.current) < 0.2) {
        finishTransition();
      }
    } else {
      // Smooth subtle float and target lerp
      camera.position.lerp(targetPos.current, 0.04);
      currentLook.current.lerp(targetLook.current, 0.04);
      camera.lookAt(currentLook.current);
      
      // Idle bobbing
      camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return null;
}
