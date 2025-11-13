"use client";

import { useEffect, useRef, useState } from "react";

type FigmaRulersProps = {
  enabled?: boolean;
};

export function FigmaRulers({ enabled = true }: FigmaRulersProps) {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const horizontalRulerRef = useRef<HTMLDivElement>(null);
  const verticalRulerRef = useRef<HTMLDivElement>(null);
  const guideContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (!mounted) {
      return;
    }

    const updateDimensions = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("scroll", updateDimensions, { passive: true });

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", updateDimensions);
    };
  }, [enabled, mounted]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (!mounted) {
      return;
    }
    const horizontalRuler = horizontalRulerRef.current;
    const verticalRuler = verticalRulerRef.current;
    if (!(horizontalRuler && verticalRuler)) {
      return;
    }

    horizontalRuler.scrollLeft = scrollX;
    verticalRuler.scrollTop = scrollY;
  }, [scrollX, scrollY, enabled, mounted]);

  const shouldRender = enabled && mounted;
  if (!shouldRender) {
    return null;
  }

  const tickInterval = 50; // Cada 50px
  const majorTickInterval = 250; // Cada 250px

  type Tick = {
    position: number;
    value: number;
    isMajor: boolean;
  };

  // Generar ticks para la regla horizontal
  const generateHorizontalTicks = (): Tick[] => {
    const ticks: Tick[] = [];
    const start = Math.floor(scrollX / tickInterval) * tickInterval;
    const end = scrollX + viewportWidth + tickInterval;

    for (let i = start; i <= end; i += tickInterval) {
      const isMajor = i % majorTickInterval === 0;
      ticks.push({
        position: i - scrollX,
        value: i,
        isMajor,
      });
    }
    return ticks;
  };

  // Generar ticks para la regla vertical
  const generateVerticalTicks = (): Tick[] => {
    const ticks: Tick[] = [];
    const headerHeight = 64;
    const visibleStart = scrollY;
    const visibleEnd = scrollY + viewportHeight - headerHeight;
    const start = Math.floor(visibleStart / tickInterval) * tickInterval;
    const end = visibleEnd + tickInterval;

    for (let i = start; i <= end; i += tickInterval) {
      const isMajor = i % majorTickInterval === 0;
      ticks.push({
        position: i - scrollY,
        value: i,
        isMajor,
      });
    }
    return ticks;
  };

  const headerHeight = 64; // 16 * 4 = 64px (h-16)

  return (
    <>
      {/* Regla horizontal (arriba) */}
      <div
        className="pointer-events-none fixed left-0 z-[100] hidden border-light-background-secondary border-b bg-light-background/95 backdrop-blur-sm md:block"
        style={{
          width: `${viewportWidth}px`,
          top: `${headerHeight}px`,
          height: "24px",
          paddingTop: "2px",
        }}
      >
        <div
          className="relative h-full"
          ref={horizontalRulerRef}
          style={{ width: `${viewportWidth}px`, overflow: "visible" }}
        >
          {generateHorizontalTicks().map((tick) => (
            <div
              className="absolute top-0 flex flex-col items-center"
              key={tick.value}
              style={{ left: `${tick.position}px` }}
            >
              <div
                className={`w-px bg-light-background-secondary ${tick.isMajor ? "h-4" : "h-2"}`}
              />
              {tick.isMajor && (
                <span className="mt-0.5 whitespace-nowrap bg-light-background/95 px-1 font-mono text-[10px] text-light-secondary leading-none">
                  {tick.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Regla vertical (izquierda) */}
      <div
        className="pointer-events-none fixed left-0 z-[100] hidden border-light-background-secondary border-r bg-light-background/95 backdrop-blur-sm md:block"
        style={{
          height: `${viewportHeight - headerHeight}px`,
          top: `${headerHeight}px`,
          width: "24px",
          paddingLeft: "2px",
        }}
      >
        <div
          className="relative h-full w-full"
          ref={verticalRulerRef}
          style={{
            height: `${viewportHeight - headerHeight}px`,
            overflow: "visible",
          }}
        >
          {generateVerticalTicks().map((tick) => {
            // Ajustar la posición del tick restando el scrollY y el headerHeight
            const adjustedPosition = tick.position;
            return (
              <div
                className="absolute left-0 flex flex-row items-center"
                key={tick.value}
                style={{ top: `${adjustedPosition}px` }}
              >
                <div
                  className={`h-px bg-light-background-secondary ${tick.isMajor ? "w-4" : "w-2"}`}
                />
                {tick.isMajor && (
                  <span
                    className="ml-0.5 whitespace-nowrap bg-light-background/95 px-0.5 py-0.5 font-mono text-[10px] text-light-secondary leading-none"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {tick.value}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Container invisible para posicionar las líneas rojas */}
      <div
        className="pointer-events-none fixed right-0 left-0 z-[90] mx-auto hidden max-w-7xl px-4 md:block"
        ref={guideContainerRef}
        style={{
          top: `${headerHeight}px`,
          height: `${viewportHeight - headerHeight}px`,
        }}
      >
        {/* Línea izquierda */}
        <div
          className="absolute top-0 left-0 w-[1px] bg-red-500"
          style={{
            height: `${viewportHeight - headerHeight}px`,
          }}
        />
        {/* Línea derecha */}
        <div
          className="absolute top-0 right-0 w-[1px] bg-red-500"
          style={{
            height: `${viewportHeight - headerHeight}px`,
          }}
        />
      </div>
    </>
  );
}
