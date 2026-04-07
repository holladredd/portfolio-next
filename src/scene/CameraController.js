import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import * as THREE from "three";
import useStore from "@/store/useStore";

const roomCoordinates = {
  lobby: { pos: [0, 2, 12], lookAt: [0, 1, 0] },
  projects: { pos: [-30, 2, 0], lookAt: [-30, 1, -10] },
  graphics: { pos: [-30, 2, -35], lookAt: [-30, 1, -45] },
  skills: { pos: [35, 2, 0], lookAt: [35, 1, -10] },
  about: { pos: [0, 2, -35], lookAt: [0, 1, -45] },
  contact: { pos: [0, 2, 35], lookAt: [0, 1, 45] }
};

const pathToRoom = {
  "/": "lobby",
  "/projects": "projects",
  "/skills": "skills",
  "/about": "about",
  "/contact": "contact",
  "/graphics": "graphics"
};

export default function CameraController() {
  const { camera } = useThree();
  const router = useRouter();
  const { 
    currentRoom, 
    transitionPhase, 
    transitionTarget, 
    customLookTarget, 
    setCurrentRoomDirectly,
    setEntering, 
    setLanding, 
    finishTransition 
  } = useStore();
  
  // URL to 3D State Sync
  useEffect(() => {
    const targetRoom = pathToRoom[router.pathname] || "lobby";
    if (targetRoom !== currentRoom && transitionPhase === "IDLE") {
      setCurrentRoomDirectly(targetRoom);
    }
  }, [router.pathname, currentRoom, transitionPhase, setCurrentRoomDirectly]);

  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3());

  useFrame((state) => {
    // KINETIC VELOCITY constants (Super Fast)
    const rotateSpeed = 0.8; 
    const walkSpeed = 0.7;   
    const arrivalSpeed = 0.8; 

    // INSTANT-SYNC: Get current room config directly from store/map in each frame
    const config = roomCoordinates[currentRoom] || roomCoordinates.lobby;
    targetPos.current.set(...config.pos);
    
    if (customLookTarget) {
      targetLook.current.set(...customLookTarget);
    } else {
      targetLook.current.set(...config.lookAt);
    }

    if (transitionPhase === "FACING" && transitionTarget) {
      const lookAtDoor = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0));
      currentLook.current.lerp(lookAtDoor, rotateSpeed); 
      camera.lookAt(currentLook.current);
      if (currentLook.current.distanceTo(lookAtDoor) < 0.5) setEntering();
    } 
    else if (transitionPhase === "ENTERING" && transitionTarget) {
      const targetEnterPos = transitionTarget.clone().add(new THREE.Vector3(0, 1, 0));
      camera.position.lerp(targetEnterPos, walkSpeed); 
      
      if (camera.position.distanceTo(targetEnterPos) < 2.5) {
        // Find path for nextRoom from store (not yet currentRoom until setLanding)
        const nextRoom = useStore.getState().nextRoom;
        const newPath = Object.keys(pathToRoom).find(k => pathToRoom[k] === nextRoom);
        if (newPath) router.push(newPath, undefined, { shallow: true });
        setLanding();
      }
    }
    else if (transitionPhase === "LANDING") {
      // Because we fetch config every frame, targetPos is already correct for the new room
      camera.position.lerp(targetPos.current, arrivalSpeed);
      currentLook.current.lerp(targetLook.current, arrivalSpeed);
      camera.lookAt(currentLook.current);
      if (camera.position.distanceTo(targetPos.current) < 1.0) finishTransition();
    }
    else {
      // Phase: IDLE
      camera.position.lerp(targetPos.current, 0.1);
      currentLook.current.lerp(targetLook.current, 0.1);
      camera.lookAt(currentLook.current);
      camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
    }
  });

  return null;
}
