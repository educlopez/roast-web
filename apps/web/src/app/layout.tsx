import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VercelToolbar } from "@vercel/toolbar/next";
import { Analytics } from "@/components/analytics";
import { CustomCursor } from "@/components/custom-cursor";
import Divider from "@/components/divider";
import { FigmaRulers } from "@/components/figma-rulers";
import Footer from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";
import { DateProvider } from "@/context/DateContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roast.educalvolopez.com"),
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
    url: "https://roast.educalvolopez.com",
    siteName: "Roast by Edu Calvo",
    images: [
      {
        url: "https://roast.educalvolopez.com/og.jpg",
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
  const shouldInjectToolbar = process.env.NODE_ENV === "development";

  return (
    <html lang="en">
      <body
        className={`${inter.variable} overflow-x-hidden bg-light-background antialiased`}
      >
        <DateProvider>
          <div className="fixed inset-x-0 top-0 isolate z-30 h-[50px]">
            <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[1px]" />
            <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[2px]" />
            <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[3px]" />
            <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[6px]" />
            <div className="gradient-mask-b-0 absolute inset-0 backdrop-blur-[12px]" />
          </div>
          <div className="fixed inset-x-0 bottom-0 isolate z-30 h-[100px]">
            <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[1px]" />
            <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[2px]" />
            <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[3px]" />
            <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[6px]" />
            <div className="gradient-mask-t-0 absolute inset-0 backdrop-blur-[12px]" />
          </div>
          <CustomCursor
            cursorColor="#9747FF"
            cursorSize={24}
            labelColor="#9747FF"
            labelTextColor="#ffffff"
            mode="hover"
          />
          <FigmaRulers enabled />
          <SiteHeader />
          {children}
          {shouldInjectToolbar && <VercelToolbar />}
          <Divider />
          <Footer />
          <Analytics />
          <Toaster />
        </DateProvider>
      </body>
    </html>
  );
}
