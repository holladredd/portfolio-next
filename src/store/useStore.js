import { create } from "zustand";
import * as THREE from "three";

const useStore = create((set) => ({
  currentRoom: "lobby",
  previousRoom: "lobby",
  nextRoom: null,
  transitionPhase: "IDLE", // IDLE | FACING | ENTERING | LANDING
  transitionTarget: new THREE.Vector3(0, 1, 0),
  
  startTransition: (room, doorPos) => set((state) => ({ 
    previousRoom: state.currentRoom,
    nextRoom: room,
    transitionPhase: "FACING",
    transitionTarget: new THREE.Vector3(...doorPos)
  })),
  
  setEntering: () => set({ transitionPhase: "ENTERING" }),
  
  setLanding: () => set((state) => ({
    currentRoom: state.nextRoom,
    nextRoom: null,
    transitionPhase: "LANDING"
  })),
  
  finishTransition: () => set({ transitionPhase: "IDLE" }),
  
  isHUDVisible: false,
  hudData: null,
  setExhibit: (data) => set({ isHUDVisible: true, hudData: data }),
  closeHUD: () => set({ isHUDVisible: false, hudData: null }),
}));

export default useStore;
