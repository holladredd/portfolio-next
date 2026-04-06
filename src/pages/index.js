import { useEffect } from "react";
import { motion } from "framer-motion";
import useStore from "@/store/useStore";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { mode, setMode } = useStore();
  useEffect(() => {
    const timer = setTimeout(() => { setMode("explore"); }, 10000);
    return () => clearTimeout(timer);
  }, [setMode]);

  return (
    <div className="relative w-full min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: mode === "explore" ? 1 : 0 }} transition={{ duration: 1.5 }}>
          <h2 className="text-accent font-anta tracking-[0.3em] mb-4 text-sm md:text-base uppercase">Digital Experience Architect</h2>
          <h1 className="text-6xl md:text-8xl font-squids leading-tight mb-8">HELLO. <br /> I AM <span className="premium-text text-accent">DREDD</span></h1>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <button onClick={() => setMode("explore")} className="group relative flex items-center justify-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-squids transition-transform hover:scale-105">
              <span>EXPLORE REALM</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </button>
            <Link href="/about" className="glass px-10 py-4 rounded-2xl font-squids transition-transform hover:scale-105">PROTOCOL: ARCHITECT</Link>
          </div>
          <div className="mt-16 opacity-30 font-anta text-xs uppercase tracking-[0.5em] animate-pulse">System Stablized // Interaction Enabled</div>
        </motion.div>
      </div>
      {mode === "intro" && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 8, duration: 2 }} className="fixed inset-0 z-50 bg-black pointer-events-none flex items-center justify-center">
           <div className="w-1/4 h-[1px] bg-accent/20 animate-pulse" />
        </motion.div>
      )}
    </div>
  );
}
