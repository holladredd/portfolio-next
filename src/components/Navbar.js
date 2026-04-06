import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Mail } from "lucide-react";
import ThemeToggle from "@/ui/ThemeToggle";

const navItems = [
  { id: 1, text: "Home", link: "/", icon: <Home size={20} /> },
  { id: 2, text: "About", link: "/about", icon: <User size={20} /> },
  { id: 3, text: "Project", link: "/project", icon: <Briefcase size={20} /> },
  { id: 4, text: "Contact", link: "/contact", icon: <Mail size={20} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { mode } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {mode === "explore" && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6"
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent transition-transform group-hover:scale-110">
                <img src="/img/hd.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-squids text-2xl tracking-tighter text-white">
                DREDD
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8 glass rounded-full px-8 py-2">
              {navItems.map((item) => (
                <Link key={item.id} href={item.link} className="flex items-center gap-2 text-sm font-anta uppercase tracking-widest hover:text-accent transition-colors">
                  {item.text}
                </Link>
              ))}
              <div className="h-4 w-[1px] bg-white/20" />
              <ThemeToggle />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
