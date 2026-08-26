import { vlyPlugin } from "@vly-ai/integrations";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const src = path.resolve(__dirname, "./src");

export default defineConfig({
  plugins: [vlyPlugin(), react()],
  resolve: {
    alias: [
      { find: "@", replacement: src },
      // Specific Next.js subpath aliases (must come before bare "next")
      { find: "next/link", replacement: `${src}/shims/next-link.tsx` },
      { find: "next/image", replacement: `${src}/shims/next-image.tsx` },
      { find: "next/navigation", replacement: `${src}/shims/next-navigation.ts` },
      { find: "next/font/google", replacement: `${src}/shims/next-font.ts` },
      { find: "next/font", replacement: `${src}/shims/next-font.ts` },
      { find: "next-themes", replacement: `${src}/shims/next-themes.ts` },
      // Bare "next" last — catches Metadata, notFound, etc.
      { find: "next", replacement: `${src}/shims/next.ts` },
    ],
  },
  server: {
    host: true,
    port: 5173,
    hmr: false,
  },
});
