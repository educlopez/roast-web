"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "EVpin Roast",
      image: "/placeholder.svg?height=600&width=800",
      description: "Charging station finder app redesign",
    },
    {
      id: 2,
      title: "Vault Roast",
      image: "/placeholder.svg?height=600&width=800",
      description: "Banking app interface optimization",
    },
    {
      id: 3,
      title: "uHired Roast",
      image: "/placeholder.svg?height=600&width=800",
      description: "NFT resume platform redesign",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar"
    >
      <div className="flex">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="min-w-[800px] snap-center px-4"
            whileHover={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-neutral-900 p-8 rounded-2xl">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={600}
                className="rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-neutral-400">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
