import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./ui/text-reveal";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const statsData: StatItem[] = [
  {
    id: 1,
    value: 6,
    suffix: "+",
    label: "Years in IT & Support",
    sublabel: "Managing systems & infrastructure",
  },
  {
    id: 2,
    value: 12,
    suffix: "+",
    label: "Projects Shipped",
    sublabel: "From web apps to automation tools",
  },
  {
    id: 3,
    value: 50,
    suffix: "+",
    label: "Network Devices Managed",
    sublabel: "UniFi APs, switches, and gateways",
  },
  {
    id: 4,
    value: 1000,
    suffix: "+",
    label: "Git Commits",
    sublabel: "Continuous building & shipping",
  },
];

const StatCard = ({ stat }: { stat: StatItem }) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { textContent: "0" },
        {
          textContent: String(stat.value),
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [stat.value]);

  return (
    <div className="relative group rounded-3xl glass-card glow-card p-6 md:p-8 flex flex-col justify-between min-h-[160px] text-left">
      <div>
        {/* Value with Animating Counter */}
        <div className="text-4xl md:text-5xl font-heading font-extrabold text-black dark:text-white flex items-baseline tracking-tight">
          <span ref={countRef}>0</span>
          <span className="text-brand-accent dark:text-zinc-500 font-sans ml-0.5 select-none">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <h4 className="font-mono text-xs tracking-wider uppercase font-bold text-slate-800 dark:text-gray-200 mt-4 mb-2">
          {stat.label}
        </h4>
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm text-brand-secondary dark:text-zinc-400 font-light leading-relaxed">
        {stat.sublabel}
      </p>
    </div>
  );
};

const StatsCounter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Header scroll reveal
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

  // Grid items reveal
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
      id="stats"
      ref={sectionRef}
      className="relative w-full py-20 md:py-24 px-6 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-14 md:mb-16 max-w-xl">
          <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
            Milestones
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
            <TextReveal text="By the Numbers." />
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
        </div>

        {/* Stats Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {statsData.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Dynamic Grounding tagline */}
        <p className="mt-12 text-center font-mono text-[11px] tracking-widest uppercase text-slate-400 dark:text-zinc-500">
          * continuously learning, building, and automating workflows.
        </p>
      </div>
    </section>
  );
};

export default StatsCounter;
