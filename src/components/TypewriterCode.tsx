import { useEffect, useRef, useState, useCallback } from "react";

interface CodeToken {
  value: string;
  color: string;
}

interface CodeLine {
  text: string;
  tokens: CodeToken[];
}

const C = {
  keyword: "text-purple-400",
  string: "text-emerald-400",
  property: "text-sky-300",
  type: "text-amber-300",
  punctuation: "text-gray-500",
  comment: "text-gray-500 italic",
  default: "text-gray-300",
};

const CODE_LINES: CodeLine[] = [
  {
    text: "// who is ATNX?",
    tokens: [{ value: "// who is ATNX?", color: C.comment }],
  },
  {
    text: "const atnx: Developer = {",
    tokens: [
      { value: "const", color: C.keyword },
      { value: " atnx", color: C.default },
      { value: ": ", color: C.punctuation },
      { value: "Developer", color: C.type },
      { value: " = ", color: C.punctuation },
      { value: "{", color: C.punctuation },
    ],
  },
  {
    text: '  role: "Network Engineer & Builder",',
    tokens: [
      { value: "  role", color: C.property },
      { value: ": ", color: C.punctuation },
      { value: '"Network Engineer & Builder"', color: C.string },
      { value: ",", color: C.punctuation },
    ],
  },
  {
    text: '  stack: ["React", "Python", "Docker"],',
    tokens: [
      { value: "  stack", color: C.property },
      { value: ": ", color: C.punctuation },
      { value: '["React", "Python", "Docker"]', color: C.string },
      { value: ",", color: C.punctuation },
    ],
  },
  {
    text: '  philosophy: "fix it, then automate it",',
    tokens: [
      { value: "  philosophy", color: C.property },
      { value: ": ", color: C.punctuation },
      { value: '"fix it, then automate it"', color: C.string },
      { value: ",", color: C.punctuation },
    ],
  },
  {
    text: "};",
    tokens: [{ value: "};", color: C.punctuation }],
  },
];

const TypewriterCode = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [displayLines, setDisplayLines] = useState<CodeLine[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const startedRef = useRef(false);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const runTypewriter = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let lineIdx = 0;

    const typeLine = () => {
      if (lineIdx >= CODE_LINES.length) return;

      const line = CODE_LINES[lineIdx];
      let tokenIdx = 0;
      const tokens: CodeToken[] = [];

      const typeToken = () => {
        if (line.tokens.length === 0) {
          setDisplayLines((prev) => {
            const next = [...prev];
            next[lineIdx] = { text: "", tokens: [] };
            return next;
          });
          lineIdx++;
          setTimeout(typeLine, 150);
          return;
        }

        if (tokenIdx < line.tokens.length) {
          tokens.push(line.tokens[tokenIdx]);
          tokenIdx++;
          setDisplayLines((prev) => {
            const next = [...prev];
            next[lineIdx] = { text: line.text, tokens: [...tokens] };
            return next;
          });
          setTimeout(typeToken, 60);
        } else {
          lineIdx++;
          setTimeout(typeLine, line.text === "" ? 100 : 280);
        }
      };

      typeToken();
    };

    typeLine();
  }, []);

  // IntersectionObserver — fires when card scrolls into view
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runTypewriter();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [runTypewriter]);

  return (
    <div ref={wrapperRef} className="w-full h-full flex flex-col">
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
      <div className="flex-1 px-4 py-4 font-mono text-[11px] sm:text-xs leading-relaxed overflow-hidden min-h-[160px]">
        {displayLines.map((line, i) => (
          <div key={i} className="flex whitespace-pre min-h-[18px]">
            <span className="w-6 text-right mr-3 text-gray-600 dark:text-gray-600 select-none shrink-0 text-[10px]">
              {line.tokens.length > 0 || line.text !== undefined ? i + 1 : ""}
            </span>
            <span>
              {line.tokens.map((token, j) => (
                <span key={j} className={token.color}>
                  {token.value}
                </span>
              ))}
              {i === displayLines.length - 1 && cursorVisible && (
                <span className="inline-block w-[2px] h-[14px] bg-brand-primary ml-[1px] align-middle" />
              )}
            </span>
          </div>
        ))}
        {displayLines.length === 0 && (
          <span className="inline-block w-[2px] h-[14px] bg-brand-primary animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default TypewriterCode;
