import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/useStore";

export default function Subtitles() {
  const { subtitleText, showSubtitles } = useStore();
  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-2xl px-6">
      <AnimatePresence>
        {showSubtitles && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass px-8 py-4 rounded-2xl text-center shadow-xl border-t border-glass-border/30"
          >
            <p className="font-anta text-white/80 text-lg leading-relaxed tracking-wide">{subtitleText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
