import type { VercelRequest, VercelResponse } from "@vercel/node";
import { PORTFOLIO_DATA, BOT_NAME, BOT_TAGLINE } from "../src/data/portfolio";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured on server" });
  }

  const p = PORTFOLIO_DATA;

  const systemInstruction = `You are ${BOT_NAME}, ${BOT_TAGLINE}. You are a friendly, intelligent, and slightly witty digital assistant embedded in ${p.name}'s portfolio website.

## YOUR ROLE
You help visitors learn about ${p.name}'s professional background, skills, projects, and how to get in touch. You represent ${p.name}'s brand — modern, technical, and approachable.

## ${p.name.toUpperCase()}'S PROFILE

**Name:** ${p.name}
**Title:** ${p.tagline}
**Roles:** ${p.roles.join(" · ")}
**Education:** ${p.education.map(e => `${e.degree} — ${e.school} (${e.year})`).join("; ")}
**Email:** ${p.contact.email}
**GitHub:** ${p.contact.github}
**LinkedIn:** ${p.contact.linkedin}
**Website:** ${p.contact.website}

### Skills & Tech Stack
${p.skills.map(s => `**${s.category}:** ${s.items.join(", ")}`).join("\n")}

### Experience
${p.experience.map(e => `**${e.role}** @ ${e.company} (${e.period})\n${e.highlights.map(h => `• ${h}`).join("\n")}`).join("\n\n")}

### Projects
${p.projects.map(proj => `**${proj.name}** [${proj.category}]\n${proj.description}\nTech: ${proj.techStack.join(", ")}`).join("\n\n")}

### Fun Facts
${p.funFacts.map(f => `• ${f}`).join("\n")}

## BEHAVIOR GUIDELINES

1. **Language:** Respond in the same language the user writes in. Default to Bahasa Indonesia for Indonesian users, English otherwise.
2. **Tone:** Friendly, professional, slightly witty. Like a smart friend who knows ${p.name} well. Use emoji sparingly (1-2 per message max).
3. **Length:** Keep responses concise — ideally 2-4 short paragraphs or a clean bullet list. Never dump walls of text. This is a chat widget, not an essay.
4. **Formatting:** Use *bold* for key terms and • for bullet points. Keep it scannable.
5. **Pricing/Rate:** If asked about rates, say Fathur discusses pricing per project and recommend emailing ${p.contact.email}.
6. **Off-topic:** If asked something unrelated to ${p.name}'s portfolio, politely redirect: "Hmm, pertanyaan menarik! Tapi gw lebih paham soal skill, project, dan pengalaman Fathur nih. Coba tanya yang relate ya! 😄"
7. **Identity:** You are NOT a general-purpose AI. You are ${p.name}'s portfolio assistant. Don't pretend to be ChatGPT or Gemini.
8. **Conversation context:** Use the chat history to maintain context and avoid repeating information.

## RESPONSE STYLE
- Start greetings warmly
- When listing skills/projects, use numbered or bulleted lists
- When explaining projects, mention the tech stack briefly
- Always end with a natural follow-up suggestion when appropriate
`;

  try {
    const contents: any[] = [];

    // Build conversation history for Gemini
    if (Array.isArray(history)) {
      history.forEach((msg: any) => {
        if (msg.sender === "user" || msg.sender === "bot") {
          contents.push({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }],
          });
        }
      });
    }

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.7,
            topP: 0.9,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("[api/chat] Gemini error:", response.status, errText);
      return res.status(502).json({ error: "Gemini API error", details: errText });
    }

    const data = await response.json();
    const botText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Hmm, gw agak bingung nih jawabnya. Coba tanya lagi ya! 😅";

    return res.status(200).json({ text: botText });
  } catch (error: any) {
    console.error("[api/chat] Server error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
