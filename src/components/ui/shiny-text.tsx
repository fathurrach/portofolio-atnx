import { useRef, useState } from "react";

interface ShinyTextProps {
  text: string;
  shineColor?: string;
  duration?: number;
  shimmerWidth?: number;
  trigger?: "mount" | "loop" | "hover";
  className?: string;
}

export const ShinyText = ({
  text,
  shineColor = "rgba(255, 255, 255, 1)",
  duration = 3,
  shimmerWidth = 200,
  trigger = "loop",
  className = "",
}: ShinyTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted] = useState(true);

  const shouldAnimate =
    trigger === "loop" ||
    (trigger === "mount" && isMounted) ||
    (trigger === "hover" && isHovered);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundImage: shouldAnimate
          ? `linear-gradient(
              90deg,
              currentColor 0%,
              currentColor calc(50% - ${shimmerWidth / 2}px),
              ${shineColor} 50%,
              currentColor calc(50% + ${shimmerWidth / 2}px),
              currentColor 100%
            )`
          : "none",
        color: shouldAnimate ? "transparent" : "currentColor",
        backgroundClip: shouldAnimate ? "text" : "unset",
        WebkitBackgroundClip: shouldAnimate ? "text" : "unset",
        backgroundSize: shouldAnimate ? "300% 100%" : "auto",
        backgroundPosition: shouldAnimate ? "100% 0" : "auto",
        animation: shouldAnimate
          ? `shiny-text-shimmer ${duration}s ease-in-out infinite`
          : "none",
      }}
    >
      {text}
      <style>{`
        @keyframes shiny-text-shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `}</style>
    </span>
  );
};

export default ShinyText;
