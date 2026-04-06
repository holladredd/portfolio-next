import { motion } from "framer-motion; 
import { Download, ExternalLink, ChevronRight } from "lucide-react; 

export default function About() {
  const skills = [
    "Next.js", "React Native", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Framer Motion", "UI/UX Design"
  ]; 

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-accent/20 rounded-[2rem] blur-3xl group-hover:bg-accent/40 transition-all duration-700" />
          <div className="relative glass p-4 rounded-[2rem]">
            <div className="aspect-square rounded-2xl overflow-hidden bg-surface-dark">
              <img
                src="/img/dredd.png"
                alt="Folayan Olamide Mayokun"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-2xl animate-bounce-slow">
            <div className="text-accent font-squids text-2xl">DREDD</div>
            <div className="text-[10px] font-anta uppercase opacity-50">Identity Verified</div>
          </div>
        </motion.div>

        {/* Right: Content Section */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent font-anta tracking-widest text-sm uppercase mb-4">The Architect</h2>
            <h1 className="text-5xl md:text-7xl font-squids mb-6 uppercase">Folayan Olamide M.</h1>
            <h3 className="text-2xl md:text-3xl font-anta text-foreground/60 mb-8 lowercase tracking-tighter">
              Software Developer & Creative Engineer
            </h3>
            
            <p className="text-lg font-anta leading-relaxed text-foreground/70 mb-8 text-justify">
              Hi, I&apos; m Dredd — a Full-Stack Web & Mobile App Engineer with a passion for building clean, 
              scalable digital experiences. I specialize in the MERN stack and React Native, 
              fusing industrial-grade engineering with modern aesthetics. I don&apos; t just write code;  
              I design digital ecosystems.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {skills.map((skill, index) => (
                <div key={index} className="glass py-3 px-4 rounded-xl text-center text-xs font-anta uppercase tracking-tight hover:bg-accent hover:text-white transition-all cursor-default">
                  {skill}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6">
              <button className="flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-2xl font-squids transition-transform hover:scale-105">
                <Download size={20} />
                <span>DOWNLOAD CV</span>
              </button>
              <button className="flex items-center gap-3 glass px-8 py-4 rounded-2xl font-squids transition-transform hover:scale-105">
                <span>VIEW PROJECTS</span>
                <ChevronRight size={20} className="text-accent" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  ); 
}
