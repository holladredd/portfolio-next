import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import useStore from "@/store/useStore";

const roomCoordinates = {
  lobby: { pos: [0, 2, 10], lookAt: [0, 1, 0] },
  projects: { pos: [-40, 2, -30], lookAt: [-40, 1, -40] },
  graphics: { pos: [-40, 2, -70], lookAt: [-40, 1, -80] },
  skills: { pos: [40, 2, -30], lookAt: [40, 1, -40] },
  about: { pos: [0, 2, -60], lookAt: [0, 1, -70] },
  contact: { pos: [0, 2, 50], lookAt: [0, 1, 60] }
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
    
    // Subtle float
    camera.position.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
  });

  return null;
}
