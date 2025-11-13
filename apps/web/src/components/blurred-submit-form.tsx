import { Send } from "lucide-react";
import { FigmaButton } from "@/components/ui/figma-button";
import { Label } from "@/components/ui/label";

type BlurredSubmitFormProps = {
  title?: string;
  message?: string;
};

export function BlurredSubmitForm({
  title = "Spots no disponibles",
  message = "Actualmente no hay spots libres. Por favor, vuelve más tarde para enviar tu proyecto.",
}: BlurredSubmitFormProps) {
  return (
    <section className="relative bg-zinc-950 py-24 text-white" id="submit">
      <div className="absolute inset-0 z-10 flex w-full items-center justify-center bg-zinc-950/20 p-4 backdrop-blur-xs">
        <div className="box-gen rounded-md p-4 text-center text-white">
          <p className="font-bold text-lg">{title}</p>
          <p>{message}</p>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4">
        <div className="space-y-6 opacity-50">
          <div className="space-y-2">
            <Label htmlFor="url">URL del proyecto</Label>
            <div className="h-12 border-0 bg-white/5 focus-visible:ring-1 focus-visible:ring-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Comentarios adicionales</Label>
            <div className="min-h-[100px] border-0 bg-white/5 focus-visible:ring-1 focus-visible:ring-white" />
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            *Los Roast se publicaran en x.com en la cuenta de{" "}
            <a
              href="https://x.com/educalvolpz"
              rel="noopener noreferrer"
              target="_blank"
            >
              @educalvolpz
            </a>
          </p>
          <FigmaButton
            className="w-full text-zinc-950 transition-transform hover:scale-105 disabled:opacity-50"
            disabled
            iconTrail={<Send />}
            size="xl"
            type="submit"
            variant="secondary"
          >
            Enviar para revisión
          </FigmaButton>
        </div>
      </div>
    </section>
  );
}
