"use client";

import { motion } from "motion/react";

export function GridBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))]">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="relative">
            <motion.div
              className="absolute inset-[2px] bg-gray-100"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.001 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
