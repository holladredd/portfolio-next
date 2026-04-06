import { motion } from "framer-motion";
import useStore from "@/store/useStore";
import { useEffect } from "react";

export default function About() {
  const { setFocusedCluster } = useStore();
  useEffect(() => { setFocusedCluster("about"); }, [setFocusedCluster]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-6xl font-squids mb-8 tracking-tighter">THE ARCHITECT</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
             <p className="text-lg font-anta leading-relaxed opacity-80 italic">&quot;Digital Experience Architect specialized in building premium full-stack ecosystems.&quot;</p>
             <p className="text-sm font-anta leading-relaxed opacity-60">Folayan Olamide (Dredd) fuses cinematic 3D design with robust backend protocols to create high-performance interactive universes.</p>
          </div>
          <div className="glass p-8 rounded-3xl border border-white/10">
             <img src="/img/hd.png" alt="Profile" className="w-full h-auto rounded-2xl opacity-80" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
