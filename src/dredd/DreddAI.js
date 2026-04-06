import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";
import { navigationData, touchResponses } from "@/data/content";
import VoiceSystem from "./VoiceSystem";

export default function DreddAI() {
  const { mode, focusedCluster, setSubtitles, clearSubtitles, isInteracting, setIsSpeaking, setIsInteracting } = useStore();
  const router = useRouter();

  // 1. Handle Dramatic Touch Interaction
  useEffect(() => {
    if (isInteracting) {
       const dramaticLine = touchResponses[Math.floor(Math.random() * touchResponses.length)];
       setSubtitles(dramaticLine, 10000); // Set high duration, we will clear manually
       setIsSpeaking(true);
       VoiceSystem.speak(dramaticLine, () => {
         setIsSpeaking(false);
         setIsInteracting(false);
         clearSubtitles();
       });
    }
  }, [isInteracting, setSubtitles, setIsSpeaking, setIsInteracting, clearSubtitles]);

  // 2. Handle Tour Guide Briefings on Route Change
  useEffect(() => {
    const handleRouteChange = (url) => {
      const path = url.replace("/", "") || "home";
      const nar = navigationData[path];
      if (nar && nar.narration) {
        setSubtitles(nar.narration.arrival, 10000);
        setIsSpeaking(true);
        VoiceSystem.speak(nar.narration.arrival, () => {
          setIsSpeaking(false);
          clearSubtitles();
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router, setSubtitles, setIsSpeaking, clearSubtitles]);

  // 3. Handle Jump Narration when focusing clusters
  useEffect(() => {
    if (focusedCluster && focusedCluster !== "home") {
       const nar = navigationData[focusedCluster];
       if (nar && nar.narration) {
         setSubtitles(nar.narration.jump, 10000);
         setIsSpeaking(true);
         VoiceSystem.speak(nar.narration.jump, () => {
            setIsSpeaking(false);
            clearSubtitles();
         });
       }
    }
  }, [focusedCluster, setSubtitles, setIsSpeaking, clearSubtitles]);

  return null;
}
