// @ts-check
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  // Configuration pour le développement avec Directus
  vite: {
    plugins: [tailwind()],
    define: {
      // Variables d'environnement pour le client
      "process.env.DIRECTUS_URL": JSON.stringify(
        process.env.DIRECTUS_URL || "http://localhost:8055"
      ),
    },
  },
})
