"use client";

import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import type { HTMLAttributes } from "react";
import { forwardRef, type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const avatarVariants = cva("relative overflow-hidden", {
  variants: {
    size: {
      sm: "size-4",
      default: "size-6",
      lg: "size-8",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
    color: {
      purple: "bg-[#9747ff]",
      blue: "bg-[#007be5]",
      pink: "bg-[#ff24bd]",
      red: "bg-[#f24822]",
      yellow: "bg-[#ffcd29]",
      green: "bg-[#14ae5c]",
      grey: "bg-[#667799]",
    },
  },
  defaultVariants: {
    size: "default",
    shape: "circle",
  },
});

const textColorVariants = {
  purple: "text-white",
  blue: "text-white",
  pink: "text-white",
  red: "text-white",
  yellow: "text-black/90",
  green: "text-white",
  grey: "text-white",
};

const fontSizeVariants = {
  sm: "text-[9px] leading-[14px]",
  default: "text-[13px] leading-[22px]",
  lg: "text-[13px] leading-[22px]",
};

export interface AvatarProps
  extends VariantProps<typeof avatarVariants>,
    Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  src?: string;
  alt?: string;
  hasNotification?: boolean;
  letter?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      shape,
      color,
      src,
      alt = "Avatar",
      hasNotification = false,
      letter,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);
    const prevSrcRef = useRef(src);

    // Reset error state when src changes
    useEffect(() => {
      if (prevSrcRef.current !== src) {
        prevSrcRef.current = src;
        setImageError(false);
      }
    }, [src]);

    const handleImageError = () => {
      setImageError(true);
    };

    // Determine what to render
    let content: ReactNode;

    if (src && !imageError) {
      // Show image if we have src and no error
      content = (
        <div className="relative size-full">
          <Image
            alt={alt}
            className="pointer-events-none object-cover object-center"
            fill
            onError={handleImageError}
            src={src}
          />
          {hasNotification && (
            <div className="-translate-y-1/2 absolute top-1/2 left-0 size-full">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-full rounded-full bg-orange-500" />
            </div>
          )}
        </div>
      );
    } else if (letter) {
      // Show letter if we have letter and no image
      content = (
        <div className="flex size-full items-center justify-center">
          <span
            className={cn(
              "font-medium",
              fontSizeVariants[size || "default"],
              color && color in textColorVariants
                ? textColorVariants[color as keyof typeof textColorVariants]
                : textColorVariants.blue
            )}
          >
            {letter.toUpperCase()}
          </span>
        </div>
      );
    } else {
      // Default fallback
      content = (
        <div className="flex size-full items-center justify-center bg-gray-200">
          <span className="font-medium text-gray-600 text-xs">?</span>
        </div>
      );
    }

    const shouldShowLetter = letter && (!src || imageError);
    const avatarColor = shouldShowLetter ? color || "blue" : undefined;

    return (
      <div
        className={cn(
          avatarVariants({
            size,
            shape,
            color: avatarColor,
          }),
          className
        )}
        ref={ref}
        {...props}
      >
        {content}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
