import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggleButton1 from "./ThemeToggleButton";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link checking
      const scrollPosition = window.scrollY + 150;
      for (const link of navLinks) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? "py-4 glass-panel shadow-lg border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="h-10 flex items-center hover:scale-[1.03] transition-transform duration-300 interactive select-none"
        >
          <img
            src="/images/logo/logo.png"
            alt="ATNX Logo"
            className="h-full object-contain invert dark:invert-0"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`font-mono text-sm tracking-wider hover:text-brand-primary transition-colors duration-300 relative interactive py-2 ${
                  activeSection === id ? "text-brand-primary font-medium" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {link.name}
                {activeSection === id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Buttons: Theme toggle and mobile menu */}
        <div className="flex items-center gap-4">
          <ThemeToggleButton1 theme={theme} toggleTheme={toggleTheme} />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full border border-black/10 dark:border-white/10 glass-panel hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 md:hidden text-gray-700 dark:text-gray-300 interactive"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-[76px] w-full h-[calc(100vh-76px)] glass-panel transition-all duration-500 z-30 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-heading text-2xl tracking-widest hover:text-brand-primary transition-all duration-300 ${
                  activeSection === id ? "text-brand-primary font-bold scale-110" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
