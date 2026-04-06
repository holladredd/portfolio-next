import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Mail } from "lucide-react";
import ThemeToggle from "./ui/ThemeToggle";

const navItems = [
  { id: 1, text: "Home", link: "/", icon: <Home size={20} /> },
  { id: 2, text: "About", link: "/about", icon: <User size={20} /> },
  { id: 3, text: "Project", link: "/project", icon: <Briefcase size={20} /> },
  { id: 4, text: "Contact", link: "/contact", icon: <Mail size={20} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent transition-transform group-hover:scale-110">
              <img src="/img/hd.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-squids text-2xl tracking-tighter text-foreground">
              DREDD
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 glass rounded-full px-8 py-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="flex items-center gap-2 text-sm font-anta uppercase tracking-widest hover:text-accent transition-colors"
              >
                {item.text}
              </Link>
            ))}
            <div className="h-4 w-[1px] bg-foreground/20" />
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 glass rounded-lg text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden pt-24 px-6 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 glass rounded-2xl text-xl font-anta uppercase tracking-widest"
                >
                  <span className="text-accent">{item.icon}</span>
                  {item.text}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
