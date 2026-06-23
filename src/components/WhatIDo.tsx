import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Workflow,
  Palette,
  Server,
  Network,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import TextReveal from "./ui/text-reveal";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  span: "normal" | "wide" | "tall";
}

const services: ServiceCard[] = [
  {
    id: 1,
    icon: Code2,
    title: "Web Development",
    description:
      "I design the vision, AI helps me code it, and I ship it — fast. Full-stack apps built with modern frameworks and vibe coding workflow.",
    tags: ["SvelteKit", "React", "NestJS", "Supabase"],
    span: "wide",
  },
  {
    id: 2,
    icon: Workflow,
    title: "Automation",
    description:
      "If I have to do it twice, I script it. Python bots, bash pipelines, and intelligent integrations that save hours.",
    tags: ["Python", "Bash", "Docker", "CI/CD"],
    span: "normal",
  },
  {
    id: 3,
    icon: Palette,
    title: "Creative Frontend",
    description:
      "Premium interfaces with motion design, glassmorphism, and pixel-level attention. The web should feel alive.",
    tags: ["Tailwind", "GSAP", "Framer Motion", "Vite"],
    span: "normal",
  },
  {
    id: 4,
    icon: Server,
    title: "Self-Hosted Infra",
    description:
      "Running my own servers, containers, and reverse proxies. If it can be self-hosted, I'll find a way.",
    tags: ["Docker", "Coolify", "Nginx", "Vercel"],
    span: "normal",
  },
  {
    id: 5,
    icon: Network,
    title: "Network Engineering",
    description:
      "Managing UniFi infrastructure across 13+ sites. Monitoring, troubleshooting, and keeping connections alive 24/7.",
    tags: ["UniFi", "GCP", "AIOps", "Technical Support"],
    span: "normal",
  },
  {
    id: 6,
    icon: Sparkles,
    title: "Vibe Coding",
    description:
      "Where design meets AI-assisted development. Ambient beats, dark aesthetics, and shipping code that feels right.",
    tags: ["Cursor", "Claude", "ChatGPT", "Gemini"],
    span: "wide",
  },
];

const BentoCard = ({ card }: { card: ServiceCard }) => {
  const Icon = card.icon;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`
        relative group rounded-2xl md:rounded-3xl overflow-hidden
        glass-card glow-card cursor-default
        p-6 md:p-8 flex flex-col justify-between
        ${card.span === "wide" ? "md:col-span-2" : ""}
        ${card.span === "tall" ? "md:row-span-2" : ""}
        min-h-[220px] md:min-h-[260px]
      `}
    >
      {/* Background gradient blob on hover */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-brand-primary/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          <Icon
            size={22}
            className="text-brand-secondary dark:text-zinc-400 group-hover:text-brand-primary dark:group-hover:text-white transition-colors duration-300"
          />
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg md:text-xl tracking-wide text-black dark:text-white mb-3">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-[15px] leading-relaxed text-brand-secondary dark:text-zinc-400 font-light max-w-md">
          {card.description}
        </p>
      </div>

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-2 mt-5">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 font-mono text-[10px] tracking-wider text-brand-accent dark:text-zinc-500 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const WhatIDo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // ScrollTrigger animations for header
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

  // Staggered grid reveal
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
      id="what-i-do"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 px-6 bg-transparent overflow-hidden"
    >
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div ref={headerRef} className="mb-14 md:mb-20 max-w-2xl">
          <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
            <TextReveal text="What I Do." />
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
          <p className="mt-6 text-base md:text-lg text-brand-secondary dark:text-zinc-400 font-light leading-relaxed max-w-xl">
            I design, vibe code, and ship digital experiences that matter.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {services.map((card) => (
            <BentoCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
