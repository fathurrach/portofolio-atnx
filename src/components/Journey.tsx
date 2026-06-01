import { Calendar, Briefcase, Award } from "lucide-react";

interface Milestone {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string;
  type: "job" | "award" | "education";
  highlights: string[];
}

const Journey = () => {
  const milestones: Milestone[] = [
    {
      id: 1,
      year: "2024 - Present",
      role: "Creative Frontend Developer",
      company: "Aetherial Labs",
      description:
        "Leading interactive design implementations and crafting high-fidelity marketing experiences utilizing WebGL frameworks, GSAP, and reactive modules.",
      type: "job",
      highlights: [
        "Rebuilt the primary interactive crowd simulation pipeline for brand assets, optimizing render cycles by 40%.",
        "Orchestrated cross-functional UI component systems based on modern TypeScript architectures.",
      ],
    },
    {
      id: 2,
      year: "2022 - 2024",
      role: "Interaction Developer",
      company: "Neom Studio",
      description:
        "Developed custom creative web apps, particle animations, and web-based canvas assets. Designed core animations using CSS Scroll-driven timelines and SVG morphs.",
      type: "job",
      highlights: [
        "Crafted robust micro-interactions for high-traffic financial applications.",
        "Built responsive landing structures featuring glassmorphic animations and clean layout systems.",
      ],
    },
    {
      id: 3,
      year: "2021",
      role: "Best Creative Web Experience",
      company: "CSS Design Awards",
      description:
        "Recognized globally for the immersive spatial showcase site 'Metamorphosis' combining GLSL pixel shader distortions and smooth layouts.",
      type: "award",
      highlights: [
        "Honored with Special Kudos, Best UI Design, and Best Innovation.",
        "Featured on Awwwards as one of the curated creative works of the month.",
      ],
    },
  ];

  return (
    <section
      id="journey"
      className="relative min-h-screen w-full py-28 px-6 bg-transparent overflow-hidden"
    >
      {/* Background radial gradient */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-primary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Section Header */}
        <div className="mb-20 max-w-xl">
          <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
            03 &bull; Milestones
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
            My Creative Path.
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/10 dark:border-white/10 light:border-black/10 ml-4 md:ml-32 pl-8 md:pl-16 space-y-12">
          {milestones.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Chronological year on the left (desktop only) */}
              <div className="hidden md:block absolute -left-[240px] top-1.5 w-44 text-right font-heading font-extrabold text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-brand-primary">
                {item.year}
              </div>

              {/* Dynamic glowing bullet indicator */}
              <span className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full border-2 border-brand-primary bg-[#0a0a0c] dark:bg-[#0a0a0c] light:bg-[#f8fafc] flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] z-25">
                <span className="w-2 h-2 rounded-full bg-brand-primary group-hover:bg-brand-secondary transition-colors duration-300" />
              </span>

              {/* Chronological year (mobile only) */}
              <div className="md:hidden flex items-center gap-1.5 font-mono text-xs tracking-wider text-brand-primary mb-3">
                <Calendar size={12} /> {item.year}
              </div>

              {/* Milestone Card */}
              <div className="rounded-3xl glass-card border border-white/5 p-8 relative">
                
                {/* Type Indicator Tag */}
                <div className="absolute top-8 right-8 text-gray-500 group-hover:text-brand-primary transition-colors duration-300">
                  {item.type === "job" ? (
                    <Briefcase size={18} />
                  ) : (
                    <Award size={18} />
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="font-heading font-extrabold text-xl text-gray-900 dark:text-gray-100 group-hover:text-brand-primary transition-colors duration-300">
                    {item.role}
                  </h3>
                  <div className="font-mono text-xs text-brand-secondary tracking-widest uppercase mt-1">
                    {item.company}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 font-light text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Highlights bullet points */}
                <ul className="space-y-2 border-t border-black/5 dark:border-white/5 pt-6">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
