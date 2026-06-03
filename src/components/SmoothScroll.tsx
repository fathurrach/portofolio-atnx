import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Add lenis class to html element for styling hooks
    document.documentElement.classList.add("lenis", "lenis-smooth");

    // Sync Lenis scroll update with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize Lenis raf loop with GSAP's ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // Disable lag smoothing for precise scroll synchronization
    gsap.ticker.lagSmoothing(0);

    // Intercept clicks on anchor links (#about, #portfolio, etc.) for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          const targetEl = document.querySelector(href);
          if (targetEl) {
            // Apply slight offset if navbar is fixed
            const offset = href === "#home" ? 0 : -80;
            lenis.scrollTo(targetEl, {
              offset,
              duration: 1.4,
              immediate: false,
            });
            // Update hash in URL quietly
            window.history.pushState(null, "", href);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
};

export default SmoothScroll;
