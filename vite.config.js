import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.png", "favicon.ico"],
      manifest: {
        name: "SynScale Tablet",
        short_name: "SynScale",
        description: "Sistema de acompanhamento de carga em balança",
        start_url: "/",
        display: "standalone",
        background_color: "#f1f5f9",
        theme_color: "#1e293b",
        icons: [
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
