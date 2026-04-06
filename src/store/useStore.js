import { create } from "zustand";

const useStore = create((set) => ({
  mode: "intro",
  theme: "dark",
  focusedCluster: null,
  focusedNode: null,
  visitedClusters: ["home"],
  unlockedClusters: ["home", "about"],
  subtitleText: "",
  showSubtitles: false,

  setMode: (mode) => set({ mode }),
  setTheme: (theme) => set({ theme }),
  setFocusedCluster: (id) => set((state) => {
    const nextVisited = state.visitedClusters.includes(id) 
      ? state.visitedClusters 
      : [...state.visitedClusters, id];
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
