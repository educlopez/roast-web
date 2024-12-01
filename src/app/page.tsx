"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, ExternalLink } from "lucide-react";
import Link from "next/link";
import { HorizontalScroll } from "@/components/horizontal-scroll";
import { FloatingCards } from "@/components/floating-cards";
import { PricingCard } from "@/components/pricing-card";
import SubmitForm from "@/components/submit-form";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between mix-blend-difference">
        <Link href="/" className="flex items-center gap-2 text-white">
          <Flame className="h-6 w-6" />
          <span className="font-bold">Roasted</span>
        </Link>
        <nav className="flex gap-6">
          <Link
            href="#pricing"
            className="text-sm text-white hover:opacity-70 transition-opacity"
          >
            Precios
          </Link>
          <Link
            href="#submit"
            className="text-sm text-white hover:opacity-70 transition-opacity"
          >
            Enviar
          </Link>
        </nav>
      </header>

      <main>
        <section className="min-h-screen flex items-center justify-center relative">
          <motion.div
            className="max-w-4xl mx-auto px-4 text-center"
            style={{ opacity, scale }}
          >
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-6">
              Roast de tu
              <br />
              <span className="text-neutral-400">Portfolio</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Roast y rediseño de tu sección principal, dándote formas prácticas
              de mejorar las conversiones a través del diseño.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                className="h-12 px-8 bg-black text-white rounded-full hover:scale-105 transition-transform"
              >
                <Link href="#pricing">
                  Empezar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="flex gap-4">
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
                    Inspiración
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
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

        <section id="pricing" className="py-24">
          <div className="max-w-4xl mx-auto px-4">
            <PricingCard />
          </div>
        </section>

        <section id="submit" className="py-24 bg-neutral-950 text-white">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Envía Tu Diseño
            </h2>
            <SubmitForm />
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-600">
            © 2024 Roasted. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-neutral-600 hover:text-black"
            >
              Términos
            </Link>
            <Link
              href="#"
              className="text-sm text-neutral-600 hover:text-black"
            >
              Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
