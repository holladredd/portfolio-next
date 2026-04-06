import { motion } from "framer-motion";
import useStore from "@/store/useStore";
import { useEffect } from "react";

export default function Project() {
  const { setFocusedCluster } = useStore();
  useEffect(() => { setFocusedCluster("projects"); }, [setFocusedCluster]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 relative z-10">
       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl font-squids mb-12 tracking-tighter text-center">CODE CLUSTERS</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass p-8 rounded-3xl border border-white/10 hover:border-accent group transition-all">
                <h3 className="text-2xl font-squids mb-4 text-accent uppercase tracking-wider">Quantum Realm</h3>
                <p className="text-sm font-anta opacity-70 leading-relaxed italic">A next-gen immersive 3D portfolio experience.</p>
                <div className="mt-8 pt-6 border-t border-white/5 flex gap-3 flex-wrap">
                   <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-anta opacity-40 uppercase">R3F</span>
                   <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-anta opacity-40 uppercase">Zustand</span>
                </div>
             </div>
          </div>
       </motion.div>
    </div>
  );
}
