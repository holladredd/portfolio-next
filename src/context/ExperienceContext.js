import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const ExperienceContext = createContext();

export function ExperienceProvider({ children }) {
  const router = useRouter();
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [unlockedNodes, setUnlockedNodes] = useState(["home", "about"]);
  const [dreddState, setDreddState] = useState("curious");
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  // Adaptive AI Logic
  useEffect(() => {
    const path = router.pathname.replace("/", "") || "home";
    
    if (!visitedNodes.includes(path)) {
      setVisitedNodes((prev) => [...prev, path]);
      triggerDreddDialogue(path, "new");
    } else {
      triggerDreddDialogue(path, "revisit");
    }

    // Propagation System (Game Mechanics)
    if (path === "about" && !unlockedNodes.includes("project")) {
       setUnlockedNodes((prev) => [...prev, "project"]);
    }
    if (path === "project" && !unlockedNodes.includes("contact")) {
       setUnlockedNodes((prev) => [...prev, "contact"]);
    }
  }, [router.pathname]);

  const triggerDreddDialogue = (node, type) => {
    const dialogues = {
      home: {
        new: "The universe is expansive. Where shall we begin?",
        revisit: "Back to the center of things. Are you lost?"
      },
      about: {
        new: "Accessing biological identity data... Folayan Olamide. Fascinating.",
        revisit: "Recalling identity logs. You've already processed this data."
      },
      project: {
        new: "Loading high-frequency code clusters. These are Dredd's creations.",
        revisit: "Scanning project archives. Still impressive, yes?"
      },
      contact: {
        new: "Establishing external transmission protocols. Who are we reaching out to?",
        revisit: "Transmission channel still open. Ready to send?"
      }
    };

    const msg = dialogues[node]?.[type] || "Scanning quantum patterns...";
    setCurrentSubtitle(msg);
    setShowSubtitles(true);
    setTimeout(() => setShowSubtitles(false), 5000);
  };

  return (
    <ExperienceContext.Provider
      value={{
        visitedNodes,
        unlockedNodes,
        dreddState,
        setDreddState,
        currentSubtitle,
        showSubtitles,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  return useContext(ExperienceContext);
}
