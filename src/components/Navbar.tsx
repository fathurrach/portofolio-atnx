import { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeToggleButton1 from "./ThemeToggleButton";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const SECTION_IDS = ["home", "about", "what-i-do", "portfolio", "journey", "photography", "contact"];

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navRef = useRef<HTMLElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#what-i-do" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Journey", href: "#journey" },
    { name: "Gallery", href: "#photography" },
    { name: "Contact", href: "#contact" },
  ];

  // Move pill indicator to the active link
  const movePill = useCallback(() => {
    const container = linksContainerRef.current;
    const pill = pillRef.current;
    if (!container || !pill) return;

    const activeLink = container.querySelector(
      `[data-section="${activeSection}"]`
    ) as HTMLElement;

    if (activeLink) {
      const containerRect = container.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      gsap.to(pill, {
        x: linkRect.left - containerRect.left,
        width: linkRect.width,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [activeSection]);

  // IntersectionObserver for accurate section detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: [0.3, 0.5],
          rootMargin: "-80px 0px -40% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll handler: update scrolled state and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate scroll progress (0 to 1)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Move pill when active section changes
  useEffect(() => {
    movePill();
  }, [activeSection, movePill]);

  // Reposition pill on resize
  useEffect(() => {
    const handleResize = () => movePill();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [movePill]);

  // Animate scroll progress bar
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: scrollProgress,
        duration: 0.15,
        ease: "none",
      });
    }
  }, [scrollProgress]);

  // GSAP stagger entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const links = linksContainerRef.current?.querySelectorAll(".nav-link");
      if (!links) return;

      // Logo entrance
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
      );

      // Links stagger
      gsap.fromTo(
        links,
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.25,
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const mobileLinks = menu.querySelectorAll(".mobile-link");

    if (isOpen) {
      gsap.to(menu, {
        clipPath: "inset(0 0 0 0)",
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        mobileLinks,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(menu, {
        clipPath: "inset(0 0 0 100%)",
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  // Magnetic hover effect for desktop links
  const handleLinkMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const link = e.currentTarget;
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(link, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled
          ? "py-3 glass-navbar shadow-lg shadow-black/5 dark:shadow-black/20"
          : "py-5 bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-brand-accent via-brand-secondary to-brand-primary origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          ref={logoRef}
          href="#home"
          className="h-12 flex items-center hover:scale-[1.05] transition-transform duration-300 interactive select-none opacity-0"
        >
          <img
            src="/images/logo/logo.png"
            alt="ATNX Logo"
            width={48}
            height={48}
            className="h-full object-contain invert dark:invert-0"
          />
        </a>

        {/* Desktop Navigation — floating pill bar */}
        <div className="hidden md:flex items-center">
          <div
            ref={linksContainerRef}
            className="relative flex items-center gap-1 p-1.5 rounded-2xl glass-panel border border-black/5 dark:border-white/5"
          >
            {/* Animated sliding pill indicator */}
            <div
              ref={pillRef}
              className="absolute top-1.5 left-0 h-[calc(100%-12px)] rounded-xl bg-brand-primary/10 dark:bg-white/10 border border-brand-primary/15 dark:border-white/10 opacity-0 pointer-events-none z-0 transition-colors duration-300"
            />

            {navLinks.map((link) => {
              const id = link.href.substring(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-section={id}
                  onMouseMove={handleLinkMouseMove}
                  onMouseLeave={handleLinkMouseLeave}
                  className={`nav-link relative z-10 py-2 px-4 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 interactive opacity-0 ${
                    isActive
                      ? "text-brand-primary font-bold"
                      : "text-slate-600 dark:text-gray-400 hover:text-brand-primary"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right controls: Theme toggle + hamburger */}
        <div className="flex items-center gap-3">
          <ThemeToggleButton1 theme={theme} toggleTheme={toggleTheme} />

          <button
            ref={hamburgerRef}
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2.5 rounded-full border border-black/10 dark:border-white/10 glass-panel hover:bg-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 md:hidden text-slate-800 dark:text-gray-300 interactive overflow-hidden"
            aria-label="Toggle menu"
          >
            <div className="relative w-[18px] h-[18px]">
              <span
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0"
                }`}
              >
                <X size={18} />
              </span>
              <span
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen
                    ? "-rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              >
                <Menu size={18} />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Drawer */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 top-0 w-full h-screen z-30 bg-[#f8fafc]/95 dark:bg-[#0a0a0c]/95 backdrop-blur-2xl"
        style={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
      >
        {/* Close button inside drawer */}
        <div className="absolute top-5 right-6 z-50">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2.5 rounded-full border border-black/10 dark:border-white/10 glass-panel text-slate-800 dark:text-gray-300 interactive hover:bg-brand-primary/10"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col justify-center h-full px-12 gap-2">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`mobile-link flex items-center gap-4 py-4 border-b border-black/5 dark:border-white/5 transition-all duration-300 group`}
              >
                <span
                  className={`font-heading text-2xl md:text-3xl tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-brand-primary font-extrabold translate-x-2"
                      : "text-slate-800 dark:text-gray-200 font-bold group-hover:text-brand-primary group-hover:translate-x-2"
                  }`}
                >
                  {link.name}
                </span>
                {isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                )}
              </a>
            );
          })}

          {/* Mini footer in mobile drawer */}
          <div className="mt-12 pt-6 border-t border-black/5 dark:border-white/5">
            <p className="font-mono text-[10px] tracking-widest text-slate-400 dark:text-gray-600 uppercase">
              © 2026 ATNX — All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
