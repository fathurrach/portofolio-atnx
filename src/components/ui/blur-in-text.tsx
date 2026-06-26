import { motion } from "framer-motion";

interface BlurInTextProps {
  text: string;
  blurAmount?: number;
  duration?: number;
  stagger?: number;
  split?: "letter" | "word";
  trigger?: "mount" | "view";
  className?: string;
  onComplete?: () => void;
}

export const BlurInText = ({
  text,
  blurAmount = 12,
  duration = 1,
  stagger = 0.08,
  split = "letter",
  trigger = "mount",
  className = "",
  onComplete,
}: BlurInTextProps) => {
  const elements = split === "letter" ? text.split("") : text.split(" ");

  // Framer Motion Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blurAmount}px)`,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number], // Premium smooth bezier curve
      },
    },
  };

  const renderContent = () => {
    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onAnimationComplete={onComplete}
        className={cn("inline whitespace-nowrap", className)}
      >
        {elements.map((element, idx) => (
          <motion.span
            key={idx}
            variants={itemVariants}
            className="inline"
            style={{
              whiteSpace: "pre",
              animationDelay: `${idx * 0.08}s`,
            }}
          >
            {element}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  return trigger === "mount" ? (
    renderContent()
  ) : (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={cn("whitespace-nowrap", className)}
    >
      {renderContent()}
    </motion.span>
  );
};

// Simple class merger utility local
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default BlurInText;
