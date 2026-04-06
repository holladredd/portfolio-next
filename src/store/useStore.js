import { create } from "zustand";

const useStore = create((set) => ({
  currentRoom: "lobby",
  previousRoom: null,
  setRoom: (room) => set((state) => ({ 
    previousRoom: state.currentRoom,
    currentRoom: room 
  })),
  
  isHUDVisible: false,
  hudData: null,
  setExhibit: (data) => set({ isHUDVisible: true, hudData: data }),
  closeHUD: () => set({ isHUDVisible: false, hudData: null }),
}));

export default useStore;
