import { useEffect, useRef, useState } from "react";

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
}

export const TextType = ({
  text,
  typingSpeed = 75,
  deletingSpeed = 35,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
}: TextTypeProps) => {
  const [displayText, setDisplayText] = useState("");
  const timerRef = useRef<number | null>(null);
  const stateRef = useRef({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
  });

  useEffect(() => {
    stateRef.current = { wordIndex: 0, charIndex: 0, isDeleting: false };

    const tick = () => {
      if (!text || text.length === 0) return;

      const { wordIndex, charIndex, isDeleting } = stateRef.current;
      const fullWord = text[wordIndex];

      if (!isDeleting) {
        // Typing forward
        if (charIndex < fullWord.length) {
          const nextCharIndex = charIndex + 1;
          stateRef.current.charIndex = nextCharIndex;
          setDisplayText(fullWord.slice(0, nextCharIndex));
          timerRef.current = window.setTimeout(tick, typingSpeed);
        } else {
          // Full word typed — pause then start deleting
          timerRef.current = window.setTimeout(() => {
            stateRef.current.isDeleting = true;
            tick();
          }, pauseDuration);
        }
      } else {
        // Deleting backward
        if (charIndex > 0) {
          const nextCharIndex = charIndex - 1;
          stateRef.current.charIndex = nextCharIndex;
          setDisplayText(fullWord.slice(0, nextCharIndex));
          timerRef.current = window.setTimeout(tick, deletingSpeed);
        } else {
          // Fully deleted — move to next word and start typing
          stateRef.current.isDeleting = false;
          stateRef.current.wordIndex = (wordIndex + 1) % text.length;
          stateRef.current.charIndex = 0;
          setDisplayText("");
          timerRef.current = window.setTimeout(tick, typingSpeed);
        }
      }
    };

    // Start the typing loop
    timerRef.current = window.setTimeout(tick, typingSpeed);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className="animate-pulse ml-0.5 inline-block font-sans text-brand-primary" style={{ animationDuration: "1s" }}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextType;
