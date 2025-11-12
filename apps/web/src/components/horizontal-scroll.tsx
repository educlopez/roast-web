"use client";

import { ArrowLeft, ArrowRight, Figma } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { CardLink } from "./cardLink";
import { Button } from "./ui/button";

const SKELETON_KEYS = [
  "design-skeleton-a",
  "design-skeleton-b",
  "design-skeleton-c",
];

type Design = {
  id: number;
  title: string;
  image_url: string;
  description: string;
  before_img: string;
  url: string;
};
export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollEdges = useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;
    const firstItem = container.querySelector<HTMLElement>(
      "[data-carousel-item]"
    );
    const itemWidth = firstItem?.offsetWidth ?? clientWidth;
    const gap = 16;
    const step = itemWidth + gap;
    const rawIndex = step > 0 ? Math.round(scrollLeft / step) : 0;

    setIsAtStart(scrollLeft <= 8);
    setIsAtEnd(scrollLeft >= maxScrollLeft - 8);
    setActiveIndex((prev) => {
      const nextValue = Math.min(
        Math.max(rawIndex, 0),
        Math.max(designs.length - 1, 0)
      );

      return prev === nextValue ? prev : nextValue;
    });
  }, [designs.length]);

  const scrollByOffset = useCallback(
    (direction: "prev" | "next") => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const firstItem = container.querySelector<HTMLElement>(
        "[data-carousel-item]"
      );
      const itemWidth = firstItem?.offsetWidth ?? container.clientWidth * 0.8;
      const gap = 16; // Tailwind gap-4 between items
      const scrollAmount = itemWidth + gap;
      const sign = direction === "next" ? 1 : -1;

      container.scrollBy({
        left: sign * scrollAmount,
        behavior: "smooth",
      });
      window.requestAnimationFrame(() => {
        updateScrollEdges();
      });
    },
    [updateScrollEdges]
  );

  useEffect(() => {
    async function fetchDesigns() {
      setStatus("loading");
      const { data, error } = await supabase
        .from("designs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching designs:", error);
        setStatus("error");
      } else {
        setDesigns(data || []);
        setStatus("success");
        setActiveIndex(0);
      }
    }

    fetchDesigns().catch((fetchError) => {
      console.error("Unexpected error fetching designs:", fetchError);
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const handleScroll = () => {
      updateScrollEdges();
    };

    updateScrollEdges();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [updateScrollEdges]);

  const showSkeletons = status === "loading";
  const showError = status === "error";
  const showEmptyState = status === "success" && designs.length === 0;
  const showNavigation = designs.length > 1;

  return (
    <section className="bg-zinc-100 py-24 text-zinc-950" id="galeria">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="font-bold text-2xl md:text-3xl">Roast Recientes</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link
                className="flex flex-row items-center justify-center gap-2"
                href="/gallery"
              >
                Ver todos los roasts
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                className="flex flex-row items-center justify-center gap-2 text-zinc-950"
                href="https://www.figma.com/design/dNuAD5d6t0DJEIASEJsTOK/Roast-Recientes-por-Edu-Calvo"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Figma className="h-5 w-5" /> Ver Figma
              </Link>
            </Button>
          </div>
        </div>
        <p className="mb-8 text-base text-zinc-600">
          Todos los roast han sido realizados con un tiempo medio de 2-3 horas.
          El objetivo es brindar la mayor calidad en el menor tiempo posible,
          para poder inspirar y ayudar a más proyectos.
        </p>
        <div className="relative">
          <div
            className="hide-scrollbar flex snap-x snap-mandatory overflow-x-scroll"
            ref={containerRef}
          >
            <motion.div
              animate={{ opacity: showSkeletons ? 0.8 : 1 }}
              className="flex cursor-grab gap-4 p-[5px]"
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0.2}
            >
              {showSkeletons &&
                SKELETON_KEYS.map((skeletonKey) => (
                  <div
                    className="max-h-[167px] min-w-[300px] snap-center overflow-hidden rounded-md bg-zinc-200/60 shadow-neutral-soft md:max-h-[444px] md:min-w-[800px]"
                    key={skeletonKey}
                  >
                    <div className="h-full w-full animate-pulse bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-200" />
                  </div>
                ))}

              {!showSkeletons &&
                designs.map((design) => (
                  <motion.div
                    className="max-h-[167px] min-w-[300px] snap-center overflow-hidden rounded-md shadow-neutral-soft transition-all md:max-h-[444px] md:min-w-[800px]"
                    data-carousel-item
                    key={design.id}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        alt={design.title}
                        className="h-full w-full object-cover"
                        draggable="false"
                        height={600}
                        priority={designs[0]?.id === design.id}
                        src={design.image_url}
                        width={800}
                      />
                      <div className="absolute bottom-2 left-2 z-20">
                        <CardLink
                          href={design.url}
                          imgAlt="preview image"
                          imgSrc={design.before_img}
                          subtitle={design.description}
                          target="_blank"
                          title={design.title}
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 isolate z-10 h-[100px]">
                        <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[1px]" />
                        <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[2px]" />
                        <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[3px]" />
                        <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[6px]" />
                        <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[12px]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>

          {showNavigation && (
            <>
              <div
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-zinc-100 to-transparent transition-opacity duration-200 md:block",
                  isAtStart ? "opacity-0" : "opacity-100"
                )}
              />
              <div
                className={cn(
                  "pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-zinc-100 to-transparent transition-opacity duration-200 md:block",
                  isAtEnd ? "opacity-0" : "opacity-100"
                )}
              />
              <div className="absolute inset-y-0 left-2 hidden items-center md:flex">
                <Button
                  aria-label="Ver diseño anterior"
                  className="shadow-neutral-soft hover:shadow-neutral-soft-hover"
                  disabled={isAtStart}
                  onClick={() => scrollByOffset("prev")}
                  size="icon"
                  variant="outline"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-2 hidden items-center md:flex">
                <Button
                  aria-label="Ver diseño siguiente"
                  className="shadow-neutral-soft hover:shadow-neutral-soft-hover"
                  disabled={isAtEnd}
                  onClick={() => scrollByOffset("next")}
                  size="icon"
                  variant="outline"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-3 md:hidden">
                {designs.map((design, index) => (
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full bg-zinc-300 transition-colors",
                      index === activeIndex && "bg-zinc-600"
                    )}
                    key={`dot-${design.id}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {showError && (
          <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-sm">
            Tuvimos un problema para cargar los roasts recientes. Intenta
            recargar la página.
          </p>
        )}

        {showEmptyState && (
          <p className="mt-6 rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
            Todavía no hay roasts publicados. Vuelve pronto para descubrir los
            próximos proyectos.
          </p>
        )}
      </div>
    </section>
  );
}
