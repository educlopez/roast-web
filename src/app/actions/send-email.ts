"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const url = formData.get("url") as string;
    const comments = formData.get("comments") as string;

    await resend.emails.send({
      from: "Roasted <onboarding@resend.dev>",
      to: "contacto@educalvolopez.com",
      subject: "Nueva Solicitud de Diseño",
      text: `
        Nueva solicitud de diseño:
        Email: ${email}
        URL: ${url}
        Comentarios: ${comments}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al enviar el email" };
  }
}
