"use client";

import { Figma } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CardLink } from "./cardLink";
import { Button } from "./ui/button";

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
  const [designs, setDesigns] = useState<Design[]>([]);

  useEffect(() => {
    async function fetchDesigns() {
      const { data, error } = await supabase
        .from("designs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching designs:", error);
      } else {
        setDesigns(data || []);
      }
    }

    fetchDesigns();
  }, []);

  return (
    <section className="bg-zinc-100 py-24 text-zinc-950" id="galeria">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-row items-center justify-between gap-4">
          <h2 className="font-bold text-2xl md:text-3xl">Roast Recientes</h2>
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
        <p className="mb-8 text-base text-zinc-600">
          Todos los roast han sido realizados con un tiempo medio de 2-3 horas.
          El objetivo es brindar la mayor calidad en el menor tiempo posible,
          para poder inspirar y ayudar a más proyectos.
        </p>
        <div
          className="hide-scrollbar flex snap-x snap-mandatory overflow-x-scroll"
          ref={containerRef}
        >
          <motion.div
            className="flex cursor-grab gap-4 p-[5px]"
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.2}
          >
            {designs.map((design) => (
              <motion.div
                className="max-h-[167px] min-w-[300px] snap-center overflow-hidden rounded-md shadow-neutral-soft transition-all md:max-h-[444px] md:min-w-[800px]"
                key={design.id}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 0.98 }}
              >
                <div className="relative">
                  <Image
                    alt={design.title}
                    draggable="false"
                    height={600}
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
      </div>
    </section>
  );
}
