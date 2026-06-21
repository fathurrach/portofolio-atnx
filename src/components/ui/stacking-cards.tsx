import { useEffect, useRef, useState, type ReactNode } from "react";

export interface StackCard {
  id: number | string;
  content: ReactNode;
  backgroundImage?: string;
}

interface StackingCardsProps {
  cards: StackCard[];
  /** Height of each card in px */
  cardHeight?: number;
  /** Scroll distance per card transition in px */
  scrollPerCard?: number;
  className?: string;
}

const StackingCards = ({
  cards,
  cardHeight = 480,
  scrollPerCard = 350,
  className = "",
}: StackingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyPanelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(0);
  const [vpH, setVpH] = useState(600);
  const [isMobile, setIsMobile] = useState(false);

  const containerOffsetRef = useRef(0);

  const N = cards.length;
  const totalScrollZone = N * scrollPerCard;

  // Dynamic card height: taller on mobile to prevent content clipping
  const effectiveCardHeight = isMobile
    ? Math.max(cardHeight, Math.min(vpH * 0.85, 700))
    : cardHeight;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const elRect = el.getBoundingClientRect();
      containerOffsetRef.current = elRect.top + window.scrollY;
      setVpH(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };

    const measureTimer = setTimeout(measure, 150);

    let animId: number | null = null;
    const update = () => {
      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const currentScrolled = Math.max(
          0,
          scrollTop - containerOffsetRef.current
        );

        if (stickyPanelRef.current) {
          const innerTop = Math.min(currentScrolled, totalScrollZone);
          stickyPanelRef.current.style.transform = `translateY(${innerTop}px)`;
        }

        setScrolled(currentScrolled);
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        measure();
        update();
      },
      { passive: true }
    );
    update();

    return () => {
      clearTimeout(measureTimer);
      window.removeEventListener("scroll", update);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [totalScrollZone]);

  const h = vpH || 600;

  // Determine which card index is currently "active" (topmost visible)
  const activeIndex = Math.min(
    N - 1,
    Math.floor(scrolled / scrollPerCard)
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: h + totalScrollZone }}
    >
      <div
        ref={stickyPanelRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: h,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          willChange: "transform",
        }}
      >
        {/* Card stack container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: effectiveCardHeight,
          }}
        >
          {cards.map((card, index) => {
            const revealAt = index * scrollPerCard;
            const isVisible = scrolled >= revealAt;

            const above = Math.max(
              0,
              Math.min(
                N - 1 - index,
                Math.floor((scrolled - revealAt) / scrollPerCard)
              )
            );

            const entryProgress = isVisible
              ? Math.min(1, (scrolled - revealAt) / 100)
              : 0;
            const entryY = (1 - entryProgress) * 100;
            const pushY = above * 14;
            const scale = 1 - above * 0.035;
            const opacity = isVisible ? Math.max(0.5, 1 - above * 0.12) : 0;

            // Only the active (topmost) card should receive pointer events
            const isActive = index === activeIndex;

            return (
              <div
                key={card.id}
                className="absolute inset-x-0 overflow-hidden rounded-2xl md:rounded-3xl"
                style={{
                  height: effectiveCardHeight,
                  top: 0,
                  zIndex: 10 + index,
                  transform: `translateY(${entryY - pushY}px) scale(${scale})`,
                  opacity,
                  transition:
                    "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease",
                  willChange: "transform, opacity",
                  transformOrigin: "center top",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {/* Full-width background image */}
                {card.backgroundImage && (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url('${card.backgroundImage}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    {/* Light bottom gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  </>
                )}

                {/* Card content slot */}
                <div className="absolute inset-0 z-10">{card.content}</div>

                {/* Card index indicator */}
                <div className="absolute bottom-4 right-5 z-20 text-white/30 text-[10px] font-mono tracking-[0.25em]">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(N).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-50">
          {cards.map((_, i) => {
            const active = scrolled >= i * scrollPerCard;
            return (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: active ? 8 : 4,
                  height: active ? 8 : 4,
                  background: active
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(120,120,120,0.3)",
                  boxShadow: active
                    ? "0 0 8px rgba(255,255,255,0.4)"
                    : "none",
                }}
              />
            );
          })}
        </div>

        {/* Scroll hint */}
        {scrolled < 30 && (
          <div className="absolute bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none">
            <p className="text-[10px] text-white/30 tracking-[0.25em] uppercase font-mono animate-bounce">
              scroll to explore
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackingCards;
