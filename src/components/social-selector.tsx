"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { BskyIcon } from "@/components/icons/bsky";
import { ThreadsIcon } from "@/components/icons/threads";
import { XIcon } from "@/components/icons/x";

interface Platform {
  name: string;
  domain: string;
  icon: React.ReactNode;
  url: string;
}

const platforms: Platform[] = [
  {
    name: "X",
    domain: "x.com",
    icon: <XIcon className="w-5 h-5" />,
    url: "https://x.com/educalvolpz",
  },
  {
    name: "Bluesky",
    domain: "bsky.app",
    icon: <BskyIcon className="w-5 h-5" />,
    url: "https://bsky.app/profile/educalvolpz.bsky.social",
  },
  {
    name: "Threads",
    domain: "threads.net",
    icon: <ThreadsIcon className="w-5 h-5" />,
    url: "https://threads.net/@educalvolpz",
  },
];

export default function SocialSelector() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    platforms[0]
  );
  const handle = "educalvolpz";

  return (
    <div className="w-full max-w-2xl mx-auto text-center my-4">
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="flex relative items-center justify-center gap-4 w-fit">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => setSelectedPlatform(platform)}
                className={`relative z-10 p-2 rounded-full transition-colors ${
                  selectedPlatform.name === platform.name
                    ? "fill-white "
                    : "fill-zinc-400 hover:fill-white hover:bg-zinc-800/50"
                }`}
                aria-label={`Select ${platform.name} platform`}
              >
                {platform.icon}
                <span className="sr-only">{platform.name}</span>
              </button>
            ))}
            <motion.div
              layoutId="background"
              className="absolute inset-0 bg-zinc-800 rounded-full w-9 h-9 z-0"
              initial={false}
              animate={{
                x:
                  platforms.findIndex((p) => p.name === selectedPlatform.name) *
                  (36 + 16),
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          </div>
        </div>
        <p className="text-sm text-zinc-400">
          Actualizaciones en{" "}
          <span className="text-zinc-400 font-medium">
            <motion.a
              key={selectedPlatform.domain}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 0.3 }}
              href={selectedPlatform.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedPlatform.domain}
            </motion.a>
          </span>
          <br />
          <a
            href={selectedPlatform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-950 font-medium"
          >
            @{handle}
          </a>
        </p>
      </div>
    </div>
  );
}
