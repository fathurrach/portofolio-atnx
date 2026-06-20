import React, { useState, useEffect, useRef } from "react";
import { Send, Mail, MapPin, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "./ui/text-reveal";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    const formData = new FormData();
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE");
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("message", formState.message);
    formData.append("subject", "New Contact Form Submission - ATNX Portfolio");
    formData.append("from_name", "ATNX Portfolio");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        console.error("Web3Forms Error:", data);
        setSubmitError(data.message || "Failed to submit form. Please check your Access Key.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const contactDetails = [
    {
      icon: <Mail size={18} className="text-brand-primary" />,
      label: "Direct Email",
      value: "hello@atnx.my.id",
      href: "mailto:hello@atnx.my.id",
    },
    {
      icon: <MapPin size={18} className="text-brand-secondary" />,
      label: "Location",
      value: "Jakarta, Indonesia",
      href: "https://maps.google.com",
    },
    {
      icon: <Clock size={18} className="text-brand-accent" />,
      label: "Availability",
      value: "Mon - Fri (9 AM - 6 PM)",
      href: null,
    },
  ];

  const socials = [
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      href: "https://github.com/fathurrach",
      name: "GitHub",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      href: "https://www.linkedin.com/in/muhammad-fathurrachman-bb80143b5/",
      name: "LinkedIn",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      href: "https://instagram.com/fathurach",
      name: "Instagram",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const footerLogoRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header stagger
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

      // Left column - slide from left
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current.children,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Form column - slide from right
      if (formColRef.current) {
        gsap.fromTo(
          formColRef.current,
          { opacity: 0, x: 40, scale: 0.97 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formColRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Footer logo - fade up
      if (footerLogoRef.current) {
        gsap.fromTo(
          footerLogoRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerLogoRef.current,
              start: "top 95%",
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
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full py-28 px-6 bg-transparent overflow-hidden flex items-center"
    >
      {/* Background radial gradient */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-20 max-w-xl">
          <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
            Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-black dark:text-white leading-tight">
            <TextReveal text="Start a Conversation." />
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Details & Info */}
          <div ref={leftColRef} className="lg:col-span-2 space-y-8">
            <div className="max-w-md">
              <p className="text-slate-800 dark:text-gray-300 text-lg font-light leading-relaxed mb-6">
                Have a project idea, a job opportunity, or just want to chat about creative coding? Drop me a line! I am always open to exploring fresh concepts and collaborating on premium web environments.
              </p>
            </div>

            {/* Direct Connect Cards */}
            <div className="space-y-4 max-w-sm">
              {contactDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-black/5 dark:border-white/5"
                >
                  <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 flex-shrink-0">
                    {detail.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-700 dark:text-gray-400 tracking-widest">
                      {detail.label}
                    </div>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-sm font-sans text-gray-800 dark:text-gray-200 hover:text-brand-primary transition-colors duration-300 interactive font-medium"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <div className="text-sm font-sans text-slate-800 dark:text-gray-300 font-medium">
                        {detail.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Rings */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-700 dark:text-gray-400 tracking-widest mb-4">
                FOLLOW MY ENDEAVORS
              </div>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full border border-black/10 dark:border-white/10 glass-panel hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:scale-110 transition-all duration-300 text-slate-700 dark:text-gray-300 interactive"
                    aria-label={`Visit my ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formColRef} className="lg:col-span-3">
            <div className="rounded-3xl glass-card border border-black/5 dark:border-white/5 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name field */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-5 text-sm text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-brand-primary transition-all duration-300 peer"
                    placeholder="Your Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-5 top-4 text-xs font-mono text-slate-700 dark:text-gray-400 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-4.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-brand-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px]"
                  >
                    YOUR NAME
                  </label>
                </div>

                {/* Email field */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-5 text-sm text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-brand-primary transition-all duration-300 peer"
                    placeholder="Your Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-5 top-4 text-xs font-mono text-slate-700 dark:text-gray-400 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-4.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-brand-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px]"
                  >
                    EMAIL ADDRESS
                  </label>
                </div>

                {/* Message field */}
                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-5 text-sm text-gray-900 dark:text-gray-100 placeholder-transparent focus:outline-none focus:border-brand-primary transition-all duration-300 peer resize-none"
                    placeholder="Your Message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-5 top-4 text-xs font-mono text-slate-700 dark:text-gray-400 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-4.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-brand-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px]"
                  >
                    PROJECT BRIEF / MESSAGE
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white dark:text-[#0a0a0c] font-mono text-sm tracking-widest uppercase font-bold shadow-lg hover:shadow-brand-primary/25 hover:scale-[1.02] transition-all duration-300 interactive flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white dark:border-[#0a0a0c] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <Send size={15} />
                    </>
                  )}
                </button>

                {/* Success alert */}
                {submitSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono tracking-wide text-center animate-fade-in-up">
                    MESSAGE DELIVERED SUCCESSFULLY! I'LL BE IN TOUCH SOON.
                  </div>
                )}

                {/* Error alert */}
                {submitError && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono tracking-wide text-center animate-fade-in-up">
                    {submitError.toUpperCase()}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* 3D Spinning Logo */}
        <div ref={footerLogoRef} className="mt-28 flex flex-col items-center">
          <div
            className="relative w-32 h-32 md:w-40 md:h-40"
            style={{ perspective: "800px" }}
          >
            <img
              src="/images/logo/logo.png"
              alt="ATNX Logo"
              width={160}
              height={160}
              className="w-full h-full object-contain invert dark:invert-0 drop-shadow-[0_0_25px_rgba(var(--color-brand-primary-rgb,99,102,241),0.3)]"
              style={{
                animation: "spin3d 4s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
              }}
            />
          </div>
          <style>{`
            @keyframes spin3d {
              0% {
                transform: rotateY(0deg);
              }
              100% {
                transform: rotateY(360deg);
              }
            }
          `}</style>
        </div>

        {/* Footer info */}
        <div className="mt-12 pt-8 border-t border-black/10 dark:border-t-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-zinc-400">
          <div>&copy; {new Date().getFullYear()} ATNX. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-brand-primary transition-colors duration-300 interactive">BACK TO TOP</a>
            <span>&bull;</span>
            <span>BUILT WITH VITE + REACT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
