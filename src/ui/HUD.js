import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/useStore";
import { navigationData } from "@/data/content";

export default function HUD() {
  const { focusedCluster, resetFocus } = useStore();
  const content = focusedCluster ? navigationData[focusedCluster] : null;

  return (
    <div className="fixed top-24 right-8 z-40 w-full max-w-sm pointer-events-auto">
      <AnimatePresence mode="wait">
        {content && (
          <motion.div
            key={focusedCluster}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="glass p-8 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
               <button onClick={resetFocus} className="text-white/20 hover:text-white transition-colors">
                  CLOSE
               </button>
            </div>
            <h2 className="text-3xl font-squids mb-2 tracking-tighter text-accent italic uppercase">
              {content.title}
            </h2>
            <p className="text-xs font-anta opacity-40 uppercase tracking-[0.3em] mb-6">
              {content.subtitle}
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-anta opacity-60 uppercase tracking-widest">
                <span>Signal Integrity</span>
                <span className="text-accent">98.4%</span>
              </div>
              <div className="h-[1px] bg-white/5 w-full" />
              <p className="text-sm font-anta leading-relaxed opacity-70">
                {content.description || "Establishing neural link with the selected memory cluster. Data stream stabilized."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
