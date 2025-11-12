import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FigmaFrame } from "@/components/figma-frame";
import { useDateContext } from "@/context/DateContext";
import { useAvailableSpots } from "@/hooks/use-available-spots";

export function PricingCard() {
  const { isDateReached, isSubmissionEnabled } = useDateContext();
  const { availableSpots } = useAvailableSpots();
  const hasSpots = availableSpots > 0;
  const registrationOpen = isSubmissionEnabled && hasSpots;

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
            cornerSize="sm"
            label={{ icon: "❖", text: "Información" }}
            padding="lg"
            className="mx-auto max-w-xl"
          >
            <h3 className="mb-6 font-bold text-2xl md:text-3xl">
              {isDateReached
                ? "¡Gracias por participar!"
                : isSubmissionEnabled
                  ? "¡Servicio Gratuito durante Diciembre!"
                  : "Inscripciones disponibles próximamente"}
            </h3>
            <p className="mb-8 text-base text-zinc-600">
              {isDateReached
                ? "El periodo de roasts ha finalizado. ¡Gracias a todos los que participaron!"
                : isSubmissionEnabled
                  ? "Durante todo diciembre, ofrezco un servicio de Roast totalmente gratuito. Tras la primera tanda de Roast, es posible que necesite limitar el alcance a la sección del hero en algunos casos."
                  : "Los registros estarán abiertos próximamente. Prepara tu proyecto y vuelve para enviarlo."}
            </p>
            {!isDateReached && isSubmissionEnabled && (
              <p className="mb-8 text-base text-zinc-600">
                He recibido propuestas extensas que requieren mucho tiempo. Por
                lo tanto, para poder realizar la mayor cantidad de Roast,
                considero que 2-3 horas por proyecto es un tiempo adecuado.
                Intentaré realizar la home completa, pero si no es posible, me
                limitaré al hero.
              </p>
            )}
            <Button
              asChild
              className="w-full text-zinc-950 transition-transform hover:scale-105"
              size="lg"
              variant="outline"
            >
              <Link
                href={
                  isDateReached
                    ? "#galeria"
                    : isSubmissionEnabled
                      ? registrationOpen
                        ? "#submit"
                        : "#galeria"
                      : "#informacion"
                }
              >
                {isDateReached ? (
                  "Ver Roasts Realizados"
                ) : isSubmissionEnabled ? (
                  hasSpots ? (
                    <>
                      Envía Tu Proyecto <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    "Ver Roast Realizados"
                  )
                ) : (
                  "Conoce los detalles"
                )}
              </Link>
            </Button>
            <p className="mt-4 text-sm text-zinc-500">
              *Debido a picos en la demanda, algunas solicitudes podrían tardar
              un poco más de lo habitual.
            </p>
          </FigmaFrame>
        </motion.div>
      </div>
    </section>
  );
}
