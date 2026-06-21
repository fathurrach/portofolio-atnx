import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CodeLine {
  text: string;
  tokens: { value: string; color: string }[];
}

const SYNTAX_COLORS = {
  keyword: "text-purple-400",
  string: "text-emerald-400",
  property: "text-sky-300",
  type: "text-amber-300",
  punctuation: "text-gray-500",
  comment: "text-gray-600 italic",
  method: "text-blue-300",
  default: "text-gray-300",
};

// Tokenized code lines — manual for crisp control
const CODE_LINES: CodeLine[] = [
  {
    text: "// who is ATNX?",
    tokens: [
      { value: "// who is ATNX?", color: SYNTAX_COLORS.comment },
    ],
  },
  {
    text: "",
    tokens: [],
  },
  {
    text: "const atnx: Developer = {",
    tokens: [
      { value: "const", color: SYNTAX_COLORS.keyword },
      { value: " atnx", color: SYNTAX_COLORS.default },
      { value: ": ", color: SYNTAX_COLORS.punctuation },
      { value: "Developer", color: SYNTAX_COLORS.type },
      { value: " = ", color: SYNTAX_COLORS.punctuation },
      { value: "{", color: SYNTAX_COLORS.punctuation },
    ],
  },
  {
    text: '  role: "Network Engineer & Builder",',
    tokens: [
      { value: "  role", color: SYNTAX_COLORS.property },
      { value: ": ", color: SYNTAX_COLORS.punctuation },
      { value: '"Network Engineer & Builder"', color: SYNTAX_COLORS.string },
      { value: ",", color: SYNTAX_COLORS.punctuation },
    ],
  },
  {
    text: '  stack: ["React", "Python", "Docker"],',
    tokens: [
      { value: "  stack", color: SYNTAX_COLORS.property },
      { value: ": ", color: SYNTAX_COLORS.punctuation },
      { value: '["React", "Python", "Docker"]', color: SYNTAX_COLORS.string },
      { value: ",", color: SYNTAX_COLORS.punctuation },
    ],
  },
  {
    text: "  philosophy: \"fix it, then automate it\",",
    tokens: [
      { value: "  philosophy", color: SYNTAX_COLORS.property },
      { value: ": ", color: SYNTAX_COLORS.punctuation },
      { value: '"fix it, then automate it"', color: SYNTAX_COLORS.string },
      { value: ",", color: SYNTAX_COLORS.punctuation },
    ],
  },
  {
    text: "};",
    tokens: [
      { value: "};", color: SYNTAX_COLORS.punctuation },
    ],
  },
];

const TypewriterCode = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayLines, setDisplayLines] = useState<CodeLine[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cursorIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Blinking cursor
    cursorIntervalRef.current = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (hasAnimated) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          setHasAnimated(true);
          let lineIndex = 0;

          const typeNextLine = () => {
            if (lineIndex >= CODE_LINES.length) return;

            const line = CODE_LINES[lineIndex];
            let charIndex = 0;
            const typedTokens: CodeLine["tokens"] = [];

            const typeChar = () => {
              if (charIndex < line.tokens.length) {
                const token = line.tokens[charIndex];
                typedTokens.push(token);
                charIndex++;
                setDisplayLines((prev) => {
                  const next = [...prev];
                  next[lineIndex] = { text: line.text, tokens: typedTokens };
                  return next;
                });
                // Next token after small delay
                gsap.delayedCall(0.06, typeChar);
              } else {
                // Line done, next line
                lineIndex++;
                gsap.delayedCall(line.text === "" ? 0.15 : 0.3, typeNextLine);
              }
            };

            typeChar();
          };

          gsap.delayedCall(0.4, typeNextLine);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col">
      {/* Window Chrome */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-t-2xl bg-black/40 dark:bg-white/5 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-400/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-green-400/80" />
        <span className="ml-auto text-[10px] font-mono text-gray-600 dark:text-gray-500 tracking-wide">
          atnx.tsx
        </span>
      </div>

      {/* Code Body */}
      <div className="flex-1 px-4 py-4 font-mono text-[11px] sm:text-xs leading-relaxed overflow-hidden">
        {displayLines.map((line, i) => (
          <div key={i} className="flex">
            <span className="w-6 text-right mr-3 text-gray-600 dark:text-gray-600 select-none shrink-0 text-[10px]">
              {line.tokens.length > 0 ? i + 1 : ""}
            </span>
            <span>
              {line.tokens.map((token, j) => (
                <span key={j} className={token.color}>
                  {token.value}
                </span>
              ))}
              {i === displayLines.length - 1 && showCursor && (
                <span className="inline-block w-[2px] h-[14px] bg-brand-primary ml-[1px] align-middle animate-pulse" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypewriterCode;
