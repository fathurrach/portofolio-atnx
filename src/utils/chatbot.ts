import {
  PORTFOLIO_DATA,
  GREETING,
  BOT_NAME,
} from "../data/portfolio";

export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const GREETING_PATTERNS = [
  /^(hi|hello|hey|halo|hai|sup|yo|woi|woy|konnichiwa|assalamualaikum)[\s!.,?]*$/i,
  /^(good\s*(morning|afternoon|evening|day))[\s!.,?]*$/i,
  /^(selamat\s*(pagi|siang|sore|malam))[\s!.,?]*$/i,
  /^(how\s*are\s*you|apa\s*kabar|gimana\s*kabarmu|gimana\s*kamu)[\s!.,?]*$/i,
];

const SKILL_PATTERNS = [
  /\b(skill|skills|tech\s*stack|teknologi|technology|keahlian|bisa\s*apa|what\s*can\s*you|abilities|tools)\b/i,
  /\b(python|javascript|typescript|react|next|node|vue|docker|linux|nest|svelte)\b/i,
  /\b(learn|pelajari|ngoding|coding|programming|develop|development)\b/i,
];

const EXPERIENCE_PATTERNS = [
  /\b(experience|pengalaman|kerja|work|career|job|position|role|where\s*do\s*you\s*work|kerja\s*apa)\b/i,
  /\b(freelance|full.?stack|ai\s*engineer|developer|engineer)\b/i,
];

const PROJECT_PATTERNS = [
  /\b(project|projects|portfolio|karya|built|made|bikin|create|created|aplikasi|app|website)\b/i,
  /\b(github|repo|repository|source\s*code|code)\b/i,
];

const CONTACT_PATTERNS = [
  /\b(contact|kontak|email|hubungi|reach|call|phone|wa|whatsapp|telepon|gmail|mail)\b/i,
  /\b(linkedin|github|social|media\s*sosial|sosmed)\b/i,
];

const EDUCATION_PATTERNS = [
  /\b(education|pendidikan|kuliah|university|kampus|sekolah|school|degree|sarjana|study|studi)\b/i,
];

const PERSONAL_PATTERNS = [
  /\b(siapa\s*kamu|who\s*are\s*you|about\s*you|about\s*yourself|perkenalkan|introduce|kamu\s*siapa)\b/i,
  /\b(nama|name|called|panggil)\b/i,
];

const FUN_FACTS_PATTERNS = [
  /\b(fun\s*fact|random|unik|lucu|interesting|seru|tell\s*me\s*something|fakta)\b/i,
];

const BOT_IDENTITY_PATTERNS = [
  /\b(kimshie|gatot|bot|ai|assistant|asisten|robot)\b/i,
  /\b(kamu\s*dibuat|siapa\s*yang\s*bikin|who\s*(made|built|created)\s*you|created\s*by|made\s*by)\b/i,
];

const HELP_PATTERNS = [
  /\b(help|bantuan|bisa\s*apa|what\s*can\s*you\s*do|menu|options|fitur|feature)\b/i,
  /\b(apa\s*aja|apa\s*yang\s*bisa|guide|panduan)\b/i,
];

const THANKS_PATTERNS = [
  /\b(thanks?|thank\s*you|terima\s*kasih|makasih|thx|ty|mantap|keren|bagus|nice|good|great)\b/i,
];

const BYE_PATTERNS = [
  /\b(bye|goodbye|dadah|see\s*you|sampai\s*jumpa|later|out|exit|quit)\b/i,
];

const LAPOR_PATTERNS = [
  /\b(lapor|lapor\s*fm|ddp)\b/i,
];

const WHATSAPP_PATTERNS = [
  /\b(whatsapp|wa\s*bot|whatsapp\s*bot|whatsapp\s*automation|automasi\s*wa)\b/i,
];

const COOLIFY_PATTERNS = [
  /\b(coolify|docker|deploy|vps|hosting|server|self.?host)\b/i,
];

function matchPatterns(text: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(text));
}

function getSkillsResponse(): string {
  const { skills } = PORTFOLIO_DATA;
  let response = "💪 *Skill & Tech Stack Fathur:*\n\n";

  skills.forEach((cat) => {
    response += `*${cat.category}:*\n`;
    response += cat.items.map((s) => `  • ${s}`).join("\n");
    response += "\n\n";
  });

  response += "Mau tau project apa aja yang udah dibikin pakai skill-skill ini? 🎯";
  return response;
}

function getExperienceResponse(): string {
  const { experience } = PORTFOLIO_DATA;
  let response = "💼 *Pengalaman Kerja Fathur:*\n\n";

  experience.forEach((exp) => {
    response += `*${exp.role}* @ ${exp.company}\n`;
    response += `📅 ${exp.period}\n`;
    exp.highlights.forEach((h) => {
      response += `  • ${h}\n`;
    });
    response += "\n";
  });

  response += "Mau tau project apa aja yang udah dikerjain? Tanya aja! 🚀";
  return response;
}

function getProjectsResponse(): string {
  const { projects } = PORTFOLIO_DATA;
  let response = "🚀 *Project Fathur yang udah jalan:*\n\n";

  projects.forEach((proj, i) => {
    response += `${i + 1}. *${proj.name}* [${proj.category}]\n`;
    response += `   ${proj.description}\n`;
    response += `   🛠️ Tech: ${proj.techStack.join(", ")}\n\n`;
  });

  response += "Ada yang mau tau lebih dalam? Tanya aja! 😎";
  return response;
}

function getLaporResponse(): string {
  return (
    "📋 *Lapor FM DDP*\n\n" +
    "Ini project full-stack Fathur:\n\n" +
    "*Backend API:*\n" +
    "  • NestJS + TypeScript\n" +
    "  • PostgreSQL + Supabase\n" +
    "  • Auto-backup ke Google Sheets\n" +
    "  • Full Swagger API docs\n\n" +
    "*Frontend Client:*\n" +
    "  • SvelteKit + Tailwind CSS\n" +
    "  • PWA support\n\n" +
    "Keren kan? Ada yang mau ditanya lagi soal ini? 🛠️"
  );
}

function getWhatsAppResponse(): string {
  return (
    "📱 *WhatsApp Automation*\n\n" +
    "Fathur bikin WhatsApp bot pakai:\n" +
    "  • *whatsapp-web.js* — Node.js library\n" +
    "  • *qrcode-terminal* — buat scan QR login\n" +
    "  • *PostgreSQL* — simpan data & log\n\n" +
    "Fitur: auto-notification, group moderation, webhook integration.\n\n" +
    "Mau tau lebih detail soal automasi WhatsApp-nya? 🤖"
  );
}

function getCoolifyResponse(): string {
  return (
    "🐳 *Coolify Self-Hosting Stack*\n\n" +
    "Fathur pake Coolify buat deploy di VPS pribadi:\n" +
    "  • Docker + Docker Compose\n" +
    "  • Nginx reverse proxy\n" +
    "  • Auto SSL certificates\n" +
    "  • Git-based CI/CD\n\n" +
    "Semua di-self-host, gak perlu cloud hosting mahal! 💸"
  );
}

function getContactResponse(): string {
  const { contact } = PORTFOLIO_DATA;
  return (
    `📬 *Hubungi Fathur di:*\n\n` +
    `📧 Email: ${contact.email}\n` +
    `🐙 GitHub: ${contact.github}\n` +
    `💼 LinkedIn: ${contact.linkedin}\n` +
    `🌐 Website: ${contact.website}\n\n` +
    `Kirim email aja langsung, Fathur biasanya fast response! ⚡`
  );
}

function getEducationResponse(): string {
  const { education } = PORTFOLIO_DATA;
  let response = "🎓 *Pendidikan Fathur:*\n\n";
  education.forEach((edu) => {
    response += `*${edu.degree}*\n`;
    response += `🏫 ${edu.school}\n`;
    response += `📅 ${edu.year}\n\n`;
  });
  return response;
}

function getPersonalResponse(): string {
  const { name, funFacts } = PORTFOLIO_DATA;
  return (
    `🤖 *Tentang ${BOT_NAME}:*\n\n` +
    `Hai! Gw ${BOT_NAME}, AI assistant yang dibuat khusus untuk portofolio ${name}.\n\n` +
    `Gw bisa kasih info soal:\n` +
    `• Skill & tech stack ${name}\n` +
    `• Pengalaman kerja\n` +
    `• Project-project (Lapor FM, WhatsApp Bot, dll)\n` +
    `• Cara ngubungi ${name}\n` +
    `• Pendidikan\n\n` +
    `Fun fact: ${funFacts[Math.floor(Math.random() * funFacts.length)]} 🎲`
  );
}

function getHelpResponse(): string {
  return (
    `📋 *Yang bisa kamu tanya ke ${BOT_NAME}:*\n\n` +
    `1️⃣ *"Skill apa aja?"* — Lihat tech stack Fathur\n` +
    `2️⃣ *"Pengalaman kerja"* — Lihat work experience\n` +
    `3️⃣ *"Project apa aja?"* — Lihat portfolio projects\n` +
    `4️⃣ *"Lapor FM"* — Detail project Lapor FM DDP\n` +
    `5️⃣ *"WhatsApp bot"* — Detail automasi WhatsApp\n` +
    `6️⃣ *"Coolify"* — Infra self-hosting\n` +
    `7️⃣ *"Education"* — Latar belakang pendidikan\n` +
    `8️⃣ *"Contact"* — Cara hubungi Fathur\n` +
    `9️⃣ *"Fun fact"* — Fakta menarik\n\n` +
    `Tanya apa aja, gw siap bantu! 🚀`
  );
}

function getFunFactsResponse(): string {
  const { funFacts } = PORTFOLIO_DATA;
  const randomFacts = funFacts
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  let response = "🎲 *Fun Facts about Fathur:*\n\n";
  randomFacts.forEach((fact, i) => {
    response += `${i + 1}. ${fact}\n`;
  });
  response += "\nKeren kan? 😎 Ada lagi yang mau ditanya?";
  return response;
}

function getThanksResponse(): string {
  const responses = [
    "Sama-sama! Seneng bisa bantu. 😊",
    "No problem! Kalau ada yang lain, tanya aja ya. 🙌",
    "Santai~ Gw selalu siap bantu kapanpun! 💪",
    "Siap bos! Ada lagi yang mau ditanya? 🚀",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function getByeResponse(): string {
  const responses = [
    "Dadah! 👋 Jangan lupa mampir lagi ya!",
    "See you! 🎆 Semoga harimu awesome!",
    "Bye! 🤖 Kalau butuh Fathur, inget gw ya!",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

function getBotIdentityResponse(): string {
  return (
    `🤖 *Kenalan dong!*\n\n` +
    `Gw *${BOT_NAME}*, AI assistant yang jadi bagian dari portofolio ATNX.\n` +
    `Gw dibikin pakai React, TypeScript, Tailwind CSS, dan Framer Motion.\n\n` +
    `Tugas gw? Bantu kamu kenal lebih dekat sama Fathur — skill, project, pengalaman, dan semuanya! 🚀\n\n` +
    `Gw pakai *Smart Rule-Based System* sekarang, tapi nanti bakal di-upgrade pakai AI beneran (Gemini/OpenAI). 😉`
  );
}

function getGeneralResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  const techKeywords = [
    "react", "python", "node", "javascript", "typescript", "docker",
    "linux", "ai", "machine learning", "ml", "devops", "cloud",
    "database", "sql", "api", "frontend", "backend", "fullstack",
    "nextjs", "next.js", "vue", "angular", "tailwind", "css",
    "svelte", "nest", "nestjs", "supabase", "postgresql",
  ];

  const mentionedTech = techKeywords.filter((tech) =>
    lowerInput.includes(tech)
  );

  if (mentionedTech.length > 0) {
    return (
      `🔧 *Soal ${mentionedTech.join(", ")}...*\n\n` +
      `Fathur emang punya pengalaman sama tech tersebut! Mau tau detail skill Fathur secara lengkap?\n\n` +
      `Ketik *"skill"* buat lihat semua tech stack-nya. 🎯`
    );
  }

  if (/harga|price|biaya|cost|bayar|pay/i.test(lowerInput)) {
    return (
      "💰 *Soal tarif/biaya:*\n\n" +
      "Fathur biasanya discuss langsung soal project dan pricing.\n" +
      "Langsung aja email ke " +
      PORTFOLIO_DATA.contact.email +
      " buat diskusi lebih lanjut! 📧"
    );
  }

  return (
    `🤔 Hmm, gw belum fully paham nih maksudnya.\n\n` +
    `Tapi gw bisa bantu kalau kamu tanya soal:\n` +
    `• *Skill* & tech stack\n` +
    `• *Pengalaman* kerja\n` +
    `• *Project* (Lapor FM, WhatsApp Bot, dll)\n` +
    `• *Contact* info\n` +
    `• *Education*\n\n` +
    `Coba ketik *"help"* buat lihat semua opsi! 📋`
  );
}

export function getBotResponse(userInput: string): string {
  const trimmed = userInput.trim();

  if (!trimmed) {
    return "Kayaknya kamu kirim pesan kosong nih. Coba ketik sesuatu! 😄";
  }

  if (matchPatterns(trimmed, GREETING_PATTERNS)) return GREETING;
  if (matchPatterns(trimmed, THANKS_PATTERNS)) return getThanksResponse();
  if (matchPatterns(trimmed, BYE_PATTERNS)) return getByeResponse();
  if (matchPatterns(trimmed, BOT_IDENTITY_PATTERNS)) return getBotIdentityResponse();
  if (matchPatterns(trimmed, PERSONAL_PATTERNS)) return getPersonalResponse();
  if (matchPatterns(trimmed, HELP_PATTERNS)) return getHelpResponse();
  if (matchPatterns(trimmed, FUN_FACTS_PATTERNS)) return getFunFactsResponse();
  if (matchPatterns(trimmed, LAPOR_PATTERNS)) return getLaporResponse();
  if (matchPatterns(trimmed, WHATSAPP_PATTERNS)) return getWhatsAppResponse();
  if (matchPatterns(trimmed, COOLIFY_PATTERNS)) return getCoolifyResponse();
  if (matchPatterns(trimmed, SKILL_PATTERNS)) return getSkillsResponse();
  if (matchPatterns(trimmed, EXPERIENCE_PATTERNS)) return getExperienceResponse();
  if (matchPatterns(trimmed, PROJECT_PATTERNS)) return getProjectsResponse();
  if (matchPatterns(trimmed, EDUCATION_PATTERNS)) return getEducationResponse();
  if (matchPatterns(trimmed, CONTACT_PATTERNS)) return getContactResponse();

  return getGeneralResponse(trimmed);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function getTypingDelay(response: string): number {
  const baseDelay = 600;
  const perCharDelay = Math.min(response.length * 2, 1500);
  return baseDelay + perCharDelay;
}
