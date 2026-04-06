import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const projects = [
  { id: 1, title: "Fintech App", category: "Mobile App", image: "/img/dredd2.jpg", repo: "#", demo: "#" },
  { id: 2, title: "E-commerce System", category: "Web Application", image: "/img/dredd.png", repo: "#", demo: "#" },
  { id: 3, title: "SaaS Dashboard", category: "UI/UX Design", image: "/img/hd.png", repo: "#", demo: "#" },
];

export default function Project() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-accent font-anta tracking-[0.2em] mb-4 text-sm uppercase">Selected Works</h2>
          <h1 className="text-5xl md:text-7xl font-squids mb-6 uppercase leading-tight">Featured Projects</h1>
          <p className="font-anta text-foreground/60 text-lg">
            A collection of high-performance digital solutions built with technical excellence and design precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -10 }}
              className="glass p-4 rounded-[2.5rem] group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="px-4 pb-4">
                <div className="text-[10px] font-anta uppercase tracking-widest text-accent mb-2">{project.category}</div>
                <h3 className="text-2xl font-squids mb-6 uppercase">{project.title}</h3>
                
                <div className="flex gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-2xl font-squids text-xs uppercase hover:bg-accent transition-colors">
                    <ExternalLink size={16} /> Live
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 glass py-3 rounded-2xl font-squids text-xs uppercase hover:bg-surface-dark transition-colors">
                    <FaGithub size={16} /> Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-12">
            <button className="glass px-10 py-5 rounded-2xl font-squids hover:bg-accent hover:text-white transition-all">
                VIEW ALL PROJECTS ON GITHUB
            </button>
        </div>
      </motion.div>
    </div>
  );
}
