import { create } from "zustand";

const useStore = create((set) => ({
  // Core Experience States
  mode: "intro", // intro | explore
  theme: "dark", // dark | light
  
  // Navigation & Focus
  focusedCluster: null,
  focusedNode: null,
  
  // Discovery & Progression
  visitedClusters: ["home"],
  unlockedClusters: ["home", "about"],
  
  // UI & Narratives
  subtitleText: "",
  showSubtitles: false,

  // Setters
  setMode: (mode) => set({ mode }),
  setTheme: (theme) => set({ theme }),
  setFocusedCluster: (id) => set((state) => {
    const nextVisited = state.visitedClusters.includes(id) 
      ? state.visitedClusters 
      : [...state.visitedClusters, id];
    
    // Unlock Logic (Game Mechanics)
    let nextUnlocked = [...state.unlockedClusters];
    if (id === "about" && !nextUnlocked.includes("projects")) nextUnlocked.push("projects");
    if (id === "projects" && !nextUnlocked.includes("skills")) nextUnlocked.push("skills");

    return { 
      focusedCluster: id, 
      visitedClusters: nextVisited,
      unlockedClusters: nextUnlocked
    };
  }),
  setFocusedNode: (node) => set({ focusedNode: node }),
  setSubtitles: (text, duration = 5000) => {
    set({ subtitleText: text, showSubtitles: true });
    if (duration > 0) {
      setTimeout(() => set({ showSubtitles: false }), duration);
    }
  },
  resetFocus: () => set({ focusedCluster: null, focusedNode: null }),
}));

export default useStore;
