import Image from "next/image";
import Link from "next/link";
import { CardLink } from "./cardLink";
import { FigmaFrame } from "./figma-frame";

export default function Footer() {
  return (
    <footer className="mb-10 px-4 pt-8 pb-12">
      <div className="relative mx-auto max-w-4xl">
        <FigmaFrame
          cornerSize="sm"
          label={{ icon: "❖", text: "Footer" }}
          padding="lg"
        >
          <div className="flex flex-col items-center justify-center gap-4 text-center text-light-secondary">
            <Link
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
              href="/"
            >
              <Image alt="Roast Logo" height={28} src="/logo.svg" width={97} />
            </Link>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <CardLink
                href="https://sparkbites.dev"
                imgAlt="preview image"
                imgSrc="/sparkbites-mini.png"
                subtitle="Inspiraciones"
                target="_blank"
                title="Directorio"
              />
              <CardLink
                href="https://smoothui.dev"
                imgAlt="preview image"
                imgSrc="/smoothui-mini.png"
                subtitle="Interacciones"
                target="_blank"
                title="Micro"
              />
            </div>
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <a
                className="group flex items-center gap-2 rounded-sm px-3 py-2 transition-all hover:bg-primary/10 hover:shadow-neutral-soft hover:backdrop-blur-sm"
                href="https://x.com/educalvolpz"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="whitespace-nowrap text-light-secondary text-sm">
                  Made by
                </span>
                <Image
                  alt="User Avatar of Eduardo Calvo"
                  className="h-7 w-7 shrink-0 rounded-md"
                  height={32}
                  loading="lazy"
                  src="https://github.com/educlopez.png"
                  width={32}
                />
                <span className="whitespace-nowrap font-medium text-light-primary text-sm">
                  Eduardo Calvo
                </span>
              </a>
            </div>
          </div>
        </FigmaFrame>
      </div>
    </footer>
  );
}
