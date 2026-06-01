import { useEffect, useRef } from "react";
import { Code2, Compass, Layers, Zap, Camera, Palette, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".glow-card");
    if (!cards) return;

    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Staggered bento cards scroll reveal using GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
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
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  const skills = [
    { name: "Network Engineering", category: "network" },
    { name: "Google Cloud Platform (GCP)", category: "cloud" },
    { name: "Artificial Intelligence (AI)", category: "ai" },
    { name: "AIOps", category: "ops" },
    { name: "Technical Support", category: "support" },
    { name: "Web Development", category: "web" },
    { name: "Front-End Design", category: "design" },
    { name: "Responsive Web Design", category: "design" },
    { name: "Database Development", category: "database" },
    { name: "Vibe Coding", category: "creative" },
  ];

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
      className="relative min-h-screen w-full py-28 px-6 bg-transparent overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Section Header */}
        <div className="mb-16 max-w-xl">
          <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
            01 &bull; Biography
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
            Crafting the interactive web.
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

          {/* Stats Card */}
          <div className="rounded-3xl glass-card glow-card p-6 md:p-8 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-accent/10 text-brand-accent">
                <Layers size={20} />
              </div>
              <h3 className="font-heading font-bold text-lg text-black dark:text-white">
                Credentials
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-heading font-extrabold text-brand-primary">
                  6+
                </div>
                <div className="text-xs text-slate-700 dark:text-gray-400 font-mono mt-1">
                  YEARS WORKED
                </div>
              </div>
              <div>
                <div className="text-3xl font-heading font-extrabold text-brand-secondary">
                  2
                </div>
                <div className="text-xs text-slate-700 dark:text-gray-400 font-mono mt-1">
                  PROJECTS SHIPPED
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-brand-accent uppercase tracking-widest">
              Verified Experience
            </span>
          </div>

          {/* Tech Stack Card */}
          <div className="md:col-span-2 rounded-3xl glass-card glow-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Code2 size={20} />
                </div>
                <h3 className="font-heading font-bold text-lg text-black dark:text-white">
                  Top Skills & Tech
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="py-2 px-4 rounded-xl border border-black/10 dark:border-white/5 bg-black/5 dark:bg-white/5 font-mono text-xs text-slate-700 dark:text-gray-300 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all duration-300 interactive"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-gray-400 mt-6 font-mono tracking-wide uppercase">
              * Aligned with modern industry standards and automated workflow architectures.
            </p>
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
        </div>
      </div>
    </section>
  );
};

export default About;
