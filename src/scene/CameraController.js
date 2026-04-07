import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import useStore from "@/store/useStore";

const roomCoordinates = {
  lobby: { pos: [0, 2, 12], lookAt: [0, 1, 0] },
  projects: { pos: [-40, 2, 0], lookAt: [-40, 1, -10] },
  graphics: { pos: [-40, 2, -45], lookAt: [-40, 1, -55] },
  skills: { pos: [40, 2, 0], lookAt: [40, 1, -10] },
  about: { pos: [0, 2, -40], lookAt: [0, 1, -50] },
  contact: { pos: [0, 2, 40], lookAt: [0, 1, 50] }
};

export default function CameraController() {
  const { camera } = useThree();
  const { currentRoom, transitionPhase, transitionTarget, customLookTarget, setEntering, setLanding, finishTransition } = useStore();
  
  const targetPos = useRef(new THREE.Vector3(...roomCoordinates.lobby.pos));
  const targetLook = useRef(new THREE.Vector3(...roomCoordinates.lobby.lookAt));
  const currentLook = useRef(new THREE.Vector3(...roomCoordinates.lobby.lookAt));

  useEffect(() => {
    // Safety guard to ensure the room ID is valid before referencing coordinates
    if (currentRoom && roomCoordinates[currentRoom]) {
      targetPos.current.set(...roomCoordinates[currentRoom].pos);
      targetLook.current.set(...roomCoordinates[currentRoom].lookAt);
    }
  }, [currentRoom]);

  useEffect(() => {
    if (customLookTarget) {
      targetLook.current.set(...customLookTarget);
    }
  }, [customLookTarget]);

  useFrame((state) => {
    const isTransitioning = transitionPhase !== "IDLE";
    
    // SUPER FAST Velocity Constants for sub-second journeys
    const rotateSpeed = 0.5; 
    const walkSpeed = 4.0;   
    const arrivalSpeed = 0.5; 

    if (transitionPhase === "FACING" && transitionTarget) {
      const lookAtDoor = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0));
      currentLook.current.lerp(lookAtDoor, rotateSpeed); 
      camera.lookAt(currentLook.current);
      
      if (currentLook.current.distanceTo(lookAtDoor) < 0.1) setEntering();
    } 
    else if (transitionPhase === "ENTERING" && transitionTarget) {
      const walkDir = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0)).sub(camera.position).normalize();
      camera.position.add(walkDir.multiplyScalar(walkSpeed)); 
      
      if (camera.position.distanceTo(transitionTarget) < 1.0) setLanding();
    }
    else if (transitionPhase === "LANDING") {
      camera.position.lerp(targetPos.current, arrivalSpeed);
      currentLook.current.lerp(targetLook.current, arrivalSpeed);
      camera.lookAt(currentLook.current);

      if (camera.position.distanceTo(targetPos.current) < 0.2) finishTransition();
    }
    else {
      // Phase: IDLE - Natural breathing
      const lerpSpeed = 0.1;
      camera.position.lerp(targetPos.current, lerpSpeed);
      currentLook.current.lerp(targetLook.current, lerpSpeed);
      camera.lookAt(currentLook.current);
      camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return null;
}
