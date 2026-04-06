import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import useStore from "@/store/useStore";

const roomCoordinates = {
  lobby: { pos: [0, 2, 10], lookAt: [0, 1, 0] },
  projects: { pos: [-30, 2, -25], lookAt: [-30, 1, -30] },
  skills: { pos: [30, 2, -25], lookAt: [30, 1, -30] },
  about: { pos: [0, 2, -45], lookAt: [0, 1, -50] }
};

export default function CameraController() {
  const { camera } = useThree();
  const { currentRoom } = useStore();
  
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
    camera.position.lerp(targetPos.current, 0.04);
    
    currentLook.current.lerp(targetLook.current, 0.04);
    camera.lookAt(currentLook.current);
    
    camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
  });

  return null;
}
