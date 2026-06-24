import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, Keyboard } from "lucide-react";
import {
  getBotResponse,
  generateId,
  getTypingDelay,
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
      <div className="w-7 h-7 rounded-full bg-linear-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
        <Bot size={14} className="text-white" />
      </div>
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-400"
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
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

  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const formatted = line
        .replace(/\*([^*]+)\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/•/g, '<span class="text-purple-400">•</span>');

      return (
        <span key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
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
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
          isBot
            ? "bg-linear-to-br from-purple-500 to-fuchsia-500 shadow-purple-500/20"
            : "bg-linear-to-br from-cyan-500 to-blue-500 shadow-cyan-500/20"
        }`}
      >
        {isBot ? (
          <Bot size={14} className="text-white" />
        ) : (
          <User size={14} className="text-white" />
        )}
      </div>

      <div
        className={`max-w-[280px] px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? "bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-sm text-gray-200"
            : "bg-linear-to-br from-purple-600 to-fuchsia-600 rounded-2xl rounded-tr-sm text-white shadow-lg shadow-purple-500/20"
        }`}
      >
        <div className="whitespace-pre-wrap break-words">
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
          className="text-xs px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
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

      const botResponse = getBotResponse(trimmed);
      const delay = getTypingDelay(botResponse);

      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: generateId(),
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping]
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
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 cursor-pointer ${
          isOpen
            ? "bg-red-500/90 hover:bg-red-500 shadow-red-500/30"
            : "bg-linear-to-br from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-purple-500/40"
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
            className="absolute inset-0 rounded-full border-2 border-purple-400/50"
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
              <X size={22} className="text-white" />
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
              <MessageCircle size={22} className="text-white" />
              <Sparkles
                size={10}
                className="text-yellow-300 absolute -top-1 -right-1"
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
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{
              background:
                "linear-gradient(145deg, rgba(15,15,25,0.95), rgba(20,15,35,0.95))",
              backdropFilter: "blur(20px)",
            }}
            role="dialog"
            aria-label="Chat dengan Kimshie"
          >
            {/* ─── Header ─── */}
            <div className="relative px-5 py-4 border-b border-white/10">
              <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-fuchsia-600/20" />
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Bot size={20} className="text-white" />
                  </div>
                  <motion.div
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0f0f19]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {BOT_NAME}
                  </h3>
                  <p className="text-purple-300/70 text-xs">
                    Online • ATNX Digital Assistant
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-[10px] text-gray-500">
                  <Keyboard size={12} />
                  <span>ESC</span>
                </div>
              </div>
            </div>

            {/* ─── Messages ─── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
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
              className="px-4 py-3 border-t border-white/10 bg-black/20"
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
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-200 disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 disabled:opacity-40 disabled:shadow-none transition-all duration-200 hover:shadow-purple-500/50 cursor-pointer"
                  aria-label="Kirim pesan"
                >
                  <Send size={16} />
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-gray-600 mt-2">
                Powered by ATNX • Smart Rule-Based AI
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
