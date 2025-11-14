"use client";

import { ArrowLeft, ArrowRight, Figma } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CardLink } from "./cardLink";
import { FigmaFrame } from "./figma-frame";
import { FigmaButton } from "./ui/figma-button";

const SKELETON_KEYS = [
  "design-skeleton-a",
  "design-skeleton-b",
  "design-skeleton-c",
];

type Category = {
  id: string;
  name: string;
  description: string | null;
};

type Design = {
  id: number;
  title: string;
  image_url: string;
  categoria: string;
  categoria_data?: Category | null;
  before_img: string;
  url: string;
  preview_url?: string | null;
  submission_id?: string | null;
};

// biome-ignore lint: The carousel handles many interaction states that we'll refactor separately.
export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [designs, setDesigns] = useState<Design[]>([]);
  const [displayIndex, setDisplayIndex] = useState(1);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragState = useRef<{
    isDragging: boolean;
    startX: number;
    pointerId: number | null;
    rafId: number;
    skipClick: boolean;
  }>({
    isDragging: false,
    startX: 0,
    pointerId: null,
    rafId: 0,
    skipClick: false,
  });
  const [slideMetrics, setSlideMetrics] = useState<{
    width: number;
    gap: number;
    padding: number;
  }>({
    width: 0,
    gap: 0,
    padding: 0,
  });

  const measureSlides = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const track = trackRef.current;
    if (!track) {
      return;
    }

    const firstSlide = track.querySelector<HTMLElement>(
      "[data-carousel-slide]"
    );

    if (!firstSlide) {
      return;
    }

    const computedStyle = window.getComputedStyle(track);
    const gapValue = Number.parseFloat(
      computedStyle.columnGap || computedStyle.gap || "0"
    );
    const containerWidth = container.offsetWidth;

    setSlideMetrics({
      width: firstSlide.offsetWidth,
      gap: Number.isNaN(gapValue) ? 0 : gapValue,
      padding: containerWidth / 2,
    });
  }, []);

  useEffect(() => {
    async function fetchDesigns() {
      setStatus("loading");
      const { data, error } = await supabase
        .from("designs")
        .select(`
          *,
          categoria_data:categories!categoria (
            id,
            name,
            description
          )
        `)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching designs:", error);
        setStatus("error");
      } else {
        setDesigns(data || []);
        setStatus("success");
        setDisplayIndex(1);
        requestAnimationFrame(() => {
          measureSlides();
        });
      }
    }

    fetchDesigns().catch((fetchError) => {
      console.error("Unexpected error fetching designs:", fetchError);
    });
  }, [measureSlides]);

  useEffect(
    () => () => {
      cancelAnimationFrame(dragState.current.rafId);
    },
    []
  );

  const loopedDesigns = useMemo(() => {
    if (designs.length < 1) {
      return [];
    }

    const last = designs.at(-1) ?? designs[0];
    const first = designs[0];

    return [last, ...designs, first];
  }, [designs]);

  const featuredDesign = designs[displayIndex - 1] ?? designs[0];
  const showSkeletons = status === "loading";
  const showError = status === "error";
  const showEmptyState = status === "success" && !featuredDesign;

  useEffect(() => {
    const handleResize = () => {
      measureSlides();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [measureSlides]);

  const offsetPerSlide = slideMetrics.width + slideMetrics.gap;
  const targetTranslate =
    slideMetrics.width === 0
      ? 0
      : slideMetrics.padding -
        slideMetrics.width / 2 -
        displayIndex * offsetPerSlide;
  const translateValue = targetTranslate + dragOffset;

  useEffect(() => {
    if (loopedDesigns.length > 0) {
      setDisplayIndex(1);
    }
  }, [loopedDesigns.length]);

  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    const handleTransitionEnd = () => {
      setShouldAnimate(false);

      if (displayIndex === 0) {
        setDisplayIndex(loopedDesigns.length - 2);
      } else if (displayIndex === loopedDesigns.length - 1) {
        setDisplayIndex(1);
      }
    };

    const track = trackRef.current;
    track.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      track.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [displayIndex, loopedDesigns.length]);

  const handleNext = useCallback(() => {
    setShouldAnimate(true);
    setDisplayIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setShouldAnimate(true);
    setDisplayIndex((prev) => prev - 1);
  }, []);

  const handleDotClick = useCallback((index: number) => {
    setShouldAnimate(true);
    setDisplayIndex(index + 1);
  }, []);

  const activeRealIndex =
    designs.length > 0
      ? (displayIndex - 1 + designs.length) % designs.length
      : 0;

  const handleSlideClick = useCallback((loopIndex: number) => {
    if (dragState.current.skipClick) {
      dragState.current.skipClick = false;
      return;
    }
    setShouldAnimate(true);
    setDisplayIndex(loopIndex);
  }, []);

  const scheduleDragOffset = useCallback((value: number) => {
    cancelAnimationFrame(dragState.current.rafId);
    dragState.current.rafId = requestAnimationFrame(() => {
      setDragOffset(value);
    });
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (loopedDesigns.length <= 1) {
        return;
      }

      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      dragState.current.isDragging = true;
      dragState.current.startX = event.clientX;
      dragState.current.pointerId = event.pointerId;
      dragState.current.skipClick = false;
      setShouldAnimate(false);
      scheduleDragOffset(0);
      trackRef.current?.setPointerCapture(event.pointerId);
    },
    [loopedDesigns.length, scheduleDragOffset]
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragState.current.isDragging) {
        return;
      }

      const delta = event.clientX - dragState.current.startX;
      if (!dragState.current.skipClick && Math.abs(delta) > 4) {
        dragState.current.skipClick = true;
      }
      scheduleDragOffset(delta);
    },
    [scheduleDragOffset]
  );

  const finishPointerInteraction = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragState.current.isDragging) {
        return;
      }

      dragState.current.isDragging = false;
      const { pointerId, startX } = dragState.current;

      if (pointerId !== null) {
        try {
          trackRef.current?.releasePointerCapture(pointerId);
        } catch {
          // ignore if pointer wasn't captured
        }
      }

      const delta = event.clientX - startX;
      scheduleDragOffset(0);

      const absDelta = Math.abs(delta);
      const threshold = Math.max(40, slideMetrics.width * 0.2);

      if (absDelta > threshold) {
        dragState.current.skipClick = true;
        if (delta > 0) {
          handlePrev();
        } else {
          handleNext();
        }
        setTimeout(() => {
          dragState.current.skipClick = false;
        }, 0);
      } else {
        dragState.current.skipClick = false;
        setShouldAnimate(true);
      }

      dragState.current.pointerId = null;
      dragState.current.startX = 0;
    },
    [handleNext, handlePrev, scheduleDragOffset, slideMetrics.width]
  );

  const canNavigate = loopedDesigns.length > 1;
  let cursorStyle = "default";
  if (dragState.current.isDragging) {
    cursorStyle = "grabbing";
  } else if (canNavigate) {
    cursorStyle = "grab";
  }

  return (
    <section className="bg-[#f1e5ff] py-24 text-light-primary" id="galeria">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="font-bold text-2xl md:text-3xl">Roast Recientes</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <FigmaButton asChild size="xl" variant="figjam">
              <Link
                className="flex flex-row items-center justify-center gap-2"
                href="/gallery"
              >
                Ver todos los roasts
              </Link>
            </FigmaButton>
            <FigmaButton
              asChild
              className="text-light-primary"
              iconLead={<Figma />}
              size="xl"
              variant="secondary"
            >
              <Link
                className="flex flex-row items-center justify-center gap-2"
                href={
                  featuredDesign?.preview_url ??
                  "https://www.figma.com/design/dNuAD5d6t0DJEIASEJsTOK/Roast-Recientes-por-Edu-Calvo"
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                Ver preview
              </Link>
            </FigmaButton>
          </div>
        </div>

        <p className="mb-8 text-base text-light-secondary">
          Todos los roast han sido realizados con un tiempo medio de 2-3 horas.
          El objetivo es brindar la mayor calidad en el menor tiempo posible,
          para poder inspirar y ayudar a más proyectos.
        </p>

        <div className="relative pb-12">
          {showSkeletons && (
            <div className="flex justify-center gap-4">
              {SKELETON_KEYS.map((key) => (
                <div
                  className="h-[200px] w-[300px] animate-pulse rounded-lg bg-light-background-secondary"
                  key={key}
                />
              ))}
            </div>
          )}

          {!showSkeletons && featuredDesign && (
            <div className="relative mx-auto max-w-full" ref={containerRef}>
              <div className="overflow-hidden">
                <div
                  className="flex items-center gap-6"
                  onPointerCancel={finishPointerInteraction}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={finishPointerInteraction}
                  ref={trackRef}
                  style={{
                    transform: `translateX(${translateValue}px)`,
                    transition:
                      shouldAnimate && !dragState.current.isDragging
                        ? "transform 400ms ease"
                        : "none",
                    touchAction: "pan-y",
                    cursor: cursorStyle,
                  }}
                >
                  {loopedDesigns.map((design, index) => {
                    let realIndex = index - 1;
                    if (index === 0) {
                      realIndex = designs.length - 1;
                    } else if (index === loopedDesigns.length - 1) {
                      realIndex = 0;
                    }

                    const isActive = realIndex === activeRealIndex;
                    const slideContent = (
                      <div className="relative h-full w-full">
                        <Image
                          alt={design.title}
                          className="h-full w-full rounded-xl object-cover"
                          height={600}
                          src={design.image_url}
                          width={800}
                        />
                        <div className="absolute bottom-3 left-3">
                          <CardLink
                            href={design.url}
                            imgAlt="preview image"
                            imgSrc={design.before_img}
                            subtitle={design.categoria_data?.name || design.categoria}
                            target="_blank"
                            title={design.title}
                          />
                        </div>
                      </div>
                    );

                    return (
                      <button
                        aria-pressed={isActive}
                        className="w-[280px] flex-shrink-0 border-0 bg-transparent p-0 md:w-[520px]"
                        data-carousel-slide
                        key={`${design.id}-${index}`}
                        onClick={() => handleSlideClick(index)}
                        type="button"
                      >
                        {isActive ? (
                          <FigmaFrame padding="sm" showCorners>
                            {slideContent}
                          </FigmaFrame>
                        ) : (
                          <div className="rounded-xl shadow-neutral-soft transition duration-300 hover:shadow-neutral-soft-hover">
                            {slideContent}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {canNavigate && (
                <>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f1e5ff] via-[#f1e5ff]/80 to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f1e5ff] via-[#f1e5ff]/80 to-transparent" />
                </>
              )}

              {loopedDesigns.length > 1 && (
                <>
                  <button
                    aria-label="Ver diseño anterior"
                    className={[
                      "-translate-y-1/2",
                      "absolute",
                      "hidden",
                      "left-2",
                      "md:block",
                      "rounded-full",
                      "top-1/2",
                      "bg-white/80",
                      "p-2",
                      "text-[#947efb]",
                      "shadow-sm",
                      "transition-all",
                      "hover:bg-white",
                      "hover:shadow-md",
                    ].join(" ")}
                    onClick={handlePrev}
                    type="button"
                  >
                    <ArrowLeft aria-hidden className="h-5 w-5" />
                    <span className="sr-only">Anterior</span>
                  </button>
                  <button
                    aria-label="Ver diseño siguiente"
                    className={[
                      "-translate-y-1/2",
                      "absolute",
                      "right-2",
                      "top-1/2",
                      "hidden",
                      "md:block",
                      "rounded-full",
                      "bg-white/80",
                      "p-2",
                      "text-[#947efb]",
                      "shadow-sm",
                      "transition-all",
                      "hover:bg-white",
                      "hover:shadow-md",
                      "md:block",
                    ].join(" ")}
                    onClick={handleNext}
                    type="button"
                  >
                    <ArrowRight aria-hidden className="h-5 w-5" />
                    <span className="sr-only">Siguiente</span>
                  </button>
                </>
              )}

              {loopedDesigns.length > 1 && (
                <div
                  className={[
                    "-bottom-8",
                    "absolute",
                    "inset-x-0",
                    "flex",
                    "justify-center",
                    "gap-2",
                  ].join(" ")}
                >
                  {designs.map((design, index) => (
                    <button
                      aria-label={`Ir al slide ${index + 1}`}
                      className={[
                        "h-2.5 w-2.5 rounded-full transition-all",
                        index === activeRealIndex
                          ? "w-8 bg-[#947efb]"
                          : "bg-[#947efb]/30 hover:bg-[#947efb]/50",
                      ].join(" ")}
                      key={`dot-${design.id}`}
                      onClick={() => handleDotClick(index)}
                      type="button"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {showError && (
            <p className="mt-6 rounded-md border border-light-background-secondary bg-light-background px-4 py-3 text-light-secondary text-sm">
              Tuvimos un problema para cargar los roasts recientes. Intenta
              recargar la página.
            </p>
          )}

          {showEmptyState && (
            <p className="mt-6 rounded-md border border-light-background-secondary bg-light-background px-4 py-3 text-light-secondary text-sm">
              Todavía no hay roasts publicados. Vuelve pronto para descubrir los
              próximos proyectos.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
