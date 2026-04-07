import React from "react";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";

const navItems = [
  { label: "Home", id: "lobby", doorPos: [0, 0, 0], path: "/" },
  { label: "Projects", id: "projects", doorPos: [-20.2, 0, 0], path: "/projects" },
  { label: "Skills", id: "skills", doorPos: [20.2, 0, 0], path: "/skills" },
  { label: "About", id: "about", doorPos: [0, 0, -20.2], path: "/about" },
  { label: "Contact", id: "contact", doorPos: [0, 0, 20.2], path: "/contact" }
];

export default function Navbar() {
  const router = useRouter();
  const { currentRoom, startTransition, transitionPhase } = useStore();
  const isTransitioning = transitionPhase !== "IDLE";

  const handleNavClick = (item) => {
    if (isTransitioning || currentRoom === item.id) return;
    
    // If we are in the lobby, we can do the cinematic transition
    if (currentRoom === "lobby") {
       startTransition(item.id, item.doorPos);
    } else {
       // If already in a room, just teleport to the next room via URL
       router.push(item.path);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 h-24 pointer-events-none font-anta">
      <div className="flex items-center gap-4 pointer-events-auto cursor-pointer" onClick={() => handleNavClick(navItems[0])}>
        <div className="w-10 h-10 border-2 border-blue-400 flex items-center justify-center text-xl text-white">D</div>
        <span className="text-white tracking-widest text-lg hidden md:block uppercase">Museum</span>
      </div>
      
      <div className="flex gap-10 pointer-events-auto">
        {navItems.slice(1).map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`uppercase tracking-widest text-xs transition-all ${
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
