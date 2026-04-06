import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";

const ExperienceContext = createContext();

export function ExperienceProvider({ children }) {
  const router = useRouter();
  
  // Progression & Memory state
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [unlockedNodes, setUnlockedNodes] = useState(["home", "about"]);
  const [discoveryPoints, setDiscoveryPoints] = useState(0);
  
  // Dredd personality & state
  const [dreddState, setDreddState] = useState("curious");
  const [personalityVector, setPersonalityVector] = useState({ curiosity: 0.5, stability: 0.8 });
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");
  
  // Timings & History
  const interactionHistory = useRef([]);
  const idleTimer = useRef(null);

  const triggerDreddDialogue = useCallback((node, type, context = {}) => {
    const dialogues = {
      home: {
        new: "The universe is expansive. Where shall we begin?",
        revisit: "Back to the center of things. Are you lost?",
        glitch: "H-O-M-E... Protocol corrupted. Resetting coordinates."
      },
      about: {
        new: "Accessing biological identity data... Folayan Olamide. Fascinating.",
        revisit: "Recalling identity logs. You've already processed this data.",
        milestone: "Identity verified. You are indeed the Architect."
      },
      project: {
        new: "Loading high-frequency code clusters. These are Dredd's creations.",
        revisit: "Scanning project archives. Still impressive, yes?",
        unlocked: "Code clusters stabilized. Exploration permitted."
      },
      contact: {
        new: "Establishing external transmission protocols. Who are we reaching out to?",
        revisit: "Transmission channel still open. Ready to send?",
        defensive: "Protocol denied. Who are you really searching for?"
      }
    };

    const msg = dialogues[node]?.[type] || "Scanning quantum patterns...";
    setCurrentSubtitle(msg);
    setShowSubtitles(true);
    setTimeout(() => setShowSubtitles(false), 5000);
  }, []);

  // Update personality based on movement
  const updatePersonality = useCallback((delta) => {
     setPersonalityVector(prev => ({
        curiosity: Math.min(1, Math.max(0, prev.curiosity + delta.c)),
        stability: Math.min(1, Math.max(0, prev.stability + delta.s))
     }));
  }, []);

  // Adaptive AI Logic
  useEffect(() => {
    const path = router.pathname.replace("/", "") || "home";
    const timestamp = Date.now();
    
    // Memory banking
    interactionHistory.current.push({ path, timestamp });
    
    setVisitedNodes((prev) => {
      if (!prev.includes(path)) {
        triggerDreddDialogue(path, "new");
        setDiscoveryPoints(d => d + 10);
        return [...prev, path];
      } else {
        const revisitCount = prev.filter(p => p === path).length;
        triggerDreddDialogue(path, revisitCount > 3 ? "glitch" : "revisit");
        return prev;
      }
    });

    // Progression System (Locked Clusters)
    setUnlockedNodes((prev) => {
      let next = [...prev];
      if (path === "about" && !prev.includes("project")) {
         next.push("project");
         triggerDreddDialogue("project", "unlocked");
      }
      if (path === "project" && !prev.includes("contact")) {
         next.push("contact");
         triggerDreddDialogue("contact", "new");
      }
      return next;
    });

    // Reset idle timer
    if (idleTimer.current) clearTimeout(idleTimer.current);
    setDreddState("curious");
    
    idleTimer.current = setTimeout(() => {
       setDreddState("guide");
       setCurrentSubtitle("Are you lost in the deep space?");
       setShowSubtitles(true);
       setTimeout(() => setShowSubtitles(false), 3000);
    }, 15000);

  }, [router.pathname, triggerDreddDialogue]);

  return (
    <ExperienceContext.Provider
      value={{
        visitedNodes,
        unlockedNodes,
        discoveryPoints,
        dreddState,
        setDreddState,
        personalityVector,
        updatePersonality,
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
