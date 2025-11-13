"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { submitWebsite } from "@/app/actions/submit-website";
import { FigmaButton } from "@/components/ui/figma-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function SubmitForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitWebsite(formData);

    setLoading(false);

    if (result.success) {
      toast({
        title: "¡Enviado con éxito!",
        description: "Revisare tu proyecto pronto.",
      });
    } else {
      toast({
        title: "Error",
        description:
          result.error ||
          "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  }

  return (
    <section className="bg-dark-background py-24 text-dark-primary" id="submit">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="mb-12 text-center font-bold text-3xl">
          Envía tu proyecto
        </h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="url">URL del proyecto</Label>
            <Input
              className="h-12 border-0 bg-dark-background-secondary text-dark-primary placeholder:text-dark-tertiary focus-visible:ring-1 focus-visible:ring-violet-600"
              id="url"
              name="url"
              placeholder="https://tu-proyecto.com"
              required
              type="url"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Comentarios adicionales</Label>
            <Textarea
              className="min-h-[100px] border-0 bg-dark-background-secondary text-dark-primary placeholder:text-dark-tertiary focus-visible:ring-1 focus-visible:ring-violet-600"
              id="comments"
              name="comments"
              placeholder="Cuéntame más sobre tu proyecto..."
            />
          </div>
          <p className="mt-4 text-dark-secondary text-sm">
            *Los Roast se publicaran en mis redes sociales{" "}
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
            disabled={loading}
            iconTrail={loading ? undefined : <Send />}
            size="xl"
            type="submit"
            variant="figjam"
          >
            {loading ? "Enviando..." : "Enviar para revisión"}
          </FigmaButton>
        </form>
      </div>
    </section>
  );
}
