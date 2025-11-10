import { type MotionValue, motion, useTransform } from "motion/react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { FloatingCards } from "@/components/floating-cards";
import SocialSelector from "@/components/social-selector";
import { Button } from "@/components/ui/button";
import { WebsiteStatus } from "@/components/website-status";
import { useDateContext } from "@/context/DateContext";
import { useAvailableSpots } from "@/hooks/use-available-spots";
import { CardLink } from "./cardLink";

type HeroProps = {
  scrollYProgress: MotionValue<number>;
};
export default function Hero({ scrollYProgress }: HeroProps) {
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const { availableSpots, isLoading } = useAvailableSpots();
  const { isDateReached, isSubmissionEnabled } = useDateContext();
  const hasSpots = availableSpots > 0;
  const registrationOpen = isSubmissionEnabled && hasSpots;
  const buttonHref = isDateReached
    ? "#galeria"
    : isSubmissionEnabled
      ? registrationOpen
        ? "#submit"
        : "#galeria"
      : "#informacion";
  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <motion.div
        className="z-10 mx-auto max-w-4xl px-4 text-center"
        style={{ opacity, scale }}
      >
        <Balancer
          as="h1"
          className="mb-6 font-normal text-4xl text-zinc-950 tracking-tight md:text-6xl"
        >
          Rediseños que
          <br />
          <span className="md:text-zinc-500"> transforman tu proyecto.</span>
        </Balancer>
        <Balancer
          as="p"
          className="mx-auto mb-8 max-w-2xl text-base text-zinc-950 md:text-zinc-600"
        >
          ¿Necesitas darle un nuevo aire a tu web? Envía tu proyecto a través
          del formulario y descubre cómo puede renovarse.
        </Balancer>
        <div className="flex flex-col items-center justify-center gap-4">
          <Button
            asChild
            className="bg-zinc-950 text-zinc-50 transition-transform hover:scale-105"
            size="lg"
            variant="rainbow"
          >
            <Link className={isLoading ? "blur-xs" : ""} href={buttonHref}>
              {isDateReached
                ? "Servicio cerrado"
                : isSubmissionEnabled
                  ? hasSpots
                    ? `${availableSpots} spots disponibles`
                    : "Ver Roast Realizados"
                  : "Inscripciones próximamente"}
            </Link>
          </Button>
          <WebsiteStatus />
        </div>
        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <SocialSelector />

          <div className="flex flex-row gap-4">
            <CardLink
              href="https://sparkbites.dev"
              imgAlt="preview image"
              imgSrc="/sparkbites-mini.png"
              subtitle="Inspiraciones"
              target="_blank"
              title="Directorio"
            />
            <CardLink
              href="https://smoothui.dev"
              imgAlt="preview image"
              imgSrc="/smoothui-mini.png"
              subtitle="Interacciones"
              target="_blank"
              title="Micro"
            />
          </div>
        </div>
      </motion.div>
      <FloatingCards />
    </section>
  );
}
