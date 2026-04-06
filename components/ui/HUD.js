import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../store/useStore";
import { portfolioData } from "../../data/content";

export default function HUD() {
  const { focusedCluster, focusedNode, resetFocus } = useStore();
  
  const content = portfolioData[focusedCluster] || null;

  return (
    <div className="fixed top-24 right-8 z-40 w-full max-w-sm pointer-events-none">
      <AnimatePresence mode="wait">
        {focusedCluster && content && (
          <motion.div
            key={focusedCluster}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="glass p-8 rounded-3xl shadow-2xl pointer-events-auto border border-glass-border/20 backdrop-blur-xl"
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
              <button 
                onClick={resetFocus}
                className="text-foreground/40 hover:text-accent transition-colors p-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <p className="font-anta text-foreground/70 leading-relaxed italic text-sm">
                "{content.description}"
              </p>

              {content.stats && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-glass-border/10">
                   {content.stats.map((stat, i) => (
                     <div key={i}>
                        <div className="text-xl font-squids text-foreground">{stat.value}</div>
                        <div className="text-[10px] font-anta uppercase opacity-40">{stat.label}</div>
                     </div>
                   ))}
                </div>
              )}

              {content.tech && (
                <div className="flex flex-wrap gap-2 pt-4">
                   {content.tech.map((t, i) => (
                     <span key={i} className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] font-anta text-accent uppercase tracking-tighter">
                        {t}
                     </span>
                   ))}
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-glass-border/10">
               <button className="w-full bg-foreground text-background py-3 rounded-xl font-squids text-xs tracking-widest hover:bg-accent transition-colors">
                  INITIALIZE PROTOCOL
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
