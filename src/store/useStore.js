import { create } from "zustand";
import * as THREE from "three";

const useStore = create((set) => ({
  currentRoom: "lobby",
  previousRoom: "lobby",
  isTransitioning: false,
  transitionTarget: new THREE.Vector3(0, 1, 0),
  
  setRoom: (room, doorPos = null) => set((state) => ({ 
    previousRoom: state.currentRoom,
    currentRoom: room,
    isTransitioning: true,
    transitionTarget: doorPos ? new THREE.Vector3(...doorPos) : new THREE.Vector3(0, 1, 0)
  })),
  
  finishTransition: () => set({ isTransitioning: false }),
  
  isHUDVisible: false,
  hudData: null,
  setExhibit: (data) => set({ isHUDVisible: true, hudData: data }),
  closeHUD: () => set({ isHUDVisible: false, hudData: null }),
}));

export default useStore;
