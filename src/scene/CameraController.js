import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import useStore from "@/store/useStore";

const roomCoordinates = {
  lobby: { pos: [0, 2, 12], lookAt: [0, 1, 0] },
  projects: { pos: [-30, 2, 0], lookAt: [-30, 1, -10] },
  graphics: { pos: [-30, 2, -45], lookAt: [-30, 1, -55] },
  skills: { pos: [35, 2, 0], lookAt: [35, 1, -10] },
  about: { pos: [0, 2, -35], lookAt: [0, 1, -45] }, // Adjoined to Lobby North
  contact: { pos: [0, 2, 35], lookAt: [0, 1, 45] }  // Adjoined to Lobby South
};

export default function CameraController() {
  const { camera } = useThree();
  const { currentRoom, transitionPhase, transitionTarget, customLookTarget, setEntering, setLanding, finishTransition } = useStore();
  
  const currentLevelConfig = useMemo(() => roomCoordinates[currentRoom] || roomCoordinates.lobby, [currentRoom]);
  
  const targetPos = useRef(new THREE.Vector3(...currentLevelConfig.pos));
  const targetLook = useRef(new THREE.Vector3(...currentLevelConfig.lookAt));
  const currentLook = useRef(new THREE.Vector3(...currentLevelConfig.lookAt));

  targetPos.current.set(...currentLevelConfig.pos);
  if (customLookTarget) {
    targetLook.current.set(...customLookTarget);
  } else {
    targetLook.current.set(...currentLevelConfig.lookAt);
  }

  useFrame((state) => {
    // TELEPORT Velocity (Percentage based)
    const rotateSpeed = 0.8; 
    const walkSpeed = 0.7;   
    const arrivalSpeed = 0.8; 

    if (transitionPhase === "FACING" && transitionTarget) {
      const lookAtDoor = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0));
      currentLook.current.lerp(lookAtDoor, rotateSpeed); 
      camera.lookAt(currentLook.current);
      
      if (currentLook.current.distanceTo(lookAtDoor) < 0.5) setEntering();
    } 
    else if (transitionPhase === "ENTERING" && transitionTarget) {
      const targetEnterPos = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0));
      camera.position.lerp(targetEnterPos, walkSpeed); 
      
      // Move even deeper to ensure we are inside the adjoined room bounds
      if (camera.position.distanceTo(targetEnterPos) < 2.0) setLanding();
    }
    else if (transitionPhase === "LANDING") {
      camera.position.lerp(targetPos.current, arrivalSpeed);
      currentLook.current.lerp(targetLook.current, arrivalSpeed);
      camera.lookAt(currentLook.current);

      if (camera.position.distanceTo(targetPos.current) < 1.0) finishTransition();
    }
    else {
      camera.position.lerp(targetPos.current, 0.1);
      currentLook.current.lerp(targetLook.current, 0.1);
      camera.lookAt(currentLook.current);
      camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return null;
}
