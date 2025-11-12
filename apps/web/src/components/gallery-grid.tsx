"use client";

import { Figma, Lock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { IconBox } from "./icon-box";
import { Button } from "./ui/button";

type GalleryDesign = {
  id: number;
  title: string;
  image_url: string;
  url?: string | null;
  figma_url?: string | null;
  download_url?: string | null;
  description?: string | null;
  subtitle?: string | null;
  [key: string]: unknown;
};

type FetchState = "idle" | "loading" | "error" | "success";

export function GalleryGrid() {
  const [designs, setDesigns] = useState<GalleryDesign[]>([]);
  const [status, setStatus] = useState<FetchState>("idle");

  useEffect(() => {
    async function fetchDesigns() {
      setStatus("loading");
      const { data, error } = await supabase
        .from("designs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching gallery designs:", error);
        setStatus("error");
        return;
      }

      setDesigns(data ?? []);
      setStatus("success");
    }

    fetchDesigns();
  }, []);

  if (status === "loading") {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="flex animate-pulse flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white"
            key={`gallery-skeleton-${String(index)}`}
          >
            <div className="h-60 bg-zinc-100" />
            <div className="space-y-2 px-6 py-5">
              <div className="h-4 w-1/2 rounded bg-zinc-200" />
              <div className="h-4 w-1/3 rounded bg-zinc-100" />
              <div className="h-9 w-full rounded bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center text-red-600 text-sm">
        No pudimos cargar la galería en este momento. Por favor, inténtalo de
        nuevo más tarde.
      </div>
    );
  }

  if (designs.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white px-4 py-10 text-center text-sm text-zinc-600">
        Aún no hay roasts disponibles en la galería. Vuelve pronto para ver los
        nuevos proyectos.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {designs.map((design) => (
        <article
          className="flex flex-col overflow-hidden rounded-lg bg-white shadow-neutral-soft transition-shadow hover:shadow-neutral-soft-hover"
          data-cursor-label={design.subtitle || design.description || undefined}
          key={design.id}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
            <Image
              alt={design.title}
              className="object-cover"
              fill
              sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 90vw"
              src={design.image_url}
            />
          </div>
          <div className="flex flex-1 flex-col justify-between px-6 py-5">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <IconBox
                  size={24}
                  type={design.subtitle || design.description || undefined}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-zinc-900">
                    {design.title}
                  </h3>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full" disabled variant="outline">
                <Lock className="h-4 w-4" />
                <span className="font-medium text-sm">
                  Descarga bloqueada por ahora
                </span>
              </Button>
              <p className="mt-3 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <Figma className="h-4 w-4" />
                Las descargas de Figma estarán disponibles próximamente.
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
