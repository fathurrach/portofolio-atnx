import React, { useState } from "react";
import { Send, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending email
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
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
      value: "hello@atnx.dev",
      href: "mailto:hello@atnx.dev",
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
      href: "https://github.com",
      name: "GitHub",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      ),
      href: "https://twitter.com",
      name: "Twitter",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      href: "https://linkedin.com",
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
      href: "https://instagram.com",
      name: "Instagram",
    },
  ];


  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-28 px-6 bg-[#0a0a0c] dark:bg-[#0a0a0c] light:bg-[#f8fafc] overflow-hidden flex items-center"
    >
      {/* Background radial gradient */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Section Header */}
        <div className="mb-20 max-w-xl">
          <span className="font-mono text-xs tracking-widest text-brand-primary uppercase block mb-3">
            04 &bull; Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-gray-100 dark:text-gray-100 light:text-gray-900 leading-tight">
            Start a Conversation.
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Details & Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="max-w-md">
              <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-lg font-light leading-relaxed mb-6">
                Have a project idea, a job opportunity, or just want to chat about creative coding? Drop me a line! I am always open to exploring fresh concepts and collaborating on premium web environments.
              </p>
            </div>

            {/* Direct Connect Cards */}
            <div className="space-y-4 max-w-sm">
              {contactDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/5"
                >
                  <div className="p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-black/5 flex-shrink-0">
                    {detail.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-gray-400 dark:text-gray-400 light:text-gray-600 tracking-widest">
                      {detail.label}
                    </div>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-sm font-sans text-gray-200 dark:text-gray-200 light:text-gray-800 hover:text-brand-primary transition-colors duration-300 interactive font-medium"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <div className="text-sm font-sans text-gray-300 dark:text-gray-300 light:text-gray-700 font-medium">
                        {detail.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Rings */}
            <div>
              <div className="text-xs font-mono uppercase text-gray-400 dark:text-gray-400 light:text-gray-600 tracking-widest mb-4">
                FOLLOW MY ENDEAVORS
              </div>
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 glass-panel hover:bg-brand-primary/10 hover:border-brand-primary/30 hover:scale-110 transition-all duration-300 text-gray-300 dark:text-gray-300 light:text-gray-700 interactive"
                    aria-label={`Visit my ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl glass-card border border-white/5 p-8 md:p-10">
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
                    className="w-full bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl py-4 px-5 text-sm text-gray-100 dark:text-gray-100 light:text-gray-900 placeholder-transparent focus:outline-none focus:border-brand-primary transition-all duration-300 peer"
                    placeholder="Your Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-5 top-4 text-xs font-mono text-gray-400 dark:text-gray-400 light:text-gray-600 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-4.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-brand-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px]"
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
                    className="w-full bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl py-4 px-5 text-sm text-gray-100 dark:text-gray-100 light:text-gray-900 placeholder-transparent focus:outline-none focus:border-brand-primary transition-all duration-300 peer"
                    placeholder="Your Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-5 top-4 text-xs font-mono text-gray-400 dark:text-gray-400 light:text-gray-600 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-4.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-brand-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px]"
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
                    className="w-full bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl py-4 px-5 text-sm text-gray-100 dark:text-gray-100 light:text-gray-900 placeholder-transparent focus:outline-none focus:border-brand-primary transition-all duration-300 peer resize-none"
                    placeholder="Your Message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-5 top-4 text-xs font-mono text-gray-400 dark:text-gray-400 light:text-gray-600 transition-all duration-300 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-4.5 peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-brand-primary peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px]"
                  >
                    PROJECT BRIEF / MESSAGE
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary text-[#0a0a0c] dark:text-[#0a0a0c] light:text-[#ffffff] font-mono text-sm tracking-widest uppercase font-bold shadow-lg hover:shadow-brand-primary/25 hover:scale-[1.02] transition-all duration-300 interactive flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-[#0a0a0c] dark:border-[#0a0a0c] light:border-[#ffffff] border-t-transparent rounded-full animate-spin" />
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
              </form>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-28 pt-8 border-t border-white/5 dark:border-white/5 light:border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
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
