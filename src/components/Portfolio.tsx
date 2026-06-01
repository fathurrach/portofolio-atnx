import { useState } from "react";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

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
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Creative", "Apps", "UI/UX"];

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
      image: "/images/portfolio/jelajahbersama.webp",
      demoUrl: "https://jelajahbersama.atnx.my.id",
    },
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="relative min-h-screen w-full py-28 px-6 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
              02 &bull; Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
              Selected Creations.
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2.5 p-1 rounded-2xl glass-panel self-start md:self-auto border border-black/10 dark:border-white/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2 px-6 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 interactive ${
                  activeCategory === cat
                    ? "bg-brand-primary text-white dark:text-[#0a0a0c] shadow-md font-medium"
                    : "text-slate-700 dark:text-gray-400 hover:text-black dark:hover:text-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group rounded-3xl glass-card border border-black/10 dark:border-white/5 overflow-hidden flex flex-col justify-between"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden aspect-video">
                {/* Overlay index */}
                <div className="absolute top-6 left-6 z-25 font-heading font-extrabold text-lg text-white/50 py-1.5 px-3 rounded-xl bg-black/40 backdrop-blur-md">
                  0{idx + 1}
                </div>
                {/* Category label */}
                <div className="absolute top-6 right-6 z-25 font-mono text-xs tracking-wider text-brand-secondary py-1.5 px-3.5 rounded-xl bg-brand-secondary/15 backdrop-blur-md border border-brand-secondary/20 uppercase font-medium">
                  {project.category}
                </div>
                {/* Image element with zoom */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-90" />
              </div>

              {/* Project info */}
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-black dark:text-white group-hover:text-brand-primary transition-colors duration-300 mb-4 flex items-center justify-between">
                    {project.title}
                    <FolderGit2 className="opacity-30 group-hover:opacity-75 group-hover:text-brand-primary transition-all duration-300" size={20} />
                  </h3>
                  <p className="text-slate-700 dark:text-gray-400 font-normal text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="py-1 px-2.5 rounded-lg border border-black/10 dark:border-white/5 bg-black/5 dark:bg-white/5 font-mono text-[10px] text-slate-700 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
 
                  {/* Actions */}
                  <div className="flex items-center gap-4 border-t border-black/10 dark:border-white/5 pt-6">
                    <a
                      href={project.demoUrl}
                      className="flex items-center gap-2 text-brand-primary font-mono text-xs tracking-widest uppercase hover:underline interactive font-bold"
                    >
                      Live Demo <ArrowUpRight size={14} />
                    </a>
                    {project.githubUrl && (
                      <>
                        <span className="text-black/10 dark:text-white/10">|</span>
                        <a
                          href={project.githubUrl}
                          className="text-slate-700 dark:text-gray-400 hover:text-brand-primary font-mono text-xs tracking-widest uppercase interactive"
                        >
                          Github
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
