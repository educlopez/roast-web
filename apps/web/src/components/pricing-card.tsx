import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FigmaFrame } from "@/components/figma-frame";
import { FigmaButton } from "@/components/ui/figma-button";
import { useDateContext } from "@/context/DateContext";
import { useAvailableSpots } from "@/hooks/use-available-spots";

function getTitle(isDateReached: boolean, isSubmissionEnabled: boolean) {
  if (isDateReached) {
    return "¡Gracias por participar!";
  }
  if (isSubmissionEnabled) {
    return "¡Servicio Gratuito durante Diciembre!";
  }
  return "Inscripciones disponibles próximamente";
}

function getDescription(isDateReached: boolean, isSubmissionEnabled: boolean) {
  if (isDateReached) {
    return "El periodo de roasts ha finalizado. ¡Gracias a todos los que participaron!";
  }
  if (isSubmissionEnabled) {
    return "Durante todo diciembre, ofrezco un servicio de Roast totalmente gratuito. Tras la primera tanda de Roast, es posible que necesite limitar el alcance a la sección del hero en algunos casos.";
  }
  return "Los registros estarán abiertos próximamente. Prepara tu proyecto y vuelve para enviarlo.";
}

function getLinkHref(
  isDateReached: boolean,
  isSubmissionEnabled: boolean,
  registrationOpen: boolean
) {
  if (isDateReached) {
    return "#galeria";
  }
  if (isSubmissionEnabled) {
    return registrationOpen ? "#submit" : "#galeria";
  }
  return "#informacion";
}

function getButtonText(
  isDateReached: boolean,
  isSubmissionEnabled: boolean,
  hasSpots: boolean
) {
  if (isDateReached) {
    return "Ver Roasts Realizados";
  }
  if (isSubmissionEnabled) {
    return hasSpots ? "Envía Tu Proyecto" : "Ver Roast Realizados";
  }
  return "Conoce los detalles";
}

export function PricingCard() {
  const { isDateReached, isSubmissionEnabled } = useDateContext();
  const { availableSpots } = useAvailableSpots();
  const hasSpots = availableSpots > 0;
  const registrationOpen = isSubmissionEnabled && hasSpots;

  const title = getTitle(isDateReached, isSubmissionEnabled);
  const description = getDescription(isDateReached, isSubmissionEnabled);
  const linkHref = getLinkHref(
    isDateReached,
    isSubmissionEnabled,
    registrationOpen
  );
  const buttonText = getButtonText(
    isDateReached,
    isSubmissionEnabled,
    hasSpots
  );

  return (
    <section className="py-24" id="informacion">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center gap-4 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            alt="Tocar hierba ilustración"
            className="rounded-2xl"
            height={604}
            src="/info.jpeg"
            width={500}
          />
          <FigmaFrame
            className="mx-auto max-w-xl"
            cornerSize="sm"
            label={{ icon: "❖", text: "Información" }}
            padding="lg"
          >
            <h3 className="mb-6 font-bold text-2xl md:text-3xl">{title}</h3>
            <p className="mb-8 text-base text-light-secondary">{description}</p>
            {!isDateReached && isSubmissionEnabled && (
              <p className="mb-8 text-base text-light-secondary">
                He recibido propuestas extensas que requieren mucho tiempo. Por
                lo tanto, para poder realizar la mayor cantidad de Roast,
                considero que 2-3 horas por proyecto es un tiempo adecuado.
                Intentaré realizar la home completa, pero si no es posible, me
                limitaré al hero.
              </p>
            )}
            <FigmaButton
              asChild
              className="w-full"
              iconTrail={
                isSubmissionEnabled && hasSpots ? <ArrowRight /> : undefined
              }
              size="xl"
              variant="figjam"
            >
              <Link href={linkHref}>{buttonText}</Link>
            </FigmaButton>
            <p className="mt-4 text-light-secondary text-sm">
              *Debido a picos en la demanda, algunas solicitudes podrían tardar
              un poco más de lo habitual.
            </p>
          </FigmaFrame>
        </motion.div>
      </div>
    </section>
  );
}
