import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import useStore from "@/store/useStore";

const roomCoordinates = {
  lobby: { pos: [0, 2, 12], lookAt: [0, 1, 0] },
  projects: { pos: [-25, 2, 8], lookAt: [-25, 1, -5] },
  graphics: { pos: [-25, 2, -32], lookAt: [-25, 1, -42] },
  skills: { pos: [25, 2, 8], lookAt: [25, 1, -5] },
  about: { pos: [0, 2, -14], lookAt: [0, 1, -26] },
  contact: { pos: [0, 2, 14], lookAt: [0, 1, 30] }
};

export default function CameraController() {
  const { camera } = useThree();
  const { currentRoom, transitionPhase, transitionTarget, customLookTarget, setEntering, setLanding, finishTransition } = useStore();
  
  const targetPos = useRef(new THREE.Vector3(...roomCoordinates.lobby.pos));
  const targetLook = useRef(new THREE.Vector3(...roomCoordinates.lobby.lookAt));
  const currentLook = useRef(new THREE.Vector3(...roomCoordinates.lobby.lookAt));

  useEffect(() => {
    if (roomCoordinates[currentRoom]) {
      targetPos.current.set(...roomCoordinates[currentRoom].pos);
      targetLook.current.set(...roomCoordinates[currentRoom].lookAt);
    }
  }, [currentRoom]);

  // Handle Custom Look Target
  useEffect(() => {
    if (customLookTarget) {
      targetLook.current.set(...customLookTarget);
    }
  }, [customLookTarget]);

  useFrame((state) => {
    const isTransitioning = transitionPhase !== "IDLE";
    const speedMultiplier = 2; // Accelerated transitions

    if (transitionPhase === "FACING") {
      const lookAtDoor = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0));
      currentLook.current.lerp(lookAtDoor, 0.2); // Faster face
      camera.lookAt(currentLook.current);
      
      if (currentLook.current.distanceTo(lookAtDoor) < 0.1) setEntering();
    } 
    else if (transitionPhase === "ENTERING") {
      const walkDir = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0)).sub(camera.position).normalize();
      camera.position.add(walkDir.multiplyScalar(0.8)); // 2X Speed Walk
      
      if (camera.position.distanceTo(transitionTarget) < 1.5) setLanding();
    }
    else if (transitionPhase === "LANDING") {
      camera.position.lerp(targetPos.current, 0.2);
      currentLook.current.lerp(targetLook.current, 0.2); // Faster land
      camera.lookAt(currentLook.current);

      if (camera.position.distanceTo(targetPos.current) < 0.2) finishTransition();
    }
    else {
      // Phase: IDLE - Natural breathing
      const lerpSpeed = 0.08; 
      camera.position.lerp(targetPos.current, lerpSpeed);
      currentLook.current.lerp(targetLook.current, lerpSpeed);
      camera.lookAt(currentLook.current);
      camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return null;
}
