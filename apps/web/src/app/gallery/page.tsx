import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = {
  title: "Galería de Roasts",
  description:
    "Explora todos los roasts completados por Edu Calvo. Descubre cada proyecto y prepárate para descargar los archivos de Figma próximamente.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Galería de Roasts | Roast by Edu Calvo",
    description:
      "Explora todos los roasts completados por Edu Calvo. Descubre cada proyecto y prepárate para descargar los archivos de Figma próximamente.",
    url: "/gallery",
    siteName: "Roast by Edu Calvo",
    images: [{ url: "/og.jpg", width: 1920, height: 1080 }],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    title: "Galería de Roasts | Roast by Edu Calvo",
    card: "summary_large_image",
  },
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
