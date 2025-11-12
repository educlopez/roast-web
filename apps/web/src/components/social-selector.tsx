"use client";

import { motion } from "motion/react";
import {
  cloneElement,
  type ReactElement,
  type SVGProps,
  useState,
} from "react";

import { BskyIcon } from "@/components/icons/bsky";
import { ThreadsIcon } from "@/components/icons/threads";
import { XIcon } from "@/components/icons/x";

type Platform = {
  name: string;
  domain: string;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  url: string;
};

type PlatformColors = {
  background: string;
  icon: string;
};

const defaultColors: PlatformColors = {
  background: "#F1E5FF",
  icon: "#8638E5",
};

const platformColors: Record<Platform["name"], PlatformColors> = {
  X: {
    background: "#EBEBFF",
    icon: "#4D49FC",
  },
  Bluesky: {
    background: "#E5F4FF",
    icon: "#0D99FF",
  },
  Threads: {
    background: "#FFE0FC",
    icon: "#FF24BD",
  },
};

const platforms: Platform[] = [
  {
    name: "X",
    domain: "x.com",
    icon: <XIcon className="h-5 w-5" />,
    url: "https://x.com/educalvolpz",
  },
  {
    name: "Bluesky",
    domain: "bsky.app",
    icon: <BskyIcon className="h-5 w-5" />,
    url: "https://bsky.app/profile/educalvolopez.com",
  },
  {
    name: "Threads",
    domain: "threads.net",
    icon: <ThreadsIcon className="h-5 w-5" />,
    url: "https://threads.net/@educalvolpz",
  },
];

function getPlatformColors(platformName: Platform["name"]): PlatformColors {
  return platformColors[platformName] ?? defaultColors;
}

export default function SocialSelector() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    platforms[0]
  );
  const handle = "educalvolpz";

  return (
    <div className="mx-auto my-4 w-full max-w-2xl text-center">
      <div className="space-y-6">
        <div className="flex items-center justify-center">
          <div className="relative flex w-fit items-center justify-center gap-4">
            {platforms.map((platform) => {
              const isSelected = selectedPlatform.name === platform.name;
              const colors = getPlatformColors(platform.name);

              return (
                <button
                  aria-label={`Select ${platform.name} platform`}
                  className="relative z-10 rounded-full p-2 transition-colors"
                  key={platform.name}
                  onClick={() => setSelectedPlatform(platform)}
                  style={{
                    backgroundColor: isSelected
                      ? colors.background
                      : "transparent",
                  }}
                  type="button"
                >
                  {cloneElement(platform.icon, {
                    fill: colors.icon,
                    style: {
                      ...(platform.icon.props.style ?? {}),
                      transition: "fill 0.2s ease, opacity 0.2s ease",
                      opacity: isSelected ? 1 : 0.5,
                    },
                  })}
                  <span className="sr-only">{platform.name}</span>
                </button>
              );
            })}
            <motion.div
              animate={{
                x:
                  platforms.findIndex((p) => p.name === selectedPlatform.name) *
                  (36 + 16),
                backgroundColor: getPlatformColors(selectedPlatform.name)
                  .background,
              }}
              className="absolute inset-0 z-0 h-9 w-9 rounded-full"
              initial={false}
              layoutId="background"
              style={{
                backgroundColor: getPlatformColors(selectedPlatform.name)
                  .background,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Actualizaciones en{" "}
          <span className="font-medium text-zinc-500">
            <motion.a
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              href={selectedPlatform.url}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              key={selectedPlatform.domain}
              rel="noopener noreferrer"
              target="_blank"
              transition={{ duration: 0.3 }}
            >
              {selectedPlatform.domain}
            </motion.a>
          </span>
          <br />
          <a
            className="font-medium text-zinc-950"
            href={selectedPlatform.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            @{handle}
          </a>
        </p>
      </div>
    </div>
  );
}
