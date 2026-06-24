import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, Keyboard } from "lucide-react";
import {
  getBotResponse,
  generateId,
  type ChatMessage,
} from "../utils/chatbot";
import { BOT_NAME, GREETING } from "../data/portfolio";

/* ─── Typing Indicator ─── */
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-start gap-2 mb-3"
    >
      <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-300 dark:border-zinc-700 flex items-center justify-center shrink-0 shadow-xs">
        <Bot size={14} />
      </div>
      <div className="bg-slate-100/80 dark:bg-zinc-900/60 backdrop-blur-md border border-slate-200 dark:border-zinc-800/50 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-slate-600 dark:bg-zinc-400"
              animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Message Bubble ─── */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.sender === "bot";

  // Split by double newline for paragraphs, then by single newline for line breaks
  const formatText = (text: string) => {
    const paragraphs = text.split("\n\n");

    return paragraphs.map((para, pIdx) => {
      const lines = para.split("\n");

      return (
        <p key={pIdx} className={pIdx > 0 ? "mt-3" : ""}>
          {lines.map((line, lIdx) => {
            // Detect bullet lines for indent
            const isBullet = /^\s*(•|\d+\.|[\d]️⃣)/.test(line);
            const isSubBullet = /^\s{2,}•/.test(line);

            const formatted = line
              .replace(/\*([^*]+)\*/g, '<strong class="text-slate-900 dark:text-white font-semibold">$1</strong>')
              .replace(/•/g, '<span class="text-slate-400 dark:text-zinc-500">•</span>')
              .replace(/🛠️/g, '<span class="inline-block mt-1">🛠️</span>');

            return (
              <span
                key={lIdx}
                className={`block ${
                  isBullet ? "pl-1 mt-0.5" : ""
                }${
                  isSubBullet ? "pl-3" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: formatted }}
              />
            );
          })}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`flex items-start gap-2 mb-3 ${isBot ? "" : "flex-row-reverse"}`}
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border shadow-xs mt-0.5 ${
          isBot
            ? "bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border-slate-300 dark:border-zinc-700"
            : "bg-black dark:bg-white text-white dark:text-black border-zinc-800 dark:border-zinc-200"
        }`}
      >
        {isBot ? (
          <Bot size={14} />
        ) : (
          <User size={14} />
        )}
      </div>

      <div
        className={`max-w-[290px] px-4 py-3 text-[13px] leading-[1.65] ${
          isBot
            ? "bg-slate-100/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/50 rounded-2xl rounded-tl-sm text-slate-700 dark:text-zinc-300"
            : "bg-slate-900 dark:bg-zinc-100 rounded-2xl rounded-tr-sm text-white dark:text-zinc-900 shadow-md border border-slate-800 dark:border-zinc-200"
        }`}
      >
        <div className="break-words">
          {formatText(message.text)}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Suggestion Chips ─── */
function SuggestionChips({
  onSelect,
  context,
}: {
  onSelect: (text: string) => void;
  context: "initial" | "after_skill" | "after_project" | "general";
}) {
  const suggestionsByContext: Record<string, string[]> = {
    initial: ["Skill apa aja?", "Project apa aja?", "Contact"],
    after_skill: ["Project apa aja?", "Pengalaman kerja", "Fun fact"],
    after_project: ["Skill apa aja?", "Contact", "Siapa kamu?"],
    general: ["Skill apa aja?", "Project apa aja?", "Help"],
  };

  const suggestions = suggestionsByContext[context] || suggestionsByContext.initial;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap gap-2 mb-3 ml-9"
    >
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-700/60 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700/55 hover:border-slate-300 dark:hover:border-zinc-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {s}
        </button>
      ))}
    </motion.div>
  );
}

/* ─── Main ChatWidget ─── */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [chipContext, setChipContext] = useState<"initial" | "after_skill" | "after_project" | "general">("initial");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Send greeting when chat opens for the first time
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const greetingMsg: ChatMessage = {
        id: generateId(),
        text: GREETING,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([greetingMsg]);
      setHasGreeted(true);
    }
  }, [isOpen, hasGreeted]);

  const handleSendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        text: trimmed,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue("");
      setIsTyping(true);

      const lowerInput = trimmed.toLowerCase();
      if (lowerInput.includes("skill") || lowerInput.includes("tech")) {
        setChipContext("after_skill");
      } else if (lowerInput.includes("project") || lowerInput.includes("portfolio")) {
        setChipContext("after_project");
      } else {
        setChipContext("general");
      }

      // Try calling Gemini serverless API first
      const callGeminiAPI = async () => {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: trimmed,
              history: messages.slice(-6), // Send last 6 messages as context
            }),
          });

          if (!res.ok) throw new Error("API call failed");

          const data = await res.json();
          if (data.text) {
            return data.text;
          }
          throw new Error("Invalid response");
        } catch (err) {
          // Fallback to local rule-based engine
          return getBotResponse(trimmed);
        }
      };

      callGeminiAPI().then((botResponse) => {
        const botMsg: ChatMessage = {
          id: generateId(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      });
    },
    [isTyping, messages]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const showChips = !isTyping && messages.length > 0 && messages[messages.length - 1].sender === "bot";

  return (
    <>
      {/* ─── Floating Button ─── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300 border cursor-pointer ${
          isOpen
            ? "bg-red-500/90 hover:bg-red-500 shadow-red-500/30 border-red-400/20 text-white"
            : "bg-slate-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-black dark:hover:bg-zinc-100 shadow-black/10 dark:shadow-white/5 border-slate-800 dark:border-zinc-200"
        }`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        aria-label={isOpen ? "Tutup chat" : "Buka chat Kimshie"}
      >
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-slate-600/30 dark:border-zinc-300/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={22} />
              <Sparkles
                size={10}
                className="text-amber-500 dark:text-amber-600 absolute -top-1 -right-1"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl overflow-hidden glass-panel shadow-2xl"
            role="dialog"
            aria-label="Chat dengan Kimshie"
          >
            {/* ─── Header ─── */}
            <div className="relative px-5 py-4 border-b border-slate-200/50 dark:border-zinc-800/40 bg-slate-50/20 dark:bg-zinc-950/20">
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-300 dark:border-zinc-700 flex items-center justify-center shadow-xs">
                    <Bot size={20} />
                  </div>
                  <motion.div
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#0a0a0c]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white font-semibold text-sm">
                    {BOT_NAME}
                  </h3>
                  <p className="text-slate-500 dark:text-zinc-400 text-xs">
                    Online • Assistant
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-zinc-600">
                  <Keyboard size={12} />
                  <span>ESC</span>
                </div>
              </div>
            </div>

            {/* ─── Messages ─── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full bg-transparent">
              <AnimatePresence>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </AnimatePresence>
              <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>

              {showChips && (
                <SuggestionChips onSelect={handleSendMessage} context={chipContext} />
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── Input ─── */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-slate-200/50 dark:border-zinc-800/40 bg-slate-50/50 dark:bg-black/40"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ketik pesan..."
                  disabled={isTyping}
                  aria-label="Ketik pesan"
                  className="flex-1 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/50 rounded-xl px-4 py-2.5 text-sm text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-400 dark:focus:border-zinc-600 focus:ring-1 focus:ring-slate-300 dark:focus:ring-zinc-800 transition-all duration-200 disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-950 shadow-md disabled:opacity-40 disabled:shadow-none transition-all duration-200 hover:shadow-slate-800 dark:hover:shadow-zinc-200 cursor-pointer border border-slate-800 dark:border-zinc-200"
                  aria-label="Kirim pesan"
                >
                  <Send size={16} />
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-slate-400 dark:text-zinc-600 mt-2">
                Powered by ATNX • Monochrome Smart Assistant
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
