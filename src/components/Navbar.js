import React from "react";
import useStore from "@/store/useStore";

const navItems = [
  { label: "Home", id: "lobby", doorPos: [0, 0, 0] },
  { label: "Projects", id: "projects", doorPos: [-15.8, 0, -5] },
  { label: "Skills", id: "skills", doorPos: [15.8, 0, -5] },
  { label: "About", id: "about", doorPos: [0, 0, -15.8] },
  { label: "Contact", id: "contact", doorPos: [0, 0, 15.8] }
];

export default function Navbar() {
  const { currentRoom, startTransition, transitionPhase } = useStore();
  const isTransitioning = transitionPhase !== "IDLE";

  const handleNavClick = (item) => {
    if (isTransitioning || currentRoom === item.id) return;
    startTransition(item.id, item.doorPos);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 h-24 pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto cursor-pointer" onClick={() => handleNavClick(navItems[0])}>
        <div className="w-10 h-10 border-2 border-blue-400 flex items-center justify-center font-anta text-xl text-white">D</div>
        <span className="text-white font-anta tracking-widest text-lg hidden md:block uppercase">Museum</span>
      </div>
      
      <div className="flex gap-10 pointer-events-auto">
        {navItems.slice(1).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`font-anta uppercase tracking-widest text-xs transition-all ${
              currentRoom === item.id ? "text-blue-400" : "text-white/50 hover:text-white"
            }`}
            disabled={isTransitioning}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
