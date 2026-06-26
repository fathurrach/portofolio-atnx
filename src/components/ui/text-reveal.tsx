import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  className?: string;
}

export const TextReveal = ({
  text,
  duration = 0.8,
  stagger = 0.04,
  delay = 0.05,
  className = "",
}: TextRevealProps) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "110%",
      rotate: 3,
    },
    visible: {
      y: "0%",
      rotate: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom ultra-smooth cubic-bezier (out-expo style)
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.22em] py-[0.15em] -my-[0.15em]"
        >
          <motion.span
            variants={wordVariants}
            className="inline-block origin-left"
          >
            {word === "" ? "\u00A0" : word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
