import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useAvailableSpots } from "@/hooks/use-available-spots";
import Image from "next/image";
import { useDateContext } from "@/context/DateContext";

export function PricingCard() {
  const { isDateReached } = useDateContext();
  const { availableSpots } = useAvailableSpots();

  return (
    <section id="informacion" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/info.jpeg"
            alt="Tocar hierba ilustración"
            width={500}
            height={604}
            className="rounded-2xl"
          />
          <div className="max-w-xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              {isDateReached
                ? "¡Gracias por participar!"
                : "¡Servicio Gratuito durante Diciembre!"}
            </h3>
            <p className="text-base text-zinc-600 mb-8">
              {isDateReached
                ? "El periodo de roasts ha finalizado. ¡Gracias a todos los que participaron!"
                : "Durante todo diciembre, ofrezco un servicio de Roast totalmente gratuito. Tras la primera tanda de Roast, es posible que necesite limitar el alcance a la sección del hero en algunos casos."}
            </p>
            {!isDateReached && (
              <p className="text-base text-zinc-600 mb-8">
                He recibido propuestas extensas que requieren mucho tiempo. Por
                lo tanto, para poder realizar la mayor cantidad de Roast,
                considero que 2-3 horas por proyecto es un tiempo adecuado.
                Intentaré realizar la home completa, pero si no es posible, me
                limitaré al hero.
              </p>
            )}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full text-zinc-950 hover:scale-105 transition-transform"
            >
              <Link
                href={
                  isDateReached
                    ? "#galeria"
                    : availableSpots > 0
                    ? "#submit"
                    : "#galeria"
                }
              >
                {isDateReached ? (
                  "Ver Roasts Realizados"
                ) : availableSpots > 0 ? (
                  <>
                    Envía Tu Proyecto <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  "Ver Roast Realizados"
                )}
              </Link>
            </Button>
            <p className="text-sm text-zinc-500 mt-4">
              *Debido a picos en la demanda, algunas solicitudes podrían tardar
              un poco más de lo habitual.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
