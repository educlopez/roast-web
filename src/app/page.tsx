"use client";

import { useRef } from "react";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { PricingCard } from "@/components/pricing-card";
import { SubmitForm } from "@/components/submit-form";

import { useAvailableSpots } from "@/hooks/use-available-spots";
import { BlurredSubmitForm } from "@/components/blurred-submit-form";
import Divider from "@/components/divider";
import Hero from "@/components/hero";
import { useDateContext } from "@/context/DateContext";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDateReached } = useDateContext();
  const { availableSpots } = useAvailableSpots();

  return (
    <div ref={containerRef} className="relative">
      <main>
        <Hero containerRef={containerRef as React.RefObject<HTMLDivElement>} />
        <Divider />
        <HorizontalScroll />
        <Divider />
        <PricingCard />
        <Divider />
        {isDateReached ? (
          <BlurredSubmitForm />
        ) : availableSpots > 0 ? (
          <SubmitForm />
        ) : (
          <BlurredSubmitForm />
        )}
      </main>
    </div>
  );
}
