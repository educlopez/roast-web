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
    <section
      className="relative bg-dark-background py-24 text-dark-primary"
      id="submit"
    >
      <div className="absolute inset-0 z-10 flex w-full items-center justify-center bg-dark-background/20 p-4 backdrop-blur-xs">
        <div className="box-gen rounded-md p-4 text-center text-dark-primary">
          <p className="font-bold text-lg">{title}</p>
          <p>{message}</p>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4">
        <div className="space-y-6 opacity-50">
          <div className="space-y-2">
            <Label htmlFor="url">URL del proyecto</Label>
            <div className="h-12 border-0 bg-dark-background-secondary focus-visible:ring-1 focus-visible:ring-dark-primary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Comentarios adicionales</Label>
            <div className="min-h-[100px] border-0 bg-dark-background-secondary focus-visible:ring-1 focus-visible:ring-dark-primary" />
          </div>
          <p className="mt-4 text-dark-secondary text-sm">
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
            className="w-full"
            disabled
            iconTrail={<Send />}
            size="xl"
            type="submit"
            variant="figjam"
          >
            Enviar para revisión
          </FigmaButton>
        </div>
      </div>
    </section>
  );
}
