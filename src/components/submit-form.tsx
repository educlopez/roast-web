"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { submitWebsite } from "@/app/actions/submit-website";
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
      // e.currentTarget.reset();
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
    <section id="submit" className="py-24 bg-zinc-950 text-white">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Envía Tu Proyecto
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">URL del proyecto</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://tu-proyecto.com"
              className="h-12 bg-white/5 border-0 focus-visible:ring-1 focus-visible:ring-white"
              required
            />
          </div>
          {/* <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@empresa.com"
          className="h-12 bg-white/5 border-0 focus-visible:ring-1 focus-visible:ring-white"
          required
        />
      </div> */}
          <div className="space-y-2">
            <Label htmlFor="comments">Comentarios adicionales</Label>
            <Textarea
              id="comments"
              name="comments"
              placeholder="Cuéntame más sobre tu proyecto..."
              className="min-h-[100px] bg-white/5 border-0 focus-visible:ring-1 focus-visible:ring-white"
            />
          </div>
          <p className="text-sm text-zinc-500 mt-4">
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
            disabled={loading}
            className="w-full text-zinc-950 hover:scale-105 transition-transform disabled:opacity-50"
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
