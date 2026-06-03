import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./ui/text-reveal";

gsap.registerPlugin(ScrollTrigger);
import { Camera, MapPin, Calendar, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface Photo {
  id: number;
  src: string;
  title: string;
  category: "Street" | "Architecture" | "Minimal";
  description: string;
  location: string;
  date: string;
}

const Photography = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ["All", "Street", "Architecture", "Minimal"];

  // Placeholder photos structure. User will drop their images in public/images/photography/
  const photos: Photo[] = [
    {
      id: 1,
      src: "/images/photography/photo1.jpg",
      title: "Brutalist Lines",
      category: "Architecture",
      description: "Shadows casting on geometric concrete grids.",
      location: "Jakarta, Indonesia",
      date: "2025"
    },
    {
      id: 2,
      src: "/images/photography/photo2.jpg",
      title: "Rainy Reflections",
      category: "Street",
      description: "Neon signs reflecting on wet asphalt after rain.",
      location: "Kebayoran, Jakarta",
      date: "2025"
    },
    {
      id: 3,
      src: "/images/photography/photo3.jpg",
      title: "Silent Canopy",
      category: "Minimal",
      description: "Quiet mist rolling through tall forest tree lines.",
      location: "Bandung, Indonesia",
      date: "2025"
    },
    {
      id: 4,
      src: "/images/photography/photo4.jpg",
      title: "Urban Geometry",
      category: "Architecture",
      description: "Symmetric concrete window layout catching sunset light.",
      location: "Jakarta, Indonesia",
      date: "2026"
    },
    {
      id: 5,
      src: "/images/photography/photo5.jpg",
      title: "Midnight Commute",
      category: "Street",
      description: "Stray light trails on a quiet midnight expressway.",
      location: "Sudirman, Jakarta",
      date: "2026"
    },
    {
      id: 6,
      src: "/images/photography/photo6.jpg",
      title: "Minimal Form",
      category: "Minimal",
      description: "Negative space framing a single architectural detail.",
      location: "Kuningan, Jakarta",
      date: "2026"
    }
  ];

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  // ScrollTrigger animations for section header and filters
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        const headerEls = headerRef.current.children;
        gsap.fromTo(
          headerEls,
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

      // Filters slide in
      if (filtersRef.current) {
        gsap.fromTo(
          filtersRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: filtersRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate gallery cards on filter change & initial load
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".photo-card");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform",
      }
    );
  }, [activeCategory]);

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handleNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredPhotos.length - 1 ? 0 : prev + 1;
    });
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredPhotos.length - 1 : prev - 1;
    });
  };

  return (
    <section
      id="photography"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 px-6 bg-transparent overflow-hidden"
    >
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-primary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div ref={headerRef} className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
              Photography
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
              <TextReveal text="Frames & Focus." />
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
          </div>

          {/* Filters */}
          <div ref={filtersRef} className="flex flex-wrap gap-2.5 p-1 rounded-2xl glass-panel self-start md:self-auto border border-black/10 dark:border-white/5">
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

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setLightboxIndex(index)}
              className="photo-card group relative rounded-3xl overflow-hidden glass-card border border-black/10 dark:border-white/5 aspect-[4/5] cursor-pointer hover:shadow-xl transition-all duration-500 interactive"
            >
              {/* Photo Image */}
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop";
                }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-mono text-[10px] tracking-wider text-brand-secondary bg-brand-secondary/20 px-2.5 py-1 rounded-full border border-brand-secondary/30 uppercase">
                    {photo.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white mt-3 flex items-center justify-between">
                    {photo.title}
                    <Maximize2 size={16} className="text-white/60" />
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1.5 font-normal line-clamp-2">
                    {photo.description}
                  </p>
                  
                  {/* Meta Details */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-[10px] font-mono text-zinc-400">
                    <div className="flex items-center gap-1">
                      <MapPin size={10} />
                      {photo.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={10} />
                      {photo.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-55"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-55"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-55"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image Container */}
          <div className="max-w-5xl max-h-[75vh] relative flex items-center justify-center">
            <img
              src={filteredPhotos[lightboxIndex].src}
              alt={filteredPhotos[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/15"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop";
              }}
            />
          </div>

          {/* Lightbox Meta Details */}
          <div className="mt-6 text-center max-w-xl px-4">
            <span className="font-mono text-[10px] tracking-wider text-brand-secondary bg-brand-secondary/20 px-3 py-1 rounded-full border border-brand-secondary/30 uppercase">
              {filteredPhotos[lightboxIndex].category}
            </span>
            <h3 className="font-heading font-extrabold text-xl text-white mt-4">
              {filteredPhotos[lightboxIndex].title}
            </h3>
            <p className="text-zinc-400 text-sm mt-2 font-normal">
              {filteredPhotos[lightboxIndex].description}
            </p>
            
            {/* Bottom Meta */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/10 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-brand-secondary" />
                {filteredPhotos[lightboxIndex].location}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-brand-secondary" />
                {filteredPhotos[lightboxIndex].date}
              </div>
              <div className="flex items-center gap-1.5">
                <Camera size={12} className="text-brand-secondary" />
                Shot on Lens
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Photography;
