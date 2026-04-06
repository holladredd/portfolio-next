import { useEffect, useRef } from "react";
import useStore from "../../store/useStore";
import VoiceSystem from "./VoiceSystem";

const dialogues = {
  intro: [
    "You are awake.",
    "Welcome to the quantum realm."
  ],
  about: "Accessing biological data. Folayan Olamide. The Architect.",
  projects: "Analyzing high-frequency code clusters. These are Dredd's creations.",
  skills: "Scanning cognitive matrices. Multiple protocols fully operational.",
  explore: "The system is stabilized. Where shall we begin?"
};

export default function DreddAI() {
  const { mode, focusedCluster, setSubtitles } = useStore();
  const lastCluster = useRef(null);
  const introTriggered = useRef(false);

  // Intro Sequence
  useEffect(() => {
    if (mode === "intro" && !introTriggered.current) {
      introTriggered.current = true;
      
      const playIntro = async () => {
        setSubtitles(dialogues.intro[0], 3000);
        VoiceSystem.speak(dialogues.intro[0]);
        
        await new Promise(r => setTimeout(r, 4000));
        
        setSubtitles(dialogues.intro[1], 3000);
        VoiceSystem.speak(dialogues.intro[1]);
        
        await new Promise(r => setTimeout(r, 4000));
        
        // Final intro text or state change handled by index.js after 8s
      };
      
      playIntro();
    }
  }, [mode, setSubtitles]);

  // Focused Cluster Dialogue
  useEffect(() => {
    if (focusedCluster && focusedCluster !== lastCluster.current) {
      lastCluster.current = focusedCluster;
      const msg = dialogues[focusedCluster] || `Scanning ${focusedCluster} data...`;
      
      setSubtitles(msg, 5000);
      VoiceSystem.speak(msg);
    }
  }, [focusedCluster, setSubtitles]);

  return null; // Logic only component
}
