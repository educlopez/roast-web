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
  const { isDateReached, isSubmissionEnabled } = useDateContext();
  const { availableSpots } = useAvailableSpots();
  const hasAvailableSpots = availableSpots > 0;
  const registrationOpen = isSubmissionEnabled && hasAvailableSpots;

  const formSection = (() => {
    if (registrationOpen) {
      return <SubmitForm />;
    }

    if (!isSubmissionEnabled) {
      return (
        <BlurredSubmitForm
          title={
            isDateReached ? "Servicio cerrado" : "Inscripciones próximamente"
          }
          message={
            isDateReached
              ? "El periodo de roasts ha finalizado. ¡Gracias a todos los que participaron!"
              : "Las inscripciones estarán disponibles próximamente."
          }
        />
      );
    }

    return (
      <BlurredSubmitForm
        title="Spots no disponibles"
        message="Actualmente no hay spots libres. Por favor, vuelve más tarde para enviar tu proyecto."
      />
    );
  })();

  return (
    <div ref={containerRef} className="relative">
      <main>
        <Hero containerRef={containerRef as React.RefObject<HTMLDivElement>} />
        <Divider />
        <HorizontalScroll />
        <Divider />
        <PricingCard />
        <Divider />
        {formSection}
      </main>
    </div>
  );
}
