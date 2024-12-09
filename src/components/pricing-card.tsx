import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useAvailableSpots } from "@/hooks/use-available-spots";

export function PricingCard() {
  const { availableSpots } = useAvailableSpots();

  return (
    <motion.div
      className="bg-neutral-950 text-white p-12 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-xl mx-auto ">
        <h3 className="text-5xl font-bold mb-6">
          ¡Servicio Gratuito durante Diciembre!
        </h3>
        <p className="text-xl text-neutral-400 mb-8">
          Durante todo diciembre, ofrezco un servicio de Roast totalmente
          gratuito. Tras la primera tanda de Roast, es posible que necesite
          limitar el alcance a la sección del hero en algunos casos.
        </p>
        <p className="text-xl text-neutral-400 mb-8">
          He recibido propuestas extensas que requieren mucho tiempo. Por lo
          tanto, para poder realizar la mayor cantidad de Roast, considero que
          2-3 horas por proyecto es un tiempo adecuado. Intentaré realizar la
          home completa, pero si no es posible, me limitaré al hero.
        </p>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full text-black hover:scale-105 transition-transform"
        >
          <Link href={availableSpots > 0 ? "#submit" : "#galeria"}>
            {availableSpots > 0 ? (
              <>
                Envía Tu Proyecto
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              "Ver Roast Realizados"
            )}
          </Link>
        </Button>
        <p className="text-sm text-neutral-500 mt-4">
          *Debido a picos en la demanda, algunas solicitudes podrían tardar un
          poco más de lo habitual.
        </p>
      </div>
    </motion.div>
  );
}
