import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Journey from "./components/Journey";
import Contact from "./components/Contact";

function App() {
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
    const body = document.body;
    if (theme === "light") {
      body.classList.add("light");
      body.classList.remove("dark");
    } else {
      body.classList.add("dark");
      body.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      {/* Floating glassmorphic header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* App Main Layout Structure */}
      <main className="w-full bg-[#0a0a0c] dark:bg-[#0a0a0c] light:bg-[#f8fafc] min-h-screen transition-colors duration-500 overflow-x-hidden">
        
        {/* Section 00: Home / Hero */}
        <Hero />

        {/* Section 01: Bento About Profile */}
        <About />

        {/* Section 02: Selected Portfolio Works */}
        <Portfolio />

        {/* Section 03: Experience Timeline */}
        <Journey />

        {/* Section 04: Futuristic Connect Form */}
        <Contact />

      </main>
    </>
  );
}

export default App;
