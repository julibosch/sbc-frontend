import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
      injectRegister: "auto",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        theme_color: "#18181b",
        background_color: "#18181b",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "Club Sportivo Bombal",
        short_name: "SBC",
        description: "Club Sportivo Bombal",
        icons: [
          {
            src: "/icon-76x76.png",
            sizes: "76x76",
            type: "image/png",
          },
          {
            src: "/icon-120x120.png",
            sizes: "120x120",
            type: "image/png",
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
        ],
      },
    }),
  ],
});
