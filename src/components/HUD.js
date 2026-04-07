import React from "react";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";
/**
 * HUD Component
 * 
 * The 2D visual overlay handling user interface interactions.
 * Replaces the traditional Navbar to maintain 3D immersion, providing a
 * context-aware "RETURN TO HUB" bridge and responsive exhibit data panels.
 */
import { motion, AnimatePresence } from "framer-motion";

export default function HUD() {
  const router = useRouter();
  const { currentRoom, previousRoom, isHUDVisible, hudData, closeHUD, transitionPhase } = useStore();

  const handleReturn = () => {
    if (transitionPhase !== "IDLE") return;
    router.push("/");
  };

  const getButtonLabel = (data) => {
    if (data?.link?.includes("github.com")) return "VIEW REPOSITORY";
    if (data?.link?.includes("wa.me") || data?.link?.includes("facebook.com")) return "INITIATE UPLINK";
    return "ACCESS DIGITAL ASSET";
  };

  const safeCurrentRoom = (currentRoom || "SYNCING").replace("_", " ");
  const safePrevRoom = (previousRoom || "CORE").toUpperCase();

  return (
    <>
      {/* 
        ========================================================================
        SECTION 1: LOCATION TERMINAL & RETURN BRIDGE
        ========================================================================
        Displays the current user location within the 3D museum wing.
        It also handles the dynamic 'RETURN TO HUB' button that appears
        in non-lobby rooms, warping the camera back to origin.
      */}
      <div className="fixed top-6 left-6 z-50 flex items-start gap-4">
        <div className="bg-black/40 backdrop-blur-md border-l-2 border-blue-400 p-3 flex flex-col gap-1 pointer-events-none">
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

        {/* Dynamic Return Button: Only shown if not in lobby */}
        <AnimatePresence>
          {currentRoom !== "lobby" && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={handleReturn}
              className="bg-blue-600 hover:bg-blue-500 text-white font-anta text-[10px] tracking-[0.2em] px-4 py-3 uppercase transition-colors border-l-2 border-white/20"
            >
              RETURN TO HUB
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 
        ========================================================================
        SECTION 2: EXHIBIT INSPECTION PANEL
        ========================================================================
        This sidebar smoothly slides in from the right when the user clicks 
        an interactive 3D exhibit node. It parses the global 'hudData' store
        and renders descriptive text and call-to-action buttons.
      */}
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
