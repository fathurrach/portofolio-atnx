import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  type: "dot" | "star" | "plus";
  color: string;
}

const LoadingScreen = ({ onComplete, minDuration = 2200 }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Generate 40 sprinkles/particles as initial state to avoid cascading render within useEffect
  const [particles] = useState<Particle[]>(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const types: Array<"dot" | "star" | "plus"> = ["dot", "dot", "star", "plus"];
      const opacity = Math.random() * 0.45 + 0.15; // 0.15 to 0.6
      
      // Strictly monochrome (shades of white, silver, and gray) to match black/white/gray theme
      const randColor = Math.random();
      let color = `rgba(255, 255, 255, ${opacity})`; // white
      if (randColor > 0.8) {
        color = `rgba(150, 150, 150, ${opacity})`; // mid-gray
      } else if (randColor > 0.5) {
        color = `rgba(200, 200, 200, ${opacity})`; // light-gray
      }

      return {
        id: i,
        x: Math.random() * 100, // percentage left
        y: Math.random() * 100, // percentage top
        size: Math.random() * 3 + 2, // 2px to 5px
        delay: Math.random() * 1.5, // 0s to 1.5s
        duration: Math.random() * 3 + 3, // 3s to 6s
        opacity,
        type: types[Math.floor(Math.random() * types.length)],
        color,
      };
    });
  });

  useEffect(() => {
    const startTime = Date.now();
    let animFrame: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const raw = Math.min(elapsed / minDuration, 1);
      // Ease-out curve for smooth progress
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(eased * 100);

      if (raw < 1) {
        animFrame = requestAnimationFrame(tick);
      } else {
        // Start fade-out
        setFadeOut(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    };

    animFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animFrame);
  }, [minDuration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0c] transition-all duration-600 ${
        fadeOut ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
    >


      {/* Decorative sprinkles/particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {particles.map((p) => {
          const style = {
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            animation: `floatSprinkle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            color: p.color,
          } as React.CSSProperties;

          if (p.type === "star") {
            return (
              <div key={p.id} className="absolute" style={style}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 0L15.5 8.5L24 12L15.5 15.5L12 24L8.5 15.5L0 12L8.5 8.5Z" />
                </svg>
              </div>
            );
          }

          if (p.type === "plus") {
            return (
              <div key={p.id} className="absolute" style={style}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-full h-full">
                  <line x1="12" y1="4" x2="12" y2="20" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                </svg>
              </div>
            );
          }

          // Default dot
          return (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                ...style,
                backgroundColor: "currentColor",
              }}
            />
          );
        })}
      </div>

      {/* Logo Container */}
      <div className="relative flex items-center justify-center mb-10 z-20">
        {/* 3D Spinning Logo */}
        <div style={{ perspective: "800px" }}>
          <img
            src="/images/logo/logo.png"
            alt="ATNX Logo Loading"
            className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            style={{
              animation: "loaderSpin3D 2.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
              filter: "invert(0)",
            }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-48 md:w-56 h-[2px] bg-white/5 rounded-full overflow-hidden mb-5 z-20">
        <div
          className="h-full rounded-full transition-all duration-100 ease-out"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.6), rgba(255,255,255,0.1))",
            backgroundSize: "200% 100%",
            animation: "loaderShimmer 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes loaderSpin3D {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }



        @keyframes loaderShimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes floatSprinkle {
          0% {
            transform: translateY(20px) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-60px) rotate(180deg) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
