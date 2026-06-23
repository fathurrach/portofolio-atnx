import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code,
  Box,
  TerminalSquare,
  Cpu,
  MonitorPlay,
  Database,
  Fingerprint
} from "lucide-react";
import TextReveal from "./ui/text-reveal";

gsap.registerPlugin(ScrollTrigger);

interface ToolkitCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  tools: string[];
}

const toolkitData: ToolkitCategory[] = [
  {
    id: "ai",
    title: "AI & Workflow",
    icon: Cpu,
    description: "The pair-programming copilots and vibe coding assistants.",
    tools: ["Cursor", "Claude", "ChatGPT", "Gemini AI"],
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: MonitorPlay,
    description: "Building responsive, declarative, and high-fidelity UIs.",
    tools: ["SvelteKit", "React", "Vite", "Tailwind CSS", "GSAP", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend & Data",
    icon: Database,
    description: "Structuring logic, securing APIs, and storing state.",
    tools: ["NestJS", "Node.js", "Supabase", "PostgreSQL", "Socket.io"],
  },
  {
    id: "devops",
    title: "Infra & Deployment",
    icon: Box,
    description: "Containerizing apps and managing self-hosted infrastructure.",
    tools: ["Docker", "Coolify", "Nginx", "Vercel", "Linux"],
  },
  {
    id: "languages",
    title: "Core Languages",
    icon: Code,
    description: "The syntaxes I speak daily to talk to machines.",
    tools: ["TypeScript", "JavaScript", "Python", "Bash"],
  },
  {
    id: "network",
    title: "Network & Infra",
    icon: TerminalSquare,
    description: "Managing network infrastructure across multiple sites.",
    tools: ["UniFi Network", "GCP", "AIOps"],
  },
];

const CategoryCard = ({ category }: { category: ToolkitCategory }) => {
  const Icon = category.icon;

  return (
    <div className="relative group rounded-3xl glass-card glow-card p-6 md:p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-slate-700 dark:text-gray-300 group-hover:text-brand-primary group-hover:bg-brand-primary/10 transition-colors duration-300">
            <Icon size={18} />
          </div>
          <h3 className="font-heading font-bold text-lg text-black dark:text-white">
            {category.title}
          </h3>
        </div>
        
        <p className="text-xs md:text-sm text-brand-secondary dark:text-zinc-400 font-light leading-relaxed mb-6">
          {category.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.tools.map((tool) => (
          <span
            key={tool}
            className="px-2.5 py-1 rounded-md bg-black/[0.03] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 font-mono text-[10px] tracking-wider text-brand-accent dark:text-zinc-400 uppercase select-none hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};

const MyToolkit = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Header Reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Grid Reveal
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(":scope > div");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="toolkit"
      ref={sectionRef}
      className="relative w-full py-20 md:py-24 px-6 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16 gap-8">
          <div ref={headerRef} className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3 flex items-center gap-2">
              <Fingerprint size={14} /> My Toolkit
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
              <TextReveal text="Tools & Technologies." />
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
          </div>
          
          <div className="max-w-xs text-sm text-brand-secondary dark:text-zinc-400 font-light leading-relaxed md:text-right border-l md:border-l-0 md:border-r border-black/10 dark:border-white/10 pl-4 md:pl-0 md:pr-4">
            A curated stack focused on performance, rapid iteration, and developer experience.
          </div>
        </div>

        {/* Toolkit Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {toolkitData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyToolkit;
