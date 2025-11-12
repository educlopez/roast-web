import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Galería de Roasts",
  description:
    "Explora todos los roasts completados por Edu Calvo. Descubre cada proyecto y prepárate para descargar los archivos de Figma próximamente.",
};

export default function GalleryPage() {
  return (
    <main className="bg-zinc-50 py-24">
      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-4">
        <header className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <h1 className="font-semibold text-4xl text-zinc-950 md:text-5xl">
            Galería de Roasts
          </h1>
          <p className="text-base text-zinc-600 md:text-lg">
            Revisa todos los proyectos que ya han pasado por un roast. Cada uno
            incluye su preview y nombre. Las descargas de Figma estarán
            disponibles próximamente.
          </p>
        </header>
        <GalleryGrid />
      </section>
    </main>
  );
}
