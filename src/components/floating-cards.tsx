"use client";
import { CldImage } from "next-cloudinary";
import { motion } from "motion/react";

export function FloatingCards() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50 md:opacity-100">
      <motion.div
        className="absolute top-0 md:top-1/4 -right-20 w-80 h-48 rotate-12"
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
        <CldImage
          width="500600"
          height="630000"
          src="roastportfolio/sparkbites.dev"
          alt="sparkbites.dev"
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 md:top-1/3 -left-20 w-80 h-48 -rotate-12"
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
        <CldImage
          width="500600"
          height="630000"
          src="roastportfolio/educalvolopez.com"
          alt="educalvolopez.com"
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
