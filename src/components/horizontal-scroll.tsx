"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useOnClickOutside } from "usehooks-ts";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { Button } from "./ui/button";

interface Design {
  id: number;
  title: string;
  image_url: string;
  description: string;
  before_img: string;
  after_img: string;
}
export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<Design | null>(null);
  const ref = useRef(null);
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

  useOnClickOutside(ref, () => setActiveItem(null));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-20 bg-black/50 bg-blend-luminosity backdrop-blur-xl dark:bg-zinc-900/70"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeItem ? (
          <>
            <div className="group fixed inset-0 z-30 grid place-items-center">
              <motion.div
                className="shadow-sm box-gen flex h-fit cursor-pointer flex-col items-start gap-4 overflow-hidden p-4 w-full md:w-2/3"
                ref={ref}
                layoutId={`workItem-${activeItem.title}`}
                style={{ borderRadius: 12 }}
              >
                <div className="flex w-full items-center gap-4">
                  <motion.div layoutId={`workItemImage-${activeItem.title}`}>
                    <ReactCompareSlider
                      className="rounded-xl"
                      itemOne={
                        <ReactCompareSliderImage
                          src={activeItem.before_img}
                          alt={activeItem.title}
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src={activeItem.after_img}
                          alt={activeItem.title}
                        />
                      }
                    />
                    <p className="mt-4 text-center text-2xl ">
                      {activeItem.title}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
      <div
        ref={containerRef}
        className="flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
      >
        <motion.div
          className="flex"
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.2}
        >
          {designs.map((design) => (
            <motion.div
              key={design.id}
              className=" min-w-300 md:min-w-[800px] snap-center px-4"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-neutral-900 md:p-8 rounded-2xl">
                <Image
                  src={design.image_url}
                  alt={design.title}
                  width={800}
                  height={600}
                  className="rounded-lg mb-6"
                  draggable="false"
                />
                <div className="relative p-2 md:p-0">
                  <h3 className="text-2xl font-bold mb-2">{design.title}</h3>
                  <p className="text-neutral-400">{design.description}</p>
                  <Button
                    onClick={() => setActiveItem(design)}
                    variant="outline"
                    size="lg"
                    className="text-black md:mt-0 mt-2 md:absolute md:top-2 md:right-2 z-10"
                  >
                    Ver comparación
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
