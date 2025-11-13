"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center shrink-0 rounded-[var(--radius-medium)] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-selected focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "cursor-pointer",
        secondary:
          "border border-translucent cursor-pointer hover:bg-transparent-hover active:bg-transparent-pressed",
      },
      size: {
        default: "size-6",
        sm: "size-5",
        lg: "size-8",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        disabled: false,
        className:
          "hover:bg-[rgba(0,0,0,0.05)] active:bg-[rgba(0,0,0,0.1)]",
      },
      {
        variant: "default",
        disabled: true,
        className: "opacity-50",
      },
      {
        variant: "secondary",
        disabled: true,
        className: "opacity-50 border-disabled-border",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      disabled: false,
    },
  }
);

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled = false,
      asChild = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // When asChild is true, Slot expects a single React element child
    if (asChild) {
      // Validate that children is a single React element
      if (!React.isValidElement(children)) {
        throw new Error(
          "IconButton: when asChild is true, children must be a single React element"
        );
      }

      const buttonClassName = cn(
        iconButtonVariants({
          variant,
          size,
          disabled: false,
          className,
        })
      );

      // Remove disabled from props when using asChild since it's not valid for all elements
      const {
        disabled: _disabledProp,
        type: _type,
        ...restProps
      } = props as React.ButtonHTMLAttributes<HTMLButtonElement> & {
        disabled?: boolean;
        type?: string;
      };

      return (
        <Comp className={buttonClassName} ref={ref} {...restProps}>
          {icon || children}
        </Comp>
      );
    }

    // Normal button rendering (not asChild)
    return (
      <Comp
        className={cn(
          iconButtonVariants({
            variant,
            size,
            disabled,
            className,
          })
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {icon || children}
      </Comp>
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };

