import { WebsiteStatus } from "@/components/website-status";
import { motion, useScroll, useTransform } from "motion/react";
import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FloatingCards } from "@/components/floating-cards";
import { useAvailableSpots } from "@/hooks/use-available-spots";
import { CardLink } from "./cardLink";
interface HeroProps {
  containerRef: RefObject<HTMLDivElement>;
}
export default function Hero({ containerRef }: HeroProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const { availableSpots } = useAvailableSpots();
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <motion.div
        className="max-w-4xl mx-auto px-4 text-center z-10"
        style={{ opacity, scale }}
      >
        <h1 className="text-4xl md:text-8xl font-normal tracking-tight mb-6 text-zinc-950">
          Rediseño
          <span className="md:text-zinc-400"> tu proyecto</span>
        </h1>
        <p className="text-xl text-zinc-950 md:text-zinc-600 mb-8 max-w-2xl mx-auto">
          Rediseño y reimagino tu proyecto, dándote formas prácticas de mejorar
          las conversiones a través del diseño.
        </p>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button
            asChild
            className=" bg-zinc-950 text-zinc-50 hover:scale-105 transition-transform"
            variant="rainbow"
            size="lg"
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
          <WebsiteStatus />
          <div className="flex flex-col gap-4 mt-8 justify-center items-center">
            <p>Inspirate:</p>
            <div className="flex gap-4 flex-col md:flex-row">
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
        </div>
      </motion.div>
      <FloatingCards />
    </section>
  );
}
