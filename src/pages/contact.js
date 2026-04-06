import { motion } from "framer-motion";
import useStore from "@/store/useStore";
import { useEffect } from "react";

export default function Contact() {
  const { setFocusedCluster } = useStore();
  useEffect(() => { setFocusedCluster("skills"); }, [setFocusedCluster]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 relative z-10 text-center">
       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl font-squids mb-8 tracking-tighter">ESTABLISH PROTOCOL</h1>
          <p className="font-anta text-xl opacity-60 mb-12 uppercase tracking-widest leading-relaxed italic">Synchronize with the Architect matrix.</p>
          <div className="flex justify-center gap-8">
             <a href="mailto:contact@dredd.ai" className="glass px-12 py-5 rounded-2xl font-squids text-sm hover:bg-accent transition-colors uppercase tracking-widest">Connect Matrix</a>
          </div>
       </motion.div>
    </div>
  );
}
