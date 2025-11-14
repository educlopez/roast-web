"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import SocialSelector from "@/components/social-selector";
import { FigmaButton } from "@/components/ui/figma-button";
import { WebsiteStatus } from "@/components/website-status";
import { useDateContext } from "@/context/DateContext";
import { useAvailableSpots } from "@/hooks/use-available-spots";
import { supabase } from "@/lib/supabase";
import { Comment } from "./comment";
import { CursorLabel } from "./cursor-label";
import { FigmaFrame } from "./figma-frame";

// Configure which 4 designs to show in the hero section
// Add the exact titles of the 4 designs you want to display
// Example: ["Design Name 1", "Design Name 2", "Design Name 3", "Design Name 4"]
const HERO_DESIGN_TITLES: string[] = [
  "Midudev",
  "Svgl",
  "Fuego Eterno",
  "Pablo López",
];

type Design = {
  id: number;
  title: string;
  image_url: string;
  [key: string]: unknown;
};

export default function Hero() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const { availableSpots, isLoading } = useAvailableSpots();
  const { isDateReached, isSubmissionEnabled } = useDateContext();
  const hasSpots = availableSpots > 0;
  const registrationOpen = isSubmissionEnabled && hasSpots;

  useEffect(() => {
    async function fetchDesigns() {
      // If no specific titles are configured, fall back to latest 4
      if (HERO_DESIGN_TITLES.length === 0) {
        const { data: latestDesigns, error: latestError } = await supabase
          .from("designs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(4);

        if (latestError) {
          console.error("Error fetching hero designs:", latestError);
          return;
        }

        setDesigns(latestDesigns ?? []);
        return;
      }

      // Fetch specific designs by title
      const { data: fetchedDesigns, error: specificError } = await supabase
        .from("designs")
        .select("*")
        .in("title", HERO_DESIGN_TITLES);

      if (specificError) {
        console.error("Error fetching hero designs:", specificError);
        return;
      }

      // Sort the results to match the order in HERO_DESIGN_TITLES
      const sortedDesigns = HERO_DESIGN_TITLES.map((title) =>
        fetchedDesigns?.find((design) => design.title === title)
      ).filter((design): design is Design => design !== undefined);

      setDesigns(sortedDesigns.slice(0, 4));
    }

    fetchDesigns();
  }, []);
  const buttonHref = (() => {
    if (isDateReached) {
      return "/gallery";
    }

    if (isSubmissionEnabled) {
      if (registrationOpen) {
        return "#submit";
      }

      return "/gallery";
    }

    return "#informacion";
  })();

  const buttonLabel = (() => {
    if (isDateReached) {
      return "Servicio cerrado";
    }

    if (isSubmissionEnabled) {
      if (hasSpots) {
        return `${availableSpots} spots disponibles`;
      }

      return "Ver Roast Realizados";
    }

    return "Inscripciones próximamente";
  })();
  return (
    <>
      <section className="relative flex min-h-[70vh] items-center justify-center py-20">
        {/* Floating cursors with labels */}
        <motion.div
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 20, -10, 0],
          }}
          className="pointer-events-none absolute top-[30%] left-[10%] z-20 hidden md:block"
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <CursorLabel color="#9747FF" label="@maria_nav" textColor="white" />
        </motion.div>
        <motion.div
          animate={{
            x: [0, -25, 20, -15, 0],
            y: [0, 30, -20, 15, 0],
          }}
          className="pointer-events-none absolute top-[40%] right-[10%] z-20 hidden md:block"
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <CursorLabel
            color="#FFCD29"
            label="@carlos_design"
            textColor="text-light-primary"
          />
        </motion.div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 font-normal text-light-secondary text-sm md:text-base"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Rediseño completo
          </motion.p>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Balancer
              as="h1"
              className="font-normal text-4xl text-light-primary tracking-tight md:text-6xl"
            >
              Te ayudo a que tu web{" "}
              <span className="relative inline-flex items-baseline">
                <FigmaFrame
                  className="-my-1 inline-flex items-center"
                  cornerSize="sm"
                  padding="sm"
                  showCorners={true}
                >
                  <span className="text-light-primary leading-none">
                    transmita
                  </span>
                </FigmaFrame>
              </span>
            </Balancer>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="relative mx-auto mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Balancer
              as="p"
              className="text-base text-light-primary md:text-light-secondary"
            >
              Analizo tu proyecto y te propongo un rediseño visual que mejora tu
              comunicación,
              <span className="relative inline-block">
                {" "}
                <span className="relative inline-block">
                  estilo y estructura.
                  <div className="-right-4 -translate-y-1/2 absolute top-1/2 z-20 hidden md:block">
                    <Comment
                      authorName="Edu Calvo"
                      message="Espero que te guste el resultado"
                      timestamp="Hace 1 año"
                    />
                  </div>
                </span>
              </span>
            </Balancer>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <FigmaButton asChild size="xl" variant="figjam">
              <Link
                className={isLoading ? "blur-xs" : ""}
                data-cursor-label={buttonLabel}
                href={buttonHref}
              >
                {buttonLabel}
              </Link>
            </FigmaButton>
            <WebsiteStatus />
          </motion.div>
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <SocialSelector />
          </div>
        </div>
      </section>

      {/* Figma-like redesign showcase section */}
      <div className="relative flex h-[160px] w-full items-center justify-center overflow-hidden md:h-[200px]">
        <div className="relative flex h-full w-full max-w-7xl items-center justify-center px-0 py-0">
          <div className="absolute bottom-[-50px] left-0 flex h-full w-full items-center justify-center gap-3 md:gap-5">
            {designs.length > 0 ? (
              designs.slice(0, 4).map((design, index) => {
                const rotations = ["-3deg", "2deg", "-1deg", "2deg"];
                const visibilityClasses = [
                  "", // First image always visible
                  "", // Second image always visible
                  "hidden md:block", // Third image hidden on mobile
                  "hidden lg:block", // Fourth image hidden on mobile and tablet
                ];
                const rotation = rotations[index] || "0deg";

                return (
                  <div
                    className={`shrink-0 rounded-[9px] border-[0.5px] border-light-background-secondary bg-light-background p-px transition-transform duration-300 ease-in-out hover:scale-105 ${visibilityClasses[index] || ""}`}
                    key={design.id}
                    style={{ transform: `rotate(${rotation})` }}
                  >
                    <div className="h-[120px] w-[180px] overflow-hidden rounded-[8px] md:h-[170px] md:w-[280px]">
                      <Image
                        alt={design.title}
                        className="h-full w-full rounded-[8px] object-cover"
                        height={170}
                        src={design.image_url}
                        width={280}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              // Fallback skeleton/placeholder while loading
              <>
                <div
                  className="shrink-0 rounded-[9px] border-[0.5px] border-light-background-secondary bg-light-background p-px transition-transform duration-300 ease-in-out hover:scale-105"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  <div className="h-[120px] w-[180px] animate-pulse rounded-[8px] bg-light-background-secondary md:h-[170px] md:w-[280px]" />
                </div>
                <div
                  className="shrink-0 rounded-[9px] border-[0.5px] border-light-background-secondary bg-light-background p-px transition-transform duration-300 ease-in-out hover:scale-105"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <div className="h-[120px] w-[180px] animate-pulse rounded-[8px] bg-light-background-secondary md:h-[170px] md:w-[280px]" />
                </div>
                <div
                  className="hidden shrink-0 rounded-[9px] border-[0.5px] border-light-background-secondary bg-light-background p-px transition-transform duration-300 ease-in-out hover:scale-105 md:block"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  <div className="h-[170px] w-[280px] animate-pulse rounded-[8px] bg-light-background-secondary" />
                </div>
                <div
                  className="hidden shrink-0 rounded-[9px] border-[0.5px] border-light-background-secondary bg-light-background p-px transition-transform duration-300 ease-in-out hover:scale-105 lg:block"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <div className="h-[170px] w-[280px] animate-pulse rounded-[8px] bg-light-background-secondary" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
