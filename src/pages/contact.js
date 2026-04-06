import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaFacebook, FaInstagram, FaGithub, FaXTwitter } from "react-icons/fa6";

const links = [
  { id: 1, name: "Facebook", link: "https://web.facebook.com/folayan.olamide.1", icon: <FaFacebook size={24} />, color: "#1877F2" },
  { id: 2, name: "Instagram", link: "https://www.instagram.com/dev_dredd?igsh=NXozcGk5eTFoajZo", icon: <FaInstagram size={24} />, color: "#E4405F" },
  { id: 3, name: "GitHub", link: "https://github.com/holladredd", icon: <FaGithub size={24} />, color: "#181717" },
  { id: 4, name: "Twitter", link: "https://x.com/Holla_Dredd?s=09", icon: <FaXTwitter size={24} />, color: "#1DA1F2" },
];

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
      >
        {/* Left Side: Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-accent font-anta tracking-widest text-sm uppercase mb-4">Availability</h2>
            <h1 className="text-5xl md:text-7xl font-squids mb-6 uppercase">Let&apos;s Connect</h1>
            <p className="text-lg font-anta leading-relaxed text-foreground/70 max-w-lg">
              I&apos;m always open to discussing new projects, creative ideas or 
              opportunities to be part of your vision. Reach out through any 
              of the channels below.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6 glass p-6 rounded-3xl hover:bg-surface-dark transition-all duration-300">
               <div className="bg-accent/10 p-4 rounded-full text-accent"><Mail size={24} /></div>
               <div>
                  <div className="text-[10px] font-anta uppercase opacity-50">Email</div>
                  <a href="mailto:holladred@gmail.com" className="text-xl font-anta hover:text-accent transition-colors">holladred@gmail.com</a>
               </div>
            </div>
            <div className="flex items-center gap-6 glass p-6 rounded-3xl hover:bg-surface-dark transition-all duration-300">
               <div className="bg-accent/10 p-4 rounded-full text-accent"><Phone size={24} /></div>
               <div>
                  <div className="text-[10px] font-anta uppercase opacity-50">Phone</div>
                  <a href="tel:+2348160630642" className="text-xl font-anta hover:text-accent transition-colors">+234 816 063 0642</a>
               </div>
            </div>
            <div className="flex items-center gap-6 glass p-6 rounded-3xl hover:bg-surface-dark transition-all duration-300">
               <div className="bg-accent/10 p-4 rounded-full text-accent"><MapPin size={24} /></div>
               <div>
                  <div className="text-[10px] font-anta uppercase opacity-50">Location</div>
                  <div className="text-xl font-anta">Lagos, Nigeria</div>
               </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-4 rounded-2xl hover:bg-accent hover:text-white transition-all duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Simple Contact Form (UI only for now) */}
        <div className="glass p-8 md:p-12 rounded-[2.5rem] relative">
           <div className="absolute top-0 right-0 p-8 text-accent/20"><Send size={80} /></div>
           <h3 className="text-3xl font-squids mb-8 uppercase">Drop a Message</h3>
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-anta uppercase opacity-50">Full Name</label>
                 <input type="text" className="w-full bg-background/50 border border-glass-border p-4 rounded-2xl focus:outline-none focus:border-accent font-anta transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-anta uppercase opacity-50">Email Address</label>
                 <input type="email" className="w-full bg-background/50 border border-glass-border p-4 rounded-2xl focus:outline-none focus:border-accent font-anta transition-all" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-anta uppercase opacity-50">Message Body</label>
                 <textarea rows="4" className="w-full bg-background/50 border border-glass-border p-4 rounded-2xl focus:outline-none focus:border-accent font-anta transition-all" placeholder="Write your thoughts..."></textarea>
              </div>
              <button className="w-full flex items-center justify-center gap-3 bg-accent text-white px-8 py-5 rounded-2xl font-squids transition-transform hover:scale-[1.02] shadow-xl shadow-accent/20">
                 <span className="text-lg">SEND MESSAGE</span>
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
