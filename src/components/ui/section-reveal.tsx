import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration (seconds) */
  duration?: number;
  /** Y offset to slide from (px) */
  yOffset?: number;
  /** Custom className for the wrapper */
  className?: string;
  /** Enable subtle parallax on scroll */
  parallax?: boolean;
  /** Parallax strength (px offset) */
  parallaxStrength?: number;
}

const SectionReveal = ({
  children,
  delay = 0,
  duration = 1,
  yOffset = 60,
  className = "",
  parallax = false,
  parallaxStrength = 40,
}: SectionRevealProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const ctx = gsap.context(() => {
      // Main reveal animation
      gsap.fromTo(
        content,
        {
          opacity: 0,
          y: yOffset,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Optional parallax effect
      if (parallax) {
        gsap.fromTo(
          content,
          { y: parallaxStrength },
          {
            y: -parallaxStrength,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, [yOffset, duration, delay, parallax, parallaxStrength]);

  return (
    <div ref={wrapperRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef} style={{ willChange: "transform, opacity" }}>
        {children}
      </div>
    </div>
  );
};

export default SectionReveal;
