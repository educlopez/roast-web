"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitWebsite(formData: FormData) {
  try {
    const url = formData.get("url") as string;
    const comments = formData.get("comments") as string;

    // Check if the website has already been submitted
    const { data: existingSubmission, error: checkError } = await supabase
      .from("website_submissions")
      .select()
      .eq("url", url)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking existing submission:", checkError);
      return {
        success: false,
        error: "Error al verificar la existencia del sitio web",
      };
    }

    if (existingSubmission) {
      return {
        success: false,
        error: "Este sitio proyecto ya ha sido enviado para revisión.",
      };
    }

    // Insert the new submission
    const { error: insertError } = await supabase
      .from("website_submissions")
      .insert([{ url, comments, status: "pending" }])
      .select();

    if (insertError) {
      console.error("Error inserting submission:", insertError);
      return { success: false, error: "Error al guardar la solicitud" };
    }

    // Send email notification
    await resend.emails.send({
      from: "Roasted <onboarding@resend.dev>",
      to: "educlopez93@gmail.com",
      subject: "Nueva Solicitud de Diseño",
      text: `
        Nueva solicitud de diseño:
        URL: ${url}
        Comentarios: ${comments}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      error: "Error inesperado al procesar la solicitud",
    };
  }
}
