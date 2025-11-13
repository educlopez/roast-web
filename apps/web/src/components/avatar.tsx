import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative overflow-hidden",
  {
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
  }
);

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
    React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  hasNotification?: boolean;
  letter?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, shape, color, src, alt = "Avatar", hasNotification = false, letter, ...props }, ref) => {
    const showLetter = letter && !src;
    const showImage = src && !letter;

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape, color: showLetter ? color : undefined }), className)}
        {...props}
      >
        {showImage ? (
          <div className="relative size-full">
            <Image
              alt={alt}
              className="pointer-events-none object-cover object-center"
              fill
              src={src}
            />
            {hasNotification && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 size-full">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-full rounded-full bg-orange-500" />
              </div>
            )}
          </div>
        ) : showLetter ? (
          <div className="flex size-full items-center justify-center">
            <span className={cn(
              "font-medium",
              fontSizeVariants[size || "default"],
              color && color in textColorVariants ? textColorVariants[color as keyof typeof textColorVariants] : "text-black/90"
            )}>
              {letter.toUpperCase()}
            </span>
          </div>
        ) : (
          <div className="flex size-full items-center justify-center bg-gray-200">
            <span className="text-xs font-medium text-gray-600">?</span>
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };

