"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";

type CommentProps = {
  avatarUrl?: string;
  avatarAlt?: string;
  className?: string;
  hasNotification?: boolean;
  authorName?: string;
  timestamp?: string;
  message?: string;
};

export function Comment({
  avatarUrl = "https://res.cloudinary.com/dyzxnud9z/image/upload/v1759818651/smoothui/educalvolpz.jpg",
  avatarAlt = "Avatar",
  className,
  hasNotification = false,
  authorName = "Jenny Wen",
  timestamp = "Just now",
  message = "What happens if we adjust this to handle a light and dark mode? I'm not sure if we're ready to handle...",
}: CommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(32);

  // Close comment when clicking outside
  useClickOutside(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  // Debug: log when contentHeight changes
  useEffect(() => {
    console.log("contentHeight changed to:", contentHeight);
  }, [contentHeight]);

  // Debug: log when isOpen changes
  useEffect(() => {
    console.log("isOpen changed to:", isOpen, "contentHeight:", contentHeight);
  }, [isOpen, contentHeight]);

  // Measure content height when component mounts
  useEffect(() => {
    const measureHeight = () => {
      if (contentRef.current) {
        // Get the inner div that contains the actual content
        const innerDiv = contentRef.current.firstElementChild as HTMLElement;
        if (innerDiv) {
          // Measure the actual height including padding
          const height = innerDiv.scrollHeight;
          // console.log(
          //   "Measured height:",
          //   height,
          //   "offsetHeight:",
          //   innerDiv.offsetHeight
          // );
          if (height > 0) {
            setContentHeight(height);
          }
        }
      }
    };

    // Use setTimeout to ensure DOM is fully rendered
    const timeoutId = setTimeout(measureHeight, 100);
    // Also try after a longer delay in case fonts haven't loaded
    const timeoutId2 = setTimeout(measureHeight, 500);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <motion.div
        animate={{
          width: isOpen ? 180 : 32,
          height: isOpen ? contentHeight : 32,
        }}
        className="absolute bottom-0 left-0 cursor-pointer overflow-hidden rounded-2xl rounded-bl-none bg-light-background shadow-[0px_0px_0.5px_0px_rgba(0,0,0,0.18),0px_3px_8px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]"
        onClick={() => {
          console.log(
            "Click! Current isOpen:",
            isOpen,
            "Will be:",
            !isOpen,
            "contentHeight:",
            contentHeight
          );
          setIsOpen((prev) => {
            console.log("Setting isOpen to:", !prev);
            return !prev;
          });
        }}
        ref={containerRef}
        transition={{
          type: "spring",
          stiffness: 550,
          damping: 45,
          mass: 0.7,
          delay: isOpen ? 0 : 0.08,
        }}
      >
        {/* White bubble background - always present */}
        <div className="absolute inset-0 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl" />

        {/* Avatar - animates position */}
        <motion.div
          animate={{
            left: isOpen ? 12 : 4,
            top: isOpen ? 12 : 4,
          }}
          className="absolute"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <Avatar
            alt={avatarAlt}
            hasNotification={hasNotification}
            shape="circle"
            size="default"
            src={avatarUrl}
          />
        </motion.div>

        {/* Content - always rendered but hidden when closed for measurement */}
        <div
          className="pointer-events-none absolute"
          ref={contentRef}
          style={{
            width: "180px",
            top: "-9999px",
            left: 0,
            position: "absolute",
          }}
        >
          <div className="flex flex-col items-start gap-0.5 py-3 pr-4 pl-11">
            {/* Attribution */}
            <div className="flex items-start gap-0.5">
              <p className="font-semibold text-[11px] text-light-primary leading-4">
                {authorName}
              </p>
              <p className="font-medium text-[11px] text-light-secondary leading-4">
                {timestamp}
              </p>
            </div>
            {/* Message */}
            <p className="text-left font-medium text-[11px] text-light-primary leading-4">
              {message}
            </p>
          </div>
        </div>

        {/* Content - visible when open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className="flex flex-col items-start gap-0.5 py-3 pr-4 pl-11"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 550,
                damping: 45,
                mass: 0.7,
                delay: 0.3,
              }}
            >
              {/* Attribution */}
              <div className="flex items-start gap-0.5">
                <p className="font-semibold text-[11px] text-light-primary leading-4">
                  {authorName}
                </p>
                <p className="font-medium text-[11px] text-light-secondary leading-4">
                  {timestamp}
                </p>
              </div>
              {/* Message */}
              <p className="text-left font-medium text-[11px] text-light-primary leading-4">
                {message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
