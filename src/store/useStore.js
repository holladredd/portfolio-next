import { create } from "zustand";
import * as THREE from "three";

const useStore = create((set) => ({
  currentRoom: "lobby",
  previousRoom: "lobby",
  nextRoom: null,
  transitionPhase: "IDLE", // IDLE | FACING | ENTERING | LANDING
  transitionTarget: new THREE.Vector3(0, 1, 0),
  
  // Custom look target for click-to-focus
  customLookTarget: null,
  setCustomLook: (pos) => set({ customLookTarget: pos }),

  // For initial load or browser back/forward
  setCurrentRoomDirectly: (room) => set({ 
    currentRoom: room, 
    nextRoom: null,
    transitionPhase: "IDLE",
    customLookTarget: null 
  }),

  startTransition: (room, doorPos) => set((state) => ({ 
    previousRoom: state.currentRoom,
    nextRoom: room,
    transitionPhase: "FACING",
    transitionTarget: new THREE.Vector3(...doorPos),
    customLookTarget: null 
  })),
  
  setEntering: () => set({ transitionPhase: "ENTERING" }),
  
  setLanding: () => set((state) => ({
    currentRoom: state.nextRoom,
    nextRoom: null,
    transitionPhase: "LANDING",
    customLookTarget: null
  })),
  
  finishTransition: () => set({ transitionPhase: "IDLE" }),
  
  isHUDVisible: false,
  hudData: null,
  setExhibit: (data) => set({ isHUDVisible: true, hudData: data }),
  closeHUD: () => set({ isHUDVisible: false, hudData: null }),
}));

export default useStore;
