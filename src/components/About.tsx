import { useEffect, useRef } from "react";
import { Compass, Zap, Camera, Palette, Sparkles } from "lucide-react";
import TypewriterCode from "./TypewriterCode";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./ui/text-reveal";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = cardsRef.current;
    if (!grid) return;

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const cards = grid.querySelectorAll(".glow-card");
        cards.forEach((card) => {
          const rect = (card as HTMLElement).getBoundingClientRect();
          (card as HTMLElement).style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          (card as HTMLElement).style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        });
        rafId = 0;
      });
    };

    grid.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Staggered bento cards scroll reveal using GSAP ScrollTrigger
    const glowCards = grid.querySelectorAll(".glow-card");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowCards,
        {
          opacity: 0,
          y: 60,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, cardsRef);

    return () => {
      grid.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

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

  const passions = [
    {
      icon: <Sparkles size={16} className="text-brand-primary animate-pulse" />,
      title: "Vibe Coding",
      desc: "Code, ambient beats, and aesthetic dark setups.",
    },
    {
      icon: <Palette size={16} className="text-brand-secondary" />,
      title: "Creative Design",
      desc: "Sleek grids, micro-interactions, and motion.",
    },
    {
      icon: <Camera size={16} className="text-brand-accent" />,
      title: "Photography",
      desc: "Capturing light, framing, and visual stories.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 px-6 bg-transparent overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 max-w-xl">
          <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
            Biography
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
            <TextReveal text="Crafting the interactive web." />
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
        </div>

        {/* Bento Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[240px] auto-rows-auto"
        >
          {/* Main Biography Card */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl glass-card glow-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Compass size={22} />
                </div>
                <h3 className="font-heading font-bold text-xl text-black dark:text-white">
                  Who is ATNX?
                </h3>
              </div>
              <p className="text-slate-800 dark:text-gray-300 text-lg font-light leading-relaxed mb-6">
                I'm the person who gets called when the network goes down — and then stays up late building a dashboard to make sure it never happens again.
              </p>
              <p className="text-slate-700 dark:text-gray-400 font-normal leading-relaxed">
                By day, I work in Technical Digital Support, managing network infrastructure across multiple sites using UniFi. But I rarely stop at just "fixing things." I build internal tools, write Python scripts, and automate whatever I can to make the job smarter — not just faster. I believe the best support engineers aren't just troubleshooters. They're builders.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-6 border-t border-black/10 dark:border-t-white/5 pt-6 text-sm font-mono text-slate-700 dark:text-gray-400">
              <div>LOCATION: INDONESIA</div>
              <div>SPECIALTY: NETWORK & TOOLING</div>
            </div>
          </div>

          {/* Philosophy Card */}
          <div className="rounded-3xl glass-card glow-card p-6 md:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-secondary/10 text-brand-secondary">
                <Zap size={20} />
              </div>
              <h3 className="font-heading font-bold text-lg text-black dark:text-white">
                Philosophy
              </h3>
            </div>
            <p className="text-slate-700 dark:text-gray-400 text-sm font-normal leading-relaxed">
              Every project starts with a problem I actually want to solve — and ends with something I'm not embarrassed to ship.
            </p>
            <span className="text-xs font-mono text-brand-secondary uppercase tracking-widest">
              Core Principles
            </span>
          </div>

          {/* Passions Card */}
          <div className="rounded-3xl glass-card glow-card p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-brand-secondary/10 text-brand-secondary">
                <Compass size={20} />
              </div>
              <h3 className="font-heading font-bold text-lg text-black dark:text-white">
                Passions
              </h3>
            </div>
            <div className="space-y-3 mt-2">
              {passions.map((passion, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="mt-0.5 flex-shrink-0">{passion.icon}</div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-black dark:text-white leading-none">
                      {passion.title}
                    </h4>
                    <p className="text-[10px] text-slate-700 dark:text-gray-400 leading-tight mt-1 font-normal">
                      {passion.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typewriter Code Card */}
          <div className="md:col-span-2 rounded-3xl glass-card glow-card overflow-hidden flex flex-col">
            <TypewriterCode />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
