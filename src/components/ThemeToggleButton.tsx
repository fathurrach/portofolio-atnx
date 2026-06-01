import { motion } from "framer-motion";
import { flushSync } from "react-dom";

// Simple class merger utility
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface ThemeToggleButtonProps {
  className?: string;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const ThemeToggleButton1 = ({
  className = "",
  theme,
  toggleTheme,
}: ThemeToggleButtonProps) => {
  const isDark = theme === "dark";

  const handleToggle = () => {
    // Graceful fallback for older browsers that do not support View Transitions
    if (!(document as any).startViewTransition) {
      toggleTheme();
      return;
    }

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });

    transition.ready.then(() => {
      const duration = 400;
      // Premium "shrink-grow" transition animation:
      // scale down old view while scaling up new view
      document.documentElement.animate(
        [
          { transform: "scale(0.95)", opacity: 0 },
          { transform: "scale(1)", opacity: 1 },
        ],
        {
          duration: duration * 1.2,
          easing: "cubic-bezier(0.19, 1, 0.22, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      document.documentElement.animate(
        [
          { transform: "scale(1)", opacity: 1 },
          { transform: "scale(1.05)", opacity: 0 },
        ],
        {
          duration: duration * 1.2,
          easing: "cubic-bezier(0.19, 1, 0.22, 1)",
          pseudoElement: "::view-transition-old(root)",
        }
      );
    });
  };

  return (
    <>
      <button
        type="button"
        className={cn(
          "rounded-full bg-black text-white dark:bg-black dark:text-white light:bg-gray-200 light:text-black transition-all duration-300 active:scale-95 w-10 h-10 p-2 flex items-center justify-center border border-white/10 dark:border-white/10 light:border-black/15 shadow-sm interactive cursor-pointer hover:border-brand-primary/30",
          className,
        )}
        onClick={handleToggle}
        aria-label="Toggle theme"
      >
        <svg
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <motion.g
            animate={{ rotate: isDark ? -180 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
          >
            <path
              d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
              fill="white"
            />
            <path
              d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
              fill="black"
            />
          </motion.g>
          <motion.path
            animate={{ rotate: isDark ? 180 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
            fill={isDark ? "white" : "currentColor"}
          />
        </svg>
      </button>

      {/* Dynamic inline styles to prevent default fade transitions */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            ::view-transition-old(root),
            ::view-transition-new(root) {
              animation: none;
              mix-blend-mode: normal;
            }
          `,
        }}
      />
    </>
  );
};

export default ThemeToggleButton1;
