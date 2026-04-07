import React from "react";
import useStore from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";

export default function HUD() {
  const { currentRoom, previousRoom, isHUDVisible, hudData, closeHUD } = useStore();

  const getButtonLabel = (data) => {
    if (data?.link?.includes("github.com")) return "VIEW REPOSITORY";
    if (data?.link?.includes("wa.me") || data?.link?.includes("facebook.com")) return "INITIATE UPLINK";
    return "ACCESS DIGITAL ASSET";
  };

  const safeCurrentRoom = (currentRoom || "SYNCING").replace("_", " ");
  const safePrevRoom = (previousRoom || "CORE").toUpperCase();

  return (
    <>
      <div className="fixed top-6 left-6 z-50 pointer-events-none">
        <div className="bg-black/40 backdrop-blur-md border-l-2 border-blue-400 p-3 flex flex-col gap-1">
          <div className="text-[10px] text-blue-400 font-mono tracking-widest uppercase">Location Terminal</div>
          <motion.div 
            key={safeCurrentRoom}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white font-anta text-lg tracking-wider uppercase"
          >
            {safeCurrentRoom}
          </motion.div>
          <div className="text-[10px] text-white/50 font-mono italic">
            PREV_ADDR: [ {safePrevRoom} ]
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isHUDVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-black/90 backdrop-blur-xl border-l border-white/10 z-[100] p-8 flex flex-col justify-center px-10"
          >
            <button onClick={closeHUD} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              [ CLOSE_X ]
            </button>
            <div className="space-y-6">
              <h2 className="text-4xl font-anta text-white uppercase tracking-tighter">{hudData?.name}</h2>
              <div className="h-1 w-20 bg-blue-500" />
              <p className="text-gray-400 leading-relaxed text-lg font-light">
                {hudData?.desc || "Technical specification and architectural overview for this digital asset. All systems operational."}
              </p>
              {hudData?.techs && (
                <div className="flex flex-wrap gap-2">
                  {hudData.techs.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 text-blue-400 text-[10px] font-mono uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {hudData?.link && (
                <a href={hudData.link} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-4 bg-blue-600 text-white font-anta hover:bg-blue-500 transition-all tracking-widest text-sm">
                  {getButtonLabel(hudData)}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
