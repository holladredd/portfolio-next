import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/useStore";
import { portfolioData } from "@/data/content";

export default function HUD() {
  const { focusedCluster, resetFocus } = useStore();
  const content = portfolioData[focusedCluster] || null;
  return (
    <div className="fixed top-24 right-8 z-40 w-full max-w-sm pointer-events-auto">
      <AnimatePresence mode="wait">
        {focusedCluster && content && (
          <motion.div
            key={focusedCluster}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="glass p-8 rounded-3xl shadow-2xl border border-glass-border/20 backdrop-blur-xl"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-accent font-squids text-2xl mb-1 uppercase tracking-wider">
                  {content.title || focusedCluster}
                </h3>
                <p className="text-xs font-anta opacity-50 uppercase tracking-widest">
                  {content.subtitle || "Quantum Cluster Data"}
                </p>
              </div>
              <button onClick={resetFocus} className="text-foreground/40 hover:text-accent p-2">✕</button>
            </div>
            <div className="space-y-6 text-white/70">
              <p className="font-anta italic text-sm">&quot;{content.description}&quot;</p>
              {content.stats && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-glass-border/10">
                   {content.stats.map((stat, i) => (
                     <div key={i}>
                        <div className="text-xl font-squids text-white">{stat.value}</div>
                        <div className="text-[10px] font-anta uppercase opacity-40">{stat.label}</div>
                     </div>
                   ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
