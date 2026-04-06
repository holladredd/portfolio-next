import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full glass hover:bg-opacity-80 transition-all duration-300 group"
    >
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            y: theme === "dark" ? 0 : 40,
            opacity: theme === "dark" ? 1 : 0,
            scale: theme === "dark" ? 1 : 0.5,
          }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="absolute text-yellow-400"
        >
          <Sun size={24} />
        </motion.div>
        <motion.div
          animate={{
            y: theme === "light" ? 0 : -40,
            opacity: theme === "light" ? 1 : 0,
            scale: theme === "light" ? 1 : 0.5,
          }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="absolute text-blue-400"
        >
          <Moon size={24} />
        </motion.div>
      </div>
    </button>
  );
}
