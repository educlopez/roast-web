import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.roast.educalvolopez.com"),
  title: {
    default: "Roast by Edu Calvo",
    template: "%s | Roast by Edu Calvo",
  },
  description:
    "Descubre Roast by Edu Calvo: un servicio gratuito donde rediseño y mejoro proyectos web enviados por usuarios. Obtén ideas creativas, análisis detallados y un rediseño fresco para destacar online. ¡Envía tu web hoy!",
  keywords: [
    "rediseño web gratuito, análisis de proyectos web, mejora de sitios web, crítica de diseño web, Roast by Edu Calvo, rediseño creativo, optimización de diseño web, proyectos web, análisis UI/UX, diseño web gratis",
  ],
  openGraph: {
    title: "Roast by Edu Calvo",
    description:
      "Descubre Roast by Edu Calvo: un servicio gratuito donde rediseño y mejoro proyectos web enviados por usuarios. Obtén ideas creativas, análisis detallados y un rediseño fresco para destacar online. ¡Envía tu web hoy!",
    url: "https://www.roast.educalvolopez.com",
    siteName: "Roast by Edu Calvo",
    images: [
      {
        url: "https://www.roast.educalvolopez.com/og.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "es-ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "SmoothUI",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
