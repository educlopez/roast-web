"use client";
import { motion } from "motion/react";
import { CldImage } from "next-cloudinary";

export function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-50 md:opacity-100">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [12, 15, 12],
        }}
        className="-right-20 absolute top-0 h-48 w-80 rotate-12 md:top-1/4"
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <CldImage
          alt="sparkbites.dev"
          className="h-full w-full rounded-lg object-cover shadow-2xl"
          crop="fill"
          height="192"
          sizes="100vw"
          src="roastportfolio/sparkbites.dev"
          width="320"
        />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [-12, -15, -12],
        }}
        className="-left-20 -rotate-12 absolute bottom-0 h-48 w-80 md:top-1/3"
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <CldImage
          alt="educalvolopez.com"
          className="h-full w-full rounded-lg object-cover shadow-2xl"
          crop="fill"
          height="192"
          sizes="100vw"
          src="roastportfolio/educalvolopez.com"
          width="320"
        />
      </motion.div>
    </div>
  );
}
