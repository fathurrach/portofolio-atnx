import { Calendar, Briefcase, Award, GraduationCap } from "lucide-react";

interface Milestone {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string;
  type: "job" | "award" | "education";
  highlights: string[];
  skills?: string[];
}

const Journey = () => {
  const milestones: Milestone[] = [
    {
      id: 1,
      year: "Feb 2020 - Present",
      role: "Digital Technical Support",
      company: "Telkom Indonesia",
      description:
        "Managing and maintaining network infrastructure across multiple sites — from keeping access points online to making sure every connection performs at its best.\n\nDay-to-day, I handle technical support operations, monitor network health across 13+ sites using UniFi infrastructure, and troubleshoot issues before they become outages. But I don't stop at fixing — I build tools to make the work smarter.",
      type: "job",
      highlights: [
        "Manage and optimize UniFi network infrastructure across multiple locations",
        "Built an internal Python dashboard to monitor real-time network status across all sites",
        "Identify and resolve issues like offline APs, elevated TX retry rates, and WAN connectivity drops",
        "Bridge the gap between network engineering and tooling — if the data exists, it should be visible"
      ],
      skills: ["Network Engineering", "Technical Support", "AIOps", "Google Cloud Platform (GCP)", "Artificial Intelligence (AI)"]
    },
    {
      id: 2,
      year: "Jun 2014 - Jun 2017",
      role: "Vocational High School Student",
      company: "SMK Satya Bhakti 1",
      description:
        "Completed vocational education with a focus on computer science and technical systems, gaining hands-on hardware and networking fundamentals.",
      type: "education",
      highlights: [
        "Studied computer systems assembly, peripheral installation, and standard network setups.",
        "Acquired foundational training in operating systems configuration and hardware troubleshooting."
      ],
      skills: ["Computer Systems", "Network Setup", "Hardware Troubleshooting", "Operating Systems"]
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
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
            My Creative Path.
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-black/10 dark:border-l-white/10 ml-4 md:ml-32 pl-8 md:pl-16 space-y-12">
          {milestones.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Chronological year on the left (desktop only) */}
              <div className="hidden md:block absolute -left-[240px] top-1.5 w-44 text-right font-heading font-extrabold text-lg text-slate-700 dark:text-gray-400 transition-colors duration-300 group-hover:text-brand-primary">
                {item.year}
              </div>

              {/* Dynamic glowing bullet indicator */}
              <span className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full border-2 border-brand-primary bg-[#f8fafc] dark:bg-[#0a0a0c] flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(9,9,11,0.2)] dark:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] z-25">
                <span className="w-2 h-2 rounded-full bg-brand-primary group-hover:bg-brand-secondary transition-colors duration-300" />
              </span>

              {/* Chronological year (mobile only) */}
              <div className="md:hidden flex items-center gap-1.5 font-mono text-xs tracking-wider text-brand-primary mb-3">
                <Calendar size={12} /> {item.year}
              </div>

              {/* Milestone Card */}
              <div className="rounded-3xl glass-card border border-black/10 dark:border-white/5 p-8 relative">
                
                {/* Type Indicator Tag */}
                <div className="absolute top-8 right-8 text-gray-500 group-hover:text-brand-primary transition-colors duration-300">
                  {item.type === "job" ? (
                    <Briefcase size={18} />
                  ) : item.type === "education" ? (
                    <GraduationCap size={18} />
                  ) : (
                    <Award size={18} />
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="font-heading font-extrabold text-xl text-black dark:text-white group-hover:text-brand-primary transition-colors duration-300">
                    {item.role}
                  </h3>
                  <div className="font-mono text-xs text-brand-secondary tracking-widest uppercase mt-1">
                    {item.company}
                  </div>
                </div>

                <p className="text-slate-700 dark:text-gray-400 font-normal text-sm leading-relaxed mb-6 whitespace-pre-line">
                  {item.description}
                </p>

                {/* Highlights bullet points */}
                <ul className="space-y-2 border-t border-black/10 dark:border-white/5 pt-6">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-gray-400 font-normal leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills badges */}
                {item.skills && (
                  <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-black/[0.05] dark:bg-white/[0.05] text-slate-800 dark:text-zinc-300 border border-black/5 dark:border-white/5 uppercase tracking-wider"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
