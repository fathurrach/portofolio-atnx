import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Keyboard } from "lucide-react";
import {
  getBotResponse,
  generateId,
  type ChatMessage,
} from "../utils/chatbot";
import { BOT_NAME, GREETING } from "../data/portfolio";

/* ─── Simple Chat Icon (clean & minimal) ─── */
function ChatIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/* ─── Typing Indicator ─── */
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-end gap-2 mb-3"
    >
      <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700 flex items-center justify-center shrink-0">
        <Bot size={14} />
      </div>
      <div className="bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl rounded-bl-sm px-4 py-3.5">
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-zinc-500"
              animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
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

  const formatText = (text: string) => {
    const paragraphs = text.split("\n\n");

    return paragraphs.map((para, pIdx) => {
      const lines = para.split("\n");

      return (
        <div key={pIdx} className={pIdx > 0 ? "mt-2.5" : ""}>
          {lines.map((line, lIdx) => {
            const isBullet = /^\s*(•|\d+\.|[\d]️⃣)/.test(line);
            const isHeading = /^\*[^*]+\*:?\s*$/.test(line.trim());

            let formatted = line
              .replace(
                /\*\*([^*]+)\*\*/g,
                '<strong class="text-slate-900 dark:text-white font-semibold">$1</strong>'
              )
              .replace(
                /\*([^*]+)\*/g,
                '<strong class="text-slate-900 dark:text-white font-semibold">$1</strong>'
              )
              .replace(
                /•/g,
                '<span class="text-slate-400 dark:text-zinc-500 mr-1">•</span>'
              );

            return (
              <span
                key={lIdx}
                className={`block leading-[1.6] ${
                  isBullet ? "pl-2 mt-[2px]" : ""
                } ${isHeading && pIdx > 0 ? "mt-2 first:mt-0" : ""}`}
                dangerouslySetInnerHTML={{ __html: formatted }}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`flex items-end gap-2 mb-3 ${
        isBot ? "" : "flex-row-reverse"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
          isBot
            ? "bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-300 dark:border-zinc-700"
            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-700 dark:border-zinc-300"
        }`}
      >
        {isBot ? <Bot size={13} /> : <User size={13} />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[280px] px-3.5 py-2.5 text-[13px] ${
          isBot
            ? "bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl rounded-bl-sm text-slate-700 dark:text-zinc-300"
            : "bg-slate-900 dark:bg-white rounded-2xl rounded-br-sm text-white dark:text-slate-900 border border-slate-800 dark:border-zinc-200"
        }`}
      >
        <div className="break-words">{formatText(message.text)}</div>
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
    initial: ["Skill apa aja?", "Project apa aja?", "Kenalan dulu"],
    after_skill: ["Project apa aja?", "Pengalaman kerja", "Fun fact"],
    after_project: ["Skill apa aja?", "Contact", "Siapa kamu?"],
    general: ["Skill apa aja?", "Project apa aja?", "Help"],
  };

  const suggestions =
    suggestionsByContext[context] || suggestionsByContext.initial;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.25 }}
      className="flex flex-wrap gap-1.5 mb-3 ml-9"
    >
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700 hover:text-slate-700 dark:hover:text-zinc-200 transition-all duration-200 cursor-pointer"
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
  const [chipContext, setChipContext] = useState<
    "initial" | "after_skill" | "after_project" | "general"
  >("initial");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
      } else if (
        lowerInput.includes("project") ||
        lowerInput.includes("portfolio")
      ) {
        setChipContext("after_project");
      } else {
        setChipContext("general");
      }

      const currentMessages = [...messages, userMsg];

      const callGeminiAPI = async (): Promise<string> => {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: trimmed,
              history: currentMessages.slice(-8),
            }),
          });

          if (!res.ok) throw new Error(`API ${res.status}`);

          const data = await res.json();
          if (data.text) return data.text;
          throw new Error("No text");
        } catch {
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

  const showChips =
    !isTyping &&
    messages.length > 0 &&
    messages[messages.length - 1].sender === "bot";

  return (
    <>
      {/* ─── Floating Button ─── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 cursor-pointer ${
          isOpen
            ? "bg-slate-900 dark:bg-zinc-100 text-white dark:text-slate-900 border border-slate-700 dark:border-zinc-300"
            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border border-slate-700 dark:border-zinc-200"
        }`}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1.5,
        }}
        aria-label={isOpen ? "Tutup chat" : "Buka chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <X size={18} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <ChatIcon size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-[68px] right-5 sm:bottom-[76px] sm:right-6 z-50 w-[360px] max-w-[calc(100vw-40px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#0e0e12]"
            style={{ height: "min(500px, calc(100vh - 120px))" }}
            role="dialog"
            aria-label="Chat dengan Kimshie"
          >
            {/* ─── Header ─── */}
            <div className="px-4 py-3.5 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-[#111116] shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div className="absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full bg-emerald-500 border-[1.5px] border-white dark:border-[#111116]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-slate-900 dark:text-white font-semibold text-sm leading-tight">
                    {BOT_NAME}
                  </h3>
                  <p className="text-slate-400 dark:text-zinc-500 text-[11px] leading-tight mt-0.5">
                    Online • ATNX Assistant
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-[9px] text-slate-300 dark:text-zinc-700 shrink-0">
                  <Keyboard size={10} />
                  <span>ESC</span>
                </div>
              </div>
            </div>

            {/* ─── Messages ─── */}
            <div
              ref={messagesContainerRef}
              data-lenis-prevent
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-3.5 py-3.5 bg-slate-50/50 dark:bg-[#0a0a0e] [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </AnimatePresence>
              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>

              {showChips && (
                <SuggestionChips
                  onSelect={handleSendMessage}
                  context={chipContext}
                />
              )}

              <div ref={messagesEndRef} className="h-px" />
            </div>

            {/* ─── Input ─── */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-2.5 border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-[#111116] shrink-0"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tanya soal Fathur..."
                  disabled={isTyping}
                  aria-label="Ketik pesan"
                  className="flex-1 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2 text-[13px] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-slate-300 dark:focus:border-zinc-600 transition-all duration-200 disabled:opacity-40"
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 disabled:opacity-30 transition-all duration-200 cursor-pointer"
                  aria-label="Kirim pesan"
                >
                  <Send size={14} />
                </motion.button>
              </div>
              <p className="text-center text-[9px] text-slate-300 dark:text-zinc-700 mt-1.5 tracking-wide">
                powered by ATNX
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
