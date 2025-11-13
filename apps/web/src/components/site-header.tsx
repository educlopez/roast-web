"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";
import { Popover } from "./ui/popover";

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

// Random names for invite avatar
const randomNames = [
  "Alex Johnson",
  "Sarah Martinez",
  "Michael Chen",
  "Emily Rodriguez",
  "David Kim",
  "Jessica Brown",
  "Christopher Lee",
  "Amanda Taylor",
  "James Wilson",
  "Maria Garcia",
  "Robert Anderson",
  "Lisa Thompson",
  "Daniel White",
  "Jennifer Davis",
  "Matthew Harris",
];

// Mensajes divertidos de easter egg
const easterEggMessages = [
  {
    title: "🎉 ¡Me encontraste!",
    message:
      "Este avatar en realidad no hace nada, pero lo hiciste clic de todas formas. ¡Eres curioso!",
  },
  {
    title: "👋 ¡Hola!",
    message:
      "Estás explorando la interfaz, ¿verdad? ¡Aprecio esa atención al detalle!",
  },
  {
    title: "🎭 ¡Sorpresa!",
    message:
      "Este es solo un avatar decorativo. ¡Pero oye, encontraste el easter egg!",
  },
  {
    title: "🔍 Modo detective",
    message:
      "Hiciste clic en un avatar aleatorio. ¡Respeto tu espíritu investigador!",
  },
  {
    title: "✨ ¡Magia!",
    message:
      "No pasa nada cuando me haces clic, pero me hiciste sentir especial. ¡Gracias!",
  },
  {
    title: "🎨 Toque de artista",
    message:
      "Estás haciendo clic en cosas solo para ver qué pasa. ¡Me gusta esa curiosidad!",
  },
  {
    title: "🚀 Explorador",
    message: "¡Encontraste un avatar no funcional! Tu curiosidad es admirable.",
  },
  {
    title: "💫 Polvo de estrellas",
    message:
      "Este avatar es solo decorativo, pero lo hiciste sentir importante. ¡Gracias!",
  },
];

function getRandomName(): string {
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}

function getRandomEasterEgg(): (typeof easterEggMessages)[0] {
  return easterEggMessages[
    Math.floor(Math.random() * easterEggMessages.length)
  ];
}

export function SiteHeader() {
  const pathname = usePathname();
  const [inviteName] = useState(() => getRandomName());
  const [easterEgg] = useState(() => getRandomEasterEgg());
  const inviteInitial = useMemo(
    () => inviteName.charAt(0).toUpperCase(),
    [inviteName]
  );

  return (
    <header className="sticky top-0 z-[101] border-light-background-secondary border-b bg-light-background/80 backdrop-blur">
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
        <div className="relative flex items-center md:justify-end">
          <Popover
            align="end"
            content={
              <div className="min-w-[160px] px-2 py-1">
                <div className="flex flex-col gap-1 px-2 py-1.5">
                  <p className="font-medium text-[11px] text-white leading-4">
                    Eduardo Calvo
                  </p>
                  <p className="text-[11px] text-white/70 leading-4">
                    Sígueme en X
                  </p>
                  <a
                    className="mt-1 text-[11px] text-blue-400 leading-4 hover:text-blue-300"
                    href="https://x.com/educalvolpz"
                    onClick={(e) => e.stopPropagation()}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    @educalvolpz
                  </a>
                </div>
              </div>
            }
            side="bottom"
          >
            <div className="-mr-2 relative z-10 transition-opacity hover:opacity-80">
              <Avatar
                alt="Eduardo Calvo"
                className="cursor-pointer"
                shape="circle"
                size="default"
                src="https://github.com/educlopez.png"
              />
            </div>
          </Popover>
          <Popover
            align="end"
            content={
              <div className="min-w-[200px] px-2 py-1">
                <div className="flex flex-col gap-1.5 px-2 py-2">
                  <p className="font-medium text-[11px] text-white leading-4">
                    {easterEgg.title}
                  </p>
                  <p className="text-[11px] text-white/70 leading-4">
                    {easterEgg.message}
                  </p>
                  <div className="mt-1 border-white/10 border-t pt-1.5">
                    <p className="text-[10px] text-white/50 leading-3">
                      P.D. El nombre "{inviteName}" se genera aleatoriamente
                    </p>
                  </div>
                </div>
              </div>
            }
            side="bottom"
          >
            <div className="relative z-0 transition-opacity hover:opacity-80">
              <Avatar
                alt={inviteName}
                className="cursor-pointer"
                color="blue"
                letter={inviteInitial}
                shape="circle"
                size="default"
              />
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
}
