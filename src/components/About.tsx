import { useEffect, useRef } from "react";
import { Code2, Compass, Layers, Zap } from "lucide-react";

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
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const skills = [
    { name: "React / Next.js", category: "frontend" },
    { name: "TypeScript", category: "language" },
    { name: "GSAP Animation", category: "creative" },
    { name: "Tailwind CSS v4", category: "styling" },
    { name: "HTML5 / Canvas", category: "creative" },
    { name: "Node.js", category: "backend" },
    { name: "REST / GraphQL", category: "backend" },
    { name: "Git / CI/CD", category: "tools" },
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
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
            Crafting the interactive web.
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
        </div>

        {/* Bento Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]"
        >
          {/* Main Biography Card */}
          <div className="md:col-span-2 md:row-span-2 rounded-3xl glass-card glow-card p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Compass size={22} />
                </div>
                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-gray-100">
                  Who is ATNX?
                </h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg font-light leading-relaxed mb-6">
                I am a passionate digital designer and developer focused on bringing stunning interface designs to life. I believe that websites should not just be functional tools, but immersive digital realms that invite exploration, drive interaction, and deliver lasting impressions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                By combining highly-optimized Canvas scripts, responsive flex modules, and micro-animated spring components, I bridge the gap between creative visual designs and high-performing production engineering.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-6 border-t border-black/5 dark:border-white/5 pt-6 text-sm font-mono text-gray-600 dark:text-gray-400">
              <div>LOCATION: INDONESIA</div>
              <div>SPECIALTY: CREATIVE FRONTEND</div>
            </div>
          </div>

          {/* Philosophy Card */}
          <div className="rounded-3xl glass-card glow-card p-8 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-secondary/10 text-brand-secondary">
                <Zap size={20} />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-gray-100">
                Philosophy
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-light leading-relaxed">
              Performance is just as important as visual beauty. 60 FPS frame rates, native semantic markups, and structural accessibility are core values integrated into every single line of my codebase.
            </p>
            <span className="text-xs font-mono text-brand-secondary uppercase tracking-widest">
              Pixel Perfect
            </span>
          </div>

          {/* Stats Card */}
          <div className="rounded-3xl glass-card glow-card p-8 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-accent/10 text-brand-accent">
                <Layers size={20} />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-gray-100">
                Credentials
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-heading font-extrabold text-brand-primary">
                  4+
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">
                  YEARS CODING
                </div>
              </div>
              <div>
                <div className="text-3xl font-heading font-extrabold text-brand-secondary">
                  20+
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">
                  PROJECTS DONE
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-brand-accent uppercase tracking-widest">
              Verified Experience
            </span>
          </div>

          {/* Tech Stack Card */}
          <div className="md:col-span-3 rounded-3xl glass-card glow-card p-8 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                <Code2 size={20} />
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-gray-100">
                Core Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="py-2 px-4 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 font-mono text-xs text-gray-700 dark:text-gray-300 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all duration-300 interactive"
                >
                  {skill.name}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-6 font-mono tracking-wide">
              * ALIGNED WITH MODERN ECMASCRIPT STANDARDS AND OPTIMIZED VITE INFRASTRUCTURES.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
