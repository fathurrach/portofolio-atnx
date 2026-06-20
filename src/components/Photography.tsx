import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./ui/text-reveal";
import StylishCarousel, {
  type StylishCarouselItem,
} from "./ui/stylish-carousel";

gsap.registerPlugin(ScrollTrigger);

const Photography = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Photo data — user will drop their images in public/images/photography/
  const photos: StylishCarouselItem[] = [
    {
      src: "/images/photography/photo1.jpg",
      title: "Brutalist Lines",
      alt: "Shadows casting on geometric concrete grids — Jakarta, Indonesia",
    },
    {
      src: "/images/photography/photo2.jpg",
      title: "Rainy Reflections",
      alt: "Neon signs reflecting on wet asphalt after rain — Kebayoran, Jakarta",
    },
    {
      src: "/images/photography/photo3.jpg",
      title: "Silent Canopy",
      alt: "Quiet mist rolling through tall forest tree lines — Bandung, Indonesia",
    },
    {
      src: "/images/photography/photo4.jpg",
      title: "Urban Geometry",
      alt: "Symmetric concrete window layout catching sunset light — Jakarta",
    },
    {
      src: "/images/photography/photo5.jpg",
      title: "Midnight Commute",
      alt: "Stray light trails on a quiet midnight expressway — Sudirman, Jakarta",
    },
    {
      src: "/images/photography/photo6.jpg",
      title: "Minimal Form",
      alt: "Negative space framing a single architectural detail — Kuningan, Jakarta",
    },
  ];

  // ScrollTrigger header animation
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


  return (
    <section
      id="photography"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 px-6 bg-transparent overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-primary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 gap-4">
          <div ref={headerRef} className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
              Photography
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
              <TextReveal text="Frames & Focus." />
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4 mx-auto" />
          </div>
        </div>

        {/* StylishCarousel */}
        <StylishCarousel
          items={photos}
          initialIndex={0}
          slideSize="clamp(200px, 65vmin, 420px)"
          rotationDegrees={24}
          inactiveScale={0.6}
          yOffsetPercent={45}
          springBounce={0.12}
          springDuration={0.8}
          showArrows={true}
          showDots={true}
          clickToNavigate={true}
          autoPlay={4000}
          borderRadius="1.25rem"
          className="py-8"
        />
      </div>
    </section>
  );
};

export default Photography;
