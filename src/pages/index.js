import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaXTwitter, FaInstagram } from "react-icons/fa6";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-full min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background blobs for "Premium" look */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-16">
        {/* Left Side: Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-accent font-anta tracking-[0.2em] mb-4 text-sm md:text-base uppercase">
              Digital Experience Architect
            </h2>
            <h1 className="text-6xl md:text-9xl font-squids leading-none mb-6">
              HELLO. <br />
              I AM <span className="premium-text">DREDD</span>
            </h1>
            <p className="font-anta text-foreground/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Crafting premium full-stack experiences with high precision.
              From sleek web interfaces to robust mobile applications,
              I build digital ecosystems that push the boundaries of design.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <Link
                href="/about"
                className="group relative flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-2xl font-squids overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-accent translate-y-[101%] transition-transform group-hover:translate-y-0" />
                <span className="relative z-10">LEARN MORE</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
              <button className="flex items-center justify-center gap-3 glass px-8 py-4 rounded-2xl font-squids transition-transform hover:scale-105">
                <Download className="w-5 h-5 text-accent" />
                <span>RESUME</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-12 flex items-center justify-center md:justify-start gap-6 text-foreground/40">
              <Link href="#" className="hover:text-accent hover:scale-120 transition-all"><FaGithub size={24} /></Link>
              <Link href="#" className="hover:text-accent hover:scale-120 transition-all"><FaXTwitter size={24} /></Link>
              <Link href="#" className="hover:text-accent hover:scale-120 transition-all"><FaInstagram size={24} /></Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative flex-1 group"
        >
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-[60px] group-hover:bg-accent/40 transition-all duration-700" />
          <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] glass rounded-3xl overflow-hidden shadow-2xl p-4">
            <div className="w-full h-full rounded-2xl overflow-hidden bg-surface-dark relative">
               <img
                src="/img/dredd.png"
                alt="Dredd"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent h-1/2 bottom-0" />
            </div>
          </div>
          {/* Floating elements for "Wow" factor */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-xl hidden lg:block"
          >
             <div className="text-accent font-squids text-4xl">8+</div>
             <div className="text-xs font-anta uppercase opacity-50">Years of Code</div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-xl hidden lg:block"
          >
             <div className="text-secondary-light font-squids text-2xl">Verified</div>
             <div className="text-xs font-anta uppercase opacity-50">Developer</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
