import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import CrowdCanvas from "./CrowdCanvas";
import { BlurInText } from "./ui/blur-in-text";
import { TextType } from "./ui/text-type";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [blurDone, setBlurDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create initial timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animate subtitle and CTA buttons with a stagger offset coordinated with BlurInText
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          duration: 1.2,
          y: 0,
          opacity: 0.7,
          delay: 0.6,
          onComplete: () => setShowTypewriter(true), // Trigger typewriter only after tagline fades in
        }
      );

      tl.fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { duration: 0.8, y: 0, opacity: 1 },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent px-6 pt-20"
    >
      {/* Background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Main Hero Contents */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto -translate-y-8">
        
        <h1 className="relative text-[5.2vw] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold tracking-wider leading-none mb-8 uppercase select-none whitespace-nowrap drop-shadow-[0_2px_10px_rgba(255,255,255,0.05)]">
          <BlurInText
            text="ATNX in your area"
            blurAmount={12}
            duration={1}
            stagger={0.08}
            split="letter"
            trigger="mount"
            className={blurDone ? "shiny-title" : "text-slate-900 dark:text-white"}
            onComplete={() => setBlurDone(true)}
          />
        </h1>

        {/* Dynamic Tagline using TextType */}
        <p
          ref={subtitleRef}
          className="opacity-0 text-base md:text-xl font-mono tracking-wide max-w-2xl text-gray-700 dark:text-gray-300 font-light mb-8 leading-relaxed min-h-[3.5em] sm:min-h-[2.5em] flex items-center justify-center"
        >
          {showTypewriter && (
            <TextType
              text={[
                "Bridging elegant typography and motion design.",
                "Building high-fidelity digital environments.",
                "Crafting premium interactive web experiences.",
                "Pushing the boundaries of creative frontend engineering."
              ]}
              typingSpeed={50}
              deletingSpeed={25}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
            />
          )}
        </p>

        {/* Action Buttons */}
        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#portfolio"
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white dark:text-[#0a0a0c] font-mono text-sm tracking-wider shadow-lg hover:shadow-brand-primary/20 hover:scale-105 transition-all duration-300 interactive font-bold"
          >
            Explore Projects <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 rounded-full border border-black/10 dark:border-white/10 glass-panel hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 interactive font-mono text-sm tracking-wider text-gray-700 dark:text-gray-300"
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* Crowd Walking Canvas Simulator */}
      <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />

      {/* Bottom overlay for fading canvas and scroll indicator */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f8fafc] dark:from-[#0a0a0c] to-transparent pointer-events-none z-20" />

      {/* Scroll Down Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-35 hidden md:block">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-primary transition-colors duration-300 font-mono text-xs tracking-widest uppercase interactive"
        >
          Scroll Down
          <ArrowDown size={14} className="animate-bounce text-brand-primary" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
