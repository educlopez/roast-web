"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { submitWebsite } from "@/app/actions/submit-website";
import { Button } from "@/components/ui/button";
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
    <section className="bg-zinc-950 py-24 text-white" id="submit">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="mb-12 text-center font-bold text-3xl">
          Envía Tu Proyecto
        </h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="url">URL del proyecto</Label>
            <Input
              className="h-12 border-0 bg-white/5 focus-visible:ring-1 focus-visible:ring-white"
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
              className="min-h-[100px] border-0 bg-white/5 focus-visible:ring-1 focus-visible:ring-white"
              id="comments"
              name="comments"
              placeholder="Cuéntame más sobre tu proyecto..."
            />
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            *Los Roast se publicaran en mis redes sociales{" "}
            <a
              href="https://x.com/educalvolpz"
              rel="noopener noreferrer"
              target="_blank"
            >
              @educalvolpz
            </a>
          </p>
          <Button
            className="w-full text-zinc-950 transition-transform hover:scale-105 disabled:opacity-50"
            disabled={loading}
            size="lg"
            type="submit"
            variant="outline"
          >
            {loading ? (
              "Enviando..."
            ) : (
              <>
                Enviar para revisión
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
