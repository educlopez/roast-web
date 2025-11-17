"use client";

import { CheckCircle2, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { submitWebsite } from "@/app/actions/submit-website";
import { FigmaButton } from "@/components/ui/figma-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

type Category = {
  id: string;
  name: string;
  description: string | null;
};

export function SubmitForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [categoria, setCategoria] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("id, name, description")
          .order("name");

        if (error) {
          console.error("Error fetching categories:", error);
          return;
        }

        setCategories(data || []);
      } catch (error) {
        console.error("Unexpected error fetching categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (categoria) {
      formData.set("categoria", categoria);
    }
    const result = await submitWebsite(formData);

    setLoading(false);

    if (result.success) {
      // Clear form state and show confirmation
      // No need to reset form as it will be unmounted
      setCategoria("");
      setSubmitted(true);
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
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="confirmation"
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quad
              }}
            >
              <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <motion.div
                  animate={{ scale: 1 }}
                  className="flex size-16 items-center justify-center rounded-full bg-figjam/20"
                  initial={{ scale: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quad
                  }}
                >
                  <CheckCircle2 className="size-8 text-figjam" />
                </motion.div>
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quad
                  }}
                >
                  <h2 className="font-bold text-3xl">
                    ¡Proyecto enviado con éxito!
                  </h2>
                  <p className="text-dark-secondary text-lg">
                    Estate atento a mis redes sociales con el resultado.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 1 }}
              transition={{
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94], // ease-out-quad
              }}
            >
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
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select
                    disabled={categoriesLoading}
                    name="categoria"
                    onValueChange={setCategoria}
                    required
                    value={categoria}
                  >
                    <SelectTrigger className="h-12 border-0 bg-dark-background-secondary text-dark-primary focus-visible:ring-1 focus-visible:ring-violet-600">
                      <SelectValue
                        placeholder={
                          categoriesLoading
                            ? "Cargando categorías..."
                            : "Selecciona una categoría"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-background-secondary text-dark-primary">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="x_handle">
                    Handle de X.com (opcional)
                  </Label>
                  <Input
                    className="h-12 border-0 bg-dark-background-secondary text-dark-primary placeholder:text-dark-tertiary focus-visible:ring-1 focus-visible:ring-violet-600"
                    id="x_handle"
                    name="x_handle"
                    placeholder="@tuusuario"
                    type="text"
                  />
                  <p className="text-dark-tertiary text-xs">
                    Si lo proporcionas, te mencionaremos cuando publiquemos tu
                    proyecto en X.com
                  </p>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
