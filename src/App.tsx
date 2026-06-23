import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatIDo from "./components/WhatIDo";
import StatsCounter from "./components/StatsCounter";
import MyToolkit from "./components/MyToolkit";
import Portfolio from "./components/Portfolio";
import LoadingScreen from "./components/LoadingScreen";
import SmoothScroll from "./components/SmoothScroll";
import SectionReveal from "./components/ui/section-reveal";

// Lazy load below-the-fold components for better FCP & TBT
const Journey = lazy(() => import("./components/Journey"));
const Photography = lazy(() => import("./components/Photography"));
const Contact = lazy(() => import("./components/Contact"));


function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Show loader only once per session
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("hasLoadedBefore");
      return hasLoaded !== "true";
    }
    return true;
  });
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    // Default to dark theme for that premium aesthetic
    return "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      body.classList.add("light");
      body.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      body.classList.add("dark");
      body.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    sessionStorage.setItem("hasLoadedBefore", "true");
  }, []);

  return (
    <>
      {/* Smooth Scroll Integration */}
      <SmoothScroll />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Floating glassmorphic header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* App Main Layout Structure */}
      <main className="w-full bg-transparent min-h-screen transition-colors duration-500 overflow-x-hidden">
        
        {/* Section 00: Home / Hero */}
        <Hero />

        {/* Section 01: Bento About Profile */}
        <SectionReveal>
          <About />
        </SectionReveal>

        {/* Section 02: What I Do — Interactive Bento Grid */}
        <SectionReveal>
          <WhatIDo />
        </SectionReveal>

        {/* Section 03: By The Numbers — Stats Counter */}
        <SectionReveal>
          <StatsCounter />
        </SectionReveal>

        {/* Section 04: My Toolkit — Tools & Technologies */}
        <SectionReveal>
          <MyToolkit />
        </SectionReveal>

        {/* Section 05: Selected Portfolio Works */}
        <SectionReveal parallax parallaxStrength={30}>
          <Portfolio />
        </SectionReveal>

        {/* Section 03-05: Lazy loaded below-the-fold */}
        <Suspense fallback={null}>
          <SectionReveal>
            <Journey />
          </SectionReveal>
          <SectionReveal parallax parallaxStrength={20}>
            <Photography />
          </SectionReveal>
          <SectionReveal>
            <Contact />
          </SectionReveal>
        </Suspense>

      </main>
    </>
  );
}

export default App;
