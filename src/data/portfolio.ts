export const BOT_NAME = "Kimshie";
export const BOT_TAGLINE = "ATNX's Digital Assistant";

export const GREETING = `Hi! I'm ${BOT_NAME}, ${BOT_TAGLINE}. Tanya saya apa saja soal pengalaman kerja, skill, atau project Fathur! 🚀`;

export interface PortfolioData {
  name: string;
  tagline: string;
  roles: string[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  contact: ContactInfo;
  funFacts: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Project {
  name: string;
  description: string;
  techStack: string[];
  link?: string;
  category: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  website: string;
}

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Fathur Rachman",
  tagline: "AI & Full-Stack Automation Engineer",
  roles: [
    "AI & Automation Developer",
    "Full-Stack Software Engineer",
    "DevOps & Self-Hosting Enthusiast",
    "Database & API Specialist",
  ],
  skills: [
    {
      category: "Backend & Core",
      items: [
        "Node.js",
        "NestJS",
        "TypeScript",
        "FastAPI",
        "Python",
        "REST API & Swagger",
      ],
    },
    {
      category: "Frontend & UI",
      items: [
        "Svelte / SvelteKit",
        "React",
        "Tailwind CSS",
        "Vite",
        "TypeScript",
        "Framer Motion",
      ],
    },
    {
      category: "Databases & Integrations",
      items: [
        "PostgreSQL",
        "Supabase",
        "Google Sheets API",
        "Redis",
        "Prisma",
        "SQL & Migrations",
      ],
    },
    {
      category: "DevOps & Infrastructure",
      items: [
        "Docker & Docker Compose",
        "Coolify Stack (Self-hosting)",
        "Nginx",
        "VPS Administration",
        "Git / GitHub Actions",
        "Linux OS",
      ],
    },
    {
      category: "Automation & Messaging",
      items: [
        "WhatsApp Business API",
        "whatsapp-web.js",
        "Telegram Bot API",
        "n8n / Webhooks",
        "Cron / Background Tasks",
      ],
    },
  ],
  experience: [
    {
      role: "Lead Full-Stack & Automation Engineer",
      company: "ATNX Studio & Freelance Projects",
      period: "2023 - Present",
      highlights: [
        "Developed full-stack web architectures integrating SvelteKit, NestJS, and Supabase",
        "Configured robust VPS environments utilizing Coolify for seamless application deployments",
        "Built custom WhatsApp automation agents for business workflows using node libraries",
        "Designed sync scripts to automate database backup directly to Google Sheets",
      ],
    },
  ],
  projects: [
    {
      name: "Lapor FM DDP (Backend API)",
      description:
        "High-performance backend API built using NestJS. Features Supabase integration, robust database migrations, auto-sync backups to Google Sheets, and full Swagger OpenAPI documentation.",
      techStack: ["NestJS", "TypeScript", "PostgreSQL", "Supabase", "Google Sheets API"],
      category: "Backend",
    },
    {
      name: "Lapor FM DDP (Frontend Client)",
      description:
        "Responsive and lightweight user interface client developed using Svelte/SvelteKit, Tailwind CSS, featuring progressive web app (PWA) utilities.",
      techStack: ["Svelte", "SvelteKit", "Tailwind CSS", "TypeScript", "PWA"],
      category: "Frontend",
    },
    {
      name: "Custom WhatsApp Automator",
      description:
        "Headless WhatsApp automation client designed for automated notification delivery, group moderation, and database sync using webhooks.",
      techStack: ["Node.js", "whatsapp-web.js", "qrcode-terminal", "PostgreSQL"],
      category: "Automation",
    },
    {
      name: "Coolify Self-Hosting Stack",
      description:
        "Containerized VPS infrastructure deployment using Coolify for continuous delivery, automated Docker orchestration, database management, and SSL configuration.",
      techStack: ["Docker", "Coolify", "Nginx", "Linux Shell"],
      category: "DevOps",
    },
  ],
  education: [
    {
      degree: "Computer Science / Software Engineering",
      school: "Universitas Indonesia",
      year: "2020 - 2024",
    },
  ],
  contact: {
    email: "hello@atnx.my.id",
    github: "https://github.com/Abangatungxx",
    linkedin: "https://linkedin.com/in/fathurrachman",
    website: "https://atnx.my.id",
  },
  funFacts: [
    "Sangat terobsesi dengan automasi — jika bisa dibuat otomatis dengan cron job, pantang dikerjakan manual! 🤖",
    "Lebih suka pakai Coolify (Self-hosted) ketimbang sewa cloud hosting mahal. 💸",
    "Pencipta Kimshie (AI asisten yang lagi kamu ajak ngobrol sekarang) 🌸",
    "Fans berat arsitektur dark mode nan minimalis.",
  ],
};
