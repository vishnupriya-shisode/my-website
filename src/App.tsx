import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Cpu, Database, Boxes, Cloud, Sparkles, ArrowDown, PenTool, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import photo from "./assets/photo.jpg";


// Simple Image component to replace ImageWithFallback for local development
const ImageComponent = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img 
    src={src} 
    alt={alt} 
    className={className}
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
      target.style.display = 'flex';
      target.style.alignItems = 'center';
      target.style.justifyContent = 'center';
      // note: innerHTML on <img> won't render text; using background fallback only
    }}
  />
);

// Modern logo component
const Logo = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Vishnupriya monogram logo"
    className="drop-shadow-sm"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#030213" />
        <stop offset="100%" stopColor="#5B5BF2" />
      </linearGradient>
    </defs>
    <rect rx="24" ry="24" x="4" y="4" width="112" height="112" fill="url(#logoGradient)" />
    <path d="M24 28 L48 92 L58 92 L82 28 L70 28 L53 74 L36 28 Z" fill="white" />
    <path d="M72 44c10-8 24-8 24 4 0 7-7 11-16 14-12 4-20 8-20 18 0 14 22 16 36 6" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <g transform="translate(88,20)">
      <path d="M0 0 L10 18 L6 18 L8 26 L4 27 L2 19 L-4 22 Z" fill="white" opacity="0.9"/>
      <circle cx="14" cy="-2" r="2" fill="white" />
    </g>
  </svg>
);

// Function to create favicon from SVG
const createFavicon = () => {
  const svg = `
    <svg width="32" height="32" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#030213" />
          <stop offset="100%" stop-color="#5B5BF2" />
        </linearGradient>
      </defs>
      <rect rx="24" ry="24" x="4" y="4" width="112" height="112" fill="url(#logoGradient)" />
      <path d="M24 28 L48 92 L58 92 L82 28 L70 28 L53 74 L36 28 Z" fill="white" />
      <path d="M72 44c10-8 24-8 24 4 0 7-7 11-16 14-12 4-20 8-20 18 0 14 22 16 36 6" stroke="white" stroke-width="6" fill="none" stroke-linecap="round"/>
      <g transform="translate(88,20)">
        <path d="M0 0 L10 18 L6 18 L8 26 L4 27 L2 19 L-4 22 Z" fill="white" opacity="0.9"/>
        <circle cx="14" cy="-2" r="2" fill="white" />
      </g>
    </svg>
  `;
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  const existingFavicon = document.querySelector('link[rel="icon"]');
  if (existingFavicon) existingFavicon.remove();
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = dataUrl;
  document.head.appendChild(favicon);
  const appleFavicon = document.createElement('link');
  appleFavicon.rel = 'apple-touch-icon';
  appleFavicon.href = dataUrl;
  document.head.appendChild(appleFavicon);
};

export default function Portfolio() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    document.title = "Vishnupriya";
    createFavicon();
  }, []);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) setIsHeaderVisible(true);
      else if (currentScrollY > lastScrollY && currentScrollY > 100) setIsHeaderVisible(false);
      else if (currentScrollY < lastScrollY) setIsHeaderVisible(true);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation Header */}
      <motion.header 
        style={{ backdropFilter: "blur(10px)", backgroundColor: `rgba(255, 255, 255, ${headerOpacity})` }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50"
        initial={{ y: 0 }}
        animate={{ 
          y: isHeaderVisible ? 0 : -100,
          transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo size={32} />
            <nav className="hidden md:flex items-center gap-6">
              <a href="#intro" className="text-muted-foreground hover:text-foreground transition-colors">Intro</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="#contact">Get in touch</a>
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="intro" className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h1 
                  className="text-5xl lg:text-6xl font-medium tracking-tight text-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  hi, i'm vishnupriya.
                </motion.h1>
                <motion.h2 
                  className="text-2xl lg:text-3xl font-medium text-foreground/80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  Sometimes I build stuff.
                </motion.h2>
                <motion.p 
                  className="text-xl text-muted-foreground max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  I'm a recent Computer Science graduate from London with a passion for tech -- from software engineering and automation to security and AI. I'm fascinated by building solutions that make a difference.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="#projects">View Projects</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#contact">Contact Me</a>
                </Button>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/in/vishnupriya-shisode" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:vishnupriyashisode@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="https://medium.com/@vishnupriyashisode" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <PenTool className="h-5 w-5" />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/30 rounded-3xl blur-3xl" />
                <Card className="relative aspect-square rounded-3xl overflow-hidden border-2 shadow-2xl">
                  <CardContent className="p-0 h-full w-full">
                    
                    <ImageComponent 
                      src={photo}
                      alt="Vishnupriya Shisode"
                      className="block max-w-full h-auto object-cover rounded-2xl"
                    />
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-medium mb-4">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              I'm a computer science student passionate about building innovative solutions and exploring the intersection of technology and creativity.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm an aspiring engineer passionate about building solutions at the intersection of AI, automation, and security. With a background in software development and hands-on experience in AI projects through my studies, I'm now deepening my skills in applying AI to real-world challenges. I'm especially interested in creating intelligent, secure systems that make technology more efficient and accessible.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me diving into the latest tech trends. I also play Lawn tennis and I love dancing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {[
                { icon: <Code2 className="h-8 w-8" />, label: "JavaScript", color: "from-yellow-400/20 to-yellow-600/20" },
                { icon: <Cpu className="h-8 w-8" />, label: "Python", color: "from-blue-400/20 to-blue-600/20" },
                { icon: <Boxes className="h-8 w-8" />, label: "React", color: "from-cyan-400/20 to-cyan-600/20" },
                { icon: <Database className="h-8 w-8" />, label: "MongoDB", color: "from-green-400/20 to-green-600/20" },
                { icon: <Cloud className="h-8 w-8" />, label: "AWS", color: "from-orange-400/20 to-orange-600/20" },
                { icon: <Sparkles className="h-8 w-8" />, label: "AI/ML", color: "from-purple-400/20 to-purple-600/20" },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-0 space-y-3">
                      <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {skill.icon}
                      </div>
                      <p className="font-medium text-sm">{skill.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-medium mb-8">Education</h2>
            <Card className="p-6 text-left">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-lg font-medium">University of East London</h3>
                  <span className="text-sm text-muted-foreground">Jan 2023 – June 2025</span>
                </div>
                <p className="text-muted-foreground mb-2">BSc (Hons) Computer Science</p>
                <p className="text-sm text-muted-foreground mb-3">First Class Honours (Distinction) — CGPA: 9.37 / 10</p>
                <div className="text-sm">
                  <span className="font-medium text-foreground">Key Modules: </span>
                  <span className="text-muted-foreground">
                    Data Structures & Algorithms, Computer & Network Security, Software Development, 
                    Web & Mobile Application Development, Advanced Programming, AI & Machine Learning
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-24 px-6 bg-secondary/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-medium mb-4">Experience</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-12">
              {[
                {
                  title: "Junior IT Technician — University of East London (Internship)",
                  time: "Feb 2024 – Apr 2024",
                  desc: "Provided IT technical support and system administration for the Architecture, Computing, and Engineering departments. Managed Windows and Linux environments, maintained network infrastructure, and optimised lab performance through updates, security patches, and hardware support."
                },
                {
                  title: "Hackathon Team — Full-stack app (React/Node/Mongo)",
                  time: "2024",
                  desc: "Built API-driven football data analysis tool with a small team.",
                },
                {
                  title: "SecurityHQ — Diversity of Thought Programme",
                  time: "Dec 2024",
                  desc: "Selected participant exploring cybersecurity operations and SOC workflows.",
                },
                {
                  title: "Receptionist — East London Students' Union",
                  time: "2023 – 2024",
                  desc: "Served as the first point of contact for students and visitors, managing inquiries with professionalism and empathy. Assisted with organizing student events and handling operational tasks, improving communication and time management skills."
                },
                {
                  title: "Barista/Café Assistant — Nook, East London Students' Union",
                  time: "2023",
                  desc: "Selected from over 1000 applicants as part of the café's founding team when it first launched. Learned end-to-end café operations including operating tills, handling payments, and preparing handcrafted coffee while working efficiently under pressure."
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-20"
                >
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0">
                      <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.time}</p>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
<section id="projects" className="py-24 px-6">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl lg:text-4xl font-medium mb-4">Featured Projects</h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        A collection of projects showcasing my skills in full-stack development, AI, and database design.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "DevSecOps CI/CD Automation with GitHub Actions",
          desc: "Created an automated CI/CD pipeline for Python code with linting, validation, and containerization using Docker. Integrated secure coding practices into the GitHub workflow using DevSecOps principles.",
          image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
          tags: ["Python", "GitHub Actions", "Docker", "DevSecOps"],
        },
        {
          title: "Password Strength Checker (AI)",
          desc: "Classifies passwords as weak/medium/strong and suggests improvements using machine learning algorithms.",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
          tags: ["Python", "AI/ML", "Security"],
        },
        {
          title: "UEL Sentiment Dashboard",
          desc: "Qualitative insights on student sentiment using NLP with an interactive analytics dashboard.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
          tags: ["React", "NLP", "Dashboard"],
        },
        {
          title: "Football Data Explorer",
          desc: "Full-stack application with React, Node.js, and MongoDB for interactive match analytics and statistics.",
          image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
          tags: ["React", "Node.js", "MongoDB"],
        },
        {
          title: "Skyview Hotel Oracle DB",
          desc: "Comprehensive database schema and analytics system for a fictional 5-star hotel chain.",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
          tags: ["Oracle", "Database", "Analytics"],
        },
      ].map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="h-full"
        >
          <Card className="group h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer border-2 hover:border-primary/20">
            {/* Image */}
            <div className="aspect-video overflow-hidden">
              <ImageComponent
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <CardContent className="flex flex-col flex-grow p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                {project.desc}
              </p>

              {/* Tags at bottom */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Education Section */}
      {/* Contact teaser (no form) */}
<section id="contact" className="py-8 px-6 bg-secondary/30">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-2xl lg:text-3xl font-medium mb-2">Thanks for scrolling this far.</h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      As I transition from university to industry, I’m eager to join a team where I can contribute to 
      impactful projects and continue learning every day. In the next few years, I see myself growing 
      into a well-rounded engineer, deepening my expertise at the intersection of AI, security, and software development.
    </p>
  </div>
</section>

{/* Contact button */}
<section className="py-10 px-6 bg-secondary/30 flex justify-center">
  <a
    href="mailto:vishnupriyashisode@gmail.com"
    className="intro-contact inline-flex items-center gap-3 px-10 py-6
               rounded-2xl border-2 border-primary/40 text-2xl font-medium text-foreground
               hover:border-primary hover:bg-primary hover:text-primary-foreground
               transition-all duration-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
         className="w-7 h-7" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 
      18c0 1.1.9 2 2 2h16c1.1 0 
      2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
      4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
    Say hi!
  </a>
</section>

      {/* Footer (clean, like your reference) */}
      <footer className="py-8 px-6 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            Built and designed by <span className="font-medium text-foreground">Vishnupriya</span>. All rights reserved © {new Date().getFullYear()}.
          </p>
        </div>
      </footer>
    </main>
  );
}
