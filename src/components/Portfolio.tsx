import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
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
  const stackCards: StackCard[] = projects.map((project) => ({
    id: project.id,
    content: (
      <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden group">
        {/* Full Project Image */}
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

        {/* Info Overlay Bottom */}
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex items-end justify-between">
          <div>
            <span className="font-mono text-[10px] md:text-xs tracking-widest text-brand-primary bg-black/40 backdrop-blur-sm py-1 px-3 rounded-full border border-white/10 uppercase font-semibold mb-3 inline-block">
              {project.category}
            </span>
            <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-white mb-2 leading-tight">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="py-0.5 px-2 rounded-md bg-white/10 backdrop-blur-sm font-mono text-[9px] md:text-[10px] text-white/70">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors py-2 px-4 rounded-full font-mono text-xs tracking-widest uppercase font-bold shrink-0 ml-4"
          >
            Live Demo
            <ArrowUpRight size={14} />
          </a>
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
        cardHeight={600}
        scrollPerCard={400}
      />
    </section>
  );
};

export default Portfolio;
