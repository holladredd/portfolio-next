import { create } from "zustand";

const useStore = create((set) => ({
  currentRoom: "lobby",
  selectedExhibit: null,
  hudData: null,
  isHUDVisible: false,

  setRoom: (room) => set({ currentRoom: room, isHUDVisible: false, selectedExhibit: null }),
  setExhibit: (exhibit) => set({ selectedExhibit: exhibit, hudData: exhibit, isHUDVisible: true }),
  closeHUD: () => set({ isHUDVisible: false, selectedExhibit: null }),
}));

export default useStore;
