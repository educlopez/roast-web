import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FigmaFrameProps = {
  children: ReactNode;
  className?: string;
  label?: {
    icon?: string;
    text: string;
  };
  dimensions?: string;
  showCorners?: boolean;
  cornerSize?: "sm" | "md" | "lg";
  padding?: "sm" | "md" | "lg" | "xl";
};

const paddingMap = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-12",
};

const cornerSizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const cornerPositionMap = {
  sm: {
    top: "top-[-6px]",
    bottom: "bottom-[-6px]",
    left: "left-[-6px]",
    right: "right-[-6px]",
  },
  md: {
    top: "top-[-8px]",
    bottom: "bottom-[-8px]",
    left: "left-[-8px]",
    right: "right-[-8px]",
  },
  lg: {
    top: "top-[-10px]",
    bottom: "bottom-[-10px]",
    left: "left-[-10px]",
    right: "right-[-10px]",
  },
};

export function FigmaFrame({
  children,
  className,
  label,
  dimensions,
  showCorners = true,
  cornerSize = "md",
  padding = "lg",
}: FigmaFrameProps) {
  return (
    <div className={cn("relative p-2", className)}>
      {label && (
        <div
          className={cn(
            "-top-5 absolute left-0 flex items-center gap-1 py-1 font-medium text-[11px] text-violet-500 tracking-[0.2em] backdrop-blur"
          )}
        >
          {label.icon && (
            <span aria-hidden className="text-base leading-none">
              {label.icon}
            </span>
          )}
          <span>{label.text}</span>
        </div>
      )}
      {dimensions && (
        <div
          className={cn(
            "-top-5 absolute right-10 rounded-sm bg-violet-500 px-2 py-1 font-medium text-[11px] text-white leading-4"
          )}
          style={{ transform: "translateX(-50%)" }}
        >
          {dimensions}
        </div>
      )}
      <div
        className={cn(
          "group relative border border-[#947efb] border-solid backdrop-blur transition-colors",
          paddingMap[padding],
          "bg-[rgba(239,237,250,0)] hover:bg-[rgba(239,237,250,0.78)]"
        )}
      >
        {showCorners && (
          <>
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute z-10 border border-[#947efb] border-solid bg-white",
                cornerSizeMap[cornerSize],
                cornerPositionMap[cornerSize].top,
                cornerPositionMap[cornerSize].left
              )}
            />
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute z-10 border border-[#947efb] border-solid bg-white",
                cornerSizeMap[cornerSize],
                cornerPositionMap[cornerSize].bottom,
                cornerPositionMap[cornerSize].left
              )}
            />
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute z-10 border border-[#947efb] border-solid bg-white",
                cornerSizeMap[cornerSize],
                cornerPositionMap[cornerSize].top,
                cornerPositionMap[cornerSize].right
              )}
            />
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute z-10 border border-[#947efb] border-solid bg-white",
                cornerSizeMap[cornerSize],
                cornerPositionMap[cornerSize].bottom,
                cornerPositionMap[cornerSize].right
              )}
            />
          </>
        )}
        <div className="relative overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
