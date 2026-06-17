import { defineConfig } from "@tanstack/start/config";

export default defineConfig({
  // Ensure the server entry is pointing to your app.tsx or server.ts
  start: {
    server: {
      preset: "cloudflare-pages",
    },
  },
});
