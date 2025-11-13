import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Roast by Edu Calvo",
    start_url: "/",
    theme_color: "#fafafa",
  };
}
