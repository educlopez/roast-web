import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export function BlurredSubmitForm() {
  return (
    <section id="submit" className="py-24 bg-zinc-950 text-white relative">
      <div className="p-4 absolute inset-0 backdrop-blur-xs w-full bg-zinc-950/20 z-10 flex items-center justify-center">
        <div className="box-gen text-white p-4 rounded-md text-center">
          <p className="text-lg font-bold">Spots no disponibles</p>
          <p>
            Actualmente no hay spots libres. Por favor, vuelve más tarde para
            enviar tu proyecto.
          </p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4">
        <div className="space-y-6 opacity-50">
          <div className="space-y-2">
            <Label htmlFor="url">URL del proyecto</Label>
            <div className="h-12 bg-white/5 border-0 focus-visible:ring-1 focus-visible:ring-white"></div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Comentarios adicionales</Label>
            <div className="min-h-[100px] bg-white/5 border-0 focus-visible:ring-1 focus-visible:ring-white"></div>
          </div>
          <p className="text-sm text-zinc-400 mt-4">
            *Los Roast se publicaran en x.com en la cuenta de{" "}
            <a
              href="https://x.com/educalvolpz"
              target="_blank"
              rel="noopener noreferrer"
            >
              @educalvolpz
            </a>
          </p>
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="w-full text-zinc-950 hover:scale-105 transition-transform disabled:opacity-50"
          >
            Enviar para revisión
            <Send className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
