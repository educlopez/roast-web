"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FigmaButton } from "./ui/figma-button";

type NavItem = {
  href: string;
  label: string;
  match: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Inicio",
    match: (pathname) => pathname === "/",
  },
  {
    href: "/gallery",
    label: "Galería",
    match: (pathname) => pathname.startsWith("/gallery"),
  },
  {
    href: "/#submit",
    label: "Enviar proyecto",
    match: () => false,
  },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[101] border-zinc-200 border-b bg-light-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:grid md:grid-cols-3">
        <div className="flex items-center">
          <Link
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            href="/"
          >
            <Image alt="Roast Logo" height={32} src="/logo.svg" width={110} />
          </Link>
        </div>
        <nav className="hidden items-center justify-center gap-6 font-medium text-light-secondary text-sm md:flex">
          {navItems.map((item) => (
            <Link
              className={cn(
                "transition-colors hover:text-light-primary",
                item.match(pathname) && "text-light-primary"
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 md:justify-end">
          <FigmaButton asChild size="default" variant="secondary">
            <Link href="/gallery">Ver galería</Link>
          </FigmaButton>
          <FigmaButton asChild size="default" variant="figjam">
            <Link href="/#submit">Enviar mi web</Link>
          </FigmaButton>
        </div>
      </div>
    </header>
  );
}
