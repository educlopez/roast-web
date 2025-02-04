"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { CardLink } from "./cardLink";
import { Figma } from "lucide-react";

interface Design {
  id: number;
  title: string;
  image_url: string;
  description: string;
  before_img: string;
  url: string;
}
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
    <section id="galeria" className="py-24 bg-zinc-100 text-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-row items-center gap-4 justify-between  mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Roast Recientes</h2>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://www.figma.com/design/dNuAD5d6t0DJEIASEJsTOK/Roast-Recientes-por-Edu-Calvo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-950 flex flex-row justify-center gap-2 items-center"
            >
              <Figma className="w-5 h-5" /> Ver Figma
            </Link>
          </Button>
        </div>
        <p className="text-base text-zinc-600 mb-8">
          Todos los roast han sido realizados con un tiempo medio de 2-3 horas.
          El objetivo es brindar la mayor calidad en el menor tiempo posible,
          para poder inspirar y ayudar a más proyectos.
        </p>
        <div
          ref={containerRef}
          className="flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
        >
          <motion.div
            className="flex gap-4 p-[5px] cursor-grab"
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.2}
          >
            {designs.map((design) => (
              <motion.div
                key={design.id}
                className="min-w-[300px] max-h-[167px] md:min-w-[800px] md:max-h-[444px] snap-center transition-all shadow-neutral-soft rounded-md overflow-hidden"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <Image
                    src={design.image_url}
                    alt={design.title}
                    width={800}
                    height={600}
                    draggable="false"
                  />
                  <div className="absolute bottom-2 left-2 z-20">
                    <CardLink
                      href={design.url}
                      imgSrc={design.before_img}
                      imgAlt="preview image"
                      title={design.title}
                      subtitle={design.description}
                      target="_blank"
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
