"use client";
import { CldImage } from "next-cloudinary";
import { motion } from "framer-motion";

export function FloatingCards() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-25 md:opacity-100">
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
        <CldImage
          width="500600"
          height="630000"
          src="roastportfolio/sparkbites.dev"
          alt="image 1"
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
        {/* <Image
          src="https://res-console.cloudinary.com/dyzxnud9z/thumbnails/v1/image/upload/v1733086908/cm9hc3Rwb3J0Zm9saW8vZWR1Y2Fsdm9sb3Blei5jb20=/drilldown"
          alt="Design mockup"
          width={500}
          height={300}
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        /> */}
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
        {/* <Image
          src="https://res-console.cloudinary.com/dyzxnud9z/thumbnails/v1/image/upload/v1733086908/cm9hc3Rwb3J0Zm9saW8vZWR1Y2Fsdm9sb3Blei5jb20=/drilldown"
          alt="Design mockup"
          width={500}
          height={300}
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        /> */}
        <CldImage
          width="500600"
          height="630000"
          src="roastportfolio/educalvolopez.com"
          alt="image 1"
          className="w-full h-full object-cover rounded-lg shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
