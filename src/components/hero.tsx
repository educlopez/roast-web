import { WebsiteStatus } from "@/components/website-status";
import { motion, useTransform, type MotionValue } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FloatingCards } from "@/components/floating-cards";
import { useAvailableSpots } from "@/hooks/use-available-spots";
import { CardLink } from "./cardLink";
import SocialSelector from "@/components/social-selector";
import Balancer from "react-wrap-balancer";
import { useDateContext } from "@/context/DateContext";
interface HeroProps {
  scrollYProgress: MotionValue<number>;
}
export default function Hero({ scrollYProgress }: HeroProps) {

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const { availableSpots, isLoading } = useAvailableSpots();
  const { isDateReached, isSubmissionEnabled } = useDateContext();
  const hasSpots = availableSpots > 0;
  const registrationOpen = isSubmissionEnabled && hasSpots;
  const buttonHref = isDateReached
    ? "#galeria"
    : !isSubmissionEnabled
    ? "#informacion"
    : registrationOpen
    ? "#submit"
    : "#galeria";
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <motion.div
        className="max-w-4xl mx-auto px-4 text-center z-10"
        style={{ opacity, scale }}
      >
        <Balancer
          as="h1"
          className="text-4xl md:text-6xl font-normal tracking-tight mb-6 text-zinc-950"
        >
          Rediseños que
          <br />
          <span className="md:text-zinc-500"> transforman tu proyecto.</span>
        </Balancer>
        <Balancer
          as="p"
          className="text-base text-zinc-950 md:text-zinc-600 mb-8 max-w-2xl mx-auto"
        >
          ¿Necesitas darle un nuevo aire a tu web? Envía tu proyecto a través
          del formulario y descubre cómo puede renovarse.
        </Balancer>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button
            asChild
            className=" bg-zinc-950 text-zinc-50 hover:scale-105 transition-transform"
            variant="rainbow"
            size="lg"
          >
            <Link href={buttonHref} className={isLoading ? "blur-xs" : ""}>
              {isDateReached
                ? "Servicio cerrado"
                : !isSubmissionEnabled
                ? "Inscripciones próximamente"
                : hasSpots
                ? `${availableSpots} spots disponibles`
                : "Ver Roast Realizados"}
            </Link>
          </Button>
          <WebsiteStatus />
        </div>
        <div className="flex flex-col gap-4 mt-16 justify-center items-center">
          <SocialSelector />

          <div className="flex gap-4 flex-row">
            <CardLink
              href="https://sparkbites.dev"
              imgSrc="/sparkbites-mini.png"
              imgAlt="preview image"
              title="Directorio"
              subtitle="Inspiraciones"
              target="_blank"
            />
            <CardLink
              href="https://smoothui.dev"
              imgSrc="/smoothui-mini.png"
              imgAlt="preview image"
              title="Micro"
              subtitle="Interacciones"
              target="_blank"
            />
          </div>
        </div>
      </motion.div>
      <FloatingCards />
    </section>
  );
}
