import { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: "Roast by Edu Calvo",
    start_url: "/",
    theme_color: "#fafafa",
  };
}
