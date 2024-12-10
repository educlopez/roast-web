"use client";

import { useRef } from "react";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { PricingCard } from "@/components/pricing-card";
import { SubmitForm } from "@/components/submit-form";

import { useAvailableSpots } from "@/hooks/use-available-spots";
import { BlurredSubmitForm } from "@/components/blurred-submit-form";
import Divider from "@/components/divider";
import Hero from "@/components/hero";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { availableSpots } = useAvailableSpots();

  return (
    <div ref={containerRef} className="relative">
      <main>
        <Hero containerRef={containerRef} />
        <Divider />
        <HorizontalScroll />
        <Divider />
        <PricingCard />
        <Divider />
        {availableSpots > 0 ? <SubmitForm /> : <BlurredSubmitForm />}
      </main>
    </div>
  );
}
