import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PricingCard() {
  return (
    <div className="bg-neutral-950 text-white p-12 rounded-2xl">
      <div className="max-w-xl mx-auto text-center">
        <h3 className="text-5xl font-bold mb-6">Gratis</h3>
        <p className="text-xl text-neutral-400 mb-8">
          Obtén un rediseño de tu web
        </p>
        <ul className="space-y-4 mb-8 text-left">
          <li className="flex items-center gap-3">
            <span className="text-green-500">✓</span>
            <span>Rediseño completo de la sección principal</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500">✓</span>
            <span>Rediseñado en 2-3 días según demanda</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500">✓</span>
            <span>
              Se publicara en x.com en la cuenta de{" "}
              <a href="https://x.com/educalvolpz" target="_blank">
                @educalvolpz
              </a>
            </span>
          </li>
        </ul>
        <Button
          asChild
          className="w-full h-12 bg-white text-black rounded-full hover:scale-105 transition-transform"
        >
          <Link href="#submit">
            Envía Tu Diseño
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <p className="text-sm text-neutral-500 mt-4">
          *Debido a picos en la demanda, algunas solicitudes podrían tardar un
          poco más de lo habitual.
        </p>
      </div>
    </div>
  );
}
