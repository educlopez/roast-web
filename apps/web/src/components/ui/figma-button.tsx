import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/lib/utils";

const figmaButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-medium)] font-[var(--body-medium-fontFamily)] font-[var(--body-medium-fontWeight)] text-[var(--body-medium-fontSize)] text-xs leading-[var(--body-medium-lineHeight)] tracking-[0.055px] transition-colors duration-200 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-onbrand hover:bg-brand-pressed focus-visible:ring-2 focus-visible:ring-selected focus-visible:ring-offset-2 active:bg-brand-pressed",
        secondary:
          "border border-translucent bg-white text-text hover:bg-transparent-hover focus-visible:ring-2 focus-visible:ring-selected focus-visible:ring-offset-2 active:bg-transparent-pressed",
        figjam:
          "bg-figjam text-onfigjam hover:bg-figjam-pressed focus-visible:ring-2 focus-visible:ring-selected focus-visible:ring-offset-2 active:bg-figjam-pressed",
        destructive:
          "bg-danger text-ondanger hover:bg-danger-pressed focus-visible:ring-2 focus-visible:ring-danger-border focus-visible:ring-offset-2 active:bg-danger-pressed",
        "secondary-destruct":
          "border border-danger-border bg-transparent text-icon-danger hover:bg-danger-tertiary focus-visible:ring-2 focus-visible:ring-danger-border focus-visible:ring-offset-2 active:bg-danger-tertiary",
        inverse:
          "bg-inverse text-oninverse focus-visible:ring-2 focus-visible:ring-selected focus-visible:ring-offset-2",
        success:
          "bg-success text-onbrand hover:bg-success-pressed focus-visible:ring-2 focus-visible:ring-selected focus-visible:ring-offset-2 active:bg-success-pressed",
        link: "h-auto bg-transparent p-0 text-icon-brand hover:underline focus-visible:ring-2 focus-visible:ring-selected focus-visible:ring-offset-2 active:text-selected-strong",
        "link-danger":
          "h-auto bg-transparent p-0 text-icon-danger hover:underline focus-visible:ring-2 focus-visible:ring-danger-border focus-visible:ring-offset-2 active:text-danger-pressed",
        ghost:
          "bg-transparent text-text focus-visible:ring-2 focus-visible:ring-selected focus-visible:ring-offset-2 active:bg-transparent-pressed",
      },
      size: {
        default: "h-6 gap-[var(--spacer-2)] px-2 py-1",
        large: "h-8 gap-[var(--spacer-2)] px-3 py-1",
        xl: "h-10 gap-[var(--spacer-2)] px-4 py-1",
        wide: "h-6 w-full max-w-[256px] gap-[var(--spacer-2)] px-4",
      },
      hasIconLead: {
        true: "",
        false: "",
      },
      iconAlignment: {
        none: "justify-center",
        left: "justify-start pl-2",
        center: "justify-center px-2",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Disabled state overrides for all variants
      {
        disabled: true,
        variant: "primary",
        className: "bg-disabled text-ondisabled opacity-50 hover:bg-disabled",
      },
      {
        disabled: true,
        variant: "secondary",
        className:
          "border-disabled-border bg-transparent text-text-disabled opacity-50 hover:bg-transparent",
      },
      {
        disabled: true,
        variant: "figjam",
        className: "bg-disabled text-ondisabled opacity-50 hover:bg-disabled",
      },
      {
        disabled: true,
        variant: "destructive",
        className: "bg-disabled text-ondisabled opacity-50 hover:bg-disabled",
      },
      {
        disabled: true,
        variant: "secondary-destruct",
        className:
          "border-disabled-border bg-transparent text-text-disabled opacity-50 hover:bg-transparent",
      },
      {
        disabled: true,
        variant: "inverse",
        className: "bg-disabled text-ondisabled opacity-50 hover:bg-disabled",
      },
      {
        disabled: true,
        variant: "success",
        className: "bg-disabled text-ondisabled opacity-50 hover:bg-disabled",
      },
      {
        disabled: true,
        variant: "link",
        className: "text-text-disabled opacity-50 hover:no-underline",
      },
      {
        disabled: true,
        variant: "link-danger",
        className: "text-text-disabled opacity-50 hover:no-underline",
      },
      {
        disabled: true,
        variant: "ghost",
        className:
          "bg-transparent text-text-disabled opacity-50 hover:bg-transparent",
      },
      // Icon color overrides based on variant
      {
        disabled: false,
        variant: "primary",
        className: "[&_svg]:text-onbrand",
      },
      {
        disabled: false,
        variant: "secondary",
        className: "[&_svg]:text-icon",
      },
      {
        disabled: false,
        variant: "figjam",
        className: "[&_svg]:text-onfigjam",
      },
      {
        disabled: false,
        variant: "destructive",
        className: "[&_svg]:text-ondanger",
      },
      {
        disabled: false,
        variant: "secondary-destruct",
        className: "[&_svg]:text-icon-danger",
      },
      {
        disabled: false,
        variant: "inverse",
        className: "[&_svg]:text-oninverse",
      },
      {
        disabled: false,
        variant: "success",
        className: "[&_svg]:text-onsuccess",
      },
      {
        disabled: false,
        variant: "link",
        className: "[&_svg]:text-icon-brand",
      },
      {
        disabled: false,
        variant: "link-danger",
        className: "[&_svg]:text-icon-danger",
      },
      {
        disabled: false,
        variant: "ghost",
        className: "[&_svg]:text-icon",
      },
      // Disabled icon colors
      {
        disabled: true,
        className: "[&_svg]:text-ondisabled",
      },
      // Hover states for ghost variant - only on devices with hover capability
      {
        variant: "ghost",
        disabled: false,
        className: "hover:bg-transparent-hover",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
      hasIconLead: false,
      iconAlignment: "none",
      disabled: false,
    },
  }
);

export interface FigmaButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    Omit<
      VariantProps<typeof figmaButtonVariants>,
      "hasIconLead" | "iconAlignment"
    > {
  asChild?: boolean;
  iconLead?: React.ReactNode;
  iconTrail?: React.ReactNode;
  disabled?: boolean;
  iconAlignment?: "none" | "left" | "center";
}

const FigmaButton = React.forwardRef<HTMLButtonElement, FigmaButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconLead,
      disabled = false,
      iconTrail,
      iconAlignment,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const hasIconLead = Boolean(iconLead);
    const hasIconTrail = Boolean(iconTrail);
    // When iconTrail is present, it appears on the left, so we treat it as a leading icon
    const hasLeadingIcon = hasIconTrail || hasIconLead;

    // Determine icon alignment: if prop is provided, use it; otherwise auto-detect
    let alignment: "none" | "left" | "center" = "none";
    if (iconAlignment) {
      alignment = iconAlignment;
    } else if (hasLeadingIcon) {
      alignment = size === "wide" ? "left" : "center";
    }

    // When asChild is true, Slot expects a single React element child
    // We cannot use iconLead/iconTrail with asChild because it requires modifying
    // the child element structure, which Slot doesn't support
    if (asChild) {
      // If asChild is true and we have icons, warn or don't use icons
      // For now, we'll ignore icons when asChild is true
      if (iconLead || iconTrail) {
        // eslint-disable-next-line no-console
        console.warn(
          "FigmaButton: iconLead and iconTrail are not supported when asChild is true. Icons will be ignored."
        );
      }

      // Validate that children is a single React element
      if (!React.isValidElement(children)) {
        throw new Error(
          "FigmaButton: when asChild is true, children must be a single React element"
        );
      }

      // When asChild is true, render children directly (must be a single React element)
      // Slot will pass all props (className, etc.) to the child element
      // Note: disabled prop is not passed to Slot when asChild is true
      // because links and other elements may not support it
      const buttonClassName = cn(
        figmaButtonVariants({
          variant,
          size,
          hasIconLead: false,
          iconAlignment: "none",
          disabled: false,
          className,
        })
      );

      // Remove disabled from props when using asChild since it's not valid for all elements
      // Also remove type prop since it's not valid for links
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
          {children}
        </Comp>
      );
    }

    // Normal button rendering (not asChild)
    return (
      <Comp
        className={cn(
          figmaButtonVariants({
            variant,
            size,
            hasIconLead: hasLeadingIcon,
            iconAlignment: alignment,
            disabled,
            className,
          })
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {iconTrail && (
          <span className="flex items-center [&_svg]:size-4 [&_svg]:h-4 [&_svg]:w-4">
            {iconTrail}
          </span>
        )}
        {iconLead && (
          <span className="flex items-center [&_svg]:size-4 [&_svg]:h-4 [&_svg]:w-4">
            {iconLead}
          </span>
        )}
        {children && <span>{children}</span>}
      </Comp>
    );
  }
);
FigmaButton.displayName = "FigmaButton";

export { FigmaButton, figmaButtonVariants };
