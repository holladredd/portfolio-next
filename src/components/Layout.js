import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import QuantumCanvas from "./Three/QuantumCanvas";
import AudioPlayer from "./AudioPlayer";

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
    <div className="relative min-h-screen selection:bg-accent/30 text-white">
      {/* 3D Immersive Universe Background */}
      <QuantumCanvas />

      {/* Global HUD UI Layer */}
      <div className="relative z-10 pointer-events-none">
        <Navbar />
      </div>

      {/* Page Content Overlay */}
      <AnimatePresence mode="wait">
        <motion.main
          key={children.key}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 pt-24 min-h-screen pointer-events-auto"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Cinematic HUD Elements (Data Streaming) */}
      <AudioPlayer />
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent shadow-[0_0_20px_rgba(0,155,77,0.5)]" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent shadow-[0_0_20px_rgba(0,155,77,0.5)]" />
        <div className="absolute top-1/2 left-4 h-32 w-[2px] bg-accent/20" />
        <div className="absolute top-1/2 right-4 h-32 w-[2px] bg-accent/20" />
      </div>
    </div>
  );
}
