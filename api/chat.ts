import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PORTFOLIO_DATA, BOT_NAME, BOT_TAGLINE } from "../src/data/portfolio";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  // Build the system instructions context from portfolio data
  const systemInstruction = `
You are ${BOT_NAME}, ${BOT_TAGLINE}. You are the digital assistant for ${PORTFOLIO_DATA.name}.
Your job is to answer questions about ${PORTFOLIO_DATA.name}'s professional experience, skills, projects, education, and contact information with a helpful, friendly, slightly witty, and highly professional tone.

Here is the exact data about ${PORTFOLIO_DATA.name}:
- Name: ${PORTFOLIO_DATA.name}
- Headline/Tagline: ${PORTFOLIO_DATA.tagline}
- Key Roles: ${PORTFOLIO_DATA.roles.join(", ")}
- Email: ${PORTFOLIO_DATA.contact.email}
- GitHub: ${PORTFOLIO_DATA.contact.github}
- LinkedIn: ${PORTFOLIO_DATA.contact.linkedin}
- Website: ${PORTFOLIO_DATA.contact.website}

Skills & Technologies:
${PORTFOLIO_DATA.skills.map(s => `- ${s.category}: ${s.items.join(", ")}`).join("\n")}

Professional Experience:
${PORTFOLIO_DATA.experience.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.highlights.join("; ")}`).join("\n")}

Featured Projects:
${PORTFOLIO_DATA.projects.map(p => `- ${p.name} [${p.category}]: ${p.description} (Tech: ${p.techStack.join(", ")})`).join("\n")}

Education:
${PORTFOLIO_DATA.education.map(edu => `- ${edu.degree} at ${edu.school} (${edu.year})`).join("\n")}

Fun Facts:
${PORTFOLIO_DATA.funFacts.map(f => `- ${f}`).join("\n")}

Guidelines:
1. Always respond in Indonesian unless asked in English.
2. Keep responses brief, conversational, and structured (use bullet points if listing things).
3. If asked about pricing/rates: state that ${PORTFOLIO_DATA.name} discusses this on a project-by-project basis, and encourage them to email directly.
4. Bold key terms using asterisks like *this* for styling. Use bullet points like •.
5. If user asks questions completely unrelated to ${PORTFOLIO_DATA.name}'s portfolio/experience, politely redirect them back to the portfolio context.
`;

  try {
    // Map client-side chat history to Gemini's format
    const contents = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }

    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          }
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: "Gemini API error", details: errText });
    }

    const data = await response.json();
    const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, ada gangguan saat memproses jawaban.";

    return res.status(200).json({ text: botText });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
