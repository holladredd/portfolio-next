import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import HUD from "./ui/HUD";
import Subtitles from "./ui/Subtitles";

// Dynamic import for 3D Canvas to prevent SSR issues
const QuantumScene = dynamic(() => import("./scene/QuantumScene"), { ssr: false });

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen selection:bg-accent/30 text-white overflow-hidden bg-black">
      {/* 3D Immersive Universe Background */}
      <QuantumScene />

      {/* Global Navigation HUD */}
      <Navbar />
      
      {/* Narrative & Info HUDs */}
      <HUD />
      <Subtitles />

      {/* Main Content Layer */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 pt-24 min-h-screen pointer-events-auto"
      >
        {children}
      </motion.main>

      {/* Global Vignette/Atmosphere Overlay */}
      <div className="fixed inset-0 pointer-events-none z-20 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
    </div>
  );
}
