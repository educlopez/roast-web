"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { FloatingCards } from "@/components/floating-cards";
// import { PricingCard } from "@/components/pricing-card";
import { SubmitForm } from "@/components/submit-form";
import { WebsiteStatus } from "@/components/website-status";
import { useAvailableSpots } from "@/hooks/use-available-spots";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const { availableSpots } = useAvailableSpots();

  return (
    <div ref={containerRef} className="relative bg-white">
      <main>
        <section className="min-h-screen flex items-center justify-center relative">
          <motion.div
            className="max-w-4xl mx-auto px-4 text-center z-10"
            style={{ opacity, scale }}
          >
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-6">
              Rediseño
              <br />
              <span className="md:text-neutral-400">tu proyecto</span>
            </h1>
            <p className="text-xl md:text-neutral-600 mb-8 max-w-2xl mx-auto">
              Roast, rediseño y reimagino tu proyecto, dándote formas prácticas
              de mejorar las conversiones a través del diseño.
            </p>
            <div className="flex flex-col gap-4 justify-center items-center">
              <Button
                asChild
                className="h-12 px-8 bg-black text-white rounded-full hover:scale-105 transition-transform"
                variant="rainbow"
              >
                <Link href="#submit">
                  Enviar proyecto
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <WebsiteStatus />
              <div className="flex flex-col gap-4 mt-8 justify-center items-center">
                <p>Inspirate:</p>
                <div className="flex gap-4 flex-col md:flex-row">
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 px-6 rounded-full hover:scale-105 transition-transform"
                  >
                    <a
                      href="https://sparkbites.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Directorio de Inspiración
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 px-6 rounded-full hover:scale-105 transition-transform"
                  >
                    <a
                      href="https://smoothui.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Micro Interacciones
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
          <FloatingCards />
        </section>
        <section className="py-24 bg-neutral-950 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Roast Recientes</h2>
            <HorizontalScroll />
          </div>
        </section>

        {/* <section id="informacion" className="py-24">
          <div className="max-w-4xl mx-auto px-4">
            <PricingCard />
          </div>
        </section> */}
        {availableSpots > 0 ? (
          <section id="submit" className="py-24 bg-neutral-950 text-white">
            <div className="max-w-2xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Envía Tu Proyecto
              </h2>
              <SubmitForm />
            </div>
          </section>
        ) : (
          <section id="submit" className="py-24 bg-neutral-950 text-white">
            <div className="max-w-2xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-12">
                No hay spots disponibles
              </h2>
              <p>
                Actualmente no hay spots libres. Por favor, vuelve más tarde
                para enviar tu proyecto.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="py-8 px-4 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm text-neutral-600">
            El Roast es un micro servicio de{" "}
            <a href="https://educalvolopez.com/" target="_blank">
              Edu Calvo López
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
