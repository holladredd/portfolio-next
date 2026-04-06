import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { useExperience } from "@/context/ExperienceContext";
import AudioPlayer from "./AudioPlayer";

const QuantumCanvas = dynamic(() => import("./Three/QuantumCanvas"), { ssr: false });

export default function Layout({ children }) {
  const { currentSubtitle, showSubtitles, unlockedNodes } = useExperience();

  return (
    <div className="relative min-h-screen selection:bg-accent/30 text-white overflow-hidden">
      {/* 3D Immersive Universe Background */}
      <QuantumCanvas />

      {/* Global HUD UI Layer */}
      <div className="relative z-10 pointer-events-none">
        <Navbar />
      </div>

      {/* Dredd AI Subtitles HUD */}
      <AnimatePresence>
        {showSubtitles && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] max-w-2xl text-center px-10 py-6 glass rounded-[2.5rem] border-accent/20"
          >
            <div className="text-accent font-squids text-[10px] uppercase tracking-[0.3em] mb-2">DREDD COMMS_ESTABLISHED</div>
            <p className="text-xl font-anta text-foreground leading-relaxed italic">
              "{currentSubtitle}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progression Indicator HUD */}
      <div className="fixed top-32 right-10 z-50 flex flex-col gap-4 pointer-events-none">
          <div className="glass p-6 rounded-[2rem] border-accent/10">
             <div className="text-[10px] font-squids text-accent uppercase tracking-widest mb-4">Discovery Progress</div>
             <div className="flex gap-2">
                {["home", "about", "project", "contact"].map((node) => (
                  <div 
                    key={node} 
                    className={`h-2 w-8 rounded-full transition-all duration-1000 ${
                       unlockedNodes.includes(node) ? "bg-accent shadow-[0_0_10px_#009b4d]" : "bg-white/10"
                    }`}
                  />
                ))}
             </div>
          </div>
      </div>

      {/* Page Content Overlay */}
      <AnimatePresence mode="wait">
        <motion.main
          key={children.key}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 pt-24 min-h-screen pointer-events-auto"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <AudioPlayer />
      
      {/* Cinematic HUD Elements (Data Streaming) */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent shadow-[0_0_20px_rgba(0,155,77,0.5)]" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent shadow-[0_0_20px_rgba(0,155,77,0.5)]" />
        {/* Scrolling "Data stream" lines */}
        <div className="absolute top-0 left-10 w-[1px] h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent flex flex-col gap-10 opacity-30">
            {[...Array(20)].map((_, i) => <div key={i} className="w-1 h-1 bg-accent/50 rounded-full animate-ping" style={{ animationDelay: `${i * 0.5}s` }} />)}
        </div>
      </div>
    </div>
  );
}
