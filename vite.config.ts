import { vlyPlugin } from "@vly-ai/integrations";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [vlyPlugin(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/link": path.resolve(__dirname, "./src/shims/next-link.tsx"),
      "next/image": path.resolve(__dirname, "./src/shims/next-image.tsx"),
      "next/navigation": path.resolve(__dirname, "./src/shims/next-navigation.ts"),
      "next/font/google": path.resolve(__dirname, "./src/shims/next-font.ts"),
      "next/font": path.resolve(__dirname, "./src/shims/next-font.ts"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
