"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface Design {
  id: number;
  title: string;
  image_url: string;
  description: string;
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
    <div
      ref={containerRef}
      className="flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
    >
      <div className="flex">
        {designs.map((design) => (
          <motion.div
            key={design.id}
            className="min-w-[800px] snap-center px-4"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-neutral-900 p-8 rounded-2xl">
              <Image
                src={design.image_url}
                alt={design.title}
                width={800}
                height={600}
                className="rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold mb-2">{design.title}</h3>
              <p className="text-neutral-400">{design.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
