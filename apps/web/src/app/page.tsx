"use client";

import { useScroll } from "motion/react";
import { useRef } from "react";
import { BlurredSubmitForm } from "@/components/blurred-submit-form";
import Divider from "@/components/divider";
import Hero from "@/components/hero";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { PricingCard } from "@/components/pricing-card";
import { SubmitForm } from "@/components/submit-form";
import { useDateContext } from "@/context/DateContext";
import { useAvailableSpots } from "@/hooks/use-available-spots";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
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
          message={
            isDateReached
              ? "El periodo de roasts ha finalizado. ¡Gracias a todos los que participaron!"
              : "Las inscripciones estarán disponibles próximamente."
          }
          title={
            isDateReached ? "Servicio cerrado" : "Inscripciones próximamente"
          }
        />
      );
    }

    return (
      <BlurredSubmitForm
        message="Actualmente no hay spots libres. Por favor, vuelve más tarde para enviar tu proyecto."
        title="Spots no disponibles"
      />
    );
  })();

  return (
    <div className="relative" ref={containerRef}>
      <main>
        <Hero scrollYProgress={scrollYProgress} />
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
