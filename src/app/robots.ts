import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/cdn-cgi/",
    },
    sitemap: "https://roast.educalvolopez.com/sitemap.xml",
  };
}
