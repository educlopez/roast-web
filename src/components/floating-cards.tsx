"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FloatingCards() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 -right-20 w-80 h-48 rotate-12"
        animate={{
          y: [0, -20, 0],
          rotate: [12, 15, 12],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/placeholder.svg?height=300&width=500"
          alt="Design mockup"
          width={500}
          height={300}
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="absolute top-1/3 -left-20 w-80 h-48 -rotate-12"
        animate={{
          y: [0, 20, 0],
          rotate: [-12, -15, -12],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <Image
          src="/placeholder.svg?height=300&width=500"
          alt="Design mockup"
          width={500}
          height={300}
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
