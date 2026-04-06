import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
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
  const { currentRoom, transitionPhase, transitionTarget, setEntering, setLanding, finishTransition } = useStore();
  
  const targetPos = useRef(new THREE.Vector3(...roomCoordinates.lobby.pos));
  const targetLook = useRef(new THREE.Vector3(...roomCoordinates.lobby.lookAt));
  const currentLook = useRef(new THREE.Vector3(...roomCoordinates.lobby.lookAt));

  useEffect(() => {
    if (roomCoordinates[currentRoom]) {
      targetPos.current.set(...roomCoordinates[currentRoom].pos);
      targetLook.current.set(...roomCoordinates[currentRoom].lookAt);
    }
  }, [currentRoom]);

  useFrame((state) => {
    if (transitionPhase === "FACING") {
      // Phase 1: Lock gaze on the portal
      const lookAtDoor = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0));
      currentLook.current.lerp(lookAtDoor, 0.1);
      camera.lookAt(currentLook.current);
      
      // Pivot check (approximate alignment)
      if (currentLook.current.distanceTo(lookAtDoor) < 0.1) {
        setEntering();
      }
    } 
    else if (transitionPhase === "ENTERING") {
      // Phase 2: Walk through the portal
      const walkDir = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0)).sub(camera.position).normalize();
      camera.position.add(walkDir.multiplyScalar(0.4)); // Move physical speed
      
      // Reach portal depth
      if (camera.position.distanceTo(transitionTarget) < 2) {
        setLanding();
      }
    }
    else if (transitionPhase === "LANDING") {
      // Phase 3: Establish in the new room (Face AWAY from door)
      camera.position.lerp(targetPos.current, 0.1);
      currentLook.current.lerp(targetLook.current, 0.1);
      camera.lookAt(currentLook.current);

      if (camera.position.distanceTo(targetPos.current) < 0.5) {
        finishTransition();
      }
    }
    else {
      // Phase: IDLE - Natural breathing
      camera.position.lerp(targetPos.current, 0.04);
      currentLook.current.lerp(targetLook.current, 0.04);
      camera.lookAt(currentLook.current);
      camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return null;
}
