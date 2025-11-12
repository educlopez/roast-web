"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import SocialSelector from "@/components/social-selector";
import { Button } from "@/components/ui/button";
import { WebsiteStatus } from "@/components/website-status";
import { useDateContext } from "@/context/DateContext";
import { useAvailableSpots } from "@/hooks/use-available-spots";
import { supabase } from "@/lib/supabase";

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
        <div className="z-10 mx-auto max-w-4xl px-4 text-center">
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
              <Link
                className={isLoading ? "blur-xs" : ""}
                data-cursor-label={buttonLabel}
                href={buttonHref}
              >
                {buttonLabel}
              </Link>
            </Button>
            <WebsiteStatus />
          </div>
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
                    className={`shrink-0 rounded-[9px] border-[0.5px] border-zinc-200 bg-white p-px transition-transform duration-300 ease-in-out hover:scale-105 ${visibilityClasses[index] || ""}`}
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
                  className="shrink-0 rounded-[9px] border-[0.5px] border-zinc-200 bg-white p-px transition-transform duration-300 ease-in-out hover:scale-105"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  <div className="h-[120px] w-[180px] animate-pulse rounded-[8px] bg-zinc-100 md:h-[170px] md:w-[280px]" />
                </div>
                <div
                  className="shrink-0 rounded-[9px] border-[0.5px] border-zinc-200 bg-white p-px transition-transform duration-300 ease-in-out hover:scale-105"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <div className="h-[120px] w-[180px] animate-pulse rounded-[8px] bg-zinc-100 md:h-[170px] md:w-[280px]" />
                </div>
                <div
                  className="hidden shrink-0 rounded-[9px] border-[0.5px] border-zinc-200 bg-white p-px transition-transform duration-300 ease-in-out hover:scale-105 md:block"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  <div className="h-[170px] w-[280px] animate-pulse rounded-[8px] bg-zinc-100" />
                </div>
                <div
                  className="hidden shrink-0 rounded-[9px] border-[0.5px] border-zinc-200 bg-white p-px transition-transform duration-300 ease-in-out hover:scale-105 lg:block"
                  style={{ transform: "rotate(2deg)" }}
                >
                  <div className="h-[170px] w-[280px] animate-pulse rounded-[8px] bg-zinc-100" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
