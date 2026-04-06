import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen selection:bg-accent/30">
      {/* Custom Cursor */}
       <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-accent pointer-events-none z-[100] hidden md:block mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 400, mass: 0.5 }}
      />

      <Navbar />
      <main className="pt-24">{children}</main>
    </div>
  );
}
