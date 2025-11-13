"use client";

import { Root as LabelPrimitiveRoot } from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = forwardRef<
  ElementRef<typeof LabelPrimitiveRoot>,
  ComponentPropsWithoutRef<typeof LabelPrimitiveRoot> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitiveRoot
    className={cn(labelVariants(), className)}
    ref={ref}
    {...props}
  />
));
Label.displayName = LabelPrimitiveRoot.displayName;

export { Label };
