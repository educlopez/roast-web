import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Galería de Roasts",
  description:
    "Explora todos los roasts completados por Edu Calvo. Descubre cada proyecto y prepárate para descargar los archivos de Figma próximamente.",
};

export default function GalleryPage() {
  return (
    <main className="bg-light-background py-24">
      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-4">
        <header className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <h1 className="font-semibold text-4xl text-light-primary md:text-5xl">
            Galería de Roasts
          </h1>
          <p className="text-base text-light-secondary md:text-lg">
            Revisa todos los proyectos que ya han pasado por un roast. Cada uno
            incluye su preview y nombre. La preview del proyecto siempre estará
            disponible de forma gratuita, mientras que los archivos de Figma
            serán de pago.
          </p>
        </header>
        <GalleryGrid />
      </section>
    </main>
  );
}
