import { useEffect, useRef } from "react";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./ui/text-reveal";
import StackingCards, { type StackCard } from "./ui/stacking-cards";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: "Creative" | "Apps" | "UI/UX";
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl?: string;
}

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  const projects: Project[] = [
    {
      id: 1,
      title: "LAPOR FM",
      category: "Apps",
      description:
        "A full-stack facility management platform with real-time incident reporting, room booking, and admin oversight.",
      tags: ["NestJS", "SvelteKit", "Supabase", "Socket.io"],
      image: "/images/portfolio/laporfm.webp",
      demoUrl: "https://laporfm.web.id",
    },
    {
      id: 2,
      title: "JelajahBersama",
      category: "Apps",
      description:
        "An AI-powered travel app with Gemini fallback chains and real-time trip planning.",
      tags: ["SvelteKit", "NestJS", "Gemini AI"],
      image: "/images/portfolio/jelajahbersama.png",
      demoUrl: "https://jelajahbersama.atnx.my.id",
    },
  ];

  // Build stack cards from projects
  const stackCards: StackCard[] = projects.map((project, idx) => ({
    id: project.id,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-12 w-full h-full bg-slate-900/90 dark:bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden">
        {/* Left Column: Details */}
        <div className="order-2 md:order-1 col-span-1 md:col-span-5 flex flex-col justify-between p-4 sm:p-5 md:p-8 h-[260px] md:h-full bg-slate-900/90 dark:bg-black/60 backdrop-blur-xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="font-heading font-extrabold text-xl text-white/20 select-none">
              0{idx + 1}
            </span>
            <span className="font-mono text-[10px] md:text-xs tracking-widest text-brand-primary py-1 px-3 rounded-full bg-brand-primary/10 border border-brand-primary/20 uppercase font-semibold">
              {project.category}
            </span>
          </div>

          {/* Details */}
          <div className="flex-grow flex flex-col justify-center">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2 leading-tight flex items-center gap-3">
              {project.title}
              <FolderGit2 className="text-white/25 flex-shrink-0 animate-pulse" size={20} />
            </h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 max-w-md">
              {project.description}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="py-0.5 px-2.5 rounded-lg border border-white/5 bg-white/5 font-mono text-[9px] sm:text-[10px] text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-brand-primary font-mono text-xs tracking-widest uppercase hover:text-white transition-colors font-bold group/link"
            >
              Live Demo{" "}
              <ArrowUpRight
                size={14}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
              />
            </a>
            {project.githubUrl && (
              <>
                <span className="text-white/10">|</span>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors"
                >
                  Github
                </a>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Project Showcase Image */}
        <div className="order-1 md:order-2 col-span-1 md:col-span-7 relative h-[180px] md:h-full overflow-hidden bg-slate-950/20 border-b md:border-b-0 md:border-l border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
            loading="lazy"
          />
        </div>
      </div>
    ),
  }));

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full pt-28 pb-12 px-6 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div ref={headerRef} className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
              Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
              <TextReveal text="Selected Creations." />
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
          </div>
        </div>
      </div>

      {/* Stacking Cards */}
      <StackingCards
        cards={stackCards}
        cardHeight={520}
        scrollPerCard={400}
      />
    </section>
  );
};

export default Portfolio;
