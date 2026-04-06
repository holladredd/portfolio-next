export const projects = [
  {
    id: "dashboard",
    name: "My Dashboard",
    link: "https://github.com/holladredd/dashboards",
    techs: ["ReactJs", "Material UI", "Framer-Motion"],
    desc: "A comprehensive web app providing users a centralized dashboard to manage activities and access features with a modern interface.",
    category: "Web App",
  },
  {
    id: "portfolio1",
    name: "First Portfolio",
    link: "https://github.com/holladredd/dredd",
    techs: ["HTML", "Bootstrap"],
    desc: "A personal portfolio site showcasing skills, projects, and creative work as a developer and designer.",
    viewlink: "https://dredd.netlify.app/",
    category: "Portfolio",
  },
  {
    id: "aivers",
    name: "AIVers",
    link: "https://github.com/holladredd/aivers",
    techs: ["JavaScript", "Bootstrap"],
    desc: "A dedicated platform delivering real-time updates and articles about artificial intelligence for tech lovers and researchers.",
    category: "News Platform",
  },
  {
    id: "diet-preg",
    name: "Diet-Preg",
    link: "https://github.com/holladredd/diet-preg",
    techs: ["HTML", "Bootstrap"],
    desc: "An informative pregnancy diet planner to help expecting mothers follow a healthy eating routine.",
    category: "Health App",
  },
  {
    id: "zaptop",
    name: "ZapTop - Payment Simulator",
    link: "https://github.com/holladredd/zaptop",
    techs: ["React Native", "Expo"],
    desc: "A dummy mobile payment simulation app that mimics real-world transactions and saves user payment logs.",
    category: "Mobile App",
  },
  {
    id: "zapserver",
    name: "ZapServer",
    link: "https://github.com/holladredd/zapserver",
    techs: ["Node.js", "Express", "MongoDB"],
    desc: "The backend service that powers the ZapTop payment simulator. Handles routing, user data, and dummy transaction logic.",
    category: "Backend",
  },
  {
    id: "geek",
    name: "Geek - Book & Skill App",
    link: "https://github.com/holladredd/geek",
    techs: ["React Native", "JavaScript"],
    desc: "A reading and training app for users to grow their knowledge through books and skill-building content.",
    category: "Mobile App",
  },
  {
    id: "geekserver",
    name: "GeekServer",
    link: "https://github.com/holladredd/geekserver",
    techs: ["Node.js", "Express", "MongoDB"],
    desc: "Backend service for the Geek app, managing users, books, progress tracking, and skill suggestions.",
    category: "Backend",
  },
  {
    id: "nacos",
    name: "NACOS - Student Payment App",
    link: "https://github.com/holladredd/nacos",
    techs: ["React Native", "Expo"],
    desc: "A mobile app built for the National Association of Computer Science Students (NACOSS) to manage member payments, receipts, and records.",
    category: "Mobile App",
  },
  {
    id: "hcmsa",
    name: "HCMSA - Health Care Mobile System App",
    link: "https://github.com/holladredd/hcmsa",
    techs: ["React Native", "Expo"],
    desc: "A mobile healthcare tracking system for pregnant women to monitor their health, appointments, diet, and receive reminders.",
    category: "School Project",
  },
  {
    id: "hcmsaserver",
    name: "HCMSAServer",
    link: "https://github.com/holladredd/hcmsaserver",
    techs: ["Node.js", "Express", "MongoDB"],
    desc: "Backend API for HCMSA app, managing user data, appointments, reminders, and health tips.",
    category: "School Project",
  },
  {
    id: "verv",
    name: "Verv - Truth or Dare Game",
    link: "https://github.com/holladredd/Verv",
    techs: ["React Native", "Expo"],
    desc: "A fun truth or dare mobile game with levels like Beginner, Spicy, and categories like Couples, Groups. Players earn points and penalties.",
    category: "Game App",
  },
  {
    id: "talentta",
    name: "Talentta",
    link: "https://github.com/holladredd/talentta",
    techs: ["React", "Node.js", "AI Integration"],
    desc: "A startup platform connecting talents to recruiters. Features AI that reviews CVs, suggests training, and helps career growth.",
    category: "Contract",
  },
  {
    id: "artizansquare",
    name: "ArtizanSquare",
    link: "https://github.com/holladredd/artizansquare",
    techs: ["React", "Firebase", "Chat"],
    desc: "A startup project that connects artisans to customers with a messaging system and job request features.",
    category: "Startup",
  },
];

export const navigationData = {
  home: {
    title: "Quantum Core",
    subtitle: "Central Processing Hub",
    narration: {
      jump: "Returning to Quantum Core. Recalibrating spatial coordinates.",
      arrival: "Welcome back, Traveler. The Core is stable. Establish a destination protocol."
    }
  },
  about: {
    title: "The Architect",
    subtitle: "Folayan Olamide (Dredd)",
    narration: {
      jump: "Syncing with The Architect's memory matrix. Establishing life logs.",
      arrival: "Welcome to the Archives. Here you will find Folayan's core protocols and creative blueprints."
    }
  },
  projects: {
    title: "Project Clusters",
    subtitle: "Full-Stack Ecosystems",
    narration: {
      jump: "Scanning Project Shards. Reconstructing interactive universes.",
      arrival: "Clusters stabilized. These nodes contain the core ecosystems built by The Architect."
    }
  },
  skills: {
    title: "Skill Matrix",
    subtitle: "Tech Stack Protocols",
    narration: {
      jump: "Indexing Skill Matrix. Accessing technical proficiency layers.",
      arrival: "Matrix accessible. These are the tools and frameworks used to build the Quantum Realm."
    }
  }
};

// Add project metadata to navigationData for HUD access
projects.forEach(p => {
  navigationData[p.id] = {
    title: p.name,
    subtitle: p.category,
    description: p.desc,
    techs: p.techs,
    link: p.link,
    viewlink: p.viewlink
  };
});
