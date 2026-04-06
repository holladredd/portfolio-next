import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/useStore";

export default function LabHUD() {
  const { isHUDVisible, hudData, closeHUD } = useStore();

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40 flex items-center justify-center">
      <AnimatePresence>
        {isHUDVisible && hudData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-lg p-8 bg-[#050505]/95 backdrop-blur-md border border-white/10 rounded-xl pointer-events-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-squids tracking-tighter text-white">
                {hudData.name || hudData.title}
              </h2>
              <button 
                onClick={closeHUD}
                className="text-white/40 hover:text-white transition-colors text-xl leading-none"
              >
                ✕
              </button>
            </div>
            
            <p className="text-sm font-anta text-white/70 mb-6 leading-relaxed">
              {hudData.desc || `${hudData.type} Layer Activated`}
            </p>

            {hudData.techs && (
              <div className="flex flex-wrap gap-2 mb-6">
                {hudData.techs.map(t => (
                  <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/50 uppercase tracking-widest font-anta">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-4">
              {hudData.link && (
                <a href={hudData.link} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center bg-white text-black font-anta uppercase tracking-widest text-xs rounded hover:bg-neutral-300 transition-colors">
                  Source Code
                </a>
              )}
              {hudData.viewlink && (
                <a href={hudData.viewlink} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center bg-transparent border border-white/20 text-white font-anta uppercase tracking-widest text-xs rounded hover:bg-white/10 transition-colors">
                  Live View
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
