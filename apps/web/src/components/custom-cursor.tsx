"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type CursorMode = "always" | "hover" | "never";

type CustomCursorProps = {
  cursorColor?: string;
  labelText?: string;
  labelColor?: string;
  labelTextColor?: string;
  mode?: CursorMode;
  cursorSize?: number;
  labelOffset?: { x: number; y: number };
};

// Generate cursor SVG data URI with custom color
function generateCursorSvgDataUri(cursorColor: string, size = 24): string {
  const fillColor = cursorColor.startsWith("#")
    ? cursorColor
    : `#${cursorColor}`;
  const scale = size / 20; // Original SVG is 20px wide
  const width = size;
  const height = Math.round(22 * scale); // Original SVG is 22px tall
  const hotspotX = Math.round(1 * scale); // Hotspot at tip (approximately 1, 2)
  const hotspotY = Math.round(2 * scale);

  const svg = `<svg width='${width}' height='${height}' viewBox='0 0 20 22' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.791626 2.45818C0.514908 1.30875 1.71074 0.38515 2.73889 0.89666L2.83752 0.950371L17.609 9.75115C18.6596 10.3774 18.435 11.9597 17.2516 12.2687L10.5963 14.0041L7.42542 19.7707C6.81866 20.8739 5.17229 20.6532 4.87756 19.4289L0.791626 2.45818Z' fill='${fillColor}' stroke='white' stroke-width='1.5'/></svg>`;

  return `url(data:image/svg+xml,${encodeURIComponent(svg)}) ${hotspotX} ${hotspotY}, auto`;
}

export function CustomCursor({
  cursorColor = "#907cff",
  labelText = "",
  labelColor = "#907cff",
  labelTextColor = "#ffffff",
  mode = "hover",
  cursorSize = 24,
  labelOffset = { x: 60, y: 15 },
}: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string>("");

  const labelX = useMotionValue(-100);
  const labelY = useMotionValue(-100);

  const springConfig = { damping: 50, stiffness: 300 };
  const labelXSpring = useSpring(labelX, springConfig);
  const labelYSpring = useSpring(labelY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      labelX.set(e.clientX + labelOffset.x);
      labelY.set(e.clientY + labelOffset.y);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setHoverLabel("");
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for data-cursor-label attribute on the element or its parents
      const elementWithLabel = target.closest(
        "[data-cursor-label]"
      ) as HTMLElement | null;

      if (elementWithLabel) {
        const label = elementWithLabel.getAttribute("data-cursor-label");
        setHoverLabel(label || "");
      } else {
        setHoverLabel("");
      }
    };

    // Update CSS variable with cursor SVG
    const cursorValue = generateCursorSvgDataUri(cursorColor, cursorSize);
    document.documentElement.style.setProperty(
      "--f-cursor-default",
      cursorValue
    );

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorColor, cursorSize, labelX, labelY, labelOffset]);

  const displayLabel = hoverLabel || labelText;
  const shouldShowLabel = () => {
    if (mode === "never") return false;
    if (mode === "always") return !!displayLabel;
    if (mode === "hover") return !!hoverLabel;
    return false;
  };

  if (!isVisible || mode === "never") return null;

  return (
    <>
      {/* Label */}
      {shouldShowLabel() && displayLabel && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[9998]"
          style={{
            x: labelXSpring,
            y: labelYSpring,
            translateX: -50,
            translateY: 0,
          }}
        >
          <div
            className="flex items-center gap-2 rounded px-3 py-1.5 shadow-lg"
            style={{
              backgroundColor: labelColor,
              color: labelTextColor,
              boxShadow: "0px 5.486px 10.971px 0px rgba(0,0,0,0.12)",
            }}
          >
            <p className="whitespace-nowrap font-normal text-sm tracking-wide">
              {displayLabel}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
