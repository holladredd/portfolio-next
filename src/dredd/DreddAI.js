import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";
import { navigationData, touchResponses } from "@/data/content";
import VoiceSystem from "./VoiceSystem";

export default function DreddAI() {
  const { mode, focusedCluster, setSubtitles, isInteracting, setIsSpeaking } = useStore();
  const router = useRouter();
  const lastPath = useRef(router.pathname);

  // 1. Handle Dramatic Touch Interaction
  useEffect(() => {
    if (isInteracting) {
       const dramaticLine = touchResponses[Math.floor(Math.random() * touchResponses.length)];
       setSubtitles(dramaticLine, 4000);
       setIsSpeaking(true);
       VoiceSystem.speak(dramaticLine, () => setIsSpeaking(false));
    }
  }, [isInteracting, setSubtitles, setIsSpeaking]);

  // 2. Handle Tour Guide Briefings on Route Change
  useEffect(() => {
    const handleRouteChange = (url) => {
      const path = url.replace("/", "") || "home";
      const nar = navigationData[path];
      if (nar && nar.narration) {
        setSubtitles(nar.narration.arrival, 5000);
        setIsSpeaking(true);
        VoiceSystem.speak(nar.narration.arrival, () => setIsSpeaking(false));
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router, setSubtitles, setIsSpeaking]);

  // 3. Handle Jump Narration when focusing clusters
  useEffect(() => {
    if (focusedCluster && focusedCluster !== "home") {
       const nar = navigationData[focusedCluster];
       if (nar && nar.narration) {
         setSubtitles(nar.narration.jump, 4000);
         setIsSpeaking(true);
         VoiceSystem.speak(nar.narration.jump, () => setIsSpeaking(false));
       }
    }
  }, [focusedCluster, setSubtitles, setIsSpeaking]);

  return null;
}
