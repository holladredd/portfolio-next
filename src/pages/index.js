import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/useStore";
import Layout from "@/components/Layout";

export default function Home() {
  const { mode, setMode, setSubtitles, showSubtitles, subtitleText } = useStore();

  useEffect(() => {
    // Starting Point of the Travel Journey
    setMode("intro");
    
    const sequence = async () => {
      setSubtitles("INITIALIZING QUANTUM CORE...", 2000);
      await new Promise(r => setTimeout(r, 2500));
      
      setSubtitles("SYNCING DREDD AI PROTOCOLS...", 2000);
      await new Promise(r => setTimeout(r, 2500));
      
      setSubtitles("YOU ARE AWAKE. WELCOME TO THE REALM.", 4000);
      await new Promise(r => setTimeout(r, 4500));
      
      setMode("explore");
      setSubtitles("SYSTEM STABILIZED. BEGIN NAVIGATION.", 3000);
    };

    sequence();
  }, [setMode, setSubtitles]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <AnimatePresence mode="wait">
          {mode === "intro" && (
            <motion.div
              key="intro-ui"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <h1 className="text-8xl md:text-9xl font-squids tracking-tighter text-white/10 select-none">
                AWAKENING
              </h1>
              <div className="flex gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [1, 2, 1], opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-8 bg-accent"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {mode === "explore" && (
            <motion.div
              key="explore-ui"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <h1 className="text-6xl md:text-7xl font-squids mb-6 tracking-tighter">
                DREDD <span className="text-accent">AI</span>
              </h1>
              <p className="text-lg font-anta opacity-60 leading-relaxed uppercase tracking-widest italic">
                Digital Architect & Immersive Engineer
              </p>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-[1px] bg-white/10 my-8"
              />
              <p className="text-xs font-anta opacity-40 uppercase tracking-[0.3em]">
                Interact with the clusters to navigate the matrix
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
