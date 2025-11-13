"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";

type PopoverProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
};

export function Popover({
  children,
  content,
  className,
  side = "bottom",
  align = "center",
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside([containerRef, popoverRef], () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && containerRef.current && popoverRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (side) {
        case "bottom":
          top = containerRect.bottom + 8;
          break;
        case "top":
          top = containerRect.top - popoverRect.height - 8;
          break;
        case "right":
          left = containerRect.right + 8;
          top = containerRect.top;
          break;
        case "left":
          left = containerRect.left - popoverRect.width - 8;
          top = containerRect.top;
          break;
      }

      switch (align) {
        case "start":
          left = containerRect.left;
          break;
        case "center":
          left = containerRect.left + (containerRect.width - popoverRect.width) / 2;
          break;
        case "end":
          left = containerRect.right - popoverRect.width;
          break;
      }

      setPosition({ top, left });
    }
  }, [isOpen, side, align]);

  return (
    <div ref={containerRef} className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popoverRef}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "fixed z-[200] rounded-xl bg-[#1e1e1e] px-0 py-2 shadow-[0px_0px_0.5px_0px_rgba(0,0,0,0.12),0px_10px_16px_0px_rgba(0,0,0,0.12),0px_2px_5px_0px_rgba(0,0,0,0.15)]",
              className
            )}
            exit={{ opacity: 0, scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.95 }}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

